import React, { useContext } from "react";
import { Context } from "../../main";
import { Link } from "react-router-dom";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

const Footer = () => {
  const { isAuthorized } = useContext(Context);
  return (
    <footer className={isAuthorized ? "footerShow" : "footerHide"}>
      <div>&copy; All Rights Reserved By Techno ࿐ Vishal.</div>
      <div>
        <Link to={"https://github.com/Technovishal07"} target="_blank">
          <FaGithub />
        </Link>
        <Link to={"https://linkedin.com/in/vishal-kumar-0101b7251"} target="_blank">
          <FaLinkedin />
        </Link>
        <Link to={"https://www.instagram.com/vishal_singh452/"} target="_blank">
          <RiInstagramFill />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
