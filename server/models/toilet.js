'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class toilet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.toilet.belongsTo(models.user, {foreignKey: "user_id"})
    }
  };
  toilet.init({
    name: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    address: DataTypes.STRING,
    locationY: DataTypes.STRING,
    locationX: DataTypes.STRING,
    img_url: DataTypes.STRING,
    info: DataTypes.STRING,
    accessible_toilet_male: DataTypes.BOOLEAN,
    accessible_toilet_female: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'toilet',
  });
  return toilet;
};