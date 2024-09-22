'use client'

import { DarkModeOutlined, LightModeOutlined, GitHub, MailOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import Link from 'next/link';
import styles from "./Header.module.css";
import { useThemeContext } from '../providers/ThemeProvider';

export default function Header() {
    const { isDarkMode, setIsDarkMode } = useThemeContext();
    return (
        <header className={styles.header}>
            <nav className={styles.headerLeading}>
                <Link className={styles.navLink} href={'/'}><h2>Machine Name</h2></Link>
                <Link className={styles.navLink} href={'/projects'}><h2>Projects</h2></Link>
            </nav>
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
                    <IconButton>
                        <MailOutlined className={styles.icon} />
                    </IconButton>
                </Link>
            </div>
        </header>
    );
}