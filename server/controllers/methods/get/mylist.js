require("dotenv").config();
const db = require('../../../models');
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
  
  const authorization = req.headers['authorization'];

  jwt.verify(authorization,process.env.ACCESS_SECRET , async function(err,decoded){
    if(err) {
      res.send("만료됬거나 유효하지 않은 토큰 입니다")
    } else {
      
      const tokenData = { 
        id: decoded.id,
        email:decoded.email,
        name:decoded.name,
        password:decoded.password
      }
    console.log('tokendata',tokenData)
      const userData = await db.user.findOne({
        where: tokenData
      })

      if(!userData) {
        res.send("잘못된 정보 토큰 입니다")
      } else {
        
        const myCommnet = await db.comment.findAll({
          where: { user_id: tokenData.id }
        })

        const myToilet = await db.toilet.findAll({
          where: { user_id: tokenData.id }
        })

        res.json({
         // myCommnet: myCommnet,
          myToilet: myToilet,
          message: "ok"
        })
      }
    }
  }) 
}