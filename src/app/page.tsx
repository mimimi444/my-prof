import styles from "./page.module.css";
import DoPost from "@/components/doPost";
import Memo from "@/components/memo";


export default async function Home() {

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
        <DoPost />
        <Memo />
      </main>
      <footer className={styles.footer}>
        <div>Footer</div>
      </footer>
    </div>
  );
}
