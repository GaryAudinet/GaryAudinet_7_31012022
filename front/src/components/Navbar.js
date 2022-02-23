// Import des packages requis

import React, { useContext } from 'react';
import CottageIcon from '@mui/icons-material/Cottage';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { NavLink } from 'react-router-dom';
import Signout from './Sign/Signout';
import { AuthContext } from '../context/authContext';

// vDOM pour la barre de navigation

function Navbar() {

  const { authState } = useContext(AuthContext);
  const profil = () => {
    window.location.replace(`/user/${authState.id}`);
  };

  return (
    <nav className="nav_container">
      <div className="navbar">
        <div>
          <span className="navbar_welcome">
            Bonjour "{authState.username}"!
          </span>
        </div>
        <NavLink to={'/home'} aria-label="retour accueil">
          <CottageIcon aria-label="bouton accueil" className="navbar_icon" />
        </NavLink>
        <ManageAccountsIcon
          onClick={profil}
          aria-label="bouton profil"
          className="navbar_icon"
        />
        <Signout />
      </div> 
    </nav>
  );
}

export default Navbar;
