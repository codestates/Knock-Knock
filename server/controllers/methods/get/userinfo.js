require("dotenv").config();
const db = require('../../../models');
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
  const authorization = req.headers['authorization'];

  const userInfo = await db.user.findOne({
    where: { email: req.query.email }
   })

  if(!authorization) {
    res.status(400).json({ message:" 너 엑세스토큰 없는데 ? 혹은 만료된듯 ??"})
  } else {

    const payload = {
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
};
