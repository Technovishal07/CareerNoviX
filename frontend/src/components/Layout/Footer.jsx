import React, { useContext, useMemo } from "react";
import { Context } from "../../main";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";

const SOCIAL_LINKS = [
  {
    href: "https://github.com/Technovishal07",
    icon: <FaGithub />,
    className: "footer__icon-link--github",
    label: "Visit GitHub Profile",
  },
  {
    href: "https://linkedin.com/in/vishal-kumar-0101b7251",
    icon: <FaLinkedin />,
    className: "footer__icon-link--linkedin",
    label: "Visit LinkedIn Profile",
  },
  {
    href: "https://www.instagram.com/vishal_singh452/",
    icon: <FaInstagram />,
    className: "footer__icon-link--instagram",
    label: "Visit Instagram Profile",
  },
];

const Footer = () => {
  const { isAuthorized } = useContext(Context);
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  if (!isAuthorized) return null;

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__container">
        
        {/* Left: Dual-Brand Colored Typography */}
        <div className="footer__copyright">
          &copy; {currentYear} All Rights Reserved By{" "}
          <span className="brand-career">Career</span>
          <span className="brand-nova">NoviX</span>.
        </div>

        {/* Right: Static Real Colors Brand Icons */}
        <div className="footer__socials" aria-label="Social Framework">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`footer__icon-link ${link.className}`}
              aria-label={link.label}
            >
              {link.icon}
            </a>
          ))}
        </div>

      </div>
    </footer>
  );
};

export default Footer;