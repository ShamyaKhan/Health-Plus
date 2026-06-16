const express = require("express");
const {
  registerUser,
  UserLogin,
  getUserProfile,
} = require("../controllers/userController");
const userAuth = require("../middlewares/userAuth");

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", UserLogin);

router.get("/get-profile", userAuth, getUserProfile);

module.exports = router;
