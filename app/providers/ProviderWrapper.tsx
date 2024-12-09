import React, { ReactNode } from 'react';
import { AppProvider } from './AppProvider';
import { UserProvider } from '@auth0/nextjs-auth0/client';
// import { AuthProvider } from './AuthProvider';

interface ProviderWrapperProps {
    children: ReactNode;
}

const ProviderWrapper: React.FC<ProviderWrapperProps> = ({ children }) => {
    return (
        // <AuthProvider>
        <UserProvider>
            <AppProvider>
                {children}
            </AppProvider>
        </UserProvider>
        // </AuthProvider>
    );
};

export default ProviderWrapper;