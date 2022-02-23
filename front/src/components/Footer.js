// Import des packages requis

import React from 'react';
import Logo from '../image/icon-left-font-monochrome-white-recadrer.png';

// vDOM pour le header

function Footer() {

  return (
    <footer className="container_footer">
      <div>
        <img src={Logo} alt="Logo de groupomania" />
      </div>
      <div className="ligne"></div>
    </footer>
  );
}

export default Footer;