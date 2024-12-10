'use client';

import React, { Suspense, useEffect, useRef, useState } from 'react';
import {
    usePathname,
    // useSearchParams, 
} from 'next/navigation';

import Link from 'next/link';
import {
    AccountBoxOutlined, Circle, CircleOutlined, Close, LoginOutlined,
    LogoutOutlined,
    MenuOpen,
    Dashboard,
    DashboardOutlined,
    HelpCenter,
    HelpCenterOutlined,
    // Settings,
    // SettingsOutlined
} from '@mui/icons-material';

import { useAuthContext } from '../../providers/AuthProvider';
import styles from "./Header.module.css";
import { StyledIconButton } from '../Styled';

export default function Header() {
    const { 
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
                // document.body.classList.remove('hide-scrollbar');
            } else {
                setIsScrolled(false);
                // document.body.classList.add('hide-scrollbar');
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <Suspense>
            <header className={isScrolled ? styles.headerScrolled : styles.header}>
                {/* Nav Leading */}
                <div className={styles.headerLeading}>
                    <div className={styles.navAnchor}>
                        <StyledIconButton ref={navButtonRef}

                            disableTouchRipple={true}
                            onClick={() => setIsNavMenuOpen(prev => !prev)}>
                            {isNavMenuOpen ? <Close /> : <MenuOpen />}
                        </StyledIconButton>
                        {isNavMenuOpen && (
                            <nav className={styles.menu} ref={navMenuRef}>
                                <Link className={pathname === '/dashboard' ? styles.navLinkActive : styles.navLink} href='/dashboard'>
                                    {pathname === '/dashboard' ? <Dashboard /> : <DashboardOutlined />}Dashboard
                                </Link>
                                <Link className={pathname === '/help' ? styles.navLinkActive : styles.navLink} href='/help'>
                                    {pathname === '/help' ? <HelpCenter /> : <HelpCenterOutlined />}Help
                                </Link>
                            </nav>
                        )}
                    </div>
                    <div className={styles.headerTitle}>
                        <Link href='/'>MACHINENAME.DEV</Link>
                    </div>
                </div>
                {/* Nav Trailing */}
                <div className={styles.headerTrailing}>
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
                        <StyledIconButton ref={accountButtonRef}
                            disableTouchRipple={true}
                            onClick={() => setIsAccountMenuOpen(prev => !prev)}>
                            {isAccountMenuOpen ? <Circle /> : <CircleOutlined />}
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
                                        href='https://login.machinename.dev/?redirect=/www.machinename.dev' 
                                        onClick={() => setIsAccountMenuOpen(false)}>
                                        <LoginOutlined /> Log In
                                    </Link>
                                )}
                            </nav>
                        )}
                    </div>
                </div>
            </header>
        </Suspense>
    );
}