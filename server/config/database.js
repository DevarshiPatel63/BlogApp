const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("Grow_Greeky", "Devarshi", "gg@12345", {
  host: "localhost",
  dialect: "postgres",
  logging: true,
});

try {
  sequelize.authenticate();
  console.log("Connected to PostgreSQL successfully");
} catch (error) {
  console.error("Failed to connect to PostgreSQL", error);
}

module.exports = { sequelize };
