'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;

  class User extends Model {
    get name() {
      return this.name;
    }

    get username() {
      return this.username;
    }

    get email() {
      return this.email;
    }

    get role() {
      return this.role;
    }
  };

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