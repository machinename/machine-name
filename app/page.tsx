import Link from "next/link";
import styles from "./page.module.css";
import { Button } from "@mui/material";

export default function Home() {
  return (
    <main className={styles.pageHome}>
      <div className={styles.wrapper}>
        <h2>Deploy ML Models with Ease</h2>
        <p>Upload your machine learning model and get a live API in seconds.</p>
        <Button><Link href="/dashboard">Get Started</Link></Button>
      </div>
    </main>
  );
}
