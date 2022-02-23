// Import des packages requis

import React, { useState } from 'react';
import axios from 'axios';

// vDOM pour la connexion

function Signin() {

  const [email, SetEmail] = useState('');
  const [password, SetPassword] = useState('');

  const handleSignin = (event) => {
    event.preventDefault();
    const data = { email: email, password: password };
    axios
      .post(`${process.env.REACT_APP_API_URL}api/sign/signin`, data)
      .then((response) => {
        console.log(response);
        if (response.data.error) {
          console.log(response.data.error);
        } else {
          sessionStorage.setItem('JWToken', response.data.token);
          window.location.replace('/home');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form onSubmit={handleSignin} className="sign_form">
      <h1>Vous avez un compte ? Connectez-vous !</h1>
      <br />
      <br />
      <input
        aria-label="Adresse e-mail"
        placeholder="Adresse e-mail"
        type="text"
        name="email"
        id="email"
        autoComplete="off"
        onChange={(event) => SetEmail(event.target.value)}
        value={email}
      />
      <div className="email error"></div>
      <br />
      <br />
      <input
        aria-label="Mot de passe"
        placeholder="Mot de passe"
        type="password"
        name="password"
        id="password"
        autoComplete="off"
        onChange={(event) => SetPassword(event.target.value)}
        value={password}
      />
      <div className="password error"></div>
      <br />
      <button className="sign_form_button" type="submit" aria-label="valider">
        Connexion
      </button>
    </form>
  );
}

export default Signin;
