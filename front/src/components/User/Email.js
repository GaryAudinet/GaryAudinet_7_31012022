// Import des packages requis

import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import axios from 'axios';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useParams } from 'react-router-dom';

// vDOM pour la mise à jour de l'email

function UpdateEmail() {
  let { id } = useParams();
  const [email, setEmail] = useState('');
  const [emailForm, setEmailForm] = useState(false);
  const { authState } = useContext(AuthContext);

  const initialValues = {
    email: `${authState.email}`,
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('E-mail non valide ("nom@mail.com")')
      .required('Ce champ est obligatoire.'),
  });

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

  const handleUpdateEmail = (data) => {
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
          setEmail({ ...email, email: email });
          window.location.replace(`/user/${id}`);
        }
      });
  };

  return (
    <>
      {authState.email === email && (
        <>
          <div className="user_email">
            {emailForm === false && (
              <>
                <button
                  onClick={() => setEmailForm(!emailForm)}
                  aria-label="modifier"
                >
                  Modifier l'adresse e-mail
                </button>
              </>
            )}
            {emailForm && (
              <>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleUpdateEmail}
                >
                  <Form>
                    <br />
                    <ErrorMessage name="email" component="span" />
                    <br />
                    <Field
                      aria-label="votre adresse e-mail"
                      name="email"
                      placeholder={authState.email}
                      autoComplete="off"
                    />
                    <button type="submit" aria-label="modifier">
                      <MarkEmailReadIcon />
                    </button>
                  </Form>
                </Formik>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default UpdateEmail;
