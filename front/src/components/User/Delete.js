// Import des packages requis

import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

// vDOM pour la suppression de compte

function Delete() {
  
  let navigate = useNavigate();
  const [email, setEmail] = useState('');
  const { authState } = useContext(AuthContext);
  let { id } = useParams();

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

  const handleDelete = () => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}api/users/delete/${id}`, {
        headers: {
          JWToken: sessionStorage.getItem('JWToken'),
        },
      })
      .then(() => {
        sessionStorage.removeItem('JWToken');
        navigate('/');
      });
  };

  return (
    <>
      {(authState.email === email && (
        <>
          <div className="user_delete">
            <p>Voulez-vous vraiment supprimer ce compte ?</p>
            <button onClick={handleDelete} className="user_delete_button">
              Supprimer le compte !
            </button>
          </div>
        </>
      )) ||
        (authState.isAdmin === true && (
          <>
            <div className="user_delete">
              <p>Voulez-vous vraiment supprimer votre compte ?</p>
              <button onClick={handleDelete} className="user_delete_button">
                Supprimer le compte !
              </button>
            </div>
          </>
        ))}
    </>
  );
}

export default Delete;
