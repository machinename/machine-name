'use client';

import React, { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import {
    AccountTreeOutlined,
    AccountCircle,
} from '@mui/icons-material';

import { useAppContext } from '../../providers/AppProvider';
import styles from "./Header.module.css";
import { StyledButton } from '../Styled';
import { CircularProgress, IconButton, MenuItem } from '@mui/material';
import AppModal from '../AppModal/AppModal';

export default function Header() {
    const {
        appModalView,
        currentProject,
        isAppLoading,
        user,
        logOut,
        setAppModalView,
    } = useAppContext();

    const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);

    // const [isScrolled, setIsScrolled] = useState(false);

    const pathname = usePathname();
    const router = useRouter();

    const appModalRef = useRef<HTMLDivElement>(null);
    const projectButtonRef = useRef<HTMLButtonElement>(null);
    const accountMenuRef = useRef<HTMLDivElement>(null);
    const accountButtonRef = useRef<HTMLButtonElement>(null);

    const handleAccount = () => {
        setAppModalView('account');
        setIsAccountMenuOpen(false);
    };

    const handleProjects = () => {
        setAppModalView('projects');
        setIsAccountMenuOpen(false);
    }; 

    const handleLogIn = () => {
        router.push('/login');
    };

    const handleDocs = () => {
        window.open('https://github.com/machinename/docs/wiki', '_blank');
    };

    const handleLogOut = async () => {
        try {
            await logOut();
            setIsAccountMenuOpen(false);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (appModalRef.current && !appModalRef.current.contains(event.target as Node)) {
                if (!projectButtonRef.current?.contains(event.target as Node)) {
                    setAppModalView('');
                }
            }
            if (accountMenuRef.current && !accountMenuRef.current.contains(event.target as Node)) {
                if (!accountButtonRef.current?.contains(event.target as Node)) {
                    setIsAccountMenuOpen(false);
                }
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [accountMenuRef, appModalRef, setAppModalView]);

    // useEffect(() => {
    //     const handleScroll = () => {
    //         if (window.scrollY > 0) {
    //             setIsScrolled(true);
    //         } else {
    //             setIsScrolled(false);
    //         }
    //     };
    //     window.addEventListener('scroll', handleScroll);
    //     return () => {
    //         window.removeEventListener('scroll', handleScroll);
    //     };
    // }, []);

    if (pathname === '/login') {
        return null;
    }

    return (
        <React.Fragment>
            {/* <header className={isScrolled ? styles.headerScrolled : styles.header}> */}
            <header className={styles.header}>
                <div className={styles.headerLeading}>
                    <div className={styles.headerTitle}>
                        <p>MACHINENAME.DEV</p>
                    </div>
                    <div className={styles.projectContainer}>
                        <StyledButton variant='contained'
                            onClick={handleProjects}
                            startIcon={<AccountTreeOutlined />}>
                            {currentProject ? currentProject.getName() : 'Projects...'}
                        </StyledButton>
                    </div>
                </div>
                <div className={styles.headerTrailing}>
                    {
                        isAppLoading && (
                            <CircularProgress size={20} />
                        )
                    }

                    <StyledButton onClick={handleDocs}>Docs</StyledButton>

                    <div className={styles.accountAnchor}>
                        {
                            user ? <IconButton ref={accountButtonRef}
                                disableTouchRipple={true}
                                onClick={() => setIsAccountMenuOpen(prev => !prev)}>
                                <AccountCircle />
                            </IconButton>
                                :
                                <StyledButton
                                    variant='contained'
                                    onClick={handleLogIn}
                                >Log In</StyledButton>
                        }
                        {isAccountMenuOpen && (
                            <nav className={styles.menu} ref={accountMenuRef}>
                                {user && (
                                    <React.Fragment>
                                        <MenuItem onClick={handleAccount}>Account</MenuItem>
                                        <div
                                            className={styles.navLink}
                                            onClick={handleLogOut}>
                                            Log Out
                                        </div>
                                    </React.Fragment>
                                )
                                }
                            </nav>
                        )}
                    </div>
                </div>
            </header>
            <AppModal appModalRef={appModalRef} isOpen={appModalView != ''} onClose={() => setAppModalView('')} view={appModalView}/>
        </React.Fragment>
    );
};