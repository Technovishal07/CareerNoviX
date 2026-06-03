import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section className="heroSection">
      <div className="hero-container">
        <div className="hero-content">
          <h1>
            <span className="main-blue">Career</span>
            <span className="main-orange">Nova</span>
          </h1>

          <h2>Transform Your Career Future</h2>

          <p>
            Discover thousands of opportunities and connect with top employers.
            Build your future with confidence.
          </p>

          <button
            className="hero-btn"
            onClick={() => navigate("/job/getall")}
          >
            Explore Jobs
          </button>
        </div>

        <div className="hero-image">
          <img src="/hero.png" alt="CareerNova" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;