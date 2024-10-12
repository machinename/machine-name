'use client'

import { GitHub, MailOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import Link from 'next/link';
import styles from '../page.module.css';
export default function Header() {
    return (
        <header className={styles.header}>
            <nav className={styles.headerLeading}>
                <Link className={styles.navLink} href={'/'}>Machine Name</Link>
                <Link className={styles.navLink} href={'/projects'}>Projects</Link>
            </nav>
            <nav
                className={styles.headerTrailing}>
                <Link href={'https://github.com/machinename'} target="_blank" rel="noopener noreferrer">
                    <IconButton>
                        <GitHub/>
                    </IconButton>
                </Link>
                <Link href="mailto:support@machinename.dev?subject=Support%20Request&body=Please%20describe%20your%20issue%20in%20detail.">
                    <IconButton>
                        <MailOutlined/>
                    </IconButton>
                </Link>
            </nav>
        </header>
    );
}