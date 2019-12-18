'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;

  class User extends Model { };

  User.init({
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, { sequelize });

  User.associate = (models) => {
    User.belongsToMany(models.Film, { through: models.UserLikesFilm });
  };

  return User;
};