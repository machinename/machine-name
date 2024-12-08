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

import { FirebaseError } from 'firebase/app';
import {
    EmailAuthProvider,
    deleteUser,
    onAuthStateChanged,
    reauthenticateWithCredential,
    sendEmailVerification,
    sendPasswordResetEmail,
    signInWithCustomToken,
    updateProfile,
    User, 
    verifyBeforeUpdateEmail
} from "firebase/auth";
import { auth } from '../firebase';
import axios from 'axios';

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

    const handleError = useCallback((error: unknown) => {
        if (error instanceof FirebaseError) {
            const firebaseErrorMessages: { [key: string]: string } = {
                'auth/invalid-credential': 'Invalid credentials provided',
                'auth/email-already-in-use': 'Email already in use',
                'auth/invalid-email': 'Invalid email address',
                'auth/operation-not-allowed': 'Operation not allowed',
                'auth/weak-password': 'The password is too weak',
                'auth/too-many-requests': 'Access temporarily disabled due to many failed attempts',
            };
            setAuthError(firebaseErrorMessages[error.code] || `Unknown FirebaseError: ${error.code}`);
        } else {
            setAuthError(String(error));
        }
        console.error(error);
    }, []);

    const deleteUserAccount = useCallback(async (password: string): Promise<void> => {
        setIsAuthLoading(true);
        try {
            if (user) {
                const credential = EmailAuthProvider.credential(user.email!, password);
                await reauthenticateWithCredential(user, credential);
                await deleteUser(user);
                setUser(null);
            }
        } catch (error) {
            handleError(error);
            throw error;
        } finally {
            setIsAuthLoading(false);
        }
    }, [handleError, user]);

    const logInWithCustomToken = useCallback(async (): Promise<void> => {
        try {
            setIsAuthLoading(true);

            const response = await axios.get('https://project-machine-name.uc.r.appspot.com/verify', { withCredentials: true });

            if (response.status === 200) {
                const { customToken } = response.data;
                await signInWithCustomToken(auth, customToken);
                setUser(auth.currentUser);
                console.log('Successfully verified session');
            } else {
                throw new Error('Failed to verify session');
            }
        } catch (error) {
            handleError(error);
            throw error;
        } finally {
            setIsAuthLoading(false);
        }
    }, [handleError]);

    const logOut = useCallback(async (): Promise<void> => {
        if (auth === null) {
            return;
        }
        try {
            await auth.signOut();
            setUser(null);
        } catch (error) {
            handleError(error);
            throw error;
        }
    }, [handleError]);

    const sendPasswordReset = useCallback(async (email: string): Promise<void> => {
        if (auth === null) {
            return;
        }
        try {
            await sendPasswordResetEmail(auth, email);
        } catch (error) {
            handleError(error);
            throw error;
        }
    }, [handleError]);

    const sendUserVerification = useCallback(async (): Promise<void> => {
        try {
            if (user) {
                await sendEmailVerification(user);
            } else {
                throw new Error('User not found.');
            }
        } catch (error) {
            handleError(error);
            throw error;
        }
    }, [handleError, user]);

    const updateUserDisplayName = useCallback(async (newDisplayName: string): Promise<void> => {
        try {
            if (user) {
                await updateProfile(user, { displayName: newDisplayName });
            } else {
                throw new Error('User not found.');
            }
        } catch (error) {
            handleError(error);
            throw error;
        }
    }, [handleError, user]);

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
            handleError(error);
            throw error;
        }
    }, [handleError, user]);

    useEffect(() => {
        if (!auth) {
            console.error('Firebase auth is not initialized');
            return;
        }

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setIsAuthLoading(true);
            setUser(currentUser || null);
            setIsAuthLoading(false);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        logInWithCustomToken();
    }, [logInWithCustomToken]);

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

