import React from "react";
import { FaWhatsapp, FaEnvelope, FaPhoneAlt , FaMapMarkerAlt } from "react-icons/fa";

const ContactSection = () => {
  return (
    <section className="contact-section">
      <div className="contact-container">
        <h2>Get In Touch</h2>
        <p className="contact-subtitle">
          Multiple ways to connect with our team. Choose what works best for
          you.
        </p>

        <div className="contact-cards">
          {/* WhatsApp */}
          <div className="contact-card">
            <div className="icon-box">
              <FaWhatsapp />
            </div>

            <h3>WhatsApp</h3>
            <p>Chat with us instantly</p>

            <a
              href="https://wa.me/917563059545"
              target="_blank"
              rel="noopener noreferrer"
            >
              +91 7563059545
            </a>

            <span>Available 24/7</span>
          </div>

          {/* Email */}
          <div className="contact-card">
            <div className="icon-box">
              <FaEnvelope />
            </div>

            <h3>Email</h3>
            <p>Send your inquiry</p>

            <a href="mailto:info@careernova.com">info@careernova.com</a>

            <span>Response in 24h</span>
          </div>

          {/* Call */}
          <div className="contact-card">
            <div className="icon-box">
              <FaPhoneAlt />
            </div>

            <h3>Call Us</h3>
            <p>Schedule a call</p>

            <a href="tel:+917563059545">+91 7563059545</a>

            <span>Mon-Fri 9AM-6PM</span>
          </div>

          <div className="contact-card">
            <div className="icon-box">
              <FaMapMarkerAlt />
            </div>

            <h3>Visit Us</h3>
            <p>Our headquarters</p>

            <a
              href="https://maps.google.com/?q=Muzaffarpur,Bihar,India"
              target="_blank"
              rel="noopener noreferrer"
            >
              Muzaffarpur, Bihar, India
            </a>

            <span>Global team</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
