const models = require('../../../models');

module.exports = async (req, res) => {
  await models.toilet.findAll()
  .then(data => res.status(200).json(data))
}