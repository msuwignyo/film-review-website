'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;

  class Film extends Model {
    get name() {
      this.name;
    }

    get poster() {
      this.poster;
    }

    get description() {
      this.description;
    }

    get trailer() {
      this.trailer;
    }
  }

  Film.init({
    name: DataTypes.STRING,
    poster: DataTypes.STRING,
    description: DataTypes.STRING,
    trailer: DataTypes.STRING
  }, { sequelize });

  Film.associate = (models) => {
    Film.belongsToMany(models.User, { through: models.UserLikesFilm });
  };

  return Film;
};