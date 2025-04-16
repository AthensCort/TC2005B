'use client'
import React from "react";

const LandingPage = () => {
  const handleClick = () => {
    alert("¡Aquí iría la navegación, pero ahora no hace nada!");
  };

  return (
    <div className="landing">
      <header className="header">
        <div className="logo">LeadFlow</div>
        <nav className="nav">
          <button className="nav-button" onClick={handleClick}>Login</button>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-content">
          <h1>Empower Your Workflow</h1>
          <p>LeadFlow helps your team organize, collaborate, and grow.</p>
          <button className="cta-button" onClick={handleClick}>Get Started</button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
