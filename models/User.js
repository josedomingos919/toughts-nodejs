const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/conn");

const User = sequelize.define("User", {
  name: {
    type: DataTypes.STRING,
    require: true,
  },
  email: {
    type: DataTypes.STRING,
    require: true,
  },
  senha: {
    type: DataTypes.STRING,
    require: true,
  },
});

module.exports = { User };
