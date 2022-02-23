// Import des packages requis

import React, { useState } from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Signin from './Signin';

// vDOM pour l'inscription, avec validation de formulaire

function Signup() {

  const [formSubmit, setFormSubmit] = useState(false);

  const initialValues = {
    username: '',
    email: '',
    password: '',
    confirmation: '',
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, 'Doit contenir un minmum de 3 caractères')
      .max(15, 'Doit contenir un maximum 15 caractères')
      .required('Ce champ est obligatoire.'),
    email: Yup.string()
      .email('E-mail non valide ("nom@mail.com")')
      .required('Ce champ est obligatoire.'),
    password: Yup.string()
      .min(6, 'Doit contenir un minmum de 6 caractères')
      .max(18, 'Doit contenir un maximum 18 caractères')
      .required('Ce champ est obligatoire.')
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/,
        'Doit contenir une majuscule, une minuscule et un chiffre'
      ),
    confirmation: Yup.string()
      .oneOf(
        [Yup.ref('password'), null],
        'Les mots de passes ne sont pas identiques'
      )
      .required('Ce champ est obligatoire.'),
  });

  const onSubmit = (data) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}api/sign/signup`, data)
      .then((res) => {
        console.log(res.data);
        if (res.data.error) {
          console.log(res.data.error);
        } else {
          setFormSubmit(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {formSubmit ? (
        <>
          <Signin />
          <br />
          <div>
            <p className="sign_valid">
              Inscription valide !
            </p>
          </div>
        </>
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form className="sign_form">
            <h1>Vous n'avez pas de compte ? Inscrivez-vous !</h1>
            <br />
            <br />
            <ErrorMessage name="username" component="span" />
            <br />
            <Field
              aria-label="Nom d'utilisateur"
              className="sign_form_input"
              name="username"
              placeholder="Nom d'utilisateur"
              autoComplete="off"
            />
            <br />
            <ErrorMessage name="email" component="span" />
            <br />
            <Field
              aria-label="Adresse e-mail"
              className="sign_form_input"
              name="email"
              placeholder="Adresse e-mail"
              autoComplete="off"
            />
            <br />
            <ErrorMessage name="password" component="span" />
            <br />
            <Field
              aria-label="Mot de passe"
              className="register_form_input"
              type="password"
              name="password"
              placeholder="Mot de passe"
              autoComplete="off"
            />
            <br />
            <ErrorMessage name="confirmation" component="span" />
            <br />
            <Field
              aria-label="confirmer"
              className="sign_form_input"
              type="password"
              name="confirmation"
              placeholder="Confirmer"
              autoComplete="off"
            />
            <br />
            <button
              className="sign_form_button"
              type="submit"
              aria-label="valider"
            >
              Inscription
            </button>
          </Form>
        </Formik>
      )}
    </>
  );
}

export default Signup;
