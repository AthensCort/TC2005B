'use client'
import React from "react";
import './page.css'; // Tu CSS con los gradientes y estilos

const LandingPage = () => {
  const handleClick = () => {
    alert("¡Aquí iría la navegación, pero ahora no hace nada!");
  };

  return (
    <div className="landing">
      <header className="header">
        <div className="logo">Logoipsum</div>
        <nav className="nav">
          <button className="nav-button" onClick={handleClick}>Sign in</button>
          <button className="nav-button" onClick={handleClick}>Create Account</button>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-content">
          <h1>
            Discover <span>Characters</span> in Pixi-World
          </h1>
          <p>
            We believe the world is more beautiful as each person gets better.
            We believe the world is more beautiful as each person gets better.
            Person gets better.
          </p>
          <button className="cta-button" onClick={handleClick}>
            Get Started for Free
          </button>
        </div>
      </section>


      <section className="collab-section">
  <div className="collab-content">
    <div className="collab-graphic">
      {/* Aquí podrías poner una imagen o figuras SVG tipo órbita */}
      <img src="/your-orbit-image.png" alt="Orbit Illustration" />
    </div>
    <div className="collab-text">
      <h2><span>Connect</span> & Collaborate</h2>
      <p>
        Join forces and share your creativity with the Pixi-World community.
        Upload your characters, exchange ideas and build something awesome together.
      </p>
      <button className="collab-button">Start Collaborating 🚀</button>
    </div>
  </div>
</section>



      <footer className="footer">
        <div className="footer-section">
          <div className="footer-logo">Logoipsum</div>
          <p>
            Insurance is too complicated. Draft understands its customers and makes the process simple for them.
          </p>
          <button className="footer-button" onClick={handleClick}>Ask Question</button>
        </div>

        <div className="footer-links">
          <div>
            <h4>Community</h4>
            <ul>
              <li>For Talents</li>
              <li>For Companies</li>
              <li>Facebook Group</li>
              <li>FAQ</li>
            </ul>
          </div>
          <div>
            <h4>About us</h4>
            <ul>
              <li>Meet the Team</li>
              <li>Our Story</li>
              <li>Career</li>
            </ul>
          </div>
          <div>
            <h4>Contacts</h4>
            <p>Feel free to get in touch with us via phone or send us a message.</p>
            <p className="contact-link">+1-301-340-3946</p>
            <p className="contact-link">info@draft.com</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© Draft 2021, All Rights Reserved.</p>
          <div className="social-icons">
            <span>🐦</span>
            <span>📘</span>
            <span>🧠</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
