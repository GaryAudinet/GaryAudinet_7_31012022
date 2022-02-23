// Import des packages requis

import React, { useState } from 'react';
import Signin from './Signin';
import Signup from './Signup';

// vDOM de l'index

function Index(props) {
  
  const [signUpModal, setSignUpModal] = useState(props.signup);
  const [signInModal, setSignInModal] = useState(props.signin);

  const handleModals = (event) => {
    if (event.target.id === 'signup') {
      setSignInModal(false);
      setSignUpModal(true);
    } else if (event.target.id === 'signin') {
      setSignUpModal(false);
      setSignInModal(true);
    }
  };

  return (
    <div className="sign">
      <div className="sign_list">
        <ul>
          <li
            onClick={handleModals}
            id="signup"
            className={signUpModal ? 'sign_active' : null}
          >
            S'inscrire
          </li>
          <br />
          <li
            onClick={handleModals}
            id="signin"
            className={signInModal ? 'sign_active' : null}
          >
            Se connecter
          </li>
        </ul>
        {signUpModal && <Signup />}
        {signInModal && <Signin />}
      </div>
    </div>
  );
}

export default Index;
