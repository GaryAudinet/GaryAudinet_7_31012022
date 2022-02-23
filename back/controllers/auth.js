// Import des packages requis

const { Users } = require('../models');
const bcrypt = require('bcrypt');
const { sign } = require('jsonwebtoken');
require('dotenv').config({ path: './config/.env' });

// Exports des logiques d'inscription et de connection

exports.signup = async (req, res) => {
  const { username, email, password } = req.body;
  if (username == null || email == null || password == null) {
    return res.status(400).json({ error: 'error.' });
  }
  if (username.length >= 16 || username.length <= 2) {
    return res
      .status(400)
      .json({ error: 'Doit contenir que des lettres, avec un minmum de 3 caractères et 15 au maximum.' });
  }
  const EMAIL_REGEX =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!EMAIL_REGEX.test(email)) {
    return res
      .status(400)
      .json({ error: 'Email non valide' });
  }
  const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,18}$/;
  if (!PASSWORD_REGEX.test(password)) {
    return res.status(400).json({
      error:
        'Le mot de passe doit être entre 6-18 caractères, et doit contenir au moins une majuscule, une minuscule et un nombre.',
    });
  }
  await Users.findOne({ where: { email: email } }).then((exist) => {
    if (exist) {
      return res
        .status(409)
        .json({ error: 'Cet email est déjà utilisé.' });
    } else {
      Users.findOne({ where: { username: username } })
        .then((exist) => {
          if (!exist) {
            bcrypt.hash(password, 10).then((hash) => {
              Users.create({
                username: username,
                email: email,
                password: hash,
              })
                .then((user) => {
                  return res
                    .status(201)
                    .json({ message: 'Utilisateur crée avec comme identifant ' + user.id });
                })
                .catch((error) => {
                  return res
                    .status(500)
                    .json({ error: 'Erreur survenu ' + error });
                });
            });
          } else {
            return res
              .status(409)
              .json({ error: 'Utilisateur ' + username + ' déjà utilisé.' });
          }
        })
        .catch((error) => {
          return res
            .status(500)
            .json({ error: 'Erreur survenu ' + error });
        });
    }
  });
};

//

exports.signin = async (req, res) => {
  const { email, password } = req.body;
  if (email == null || password == null) {
    return res.status(400).json({ error: 'error.' });
  }
  await Users.findOne({ where: { email: email } })
    .then((user) => {
      if (user) {
        bcrypt.compare(password, user.password).then((match) => {
          if (match) {
            const JWToken = sign(
              {
                id: user.id,
                username: user.username,
                email: user.email,
                biography: user.biography,
                image: user.image,
                isAdmin: user.isAdmin,
              },
              process.env.SECRET_KEY
            );
            console.log(user.isAdmin);
            return res.status(200).json({
              token: JWToken,
              id: user.id,
              username: user.username,
              email: user.email,
              biography: user.biography,
              image: user.image,
              isAdmin: user.isAdmin,
            });
          } else {
            return res.status(403).json({ error: 'Mot de passe incorrect.' });
          }
        });
      } else {
        return res.status(404).json({ error: email + 'non utilisé.' });
      }
    })
    .catch((error) => {
      return res.status(500).json({ error: 'Erreur survenu. ' + error });
    });
};

exports.auth = (req, res) => {
  try {
    return res.status(200).json(req.user);
  } catch (error) {
    return res.status(500).json({ error: 'Token non valide.' });
  }
};
