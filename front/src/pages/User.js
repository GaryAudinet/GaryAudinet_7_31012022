// Import des packages requis

import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Upload from '../components/User/Upload';
import UpdateBio from '../components/User/Bio';
import UpdateEmail from '../components/User/Email';
import Delete from '../components/User/Delete';
import UpdatePassword from '../components/User/Password';
import { useParams } from 'react-router-dom';
import axios from 'axios';

// vDOM pour la page d'utilisateur

function User() {

  const [username, setUsername] = useState('');
  const [image, setImage] = useState('');
  let { id } = useParams();

  useEffect(() => {
    if (!sessionStorage.getItem('JWToken')) {
      window.location.replace(`/`);
    } else {
      axios
        .get(`${process.env.REACT_APP_API_URL}api/users/${id}`, {
          headers: {
            JWToken: sessionStorage.getItem('JWToken'),
          },
        })
        .then((res) => {
          setUsername(res.data.username);
          setImage(res.data.image);
        });
    }
  }, []);

  return (
    <div className="page_container">
      <Navbar />
      <div className="user">
        <div className="user_profile">
          <div className="user_header">
            <div className="user_image">
              <h1>Profil de "{username}"</h1>
              <img src={image} alt="profil" />
              <Upload />
            </div>
          </div>
          <div className="user_footer">
            <div className="ligne_post_user"></div>
            <UpdateBio />
            <div className="ligne_post_user"></div>
            <div className ="user_email_password">
              <UpdateEmail />
              <div className="ligne_post_user"></div>
              <UpdatePassword />
            </div>
            <div className="ligne_post_user"></div>
            <div>
              <Delete />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;
