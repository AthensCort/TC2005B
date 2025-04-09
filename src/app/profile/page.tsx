import Sidebar from "@/components/sidebar/page";
import { FaCalendarAlt, FaPaperPlane } from "react-icons/fa";
import styles from "./page.module.css";

const Profile = () => {
  return (
    <div className={styles.profileContainer}>
      <Sidebar />

      <main className={styles.profileContent}>
        {/* Profile Details */}
        <section className={styles.profileDetails}>
          <h2 className={styles.titles}>Your Profile </h2>
          <div className={styles.profileCard}>
            <img className={styles.profilePic} src="/user.jpg" alt="Profile" />
            <div className={styles.infoGroup}>
              <label>Name</label>
              <input type="text" className={styles.input} value="João Ferreira" readOnly />
            </div>
            <div className={styles.infoGroup}>
              <label>Birth</label>
              <div className={styles.datePicker}>
                <input type="text" className={styles.input} value="Title" readOnly />
                <FaCalendarAlt className={styles.icon} />
              </div>
            </div>
            <div className={styles.infoGroup}>
              <label>Email</label>
              <input type="email" className={styles.input} value="Example@gmail.com" readOnly />
            </div>
            <div className={styles.infoGroup}>
              <label>Phone Number</label>
              <input type="text" className={styles.input} value="+52 81 1234 5678" readOnly />
            </div>
            <div className={styles.infoGroup}>
              <label>Age</label>
              <input type="text" className={styles.input} value="42" readOnly />
            </div>
            <div className={styles.messageBox}>
              <textarea className={styles.textarea}  placeholder="Type message..." />
              <FaPaperPlane className={styles.sendIcon} />
            </div>
          </div>
        </section>

        {/* Profile Preview */}
        <section className={styles.profilePreview}>
        <h2 className={styles.titles}>Preview</h2>
          <div className={styles.previewCard}>
            <div className={styles.previewHeader}>
              <div className={styles.logo}>J</div>
              <div className={styles.actions}>
                <span className={styles.icon}>🔄</span>
                <span className={styles.icon}>⚙️</span>
              </div>
            </div>
            <p className={styles.recipient}>RECIPIENT</p>
            <p>João Ferreira</p>
            <p>4340 Liberty Avenue</p>
            <p>92880 Tustin, CA</p>
            <p>VAT no.: 123456789</p>
            <p className={styles.contact}>📧 Example@gmail.com</p>
            <p className={styles.contact}>📞 +52 81 1234 5678</p>
            <h3>Invoice</h3>
            <p>Invoice no. 000123</p>
            <p>Invoice date: January 1, 2021</p>
          </div>
          <div className={styles.profileInfo}>
            <h3>Work</h3>
            <p>Sales Manager at a technology company in Brazil</p>
            <h3>Needs and preferences:</h3>
            <p>Would like integration with external tools such as Excel or Google Sheets.</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Profile;