// Import des packages requis

const { Users } = require('../models');
const bcrypt = require('bcrypt');
const fs = require('fs');

// Exports des logiques pour les utilisateurs (GET, PUT, et DELETE)

exports.readUser = async (req, res) => {
  try {
    const id = req.params.id;
    await Users.findByPk(id, {
      attributes: ['username', 'email', 'biography', 'image', 'isAdmin'],
    }).then((user) => {
      if (!user) {
        res.status(404).json({ error: 'Utilisateur ' + id + ' non trouvé.' });
      } else res.status(200).json(user);
    });
  } catch (error) {
    res.status(500).send({ error: 'Erreur survenu. ' + error });
  }
};

//

exports.updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const { oldPassword, newPassword } = req.body;
    let image;
    if ((oldPassword, newPassword)) {
      const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
      if (!PASSWORD_REGEX.test(newPassword)) {
        return res.status(400).json({
          error:
            'Le mot de passe doit être entre 6-20 caractères, et doit contenir au moins une majuscule, une minuscule et un nombre.',
        });
      }
      await Users.findByPk(id);
      bcrypt.hash(newPassword, 10).then((hash) => {
        Users.update({ password: hash }, { where: { id: id } });
      });
    }
    if (req.file) {
      image = `${req.protocol}://${req.get('host')}/image/${req.file.filename}`;
    }
    await Users.update({ ...req.body, image: image }, { where: { id: id } });
    res.status(201).json({ message: 'Utilisateur ' + id + ' mis à jour.' });
  } catch (error) {
    res.status(500).send({ error: 'Erreur survenu. ' + error });
  }
};

//

exports.deleteUser = (req, res) => {
  const id = req.params.id;
  Users.destroy({ where: { id: id } })
    .then(() => res.status(200).json({ message: 'Utilisateur supprimé.' }))
    .catch((error) => res.status(400).json({ error }));
};
