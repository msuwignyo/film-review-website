'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;

  class Film extends Model {
    get name() {
      return this.name;
    }

    get poster() {
      return this.poster;
    }

    get description() {
      return this.description;
    }

    get trailer() {
      return this.trailer;
    }

    static filmRating() {
      return 0;
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