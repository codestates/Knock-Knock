const db = require('../../../models');

module.exports = async (req, res) => {
  const data = await db.toilet.findAll()
  res.status(200).send(data)
}