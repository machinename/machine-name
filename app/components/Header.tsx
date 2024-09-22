'use client'

import { DarkModeOutlined, LightModeOutlined, GitHub, MailOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import Link from 'next/link';
import styles from "./Header.module.css";
// import {
//     useEffect,
//     useRef,
//     useState,
// } from 'react';
import { useThemeContext } from '../providers/ThemeProvider';

export default function Header() {
    const { isDarkMode, setIsDarkMode } = useThemeContext();
    // const [isProjectMenuOpen, setIsProjectMenuOpen] = useState(false);
    // const projectMenuRef = useRef<HTMLDivElement>(null);
    // const projectLinkRef = useRef<HTMLDivElement>(null);

    // useEffect(() => {

    //     const handleClickOutside = (event: MouseEvent) => {
    //         if (projectMenuRef.current && !projectMenuRef.current.contains(event.target as Node) && projectLinkRef.current && !projectLinkRef.current.contains(event.target as Node)) {
    //             setIsProjectMenuOpen(false);
    //         }
    //     };

    //     document.addEventListener('mousedown', handleClickOutside);
    //     return () => {
    //         document.removeEventListener('mousedown', handleClickOutside);
    //     };
    // }, []);

    return (
        <header className={styles.header}>
            {/* Nav Leading */}
            <nav className={styles.headerLeading}>
                <Link className={styles.navLink} href={'/'}><h2>Machine Name</h2></Link>
                <Link className={styles.navLink} href={'/projects'}><h2>Projects</h2></Link>
                {/* <div>
                    <div className={styles.navLink} ref={projectLinkRef} onClick={() => setIsProjectMenuOpen(!isProjectMenuOpen)}>Projects</div>
                    {
                        isProjectMenuOpen &&
                        (
                            <div
                                className={styles.projectMenu}
                                ref={projectMenuRef}
                            >
                                <Link className={styles.navLink} href='https://www.nestanote.com/' onClick={() => setIsProjectMenuOpen(false)} target="_blank" rel="noopener noreferrer">
                                    Nesta Note
                                </Link>
                            </div>
                        )
                    }
                </div> */}
            </nav>
            {/* Nav Trailing*/}
            <div
                className={styles.headerTrailing}>
                {
                    isDarkMode ?
                        <IconButton onClick={() => setIsDarkMode(false)}>
                            <LightModeOutlined className={styles.icon} />
                        </IconButton> :
                        <IconButton onClick={() => setIsDarkMode(true)}>
                            <DarkModeOutlined className={styles.icon} />
                        </IconButton>
                }
                <Link href={'https://github.com/machinename'} target="_blank" rel="noopener noreferrer">
                    <IconButton>
                        <GitHub className={styles.icon} />
                    </IconButton>
                </Link>
                <Link href="mailto:support@machinename.dev?subject=Support%20Request&body=Please%20describe%20your%20issue%20in%20detail.">
                    <IconButton className={styles.icon}>
                        <MailOutlined />
                    </IconButton>
                </Link>
            </div>
        </header>
    );
}