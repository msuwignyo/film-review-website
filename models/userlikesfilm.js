'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;

  class UserLikesFilm extends Model {
    get UserId() {
      return this.UserId;
    }

    get FilmId() {
      return this.FilmId;
    }

    get status() {
      return this.status;
    }

    static filmStatistics(filmId) {
      const out = {};

      // cari semua user yg like film tersebut
      return UserLikesFilm.findAll({
        where: { FilmId: filmId, status: true }
      }).then((userLikes) => {
        out.totalLikes = userLikes.length;

        // cari semua user yg dislike film tersebut
        return UserLikesFilm.findAll({
          where: { FilmId: filmId, status: false }
        })
      }).then((userDislikes) => {
        out.totalDislikes = userDislikes.length;
        out.totalUsersReacted = out.totalLikes + out.totalDislikes;

        return out;
      });
    }
  }

  UserLikesFilm.init({
    UserId: DataTypes.INTEGER,
    FilmId: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN
  }, { sequelize });

  UserLikesFilm.associate = (models) => {
    UserLikesFilm.belongsTo(models.User, { foreignKey: 'UserId' });
    UserLikesFilm.belongsTo(models.Film, { foreignKey: 'FilmId' });
  };

  return UserLikesFilm;
};