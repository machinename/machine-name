// 'use client'

// import { GitHub, MailOutlined } from '@mui/icons-material';
// import { IconButton } from '@mui/material';
// import Link from 'next/link';
// import styles from "./Header.module.css";
// export default function Header() {
//     return (
//         <header className={styles.header}>
//             <nav className={styles.headerLeading}>
//                 <Link className={styles.navLink} href={'/'}>Machine Name</Link>
//                 <Link className={styles.navLink} href={'/projects'}>Projects</Link>
//             </nav>
//             <nav
//                 className={styles.headerTrailing}>
//                 <Link href={'https://github.com/machinename'} target="_blank" rel="noopener noreferrer">
//                     <IconButton id='icon'>
//                         <GitHub

//                         />
//                     </IconButton>
//                 </Link>
//                 <Link href="mailto:support@machinename.dev?subject=Support%20Request&body=Please%20describe%20your%20issue%20in%20detail.">
//                     <IconButton id='icon'>
//                         <MailOutlined

//                         />
//                     </IconButton>
//                 </Link>
//             </nav>
//         </header>
//     );
// }

'use client';

import React, { Suspense, useEffect, useRef, useState } from 'react';
import {
    usePathname,
    // useSearchParams, 
} from 'next/navigation';

import Link from 'next/link';
import {
    AccountBoxOutlined, Circle, CircleOutlined, Close, LoginOutlined,
    LogoutOutlined, MenuOpen,
    HelpCenter,
    HelpCenterOutlined,
    Home,
    HomeOutlined,
    // Settings,
    // SettingsOutlined
} from '@mui/icons-material';

import { useAuthContext } from '../providers/AuthProvider';
import styles from "./Header.module.css";
import { StyledIconButton } from './Styled';

export default function Header() {
    const { logOut, user } = useAuthContext();

    const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);
    const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
    // const [isSettingsMenuOpen, setIsSettingsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const pathname = usePathname();
    // const router = useRouter();

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

        handleScroll();

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const getTitle = () => {
        switch (pathname) {
            case '/account':
                return 'Account';
            case '/help':
                return 'Help';
            case '/':
                return 'MACHINE NAME';
            default:
                return 'MACHINE NAME';
        }
    };

    if (pathname === '/login') {
        return null;
    }

    return (
        <Suspense>
            <header className={isScrolled ? styles.headerScrolled : styles.header}>
                {/* Nav Leading */}
                <div className={styles.headerLeading}>
                    <div className={styles.navAnchor}>
                        <StyledIconButton ref={navButtonRef} onClick={() => setIsNavMenuOpen(prev => !prev)}>
                            {isNavMenuOpen ? <Close /> : <MenuOpen />}
                        </StyledIconButton>
                        {isNavMenuOpen && (
                            <nav className={styles.menu} ref={navMenuRef}>
                                <Link className={pathname === '/' ? styles.navLinkActive : styles.navLink} href='/'>
                                    {pathname === '/' ? <Home /> : <HomeOutlined />} Home
                                </Link>
                                <Link className={pathname === '/help' ? styles.navLinkActive : styles.navLink} href='/help'>
                                    {pathname === '/help' ? <HelpCenter /> : <HelpCenterOutlined />} Help
                                </Link>
                            </nav>
                        )}
                    </div>
                    <div className={styles.headerTitle}>
                        <p>{getTitle()}</p>
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
                        <StyledIconButton ref={accountButtonRef} onClick={() => setIsAccountMenuOpen(prev => !prev)}>
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
                                    <Link className={styles.navLink} href='/' onClick={handleLogOut}>
                                        <LogoutOutlined /> Log Out
                                    </Link>
                                ) : (
                                    <Link className={styles.navLink} href='/login' onClick={() => setIsAccountMenuOpen(false)}>
                                        <LoginOutlined /> Login
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