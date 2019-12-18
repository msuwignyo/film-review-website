'use strict';

const faker = require('faker/locale/id_ID');
const totalUser = 50;
const outUser = [];

for (let i = 0; i < 50; i++) {
  outUser.push({
    name: faker.name.firstName() + ' ' + faker.name.lastName(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: '12345',
    role: Math.random() > 0.9 ? 'admin' : 'user',
    createdAt: new Date(),
    updatedAt: new Date()
  });
}

console.log(outUser);

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', outUser, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
