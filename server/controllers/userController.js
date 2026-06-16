const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { JWT_SECRET } = require("../utils/constants");

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing Details!" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid Email Address!" });
    }

    if (password.length < 8) {
      return res.json({ success: false, message: "Password too short!" });
    }

    const salt = await bcrypt.genSalt(8);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    const newUser = new User(userData);
    const user = await newUser.save();
    const token = await jwt.sign({ id: user._id }, JWT_SECRET);

    res.json({ success: true, token });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

const UserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User Not Found!" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.json({ success: false, message: "Invalid Credentials!" });
    }

    const token = await jwt.sign({ id: user._id }, JWT_SECRET);

    res.json({ success: true, token });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await User.findById(userId).select("-password");
    res.json({ success: true, user: userData });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

module.exports = { registerUser, UserLogin, getUserProfile };
