import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.ttl}>わたしについて</h1>
        <section className={styles.column2}>
          <div className={styles.img}>img</div>
          <div>
            <h2 className={styles.ttl}>Mizuki Kawamura</h2>
            <div>
              WEBデザイナー / ディレクター / BPRディレクター
            </div>
          </div>
        </section>
      </main>
      <footer className={styles.footer}>
        <div>Footer</div>
      </footer>
    </div>
  );
}
