'use client'

import axios from 'axios';
import { AxiosError } from 'axios';
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
    deleteUser,
    EmailAuthProvider,
    reauthenticateWithCredential,
    sendEmailVerification,
    updateProfile,
    User,
    verifyBeforeUpdateEmail,
} from "firebase/auth";

interface AppContextType {
    info: string; 
    isLoading: boolean;
    user: User | null;
    deleteUserAccount: (password: string) => Promise<void>;
    logOut: () => Promise<void>;
    passwordReset: (email: string) => Promise<void>;
    sendUserVerification: () => Promise<void>;
    updateUserDisplayName: (newDisplayName: string) => Promise<void>;
    updateUserEmail: (newEmail: string, password: string) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const apiUrl = 'https://api.machinename.dev';
    const [info, setInfo] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);

    const handleError = useCallback((error: unknown) => {
        if (error instanceof AxiosError) {
            setInfo('' + error.message);
            return;
        }
        setInfo('' + error);
    }, []);

    const deleteUserAccount = useCallback(async (password: string): Promise<void> => {
        try {
            setIsLoading(true);
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
            setIsLoading(false);
        }
    }, [handleError, user]);

    const logOut = useCallback(async (): Promise<void> => {
        try {
            setIsLoading(true);
            await axios.get(`${apiUrl}/logout`, {
                withCredentials: true,
            });
            setUser(null);
        } catch (error) {
            handleError(error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, [handleError]);

    const passwordReset = useCallback(async (email: string): Promise<void> => {
        try {
            setIsLoading(true);
            const response = await axios.post(`${apiUrl}/reset`,
                { email },
                { withCredentials: true }
            );
            if (response.status !== 200) {
                throw new Error(response.data);
            }
        } catch (error) {
            handleError(error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, [handleError]);

    const sendUserVerification = useCallback(async (): Promise<void> => {
        try {
            setIsLoading(true);
            if (user) {
                await sendEmailVerification(user);
            }
        } catch (error) {
            handleError(error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, [handleError, user]);

    const updateUserDisplayName = useCallback(async (newDisplayName: string): Promise<void> => {
        try {
            setIsLoading(true);
            if (user) {
                await updateProfile(user, { displayName: newDisplayName });
            }
        } catch (error) {
            handleError(error);
            throw error;
        } finally {
            setIsLoading(false);
        }  
    }, [handleError, user]);

    const updateUserEmail = useCallback(async (newEmail: string, password: string): Promise<void> => {
        try {
            setIsLoading(true);
            if (user?.email) {
                const credential = EmailAuthProvider.credential(user.email, password);
                await reauthenticateWithCredential(user, credential);
                await verifyBeforeUpdateEmail(user, newEmail);
            }
        } catch (error) {
            handleError(error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, [handleError, user]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`${apiUrl}/verify`, {
                    withCredentials: true,
                });
                setUser(response.data);
            } catch (error) {
                handleError(error);
                throw error;
            } finally {
                setIsLoading(false);
            }
        };
        fetchUser();
    }, [handleError]);

    const contextValue = useMemo(() => ({
        info,
        isLoading,
        user,
        deleteUserAccount,
        logOut,
        passwordReset,
        sendUserVerification,
        updateUserDisplayName,
        updateUserEmail,
    }), [
        info,
        isLoading,
        user,
        deleteUserAccount,
        logOut,
        passwordReset,
        sendUserVerification,
        updateUserDisplayName,
        updateUserEmail,
    ]);

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = (): AppContextType => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAuthContext must be used within AuthProvider');
    }
    return context;
};