'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
    usePathname,
} from 'next/navigation';

import Link from 'next/link';
import {
    AccountBoxOutlined, Close, LoginOutlined,
    LogoutOutlined,
    MenuOpen,
    Dashboard,
    DashboardOutlined,
    Home,
    HomeOutlined,
    AccountTreeOutlined,
    AccountTree,
    AccountCircle,
    GitHub,
    // Settings,
    // SettingsOutlined
} from '@mui/icons-material';

import { useAuthContext } from '../../providers/AuthProvider';
import styles from "./Header.module.css";
import { StyledIconButton } from '../Styled';
import { CircularProgress } from '@mui/material';

export default function Header() {
    const {
        isAuthLoading,
        logOut,
        user } = useAuthContext();

    const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);
    const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
    // const [isSettingsMenuOpen, setIsSettingsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const pathname = usePathname();

    const accountMenuRef = useRef<HTMLDivElement>(null);
    const accountButtonRef = useRef<HTMLButtonElement>(null);
    const navMenuRef = useRef<HTMLDivElement>(null);
    const navButtonRef = useRef<HTMLButtonElement>(null);
    const settingsMenuRef = useRef<HTMLDivElement>(null);
    const settingsButtonRef = useRef<HTMLButtonElement>(null);

    const handleLogOut = async () => {
        try {
            await logOut();
            setIsAccountMenuOpen(false);
        } catch (error) {
            console.log(error);
        }
    };

    const getTitle = () => {
        switch (pathname) {
            case '/':
                return 'MACHINENAME.DEV';
            case '/dashboard':
                return 'Dashboard';
            case '/projects':
                return 'Projects';
            default:
                return 'MACHINENAME.DEV';
        };
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (navMenuRef.current && !navMenuRef.current.contains(event.target as Node)) {
                if (!navButtonRef.current?.contains(event.target as Node)) {
                    setIsNavMenuOpen(false);
                }
            }
            if (accountMenuRef.current && !accountMenuRef.current.contains(event.target as Node)) {
                if (!accountButtonRef.current?.contains(event.target as Node)) {
                    setIsAccountMenuOpen(false);
                }
            }
            // if (settingsMenuRef.current && !settingsMenuRef.current.contains(event.target as Node)) {
            //     if (!settingsButtonRef.current?.contains(event.target as Node)) {
            //         setIsSettingsMenuOpen(false);
            //     }
            // }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [accountButtonRef, accountMenuRef, navButtonRef, navMenuRef, settingsButtonRef, settingsMenuRef]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <header className={isScrolled ? styles.headerScrolled : styles.header}>
            <div className={styles.headerLeading}>
                <div className={styles.navAnchor}>
                    <StyledIconButton ref={navButtonRef}
                        disableTouchRipple={true}
                        onClick={() => setIsNavMenuOpen(prev => !prev)}>
                        {isNavMenuOpen ? <Close /> : <MenuOpen />}
                    </StyledIconButton>
                    {isNavMenuOpen && (
                        <nav className={styles.menu} ref={navMenuRef}>
                            <Link className={pathname === '/' ? styles.navLinkActive : styles.navLink} href='/'>
                                {pathname === '/' ? <Home /> : <HomeOutlined />}Home
                            </Link>
                            <Link className={pathname === '/dashboard' ? styles.navLinkActive : styles.navLink} href='/dashboard'>
                                {pathname === '/dashboard' ? <Dashboard /> : <DashboardOutlined />}Dashboard
                            </Link>
                            <Link className={pathname === '/projects' ? styles.navLinkActive : styles.navLink} href='/projects'>
                                {pathname === '/projects' ? <AccountTree /> : <AccountTreeOutlined />}Projects
                            </Link>
                        </nav>
                    )}
                </div>
                <div className={styles.headerTitle}>
                    <p>{getTitle()}</p>
                </div>
            </div>
            <div className={styles.headerTrailing}>
                {
                    isAuthLoading && (
                        <StyledIconButton>
                            <CircularProgress size={20} />
                        </StyledIconButton>
                    )
                }
                {/* <div className={styles.settingsAnchor}>
                        <StyledIconButton
                            ref={settingsButtonRef}
                            onClick={() => setIsSettingsMenuOpen(prev => !prev)}>
                            {isSettingsMenuOpen ? <Settings /> : <SettingsOutlined />}
                        </StyledIconButton>
                        {isSettingsMenuOpen && (
                            <nav className={styles.menu} ref={settingsMenuRef}>
                                <div className={styles.navLink}>
                                    Todo - Settings Menu
                                </div>
                                <div className={styles.navLink}>
                                    Todo - Project
                                </div>
                                <div className={styles.navLink}>
                                    Todo - Drag Drop Grid
                                </div>
                                <div className={styles.navLink}>
                                    Todo - Too Much
                                </div>
                            </nav>
                        )}
                    </div> */}
                <div className={styles.accountAnchor}>
                    <Link
                        href='https://github.com/machinename/'
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <StyledIconButton disableTouchRipple={true}>
                            <GitHub />
                        </StyledIconButton>
                    </Link>
                    <StyledIconButton ref={accountButtonRef}
                        disableTouchRipple={true}
                        onClick={() => setIsAccountMenuOpen(prev => !prev)}>
                        {isAccountMenuOpen ? <AccountCircle /> : <AccountCircle />}
                    </StyledIconButton>
                    {isAccountMenuOpen && (
                        <nav className={styles.menu} ref={accountMenuRef}>
                            {user && (
                                <Link className={styles.navLink}
                                    onClick={() => setIsAccountMenuOpen(false)} href='/account'>
                                    <AccountBoxOutlined /> Account
                                </Link>
                            )}
                            {user ? (
                                <Link className={styles.navLink}
                                    href='/'
                                    onClick={handleLogOut}>
                                    <LogoutOutlined /> Log Out
                                </Link>
                            ) : (
                                <Link className={styles.navLink}
                                    href='https://login.machinename.dev/?redirect=www.machinename.dev'
                                    onClick={() => setIsAccountMenuOpen(false)}>
                                    <LoginOutlined /> Log In
                                </Link>
                            )}
                        </nav>
                    )}
                </div>
            </div>
        </header>
    );
};