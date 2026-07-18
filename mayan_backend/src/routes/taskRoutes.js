const express = require("express");
const router = express.Router();
const {
  getTasks,
  addTask,
  updateTask,
  toggleTask,
  deleteTask,
} = require("../controllers/taskController");

router.get("/", getTasks);
router.post("/", addTask);
router.put("/:id", updateTask);
router.patch("/:id", toggleTask);
router.delete("/:id", deleteTask);

module.exports = router;