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

      const userInfo = await db.user.findOne({
        where: tokenData
      })

      if(!userInfo) {
        res.send("잘못된 정보 토큰 입니다")
      } else {
        const payload = {
          id : userInfo.dataValues.id,
          name : userInfo.dataValues.name,
          email : userInfo.dataValues.email,
          password : userInfo.dataValues.password
        }
        
        const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, { expiresIn: "15m"})
        const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, { expiresIn: "1h"})
    
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: "none"
        })
    
        res.status(200).json({
          accessToken: accessToken,
          name : userInfo.dataValues.name,
          email : userInfo.dataValues.email,
          password : userInfo.dataValues.password
        })
      }
    }
  })
};
