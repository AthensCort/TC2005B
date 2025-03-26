import Sidebar from "@/components/sidebar/page";
import { FaCalendarAlt, FaPaperPlane } from "react-icons/fa";
import "./page.css";


const Profile = () => {
  return (
    <div className={"profile-container"}>
      <Sidebar />

      <main className="profile-content">
        {/* Profile Details */}
        <section className="profile-details">
          <h2>Your Profile</h2>
          <div className="profile-card">
            <img className="profile-pic" src="/user.jpg" alt="Profile" />
            <div className="info-group">
              <label>Name</label>
              <input type="text" value="João Ferreira" readOnly />
            </div>
            <div className="info-group">
              <label>Birth</label>
              <div className="date-picker">
                <input type="text" value="Title" readOnly />
                <FaCalendarAlt className="icon" />
              </div>
            </div>
            <div className="info-group">
              <label>Email</label>
              <input type="email" value="Example@gmail.com" readOnly />
            </div>
            <div className="info-group">
              <label>Phone Number</label>
              <input type="text" value="+52 81 1234 5678" readOnly />
            </div>
            <div className="info-group">
              <label>Age</label>
              <input type="text" value="42" readOnly />
            </div>
            <div className="message-box">
              <textarea placeholder="Type message..." />
              <FaPaperPlane className="send-icon" />
            </div>
          </div>
        </section>

        {/* 🚀 Aquí está el bloque que faltaba */}
        <section className="profile-preview">
          <h2>Preview</h2>
          <div className="preview-card">
            <div className="preview-header">
              <div className="logo">J</div>
              <div className="actions">
                <span className="icon">🔄</span>
                <span className="icon">⚙️</span>
              </div>
            </div>
            <p className="recipient">RECIPIENT</p>
            <p>João Ferreira</p>
            <p>4340 Liberty Avenue</p>
            <p>92880 Tustin, CA</p>
            <p>VAT no.: 123456789</p>
            <p className="contact">📧 Example@gmail.com</p>
            <p className="contact">📞 +52 81 1234 5678</p>
            <h3>Invoice</h3>
            <p>Invoice no. 000123</p>
            <p>Invoice date: January 1, 2021</p>
          </div>
          <div className="profile-info">
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
