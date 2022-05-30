const express=require('express');
const router=express.Router();
const {LoginUser,getAllUsers} = require("../controller/user");


router.post('/user/signin',LoginUser);
router.get('/users',getAllUsers);

module.exports=router;