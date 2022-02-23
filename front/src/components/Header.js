// Import des packages requis

import React from 'react';
import Logo from '../image/icon-left-font-monochrome-white-recadrer.png';

// vDOM pour le header

function Header() {

  return (
    <header className="container">
      <div>
        <img src={Logo} alt="Logo de groupomania" />
      </div>
    </header>
  );
}

export default Header;
