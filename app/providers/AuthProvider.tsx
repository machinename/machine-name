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
    deleteUser,
    onAuthStateChanged,
    reauthenticateWithCredential,
    sendEmailVerification,
    sendPasswordResetEmail,
    updateProfile,
    verifyBeforeUpdateEmail,
    EmailAuthProvider,
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
            console.error('Firebase auth is not initialized');
            return;
        }

        const token = Cookies.get('MNFBCT');

        if (token) {
            signInWithCustomToken(auth, token)
                .then((userCredential) => {
                    setUser(userCredential.user);
                })
                .catch((error) => {
                    console.error('Error authenticating with token:', error);
                    setUser(null);
                });
        } else {
            console.log('No MNFBCT token found in cookies.');
        }

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setIsAuthLoading(true);
            if (currentUser) {
                setUser(currentUser);
            } else {
                setUser(null);
            }
            setIsAuthLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleError = useCallback((error: unknown) => {
        if (error instanceof FirebaseError) {
            switch (error.code) {
                case 'auth/invalid-credential':
                    setAuthError('Invalid credentials provided');
                    break;
                case 'auth/email-already-in-use':
                    setAuthError('Email already in use');
                    break;
                case 'auth/invalid-email':
                    setAuthError('Invalid email address');
                    break;
                case 'auth/operation-not-allowed':
                    setAuthError('Operation not allowed');
                    break;
                case 'auth/weak-password':
                    setAuthError('The password is too weak');
                    break;
                case 'auth/too-many-requests':
                    setAuthError('Access temporarily disabled due to many failed attempts');
                    break;
                default:
                    setAuthError('Unknown FirebaseError, error.code: ' + error.code);
            }
        } else {
            setAuthError('' + error);
        }
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
            handleError(error);
            throw error;
        }
    }, [handleError, user]);

    const logOut = useCallback(async (): Promise<void> => {
        try {
            await auth.signOut();
            setUser(null);
        } catch (error) {
            handleError(error);
            throw error;
        }
    }, [handleError]);

    const sendPasswordReset = useCallback(async (email: string): Promise<void> => {
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

