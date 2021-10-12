require("dotenv").config();
const db = require('../../../models');
const jwt = require('jsonwebtoken');
const unirest = require('unirest');

module.exports = async (req, res) => {
  const authorization = req.headers['authorization'];
  
  //토큰 검증하는 코드 작성 필요함!!!
  if(!authorization) {
    res.status(400).json({ message:" 너 엑세스토큰 없는데 ?"})
  }else if(refreshToken === 'invalidtoken') {
    res.send({ "data": null, "message": "invalid refresh token, please log in again" })
  } 
  else if(aa){

  }else {
    //받아오는 데이터 구조분해할당
    const { name, address, user_id, img_url, accessible_toilet_male, accessible_toilet_female } = req.body;
    //필수 요소인 화장실 이름과 주소가 없으면
    if(!name || !address) {
      //다 채워라
      res.status(400).json({ message: "Couldn't fill in items"})
    } else {
      //필요한 데이터가 있으면
      const query = encodeURI(address);
      let y;
      let x;
      //카카오 api요청으로 좌표 받아옴
      await unirest('GET', `https://dapi.kakao.com/v2/local/search/address.json?query=${query}`)
      .headers({
        'Authorization': process.env.KAKAO_API
      })
      .then(function (response) { 
        //에러처리(카카오에서 보내주는 데이터에 문제 있을경우)
        if(!response.body.documents){
          res.status(404).send("This is an invalid address. Please check again.")
        }
        //에러처리(잘못된 주소일 경우)
        else if(!response.body.documents[0]) {
          res.status(404).send("This is an invalid address. Please check again.")
        }
        else {
          //좌표 데이터 가져오기
          y = response.body.documents[0].y;
          x = response.body.documents[0].x;

          //데이터베이스에 넣을 데이터
          const inputData = {
            name: name,
            address: address,
            location: {y, x},
          }

          //필수항목이 아닌경우 있는 데이터만 넣어주기
          if(user_id) inputData.user_id = user_id
          if(img_url) inputData.img_url = img_url
          if(accessible_toilet_male) inputData.accessible_toilet_male = accessible_toilet_male
          if(accessible_toilet_female) inputData.accessible_toilet_female = accessible_toilet_female
    
          db.toilet.findOrCreate({
            where: {
              address: req.body.address
            },
            defaults: inputData
          })
          .then(([data, created]) => {
            if(!created) {
              res.status(409).send("This address already exists")
            }else{
              const payload = {
                name: data.dataValues.name,
                address: data.dataValues.address,
                location: {y, x},
                user_id: data.dataValues.user_id,
                img_url: data.dataValues.img_url,
                accessible_toilet_male: data.dataValues.accessible_toilet_male,
                accessible_toilet_female: data.dataValues.accessible_toilet_female
              }
                
              const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, { expiresIn: "15m"})
              const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, { expiresIn: "1h"})
              
              res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: "none"
              })
          
              res.status(201).json({
                data : { 
                  accessToken: accessToken,
                  name: data.dataValues.name,
                  address: data.dataValues.address,
                  location: {y, x},
                  user_id: data.dataValues.user_id,
                  img_url: data.dataValues.img_url,
                  accessible_toilet_male: data.dataValues.accessible_toilet_male,
                  accessible_toilet_female: data.dataValues.accessible_toilet_female
                },
                message: "화장실 등록이 완료되었습니다"
              })
            }
          })
        }
      })
    }
  }
}

