'use strict';
const unirest = require('unirest');
const XLSX = require("xlsx");
require("dotenv").config();

module.exports = {
  up: async (queryInterface, Sequelize) => {
    //엑셀 데이터를 mysql로 끌어오기
    //파일 위치 읽어오기
    let exel = XLSX.readFile(__dirname + "/../sample_data/toilet.xlsx")
    let datas = [];

    //17번 시트까지 있음. 9번 시트가 200개 정도로 가장 작음. 테스트 용도로 사용하기 좋음.
    for(let j = 9; j < 10; j++) {
      //불러온 엑셀의 시트 이름 검색
      let data = exel.Sheets[`Sheet${j}`]
      //데이터의 가장 마지막 줄 찾기
      let num = data['!ref'].split(':')[1].slice(1)
      // console.log(data['!ref'].split(':')[1].slice(1))

      //mysql에 넣을 데이터 배열

      //엑셀 데이터의 첫줄부터 마지막줄 까지
      for(let i = 2; i <= num; i++){
        //데이터가 있는 경우만
        if(data["A" + i].w) {
          //각 화장실 데이터 객체
          let obj = {
            //화장실 이름
            name: data["A" + i].w,
            createdAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
            updatedAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
          };
  
          //남자 장애인 변기가 없으면
          if(Number(data["I" + i].w) === 0) {
            //남자 장애인 화장실 여부 false
            obj.accessible_toilet_male = false;
          }
          //있으면 남자 장애인 화장실 true
          if(Number(data["I" + i].w) !== 0) {
            obj.accessible_toilet_male = true;
          }
  
          //여성 장애인 변기가 없으면
          if(Number(data["J" + i].w) === 0) {
            obj.accessible_toilet_female = false;
          }
          //있으면 여자 장애인 화장실 true
          if(Number(data["J" + i].w) !== 0) {
            obj.accessible_toilet_female = true;
          }
  
          //도로명 주소가 있을 경우
          if(data["C" + i]){
            //좌표 찾기
            const address = encodeURI(data["C" + i].w);
            //카카오 api 요청
            await unirest('GET', `https://dapi.kakao.com/v2/local/search/address.json?query=${address}`)
              .headers({
                'Authorization': process.env.KAKAO_API
              })
              .then(function (response) { 
                //받은 좌표 obj에 넣어주기
                //데이터가 없어도 도큐먼트 안에 형식이 있어야하는데 아예 빈 경우가 어쩌다 있음 .....
                //undefined에 0번째 인덱스를 찾는 경우가 생겨서 따로 분기를 나눔
                if(!response.body.documents){}

                else if(response.body.documents[0]) {
                  console.log(response.body.documents[0])
                  if(response.body.documents[0].road_address) {
                    obj.address = response.body.documents[0].road_address.address_name;
                    const y = response.body.documents[0].road_address.y;
                    const x = response.body.documents[0].road_address.x;
                    obj.locationY = y;
                    obj.locationX = x;
                  }else {
                    obj.address = response.body.documents[0].address.address_name;
                    const y = response.body.documents[0].address.y;
                    const x = response.body.documents[0].address.x;
                    obj.locationY = y;
                    obj.locationX = x;
                  }
                }
              });
          }else{
            // 도로명 주소가 없는 경우 지번으로 검색해서 도로명주소와 좌표 따오기
            //주소에 한글이 들어가면 전송이 되지 않음. 엔코딩 필요함
            const address = encodeURI(data["D" + i].w);
            //카카오 api 요청
            await unirest('GET', `https://dapi.kakao.com/v2/local/search/address.json?query=${address}`)
              .headers({
                'Authorization': process.env.KAKAO_API
              })
              .then(function (response) { 
                //받은 좌표 obj에 넣어주기
                if(response.body.documents[0]){
                  console.log(response.body.documents[0])
                  let address = response.body.documents[0].address.address_name;
                  if(response.body.documents[0].road_address) {
                    address = response.body.documents[0].road_address.address_name;
                  }
                  const y = response.body.documents[0].address.y;
                  const x = response.body.documents[0].address.x;
                  obj.address = address;
                  obj.locationY = y;
                  obj.locationX = x;
                }
              });
          }
          //데이터에 푸쉬
          if(obj.address) {
            datas.push(obj);
          }
        }
      }
    }

    return queryInterface.bulkInsert('toilets', datas, {});
  },

  down: async (queryInterface, Sequelize) => {
     return queryInterface.bulkDelete('toilets', null, {});
  }
};
