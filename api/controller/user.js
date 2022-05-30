const User = require("../models/User");
const bcrypt = require('bcrypt');

exports.LoginUser = async(req,res) =>{
    const { Email_id, Password } = req.body;
  try {
    const oldUser = await User.findOne({Email_id});

    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(Password, oldUser.Password);

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    res.status(200).json({  oldUser,msg:"Login successfull!" });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
}

exports.getAllUsers = async(req,res) =>{
    try {
        const users = await User.find();
        res.status(200).json({ users });
    } catch (err) {
        res.status(500).json({ message: "Something went wrong" });
    }
}
