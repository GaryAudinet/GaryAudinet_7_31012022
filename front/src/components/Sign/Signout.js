// Import des packages requis

import React from 'react';
import LogoutIcon from '@mui/icons-material/Logout';

// vDOM pour la déconnexion

function Signout() {

  const Signout = () => {
    sessionStorage.removeItem('JWToken');
    window.location.replace('/');
  };

  return (
    <div onClick={Signout}>
      <LogoutIcon alt="Déconnexion" className="navbar_icon" />
    </div>
  );
}

export default Signout;
