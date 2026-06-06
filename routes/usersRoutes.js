const express = require("express");
const { registerUser, loginUser,currentUser } = require("../controller/usercontroller");
const validateToken = require("../middleware/validatetoken");
const router = express.Router();
router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/current", validateToken,currentUser);
module.exports=router;