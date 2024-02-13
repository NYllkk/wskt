const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize.js");

const User = sequelize.define("User", {
   name: {
      type: DataTypes.STRING,
      allowNull: false,
   },
   lastName: {
      type: DataTypes.STRING,
      allowNull: false,
   },
   email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
         isEmail: true,
      },
   },
   password: {
      type: DataTypes.STRING,
      allowNull: false,
   },
   profilePicture: {
      type: DataTypes.STRING,
      allowNull: true
   },
   PhoneNumber: {
      type: DataTypes.STRING
   }


});

module.exports = User;