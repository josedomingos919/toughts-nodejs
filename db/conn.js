const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("toughts", "root", "Domingos.1", {
  host: "localhost",
  dialect: "mysql",
});

try {
  sequelize.authenticate();

  console.log("Conectamos com sucesso!");
} catch (err) {
  console.log(`Não foi possivel connectar: ${err}`);
}

module.exports = { sequelize };
