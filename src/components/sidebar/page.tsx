import React from "react";
import { FaTachometerAlt, FaTasks, FaUser, FaBoxOpen, FaClipboardList } from "react-icons/fa";
import styles from "./page.module.css";

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <h2>
        LEAD<span style={{ color: "#3b82f6" }}>FLOW</span>
      </h2>
      <nav>
        <ul>
          <li className={styles.listItem}>
            <FaTachometerAlt className={styles.icon} /> Dashboard
          </li>
          <li className={styles.listItem}>
            <FaTasks className={styles.icon} /> Kanban
          </li>
          <li className={`${styles.listItem} ${styles.active}`}>
            <FaUser className={styles.icon} /> Profile
          </li>
          <li className={styles.listItem}>
            <FaBoxOpen className={styles.icon} /> Products
          </li>
          <li className={styles.listItem}>
            <FaClipboardList className={styles.icon} /> Product Name
          </li>
        </ul>
      </nav>
      <div className={styles.userInfo}>
        <img src="/user.jpg" alt="User" className={styles.userImage} />
        <p>João Ferreira</p>
        <span>Free Account</span>
      </div>
    </aside>
  );
};

export default Sidebar;
