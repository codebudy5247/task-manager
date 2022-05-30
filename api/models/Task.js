const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    assignedTo: {
      type: String,
      required: true,
    },
    projectId: mongoose.Types.ObjectId,
    status:{
      type: String,
      enum: ["completed", "workingOn", "notCompleted"],
      default: "notCompleted",
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Task", taskSchema);
