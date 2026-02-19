const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
const path = require("path");

// Carrega o .env explicitamente
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

console.log("📁 Configuração do banco:");
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_NAME:", process.env.DB_NAME);
console.log("DB_HOST:", process.env.DB_HOST);
console.log(
  "DB_PASSWORD:",
  process.env.DB_PASSWORD ? "********" : "NÃO DEFINIDA",
);

if (!process.env.DB_USER || !process.env.DB_PASSWORD) {
  console.error("❌ ERRO: DB_USER ou DB_PASSWORD não definidos!");
  process.exit(1);
}

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: console.log, // Ativa logs do SQL
    define: {
      timestamps: true,
      underscored: true,
    },
  },
);

module.exports = { sequelize };
