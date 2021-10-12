require("dotenv").config();
const db = require('../../../models');
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
  const authorization = req.headers['authorization'];
  
  if(!authorization) {
    res.status(400).json({ message:" 너 엑세스토큰 없는데 ? 혹은 만료된듯 ??"})
  } else {

    const { name, address } = req.body;
    
    if(!name || !address) {
      res.status(400).json({ message: "Couldn't fill in items"})
    } else {
      
      await db.toilet.findOrCreate({
        where: {
          address: req.body.address
        },
        defaults: {
          name: name,
          address: address
        }
      })
      .then(([data, created]) => {
        if(!created) {
          res.status(409).send("This address already exists")
        }else{
          const payload = {
            name: data.dataValues.name,
            address: data.dataValues.address,
            locationY: data.dataValues.locationY,
            locationX: data.dataValues.locationX,
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
                locationY: data.dataValues.locationY,
                locationX: data.dataValues.locationX,
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
    }
  }