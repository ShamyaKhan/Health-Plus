const validator = require("validator");
const bcrypt = require("bcrypt");
const { v2 } = require("cloudinary");
const Doctor = require("../models/Doctor");
const jwt = require("jsonwebtoken");
const {
  ADMIN_EMAIL,
  ADMIN_PASSWORD,
  JWT_SECRET,
} = require("../utils/constants");

const createDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      degree,
      specialty,
      experience,
      about,
      fees,
      address,
    } = req.body;

    const imageFile = req.file;

    if (
      !name ||
      !email ||
      !password ||
      !degree ||
      !specialty ||
      !experience ||
      !about ||
      !fees ||
      !address
    ) {
      return res.json({ success: false, message: "Missing Details!" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid Email!" });
    }

    if (password.length < 8) {
      return res.json({ success: false, message: "Password too short!" });
    }

    const salt = await bcrypt.genSalt(7);

    const hashedPassword = await bcrypt.hash(password, salt);

    const imageUpload = await v2.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const imageUrl = imageUpload.secure_url;

    const doctorData = {
      name,
      email,
      password: hashedPassword,
      image: imageUrl,
      specialty,
      degree,
      about,
      fees,
      address: JSON.parse(address),
      date: Date.now(),
    };

    const newDoctor = new Doctor(doctorData);

    await newDoctor.save();

    res.json({ success: true, message: "Doctor Created!" });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const token = jwt.sign(email + password, JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid Credentials!" });
    }
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

module.exports = { createDoctor, adminLogin };
