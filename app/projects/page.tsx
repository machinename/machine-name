'use client'

import Link from "next/link";
import styles from "../page.module.css";

export default function Projects() {
    
    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <Link href={'https://github.com/machinename/'} target="_blank" rel="noopener noreferrer" className={styles.navLink}>Machine Name GitHub</Link>
                <Link href={'https://papertake.io/'} target="_blank" rel="noopener noreferrer" className={styles.navLink}>Paper Take</Link>
            </div>
        </div>
    );
}