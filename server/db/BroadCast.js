const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize.js")

const Broadcast = sequelize.define("Broadcast", {
    Message: {
        type: DataTypes.STRING,
        // allowNull: false,
    },
    SenderId: {
        type: DataTypes.INTEGER,
        // allowNull: false,
    },
    ReceiverId: {
        type: DataTypes.INTEGER,
        // allowNull: true,
    },
    Timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    Status: {
        type: DataTypes.STRING,
        defaultValue: "sent",
    },
});

module.exports = Broadcast;
