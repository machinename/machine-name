'use client'

import Link from "next/link";
import styles from "../page.module.css";
import { useThemeContext } from "../providers/ThemeProvider";

export default function Projects() {
    
    const { isDarkMode } = useThemeContext();

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <h1>Machine Name Projects</h1>
                <Link href={'https://github.com/machinename/'} target="_blank" rel="noopener noreferrer" className={isDarkMode ? styles.linkDark : styles.link}>Machine Name GitHub</Link>
                <Link href={'https://www.papertake.io/'} target="_blank" rel="noopener noreferrer" className={isDarkMode ? styles.linkDark : styles.link}>Paper Take</Link>
            </div>
        </div>
    );
}