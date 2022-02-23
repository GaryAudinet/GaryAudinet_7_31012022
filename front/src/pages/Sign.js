// Import des packages requis

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SignComponent from '../components/Sign';

// vDOM pour la page d'inscription

function Sign() {

  let navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem('JWToken')) {
      navigate('/home');
    }
  }, []);

  return (
    <div className="page_container">
      <SignComponent signin={true} signup={false} />
    </div>
  );
}

export default Sign;
