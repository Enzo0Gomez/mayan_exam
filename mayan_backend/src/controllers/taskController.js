const { Op } = require("sequelize");
const Task = require("../models/Task");

// GET /api/tasks?search=&status=
exports.getTasks = async (req, res) => {
  try {
    const { search, status } = req.query;
    const where = {};

    if (search) {
      where.title = { [Op.iLike]: `%${search}%` };
    }

    if (status === "active") {
      where.is_completed = false;
    } else if (status === "completed") {
      where.is_completed = true;
    }

    const tasks = await Task.findAll({ where, order: [["createdAt", "DESC"]] });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/tasks
exports.addTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !title.trim()) {
      return res.status(400).json({ message: "Title is required" });
    }

    const task = await Task.create({ title, description });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/tasks/:id
exports.updateTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const task = await Task.findByPk(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.title = title ?? task.title;
    task.description = description ?? task.description;
    await task.save();

    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PATCH /api/tasks/:id
exports.toggleTask = async (req, res) => {
  try {
    const { is_completed } = req.body;

    if (typeof is_completed !== "boolean") {
      return res.status(400).json({ message: "is_completed must be a boolean" });
    }

    const task = await Task.findByPk(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.is_completed = is_completed;
    await task.save();
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /api/tasks/:id
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await task.destroy();
    res.status(200).json({ message: "Task deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};