// Import des packages requis

const { Comments } = require('../models');

// Exports des logiques pour les commentaires (POST, GET, PUT, et DELETE)

exports.createComment = async (req, res) => {
  if (req.body.comment === null || !req.body.comment) {
    res.status(400).json({ message: 'Commentaire requis.' });
  } else {
    const comment = req.body;
    const username = req.user.username;
    comment.username = username;
    await Comments.create(comment)
      .then((comment) => {
        res
          .status(201)
          .json({ message: 'Commentaire crée ' + comment.id });
      })
      .catch((error) => {
        res.status(400).json({ error: 'Erreur survenu. ' + error });
      });
  }
};

exports.readComment = async (req, res) => {
  const postId = req.params.postId;
  const comments = await Comments.findAll({ where: { PostId: postId } });
  res.status(200).json(comments);
};

exports.deleteComment = async (req, res) => {
  const commentId = req.params.commentId;
  await Comments.destroy({ where: { id: commentId } })
    .then(() => {
      res
        .status(200)
        .json({ message: 'Commentaire ' + commentId + ' supprimé.' });
    })
    .catch((error) => {
      res.status(400).json({ error: 'Erreur survenu. ' + error });
    });
};
