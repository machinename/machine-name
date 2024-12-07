'use client'

import Link from "next/link";
import styles from "./page.module.css";
import { StyledTextButton } from "./components/Styled";

export default function Home() {
  return (
    <main className={styles.page}>
      <div className={styles.wrapper}>
        <h1>Deploy ML Models with Ease</h1>
        <p>Upload your machine learning model and get a live API in seconds.</p>
        <StyledTextButton
        disableRipple={true}
        ><Link href="/dashboard">Get Started</Link></StyledTextButton>
      </div>
    </main>
  );
}