const express = require("express");
const { authenticate } = require("../middleware/auth.js");
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../controllers/task.controller.js");

const router = express.Router();

// Todas as rotas de tarefas precisam de autenticação
router.use(authenticate);

router.post("/", createTask);
router.get("/", getTasks);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
