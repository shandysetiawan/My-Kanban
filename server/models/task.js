'use strict';
module.exports = (sequelize, DataTypes) => {

  const Sequelize = sequelize.Sequelize

  const Model = Sequelize.Model

  class Task extends Model { }

  Task.init({
    title: DataTypes.STRING,
    category: DataTypes.STRING,
    description: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, { sequelize });
  Task.associate = function (models) {
    Task.belongsTo(models.User)
  };
  return Task;
};