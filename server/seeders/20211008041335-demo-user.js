'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [{
      name: 'John Doe',
      email: 'asdf@naver.com',
      password: '1234',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
     return queryInterface.bulkDelete('users', null, {});
  }
};
