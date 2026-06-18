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
const Appointment = require("../models/Appointment");
const User = require("../models/User");

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
      experience,
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
      const token = await jwt.sign(email + password, JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid Credentials!" });
    }
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

const allDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({}).select("-password");
    res.json({ success: true, doctors });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

const appointmentsAdmin = async (req, res) => {
  try {
    const appointments = await Appointment.find({});
    res.json({ success: true, appointments });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

const cancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const appointmentData = await Appointment.findById(appointmentId);

    await Appointment.findByIdAndUpdate(appointmentId, { cancelled: true });

    const { docId, slotDate, slotTime } = appointmentData;

    const doctorData = await Doctor.findById(docId);

    let slots_booked = doctorData.slots_booked;

    slots_booked[slotDate] = slots_booked[slotDate].filter(
      (e) => e !== slotTime,
    );

    await Doctor.findByIdAndUpdate(docId, { slots_booked });

    res.json({ success: true, message: "Appointment Cancelled!" });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

const adminDashboard = async (req, res) => {
  try {
    const doctors = await Doctor.find({});
    const users = await User.find({});
    const appointments = await Appointment.find({});

    const dashboardData = {
      doctors: doctors.length,
      appointments: appointments.length,
      patients: users.length,
      latestAppointments: appointments.reverse().slice(0, 5),
    };

    res.json({ success: true, dashboardData });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

module.exports = {
  createDoctor,
  adminLogin,
  allDoctors,
  appointmentsAdmin,
  cancelAppointment,
  adminDashboard,
};
