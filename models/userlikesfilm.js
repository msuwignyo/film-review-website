'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;

  class UserLikesFilm extends Model { }

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