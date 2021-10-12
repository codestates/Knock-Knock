require("dotenv").config();
const db = require('../../../models');
const jwt = require('jsonwebtoken');

module.exports = (req, res) => {
  const authorization = req.headers['authorization'];

  if(!authorization) {
    res.status(400).json({ message:" 너 엑세스토큰 없는데 ? 혹은 만료된듯 ??"})
  } else {
    const token = authorization.split(' ')[1];
    const data = jwt.sign(token, process.env.ACCESS_SECRET, { expiresIn: "15m"});

    console.log("token")

    const userInfo = {
      id: data.id,
      userId: data.userId,
      email: data.email,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt
    }

    res.status(200).json({
      data: {
        accessToken: accessToken,
        userInfo: userInfo
      },
      message: "ok"
    })
  }
};
