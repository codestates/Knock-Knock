require("dotenv").config();
const db = require('../../../models');
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
  const { name, email, password } = req.body;

  if(!name || !email || !password ) {
    res.status(422).send("insufficient parameters supplied")
  }


  await db.user.findOrCreate({
    where: {
      email: req.body.email
    },
    defaults: {
      email: email,
      name: name,
      password: password
    }
  })
  .then(([data, created]) => {
    if(!created) {
      res.status(409).send("This email already exists")
    }else{
      const payload = {
        id : data.dataValues.id,
        name: data.dataValues.name,
        email: data.dataValues.email,
        password: data.dataValues.password
      }
      console.log(process.env.ACCESS_SECRET)

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
            id : data.dataValues.id,
            name: data.dataValues.name,
            email: data.dataValues.email,
            password: data.dataValues.password
          },
          message: "You have become a member"
        })
    }
  })
}