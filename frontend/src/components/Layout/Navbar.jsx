import React, { useContext, useState, useCallback, useMemo, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

// Icons Imports
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose, AiFillHome, AiOutlineAppstore } from "react-icons/ai"; 
import { FaPhoneAlt, FaWhatsapp, FaBriefcase, FaUserShield, FaSignOutAlt } from "react-icons/fa";
import { MdPostAdd, MdLibraryBooks } from "react-icons/md";

import { Context } from "../../main";

const API_BASE_URL = import.meta.env?.VITE_API_URL || "http://localhost:4000";
const CONTACT_NUMBER = "+917563059545";

const getNavConfig = (isEmployer) => [
  { to: "/", label: "Home", icon: <AiFillHome /> },
  { to: "/job/getall", label: "All Jobs", icon: <FaBriefcase /> },
  { to: "/applications/me", label: isEmployer ? "Applications" : "My Applications", icon: <AiOutlineAppstore /> },
  ...(isEmployer ? [
    { to: "/job/post", label: "Post Job", icon: <MdPostAdd /> },
    { to: "/job/me", label: "My Jobs", icon: <MdLibraryBooks /> }
  ] : [])
];

const NavItem = React.memo(({ to, label, icon, isActive, onClick }) => (
  <li className={`navbar__item ${isActive ? "navbar__item--active" : ""}`}>
    <Link to={to} className="navbar__link" onClick={onClick}>
      <span className="navbar__icon">{icon}</span>
      <span className="navbar__label">{label}</span>
    </Link>
  </li>
));
NavItem.displayName = "NavItem";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = useCallback(() => setIsMenuOpen((prev) => !prev), []);
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  // Prevent background scroll when mobile menu is active
  useEffect(() => {
    const body = document.body;
    if (isMenuOpen) body.classList.add("scroll-lock");
    else body.classList.remove("scroll-lock");

    return () => {
      body.classList.remove("scroll-lock");
    };
  }, [isMenuOpen]);

  const isEmployer = user?.role === "Employer";
  const navLinks = useMemo(() => getNavConfig(isEmployer), [isEmployer]);

  if (!isAuthorized) return null;

  const handleLogout = async () => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/api/v1/user/logout`, { withCredentials: true });
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
        
        {/* Logo Section */}
        <div className="navbar__logo">
          <Link to="/" onClick={closeMenu}>
            <img src="/logo.png" alt="CareerNoviX Logo" />
          </Link>
        </div>

        {/* Mobile Hamburger Trigger */}
        <button 
          type="button" 
          className="navbar__hamburger" 
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation menu"
        >
          {isMenuOpen ? <AiOutlineClose /> : <GiHamburgerMenu />}
        </button>

        {/* Navigation Links and Action Items Wrapper */}
        <div className={`navbar__menu-wrapper ${isMenuOpen ? "navbar__menu-wrapper--active" : ""}`}>
          
          {/* Admin Indicator for Mobile inside menu */}
          {isEmployer && (
            <div className="navbar__role-badge navbar__role-badge--mobile">
              <FaUserShield /> <span>Employer (Admin)</span>
            </div>
          )}

          <ul className="navbar__menu">
            {navLinks.map((link) => (
              <NavItem 
                key={link.to} 
                to={link.to} 
                label={link.label} 
                icon={link.icon} 
                isActive={location.pathname === link.to}
                onClick={closeMenu} 
              />
            ))}
          </ul>

          {/* Support and Logout Section (Inside Mobile Drawer / Right side of Desktop) */}
          <div className="navbar__actions">
            {isEmployer && (
              <div className="navbar__role-badge navbar__role-badge--desktop">
                <FaUserShield /> <span>Employer Panel</span>
              </div>
            )}
            
            <div className="navbar__support">
              <a href={`tel:${CONTACT_NUMBER}`} aria-label="Call Support" className="nav-support-icon">
                <FaPhoneAlt />
              </a>
              <a href={`https://wa.me/${CONTACT_NUMBER.replace('+', '')}`} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" className="nav-support-icon nav-support-icon--wa">
                <FaWhatsapp />
              </a>
            </div>

            <button type="button" className="navbar__logout-btn" onClick={handleLogout}>
              <FaSignOutAlt /> <span>Logout</span>
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;