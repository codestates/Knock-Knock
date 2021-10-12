require("dotenv").config();
const db = require('../../../models');
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
  const authorization = req.headers['authorization'];
  
  let minX = req.query.boudaryX['-'][0]
  let maxX = req.query.boudaryX['-'][1]
  let minY = req.query.boudaryY['-'][0]
  let maxY = req.query.boudaryY['-'][1]

  console.log("minX : ", minX)

  const toiletInfo = await db.toilet.findAll({
    where: {
      [Op.and]: [{[Op.gt]: minX},
      {[Op.lt]: maxX},
      {[Op.gt]: minY},
      {[Op.lt]: maxY}]
    }
  })

  if(!authorization) {
    res.status(400).json({ message:" 너 엑세스토큰 없는데 ? 혹은 만료된듯 ??"})
  } else {

    const payload = {
      name: toiletInfo.dataValues.name,
      address: toiletInfo.dataValues.address,
      locationY: toiletInfo.dataValues.locationY,
      locationX: toiletInfo.dataValues.locationX,
      user_id: toiletInfo.dataValues.user_id,
      img_url: toiletInfo.dataValues.img_url,
      accessible_toilet_male: toiletInfo.dataValues.accessible_toilet_male,
      accessible_toilet_female: toiletInfo.dataValues.accessible_toilet_female
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
      toiletInfo: toiletInfo
    })


  }
}