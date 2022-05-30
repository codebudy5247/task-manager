const Project = require("../models/Project");

exports.createProject = async (req, res) => {
  try {
    const { name } = req.body;
    const newProject = new Project({
      name,
    });
    await newProject.save();
    res.json({ newProject });
  } catch (error) {
    return res.status(500).json({ msg: err.message });
  }
};

exports.getProjects = async (req, res) => {
    try {
      const projects = await Project.find().populate("tasks")
      res.status(200).json({
        success: true,
        message: projects ,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: error,
      });
    }
  };
  
