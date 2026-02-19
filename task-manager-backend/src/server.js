const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { sequelize } = require("./config/database.js");
const authRoutes = require("./routes/auth.routes.js");
const taskRoutes = require("./routes/task.routes.js");

// Carrega variáveis de ambiente
dotenv.config();

console.log("🚀 Iniciando servidor...");
console.log("Porta:", process.env.PORT);

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Rota de teste
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Servidor funcionando!" });
});

// Conexão com banco
async function startServer() {
  try {
    console.log("🔄 Tentando conectar ao banco de dados...");

    await sequelize.authenticate();
    console.log("✅ Conexão com banco estabelecida!");

    console.log("🔄 Sincronizando modelos...");
    await sequelize.sync({ alter: true });
    console.log("✅ Modelos sincronizados!");

    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
      console.log(`📝 Teste a API: http://localhost:${PORT}/api/health`);
    });
  } catch (error) {
    console.error("❌ Erro fatal:");
    console.error("Mensagem:", error.message);
    console.error("Detalhes:", error);
    process.exit(1);
  }
}

startServer();
