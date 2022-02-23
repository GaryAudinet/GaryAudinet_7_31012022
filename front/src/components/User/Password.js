// Import des packages requis

import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import axios from 'axios';
import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption';
import { useParams } from 'react-router-dom';

// vDOM pour la mise à jour du password

function UpdatePassword() {

  let { id } = useParams();
  const { authState } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordForm, setPasswordForm] = useState(false);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}api/users/${id}`, {
        headers: {
          JWToken: sessionStorage.getItem('JWToken'),
        },
      })
      .then((res) => {
        setEmail(res.data.email);
      });
  }, []);

  const handleUpdatePassword = () => {
    axios
      .put(
        `${process.env.REACT_APP_API_URL}api/users/update/${id}`,
        {
          oldPassword: oldPassword,
          newPassword: newPassword,
        },
        {
          headers: {
            JWToken: sessionStorage.getItem('JWToken'),
          },
        }
      )
      .then((res) => {
        if (res.data.error) {
          console.log(res.data.error);
        } else {
          window.location.replace(`/user/${id}`);
        }
      });
  };

  return (
    <>
      {authState.email === email && (
        <div className="user_password">
          {passwordForm === false && (
            <>
              <button
                onClick={() => setPasswordForm(!passwordForm)}
                aria-label="modifier"
              >
                Modifier le mot de passe
              </button>
            </>
          )}
          {passwordForm && (
            <>
              <input
                placeholder="Mot de passe actuel"
                type="password"
                onChange={(event) => {
                  setOldPassword(event.target.value);
                }}
              />
              <input
                placeholder="Nouveau mot de passe"
                type="password"
                onChange={(event) => {
                  setNewPassword(event.target.value);
                }}
              />
              <button onClick={handleUpdatePassword}>
                <EnhancedEncryptionIcon />
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default UpdatePassword;
