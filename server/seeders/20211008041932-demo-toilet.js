'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('toilets', [{
      name: '서울역 화장실',
      user_id: '1',
      address: '서울시 어쩌구',
      location: '111111,222222',
      info: '서울역 화장실입니다',
      img_url: 'http//skdlsdfl',
      accessible_toilet_male: true,
      accessible_toilet_female: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
     return queryInterface.bulkDelete('toilets', null, {});
  }
};
