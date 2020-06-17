'use strict';
module.exports = (sequelize, DataTypes) => {

  const Sequelize = sequelize.Sequelize

  const Model = Sequelize.Model

  class User extends Model { }


  User.init({
    email: { type: DataTypes.STRING, allowNull: false, validate: { notNull: { msg: "email must be filled!" }, notEmpty: { msg: "email must be filled!" }, isEmail: { msg: "email must use format email!" } } },
    password: { type: DataTypes.STRING, allowNull: false, validate: { notNull: { msg: "password must be filled!" }, notEmpty: { msg: "password must be filled!" }, len: { args: [[5, 20]], msg: "password between 5-10 characters!" } } },
    organization: { type: DataTypes.STRING, defaultValue: "Hacktiv8" }
  }
    , { sequelize });
  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Task)
  };
  return User;
};