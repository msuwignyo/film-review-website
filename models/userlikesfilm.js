'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserLikesFilm = sequelize.define('UserLikesFilm', {
    UserId: DataTypes.INTEGER,
    FilmId: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN
  }, {});
  UserLikesFilm.associate = function(models) {
    // associations can be defined here
  };
  return UserLikesFilm;
};