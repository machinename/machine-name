'use client'

import Link from "next/link";
import styles from "../page.module.css";
import { useThemeContext } from "../providers/ThemeProvider";

export default function Projects() {
    
    const { isDarkMode } = useThemeContext();

    return (
        <div className={styles.page}>
            <div className={styles.projects}>
                <h1>Machine Name Projects</h1>
                <Link href={'https://www.nestanote.com/'} target="_blank" rel="noopener noreferrer" className={isDarkMode ? styles.linkDark : styles.link}><h2>Nesta Note</h2></Link>
                <Link href={'https://github.com/machinename/mini_ml'} target="_blank" rel="noopener noreferrer" className={isDarkMode ? styles.linkDark : styles.link}><h2>Mini ML</h2></Link>
            </div>
        </div>
    );
}