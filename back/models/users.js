// Creation du schema pour les utilisateurs

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    biography: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: 'Biographie pas mise à jour !',
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'http://localhost:4200/image/default_user.png',
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
    },
  });
  
  Users.associate = (models) => {
    Users.hasMany(models.Posts, {
      onDelete: 'cascade',
    });
    Users.hasMany(models.Likes, {
      onDelete: 'cascade',
    });
  };
  return Users;
};
