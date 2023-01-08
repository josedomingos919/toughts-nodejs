const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/conn");

const { User } = require("./User");

const Tought = sequelize.define("Tought", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },
});

Tought.belongsTo(User);
User.hasMany(Tought);

module.exports = { Tought };
