// Import des packages requis

const { Posts, Likes, Comments } = require('../models');
const fs = require('fs');

// Exports des logiques pour chaques posts (POST, GET, PUT, et DELETE)

exports.createPost = async (req, res) => {
  let image;
  if (req.body.content === null || !req.body.content) {
    res.status(400).json({ message: 'Contenu requis.' });
  } else {
    if (req.file) {
      image = `${req.protocol}://${req.get('host')}/image/${req.file.filename}`;
    }
    const post = req.body;
    post.username = req.user.username;
    post.UserId = req.user.id;
    post.image = image;
    await Posts.create(post)
      .then((post) => {
        res
          .status(201)
          .json({ message: 'Post créé ' + post.id });
      })
      .catch((error) => {
        res.status(400).json({ error: 'Erreur survenu. ' + error });
      });
  }
};

//

exports.readAllPosts = async (req, res) => {
  try {
    const listOfPosts = await Posts.findAll({ include: [Likes, Comments] });
    const likedPosts = await Likes.findAll({ where: { UserId: req.user.id } });
    res.status(200).json({ listOfPosts: listOfPosts, likedPosts: likedPosts });
  } catch (error) {
    res.status(400).json({ error: 'Erreur survenu. ' + error });
  }
};

//

exports.readOnePost = async (req, res) => {
  id = req.params.id;
  await Posts.findOne({ where: { id: id }, include: Comments })
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((error) => {
      res.status(400).json({ error: 'Erreur survenu. ' + error });
    });
};

//

exports.updatePost = async (req, res) => {
  id = req.params.id;
  let image;
  if (req.file) {
    Posts.findOne({ where: { id: id } });
    image = `${req.protocol}://${req.get('host')}/image/${req.file.filename}`;
  }
  await Posts.findOne({ where: { id: id } })
    .then(() => {
      Posts.update({ ...req.body, image: image }, { where: { id: id } });
      res.status(200).json({ message: 'Post ID ' + id + ' mis à jour.' });
    })
    .catch((error) => {
      res.status(400).json({ error: 'Erreur survenu. ' + error });
    });
};

//

exports.deletePost = (req, res) => {
  id = req.params.id;
  Posts.destroy({ where: { id: id } })
    .then(() => {
      res.status(200).json({ message: 'Post ' + id + ' supprimé.' });
    })
    .catch((error) => res.status(500).json({ error }));
};
