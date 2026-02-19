const { Task } = require("../models/Task.js");

const createTask = async (req, res) => {
  try {
    const task = await Task.create({
      ...req.body,
      userId: req.userId,
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      where: { userId: req.userId },
      order: [["order", "ASC"]],
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      where: { id: req.params.id, userId: req.userId },
    });

    if (!task) {
      return res.status(404).json({ error: "Tarefa não encontrada" });
    }

    await task.update(req.body);
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      where: { id: req.params.id, userId: req.userId },
    });

    if (!task) {
      return res.status(404).json({ error: "Tarefa não encontrada" });
    }

    await task.destroy();
    res.json({ message: "Tarefa removida com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createTask, getTasks, updateTask, deleteTask };
