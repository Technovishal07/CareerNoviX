import React, { useContext, useState, useCallback, useMemo, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai"; 
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { Context } from "../../main";

const API_BASE_URL = import.meta.env?.VITE_API_URL || "http://localhost:4000";
const CONTACT_NUMBER = "+917563059545";

const getNavConfig = (isEmployer) => [
  { to: "/", label: "Home" },
  { to: "/job/getall", label: "All Jobs" },
  { to: "/applications/me", label: isEmployer ? "Applications" : "My Applications" },
  ...(isEmployer ? [
    { to: "/job/post", label: "Post Job" },
    { to: "/job/me", label: "My Jobs" }
  ] : [])
];

const NavItem = React.memo(({ to, label, onClick }) => (
  <li className="navbar__item">
    <Link to={to} className="navbar__link" onClick={onClick}>
      {label}
    </Link>
  </li>
));
NavItem.displayName = "NavItem";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const navigate = useNavigate();

  const toggleMenu = useCallback(() => setIsMenuOpen((prev) => !prev), []);
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);
  useEffect(() => {
    const body = document.body;
    const html = document.documentElement;

    if (isMenuOpen) {
      body.classList.add("scroll-lock");
      html.classList.add("scroll-lock");
    } else {
      body.classList.remove("scroll-lock");
      html.classList.remove("scroll-lock");
    }

    return () => {
      body.classList.remove("scroll-lock");
      html.classList.remove("scroll-lock");
    };
  }, [isMenuOpen]);

  const isEmployer = user?.role === "Employer";
  const navLinks = useMemo(() => getNavConfig(isEmployer), [isEmployer]);

  if (!isAuthorized) return null;

  const handleLogout = async () => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/api/v1/user/logout`, {
        withCredentials: true,
      });
      toast.success(data?.message || "Logged out successfully");
      setIsAuthorized(false);
      navigate("/login");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Logout failed.");
    } finally {
      closeMenu();
    }
  };

  return (
    <nav className="navbar" role="navigation" aria-label="Main Navigation">
      <div className="navbar__container">
        <div className="navbar__logo">
          <Link to="/" onClick={closeMenu}>
            <img src="/logo.png" alt="ApanaTime Logo" loading="eager" />
          </Link>
        </div>

        <button 
          type="button" 
          className={`navbar__hamburger ${isMenuOpen ? "navbar__hamburger--active" : ""}`} 
          onClick={toggleMenu} 
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
        >
          {isMenuOpen ? <AiOutlineClose /> : <GiHamburgerMenu />}
        </button>

        <div className={`navbar__menu-wrapper ${isMenuOpen ? "navbar__menu-wrapper--active" : ""}`}>
          
          <ul className="navbar__menu">
            {navLinks.map((link) => (
              <NavItem key={link.to} to={link.to} label={link.label} onClick={closeMenu} />
            ))}
          </ul>
          <div className="navbar__drawer-actions">
            <div className="navbar__drawer-icons">
              <a href={`tel:${CONTACT_NUMBER}`} aria-label="Call Support">
                <FaPhoneAlt />
              </a>
              <a href={`https://wa.me/${CONTACT_NUMBER.replace('+', '')}`} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
                <FaWhatsapp />
              </a>
            </div>
            <button type="button" className="navbar__drawer-logout" onClick={handleLogout}>
              Logout
            </button>
          </div>

        </div>
        <div className="navbar__desktop-right">
          <a href={`tel:${CONTACT_NUMBER}`} className="navbar__icon-link" aria-label="Call Support">
            <FaPhoneAlt />
          </a>
          <a href={`https://wa.me/${CONTACT_NUMBER.replace('+', '')}`} target="_blank" rel="noopener noreferrer" className="navbar__icon-link" aria-label="Chat on WhatsApp">
            <FaWhatsapp />
          </a>
          <button type="button" className="navbar__logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;