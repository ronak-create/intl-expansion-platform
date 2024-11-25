import React from "react";
import { Link } from "react-router-dom";
import "./css/LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title animate-slide-in">Welcome to RBAC App</h1>
          <p className="hero-subtitle animate-fade-in">
            Unlock a world of possibilities with cutting-edge features.
          </p>
          <div className="hero-buttons">
            <Link to="/register" className="btn btn-primary btn-animate">
              Get Started
            </Link>
            <Link to="/login" className="btn btn-outline-light btn-animate">
              Login
            </Link>
          </div>
        </div>
      </div>
      <div className="features-section">
        <h2 className="section-title">Why Choose Us?</h2>
        <div className="features-container">
          <div className="feature-card">
            <i className="bi bi-lightning-charge-fill feature-icon"></i>
            <h3>Fast Performance</h3>
            <p>Experience lightning-fast speeds and seamless usability.</p>
          </div>
          <div className="feature-card">
            <i className="bi bi-shield-check feature-icon"></i>
            <h3>Secure</h3>
            <p>We prioritize your security with state-of-the-art encryption.</p>
          </div>
          <div className="feature-card">
            <i className="bi bi-person-heart feature-icon"></i>
            <h3>User-Friendly</h3>
            <p>A beautiful, intuitive interface designed for everyone.</p>
          </div>
        </div>
      </div>
      <footer className="footer">
        <p>© 2024 Our App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
