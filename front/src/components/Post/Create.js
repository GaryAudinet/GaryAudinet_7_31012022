// Import des packages requis

import React, { useState } from 'react';
import axios from 'axios';
import PostAdd from '@mui/icons-material/PostAdd';

// Fonction pour crée un post, suivi de son vDOM

function Create() {
  
  const [content, setContent] = useState('');
  const [image, setImage] = useState();
 
  const handlePost = (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append('content', content);
    data.append('image', image);
    axios
      .post(`${process.env.REACT_APP_API_URL}api/posts`, data, {
        headers: {
          JWToken: sessionStorage.getItem('JWToken'),
        },
      })
      .then(() => {
        window.location.replace('/home');
      });
  };
 
  return (
    <div className="create">
      <form className="create_form" onSubmit={handlePost}>
        <textarea
          name="content"
          id="content"
          placeholder="Créer votre message ici !"
          onChange={(event) => setContent(event.target.value)}
          aria-label="Créer votre message ici"
        />
        <input
          type="file"
          id="image"
          name="image"
          accept=".jpeg, .jpg, .png, .gif, .webp"
          onChange={(event) => setImage(event.target.files[0])}
          aria-label="ajouter une image"
        />
        <button className="create_button" type="submit" aria-label="valider">
          <PostAdd />
        </button>
      </form>
    </div>
  );
}

export default Create;