// Creation du schema pour les likes

module.exports = (sequelize, DataTypes) => {
  const Likes = sequelize.define('Likes', {});
  return Likes;
};
