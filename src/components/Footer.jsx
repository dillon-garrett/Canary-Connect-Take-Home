import React from 'react';
import logo from '../../assets/github.png';

const Footer = () => {
  return (
    <footer id="footer">
      <a
        href="https://github.com/dillon-garrett/Canary-Connect-Take-Home"
        rel="noopener noreferrer"
        target="_blank"
      >
        <img src={logo} alt="github logo" id="github-logo" />
      </a>
    </footer>
  );
};

export default Footer;
