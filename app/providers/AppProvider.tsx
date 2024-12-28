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
import axios from 'axios';
import { FirebaseError } from 'firebase/app';
import {
    EmailAuthProvider,
    createUserWithEmailAndPassword,
    deleteUser,
    GoogleAuthProvider,
    onAuthStateChanged,
    reauthenticateWithCredential,
    sendEmailVerification,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    updateProfile,
    User,
    verifyBeforeUpdateEmail,
} from "firebase/auth";
import {
    auth
} from '../firebase';
import Project from '../models/Project';

// Define a union type for the allowed values
type AppModalView = '' | 'projects' | 'newProject' | 'newModel' | 'account' | 'modelSettings' | 'projectSettings';

interface AppContextType {
    info: string;
    isAppLoading: boolean;
    appModalView: AppModalView;
    user: User | null;
    currentProject: Project | null;
    createUserAccount: (email: string, password: string) => Promise<void>;
    deleteUserAccount: (password: string) => Promise<void>;
    createProject: (name: string, description: string) => Promise<void>;
    handleSetCurrentProject: (project: Project) => void;
    logIn: (email: string, password: string) => Promise<void>;
    logInWithGoogle: () => Promise<void>;
    logOut: () => Promise<void>;
    setAppModalView: (view: AppModalView) => void;
    setInfo: (info: string) => void;
    sendPasswordReset: (email: string) => Promise<void>;
    sendUserVerification: () => Promise<void>;
    updateUserDisplayName: (newDisplayName: string) => Promise<void>;
    updateUserEmail: (newEmail: string, password: string) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [currentProject, setCurrentProject] = useState<Project | null>(null);
    const [info, setInfo] = useState<string>('');
    const [isAppLoading, setIsAppLoading] = useState<boolean>(false);
    const [appModalView, setAppModalView] = useState<AppModalView>('');
    const [user, setUser] = useState<User | null>(null);

    const handleError = useCallback((error: unknown) => {
        if (error instanceof FirebaseError) {
            switch (error.code) {
                case 'App/invalid-credential':
                    setInfo('Invalid credentials provided');
                    break;
                case 'App/email-already-in-use':
                    setInfo('Email already in use');
                    break;
                case 'App/invalid-email':
                    setInfo('Invalid email address');
                    break;
                case 'App/operation-not-allowed':
                    setInfo('Operation not allowed');
                    break;
                case 'App/weak-password':
                    setInfo('The password is too weak');
                    break;
                case 'App/too-many-requests':
                    setInfo('Access temporarily disabled due to many failed attempts');
                    break;
                default:
                    setInfo('Unknown FirebaseError, error.code: ' + error.code);
            }
        } else {
            setInfo('' + error);
        }
    }, []);

    // Auth Methods
    const createUserAccount = useCallback(async (email: string, password: string): Promise<void> => {
        setIsAppLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await sendEmailVerification(userCredential.user);
        } catch (error) {
            handleError(error);
            throw error;
        } finally {
            setIsAppLoading(false);
        }
    }, [handleError]);

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

    const logIn = useCallback(async (email: string, password: string): Promise<void> => {
        setIsAppLoading(true);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            setUser(userCredential.user);
        } catch (error) {
            handleError(error);
            throw error;
        } finally {
            setIsAppLoading(false);
        }
    }, [handleError]);

    const logInWithGoogle = useCallback(async (): Promise<void> => {
        try {
            setIsAppLoading(true);
            const userCredential = await signInWithPopup(auth, new GoogleAuthProvider());
            setUser(userCredential.user);
        } catch (error) {
            handleError(error);
            throw error;
        } finally {
            setIsAppLoading(false);
        }
    }, [handleError]);

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
            setInfo('' + error);
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
            setInfo('' + error);
            throw error;
        }
    }, [user]);

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
            setInfo('' + error);
            throw error;
        }
    }, [user]);

    // App Methods
    const handleSetCurrentProject = useCallback((project: Project) => {
        setCurrentProject(project);
    }, []);

    const createProject = useCallback(async (name: string, description: string) => {
        try {
            if (!user) {
                throw new Error('User not found');
            }

            const idToken = await user.getIdToken();
            if (!idToken) {
                throw new Error('User is not authenticated');
            }

            const project = new Project(
                '',
                name,
                description,
                '',
                false,
                []
            );

            const response = await axios.post(
                'http://localhost:8080/projects',
                {
                    project: project.toJSON(),
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${idToken}`,
                    },
                }
            );

            console.log('Server response:', response.data);
        } catch (error) {
            handleError(error);
        } finally {
            setIsAppLoading(false);
        }
    }, [handleError, user]);

    useEffect(() => {
        if (!auth) {
            console.error('Firebase App is not initialized');
            return;
        }
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setIsAppLoading(true);
            setUser(currentUser || null);
            setIsAppLoading(false);
        });
        return () => unsubscribe();
    }, [user]);

    const contextValue = useMemo(() => ({
        appModalView,
        currentProject,
        info,
        isAppLoading,
        user,
        createProject,
        createUserAccount,
        deleteUserAccount,
        handleSetCurrentProject,
        logIn,
        logInWithGoogle,
        logOut,
        setAppModalView,
        setInfo,
        sendPasswordReset,
        sendUserVerification,
        updateUserDisplayName,
        updateUserEmail,
    }), [
        appModalView,
        currentProject,
        info,
        isAppLoading,
        user,
        createProject,
        createUserAccount,
        deleteUserAccount,
        handleSetCurrentProject,
        logIn,
        logInWithGoogle,
        logOut,
        sendPasswordReset,
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
        throw new Error('useAppContext must be used within AppProvider');
    }
    return context;
};






// 'use client'

// import axios from 'axios';
// import { AxiosError } from 'axios';
// import React, {
//     createContext,
//     useContext,
//     useState,
//     useMemo,
//     useCallback,
//     useEffect,
//     ReactNode,
// } from 'react';
// import {
//     deleteUser,
//     EmailAppProvider,
//     reAppenticateWithCredential,
//     sendEmailVerification,
//     updateProfile,
//     User,
//     verifyBeforeUpdateEmail,
// } from "firebase/App";
// import Project from '../models/Project';
// import { MLModel } from '../models/MLModel';

// interface AppContextType {
//     // State Variables
//     info: string;
//     isLoading: boolean;
//     user: User | null;
//     // App Methods
//     deleteUserAccount: (password: string) => Promise<void>;
//     logOut: () => Promise<void>;
//     passwordReset: (email: string) => Promise<void>;
//     sendUserVerification: () => Promise<void>;
//     updateUserDisplayName: (newDisplayName: string) => Promise<void>;
//     updateUserEmail: (newEmail: string, password: string) => Promise<void>;
//     // Project Methods
//     createProject: (name: string, description: string) => Promise<void>;
//     deleteProject: (projectId: string) => Promise<void>;
//     // Model Methods
//     createModel: (mlModelId: string, name: string, description: string) => Promise<void>;
//     deleteModel: (mlModelId: string) => Promise<void>;
//     setInfo: (info: string) => void;
// }

// const AppContext = createContext<AppContextType | undefined>(undefined);

// export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//     const apiUrl = 'https://api.machinename.dev';
//     const [info, setInfo] = useState<string>('');
//     const [isLoading, setIsLoading] = useState<boolean>(false);
//     const [user, setUser] = useState<User | null>(null);

//     const handleError = useCallback((error: unknown) => {
//         if (error instanceof AxiosError) {
//             setInfo('' + error.message);
//             return;
//         }
//         setInfo('' + error);
//     }, []);

//     const deleteUserAccount = useCallback(async (password: string): Promise<void> => {
//         try {
//             setIsLoading(true);
//             if (user) {
//                 const credential = EmailAppProvider.credential(user.email!, password);
//                 await reAppenticateWithCredential(user, credential);
//                 await deleteUser(user);
//                 setUser(null);
//             }
//         } catch (error) {
//             handleError(error);
//             throw error;
//         } finally {
//             setIsLoading(false);
//         }
//     }, [handleError, user]);

//     const logOut = useCallback(async (): Promise<void> => {
//         try {
//             setIsLoading(true);
//             await axios.get(`${apiUrl}/logout`, {
//                 withCredentials: true,
//             });
//             setUser(null);
//         } catch (error) {
//             handleError(error);
//             throw error;
//         } finally {
//             setIsLoading(false);
//         }
//     }, [handleError]);

//     const passwordReset = useCallback(async (email: string): Promise<void> => {
//         try {
//             setIsLoading(true);
//             const response = await axios.post(`${apiUrl}/reset`,
//                 { email },
//                 { withCredentials: true }
//             );
//             if (response.status !== 200) {
//                 throw new Error(response.data);
//             }
//         } catch (error) {
//             handleError(error);
//             throw error;
//         } finally {
//             setIsLoading(false);
//         }
//     }, [handleError]);

//     const sendUserVerification = useCallback(async (): Promise<void> => {
//         try {
//             setIsLoading(true);
//             if (user) {
//                 await sendEmailVerification(user);
//             }
//         } catch (error) {
//             handleError(error);
//             throw error;
//         } finally {
//             setIsLoading(false);
//         }
//     }, [handleError, user]);

//     const updateUserDisplayName = useCallback(async (newDisplayName: string): Promise<void> => {
//         try {
//             setIsLoading(true);
//             if (user) {
//                 await updateProfile(user, { displayName: newDisplayName });
//             }
//         } catch (error) {
//             handleError(error);
//             throw error;
//         } finally {
//             setIsLoading(false);
//         }
//     }, [handleError, user]);

//     const updateUserEmail = useCallback(async (newEmail: string, password: string): Promise<void> => {
//         try {
//             setIsLoading(true);
//             if (user?.email) {
//                 const credential = EmailAppProvider.credential(user.email, password);
//                 await reAppenticateWithCredential(user, credential);
//                 await verifyBeforeUpdateEmail(user, newEmail);
//             }
//         } catch (error) {
//             handleError(error);
//             throw error;
//         } finally {
//             setIsLoading(false);
//         }
//     }, [handleError, user]);

//     const createProject = useCallback(async (name: string, description: string): Promise<void> => {
//         const createdAt = new Date().toISOString();
//         const id = Math.random().toString(36).substring(2);
//         const starred = false;
//         const models: MLModel[] = [];

//         const newProject = new Project(
//             createdAt,
//             id,
//             name,
//             description,
//             starred,
//             models
//         );

//     }, []);

//     useEffect(() => {
//         const fetchUser = async () => {
//             try {
//                 setIsLoading(true);
//                 const response = await axios.get(`${apiUrl}/verify`, {
//                     withCredentials: true,
//                 });
//                 setUser(response.data);
//             } catch (error) {
//                 console.error(error);
//             } finally {
//                 setIsLoading(false);
//             }
//         };
//         fetchUser();
//     }, []);

//     const contextValue = useMemo(() => ({
//         info,
//         isLoading,
//         user,
//         deleteUserAccount,
//         logOut,
//         passwordReset,
//         sendUserVerification,
//         updateUserDisplayName,
//         updateUserEmail,
//         setInfo,
//     }), [
//         info,
//         isLoading,
//         user,
//         deleteUserAccount,
//         logOut,
//         passwordReset,
//         sendUserVerification,
//         updateUserDisplayName,
//         updateUserEmail,
//     ]);

//     return (
//         <AppContext.Provider value={contextValue}>
//             {children}
//         </AppContext.Provider>
//     );
// };

// export const useAppContext = (): AppContextType => {
//     const context = useContext(AppContext);
//     if (context === undefined) {
//         throw new Error('useAppContext must be used within AppProvider');
//     }
//     return context;
// };