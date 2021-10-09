'use strict';
const XLSX = require("xlsx");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let exel = XLSX.readFile(__dirname + "/../sample_data/toilets_seoul.xlsx")
    let data = exel.Sheets["Sheet0"]
    let num = data['!ref'].split(':')[1].slice(1)
    console.log(data['!ref'].split(':')[1].slice(1))
    let datas = [];

    for(let i = 1; i <= num; i++){
      let obj = {
        name: data["A" + i].w,
        // user_id: '',
        address: data["C" + i].w,
        locationY: '12.1111',
        locationX: '23.2222',
        // img_url: '',
        // info: '',
        createdAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        updatedAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
      }
      // if(data["H"+i] > 0) {
      //   obj.accessible_toilet_male = 1;
      // }
      // if(data["I"+i] === 0) {
      //   obj.accessible_toilet_female = 0;
      // }

      datas.push(obj);
    }

    return queryInterface.bulkInsert('toilets', datas, {});
  },

  down: async (queryInterface, Sequelize) => {
     return queryInterface.bulkDelete('toilets', null, {});
  }
};
