import React from "react";
import "./Footer.css";
const Footer = () => {
  return (
    <>
      <div className="bg-light bottom-container footer-copyright text-center py-3">
        <a
          className="footer-link"
          href="https://www.linkedin.com/in/sandeep-v-4b01551a4/"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
        <a
          className="footer-link"
          href="https://github.com/sandeep-v1404"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        <a
          className="footer-link"
          href="https://www.instagram.com/sandeep._.144/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Instagram
        </a>
        <p className="copyright">© 2020 Sandeep V @coding.tech</p>
      </div>
    </>
  );
};

export default Footer;
