import React from "react";
import {
  FaMobileAlt,
  FaGlobe,
  FaPalette,
  FaRobot,
  FaChartLine,
  FaDatabase,
  FaGamepad,
  FaShieldAlt,
  FaArrowRight,
} from "react-icons/fa";

const Services = () => {
  return (
    <section className="services">
      <div className="services-header">
        <h2>Our Services</h2>
        <p>
          Comprehensive technology solutions designed to accelerate your
          business growth
        </p>
      </div>

      <div className="services-grid">
        {/* Card 1 */}
        <div className="service-card">
          <div className="service-title">
            <FaMobileAlt className="service-icon" />
            <h3>Mobile Development</h3>
          </div>

          <p>
            Native iOS and Android apps, cross-platform solutions with React
            Native and Flutter
          </p>

          <ul>
            <li>iOS & Android Native</li>
            <li>Cross-platform Development</li>
            <li>App Store Optimization</li>
            <li>Performance Optimization</li>
          </ul>

          <button>
            Learn More <FaArrowRight />
          </button>
        </div>

        {/* Card 2 */}
        <div className="service-card">
          <div className="service-title">
            <FaGlobe className="service-icon" />
            <h3>Web Development</h3>
          </div>

          <p>
            Modern web applications, e-commerce platforms, and progressive web
            apps
          </p>

          <ul>
            <li>React/Next.js Applications</li>
            <li>E-commerce Solutions</li>
            <li>Progressive Web Apps</li>
            <li>API Development</li>
          </ul>

          <button>
            Learn More <FaArrowRight />
          </button>
        </div>

        {/* Card 3 */}
        <div className="service-card">
          <div className="service-title">
            <FaPalette className="service-icon" />
            <h3>Dashboard Design</h3>
          </div>

          <p>
            Beautiful, intuitive dashboards and admin panels that users love to
            interact with
          </p>

          <ul>
            <li>UI/UX Design</li>
            <li>Interactive Dashboards</li>
            <li>Data Visualization</li>
            <li>Responsive Design</li>
          </ul>

          <button>
            Learn More <FaArrowRight />
          </button>
        </div>

        {/* Card 4 */}
        <div className="service-card">
          <div className="service-title">
            <FaRobot className="service-icon" />
            <h3>AI Chatbots</h3>
          </div>

          <p>
            Intelligent conversational AI powered by the latest language models
          </p>

          <ul>
            <li>Custom Chatbots</li>
            <li>Natural Language Processing</li>
            <li>Multi-platform Integration</li>
            <li>24/7 Customer Support</li>
          </ul>

          <button>
            Learn More <FaArrowRight />
          </button>
        </div>

        {/* Card 5 */}
        <div className="service-card">
          <div className="service-title">
            <FaChartLine className="service-icon" />
            <h3>ML Prediction Models</h3>
          </div>

          <p>
            Custom machine learning models trained on your data for accurate
            predictions
          </p>

          <ul>
            <li>Predictive Analytics</li>
            <li>Custom Model Training</li>
            <li>Real-time Predictions</li>
            <li>Model Optimization</li>
          </ul>

          <button>
            Learn More <FaArrowRight />
          </button>
        </div>

        {/* Card 6 */}
        <div className="service-card">
          <div className="service-title">
            <FaDatabase className="service-icon" />
            <h3>Data Analytics</h3>
          </div>

          <p>
            Transform raw data into actionable insights with advanced analytics
            solutions
          </p>

          <ul>
            <li>Business Intelligence</li>
            <li>Real-time Analytics</li>
            <li>Custom Reporting</li>
            <li>Data Visualization</li>
          </ul>

          <button>
            Learn More <FaArrowRight />
          </button>
        </div>

        {/* Card 7 */}
        <div className="service-card">
          <div className="service-title">
            <FaGamepad className="service-icon" />
            <h3>Game Development</h3>
          </div>

          <p>
            End-to-end 2D/3D game development for mobile, web, and desktop
            platforms
          </p>

          <ul>
            <li>Unity & Unreal</li>
            <li>2D/3D Art & Animation</li>
            <li>Mobile & Web Build</li>
            <li>LiveOps & Analytics</li>
          </ul>

          <button>
            Learn More <FaArrowRight />
          </button>
        </div>

        {/* Card 8 */}
        <div className="service-card">
          <div className="service-title">
            <FaShieldAlt className="service-icon" />
            <h3>Cybersecurity Solutions</h3>
          </div>

          <p>
            Protect your digital assets with comprehensive security strategies
            and assessments
          </p>

          <ul>
            <li>Web App Security</li>
            <li>Mobile App Protection</li>
            <li>Vulnerability Assessment</li>
            <li>Penetration Testing</li>
          </ul>

          <button>
            Learn More <FaArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;
