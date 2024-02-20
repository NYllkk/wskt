const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize.js");

const Group = sequelize.define("Group", {
    GroupName: {
        type: DataTypes.STRING,
    },
    GroupDescription: {
        type: DataTypes.STRING,
    },
    GroupMember: {
        type: DataTypes.STRING
    },
});
module.exports = Group
