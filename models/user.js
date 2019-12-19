'use strict';
const hashPassword = require('../helper/hashPassword')
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
    username: {
      type: DataTypes.STRING,
      validate: {
        usernameUnique(values) {
          return User.findOne({ where: { username: values } })
            .then(data => {
              if (data) {
                throw new Error('Username Has Already Registred')
              }
            })
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: "Email Formated Wrong"
        },
        isUnique(values) {
          return User.findOne({ where: { email: values } })
            .then(data => {
              if (data) {
                throw new Error('Email Has Already Registred')
              }
            })
        }
      }
    },
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (instance, option) => {
        instance.password = hashPassword(instance.password)
      }
    }, sequelize
  });

  User.associate = (models) => {
    User.belongsToMany(models.Film, { through: models.UserLikesFilm });
  };

  return User;
};