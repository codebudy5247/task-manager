const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
    },
    Password: {
      type: String,
      required: true,
    },
    Email_id: {
      type: String,
      required: true,
      unique: true,
    },
    Role: {
      type: String,
      enum: ["admin", "manager", "developer"],
      default: "developer",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
