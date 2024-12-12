import Link from "next/link";
import styles from "../page.module.css";

export default function Projects() {
    return (
        <div className={styles.page}>
            <div className={styles.wrapper}>
                <h1>Projects</h1>
                <Link href='https://github.com/machinename/' target="_blank" rel="noopener noreferrer">
                    <h2>GitHub</h2>
                </Link>
                <Link href='https://www.papertake.io/' target="_blank" rel="noopener noreferrer">
                    <h2>Paper Take</h2>
                </Link>
            </div>
        </div>
    );
}