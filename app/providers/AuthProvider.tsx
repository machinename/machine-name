'use client'

import React, {
    createContext,
    useContext,
    useState,
    useMemo,
    useCallback,
    useEffect,
    ReactNode,
} from 'react';

import {
    EmailAuthProvider,
    deleteUser,
    onAuthStateChanged,
    reauthenticateWithCredential,
    sendEmailVerification,
    sendPasswordResetEmail,
    updateProfile,
    verifyBeforeUpdateEmail,
    User,
    signInWithCustomToken,
} from "firebase/auth";
import { auth } from '../firebase';
import Cookies from 'js-cookie';

interface AuthContextType {
    authError: string;
    isAuthLoading: boolean;
    user: User | null;
    deleteUserAccount: (password: string) => Promise<void>;
    logOut: () => Promise<void>;
    sendPasswordReset: (email: string) => Promise<void>;
    sendUserVerification: () => Promise<void>;
    updateUserDisplayName: (newDisplayName: string) => Promise<void>;
    updateUserEmail: (newEmail: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [authError, setAuthError] = useState<string>('');
    const [user, setUser] = useState<User | null>(null);
    const [isAuthLoading, setIsAuthLoading] = useState<boolean>(false);

    useEffect(() => {
        if (!auth) {
            setAuthError('Firebase Auth not initialized');
            return;
        }
        const fetchUser = async () => {
            setIsAuthLoading(true);
            try {
                const token = Cookies.get('SNMNCT');
                if (token && !user) {
                    const userCredential = await signInWithCustomToken(auth, token);
                    setUser(userCredential.user);
                } else if (!token && user) {
                    await auth.signOut();
                    setUser(null);
                }
            } catch (err) {
                setAuthError('Session expired or invalid.');
            } finally {
                setIsAuthLoading(false);
            }
        };
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setIsAuthLoading(true);
            setUser(currentUser || null);
            setIsAuthLoading(false);
        });
        fetchUser();
        return () => unsubscribe();
    }, []);

    const deleteUserAccount = useCallback(async (password: string): Promise<void> => {
        try {
            if (user) {
                const credential = EmailAuthProvider.credential(user.email!, password);
                await reauthenticateWithCredential(user, credential);
                await deleteUser(user);
                setUser(null);
            }
        } catch (error) {
            setAuthError('' + error);
            throw error;
        }
    }, [user]);

    const logOut = useCallback(async (): Promise<void> => {
        try {
            await auth.signOut();
            Cookies.remove('SNMNCT', { domain: '.machinename.dev', path: '/' });
            setUser(null);
        } catch (error) {
            setAuthError('' + error);
            throw error;
        }
    }, []);

    const sendPasswordReset = useCallback(async (email: string): Promise<void> => {
        try {
            await sendPasswordResetEmail(auth, email);
        } catch (error) {
            setAuthError('' + error);
            throw error;
        }
    }, []);

    const sendUserVerification = useCallback(async (): Promise<void> => {
        try {
            if (user) {
                await sendEmailVerification(user);
            } else {
                throw new Error('User not found.');
            }
        } catch (error) {
            setAuthError('' + error);
            throw error;
        }
    }, [user]);

    const updateUserDisplayName = useCallback(async (newDisplayName: string): Promise<void> => {
        try {
            if (user) {
                await updateProfile(user, { displayName: newDisplayName });
            } else {
                throw new Error('User not found.');
            }
        } catch (error) {
            setAuthError('' + error);
            throw error;
        }
    }, [ user]);

    const updateUserEmail = useCallback(async (newEmail: string, password: string): Promise<void> => {
        try {
            if (user) {
                const credential = EmailAuthProvider.credential(user.email!, password);
                await reauthenticateWithCredential(user, credential);
                await verifyBeforeUpdateEmail(user, newEmail);
            } else {
                throw new Error('User not found.');
            }
        } catch (error) {
            setAuthError('' + error);
            throw error;
        }
    }, [user]);

    const contextValue = useMemo(() => ({
        authError,
        isAuthLoading,
        user,
        deleteUserAccount,
        logOut,
        sendPasswordReset,
        sendUserVerification,
        updateUserDisplayName,
        updateUserEmail,
    }), [
        authError,
        isAuthLoading,
        user,
        deleteUserAccount,
        logOut,
        sendPasswordReset,
        sendUserVerification,
        updateUserDisplayName,
        updateUserEmail,
    ]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuthContext must be used within AuthProvider');
    }
    return context;
};