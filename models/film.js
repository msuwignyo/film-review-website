'use strict';
module.exports = (sequelize, DataTypes) => {
  const Film = sequelize.define('Film', {
    name: DataTypes.STRING,
    poster: DataTypes.STRING,
    description: DataTypes.STRING,
    trailer: DataTypes.STRING
  }, {});
  Film.associate = function(models) {
    // associations can be defined here
  };
  return Film;
};