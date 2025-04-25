import styles from "./page.module.css";
import Sidebar from "@/components/sidebar/page";

const Dashboard = () => {
  return (
    <div className={styles.container}>
        <Sidebar/>
      <main className={styles.main}>
        <header className={styles.header}>
          <h1>Dashboard</h1>
          <button className={styles.dateButton}>Feb 2025 ▼</button>
        </header>
        <section className={styles.statsGrid}>
          <div className={styles.statCard}>99+ Total Contacts</div>
          <div className={styles.statCard}>4 On Going</div>
          <div className={styles.statCard}>8 Unaccomplished</div>
          <div className={styles.statCard}>12 Accomplished</div>
        </section>
        <section className={styles.contentGrid}>
          <div className={styles.chart}>Monthly Status Chart</div>
          <div className={styles.analytics}>Analytics Chart</div>
          <div className={styles.transactions}>Transaction Status Table</div>
          <div className={styles.contacts}>Recent Contacts</div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
