// Import des packages requis

const { Likes } = require('../models');

// Exports des logiques pour les likes

exports.likeOrNot = async (req, res) => {
  const { PostId } = req.body;
  const UserId = req.user.id;
  const exist = await Likes.findOne({
    where: { PostId: PostId, UserId: UserId },
  });
  if (!exist) {
    await Likes.create({ PostId: PostId, UserId: UserId })
      .then(() => {
        res.status(201).json({ liked: true });
      })
      .catch((error) => {
        res.status(400).json({ error: 'Erreur survenu. ' + error });
      });
  } else {
    await Likes.destroy({
      where: { PostId: PostId, UserId: UserId },
    })
      .then(() => {
        res.status(201).json({ liked: false });
      })
      .catch((error) => {
        res.status(400).json({ error: 'Erreur survenu. ' + error });
      });
  }
};
