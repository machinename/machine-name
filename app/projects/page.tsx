import Link from "next/link";
import styles from "../page.module.css";

export default function Projects() {
    return (
        <div className={styles.page}>
            <div className={styles.wrapper}>
                <h1>Projects</h1>
                <Link href={'https://www.papertake.io/'}
                    target="_blank"
                    rel="noopener noreferrer"><h2>PaperTake.io</h2>
                </Link>
            </div>
        </div>
    );
}