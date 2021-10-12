require("dotenv").config();

const db = require('../../../models');

const jwt = require('jsonwebtoken');

module.exports = (req, res) => {
  // TODO: 로그아웃 로직을 작성합니다.
  res.status(205).send('Logged out successfully');
};
