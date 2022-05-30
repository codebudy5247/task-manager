const express = require("express");
const router = express.Router();
const {createTask,getTasks,updateTask} = require("../controller/task");

router.post("/", createTask);
router.get("/", getTasks);
router.put("/:id", updateTask);

module.exports = router;