const Task = require("../models/Task");
const Project = require("../models/Project");

exports.createTask = async (req, res) => {
  try {
    const { projectId, assignedTo, name, status } = req.body;

    const project = await Project.findById(projectId);
    if (!project)
      return res.status(400).json({ msg: "This project does not exist." });

    const newTask = new Task({
      projectId,
      assignedTo,
      name,
      status,
    });

    await Project.findOneAndUpdate(
      { _id: projectId },
      {
        $push: { tasks: newTask },
      },
      { new: true }
    );

    await newTask.save();

    res.json({ newTask });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json({ tasks });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

exports.updateTask = async (req, res) => {
  const { assignedTo, status } = req.body;
  const taskFields = {};
  if (assignedTo) taskFields.assignedTo = assignedTo;
  if (status) taskFields.status = status;
  try {
    let task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ msg: "Task not found" });

    task = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: taskFields },
      { new: true }
    );

    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
