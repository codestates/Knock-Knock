require("dotenv").config();
const unirest = require('unirest');
const db = require('../../../models');

module.exports = async (req, res) => {
  // const address = encodeURI("세종특별자치시 갈매로 596 (도담동, 다온Ⅲ빌딩)")
  // unirest('GET', `https://dapi.kakao.com/v2/local/search/address.json?query=${address}`)
  //   .headers({
  //     'Authorization': 'KakaoAK 5d8bd0f568a290d66f85d366a110faa2'
  //   })
  //   .end(function (response) { 
  //     console.log(response.body.documents[0])
  //     const y = response.body.documents[0].address.y
  //     const x = response.body.documents[0].address.x
  //     console.log(y,x)
  //     res.json({y,x})
  //   });

  const data =  await db.toilet.findAll();
  const result = [];
  for(let i of data) {
    const obj = {};
    const address = encodeURI(i.address);
    unirest('GET', `https://dapi.kakao.com/v2/local/search/address.json?query=${address}`)
    .headers({
      'Authorization': 'KakaoAK 5d8bd0f568a290d66f85d366a110faa2'
    })
    .then(function (response) { 
      console.log(response.body.documents[0])
      const y = response.body.documents[0].address.y
      const x = response.body.documents[0].address.x
      console.log(y,x)
      obj.y = y
      obj.x = x
      result.push(obj)
      res.send(result)
    });
  }
}