// Import des packages requis

import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import { Formik, Form, Field } from 'formik';
import { useParams } from 'react-router-dom';

// vDOM pour la mise à jour de la biographie

function UpdateBio() {

  const [username, setUsername] = useState('');
  const [biography, setBiography] = useState('');
  const [biographyForm, setBiographyForm] = useState(false);
  const { authState } = useContext(AuthContext);
  let { id } = useParams();

  const initialValues = {
    biography: `${biography}`,
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}api/users/${id}`, {
        headers: {
          JWToken: sessionStorage.getItem('JWToken'),
        },
      })
      .then((res) => {
        setBiography(res.data.biography);
        setUsername(res.data.username);
      });
  }, []);

  const handleUpdateBio = (data) => {
    axios
      .put(`${process.env.REACT_APP_API_URL}api/users/update/${id}`, data, {
        headers: {
          JWToken: sessionStorage.getItem('JWToken'),
        },
      })
      .then((res) => {
        if (res.data.error) {
          console.log(res.data.error);
        } else {
          setBiography(res.data.biography);
          window.location.replace(`/user/${id}`);
        }
      });
  };

  return (
    <div className="user_biography">
      {biographyForm === false && (
        <>
          <p>{biography}</p>
          {(authState.username === username && (
            <>
              <button
                onClick={() => setBiographyForm(!biographyForm)}
                aria-label="modifier"
              >
                <EditIcon />
              </button>
            </>
          )) ||
            (authState.isAdmin === true && (
              <>
                <button
                  onClick={() => setBiographyForm(!biographyForm)}
                  aria-label="modifier"
                >
                  <EditIcon />
                </button>
              </>
            ))}
        </>
      )}
      {biographyForm && (
        <>
          <Formik initialValues={initialValues} onSubmit={handleUpdateBio}>
            <Form>
              <Field
                as="textarea"
                aria-label="biographie"
                name="biography"
                placeholder={authState.biography}
                autoComplete="off"
              />
              <button type="submit" aria-label="modifier">
                <DoneIcon />
              </button>
            </Form>
          </Formik>
        </>
      )}
    </div>
  );
}

export default UpdateBio;
