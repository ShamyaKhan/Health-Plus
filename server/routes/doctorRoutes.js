const express = require("express");
const doctorAuth = require("../middlewares/doctorAuth");
const {
  doctorsList,
  doctorLogin,
  doctorAppointments,
  appointmentComplete,
  appointmentCancel,
  doctorDashboard,
  doctorProfile,
  updateDoctorProfile,
} = require("../controllers/doctorController");

const router = express.Router();

router.get("/list", doctorsList);

router.post("/login", doctorLogin);

router.get("/appointments", doctorAuth, doctorAppointments);

router.post("/complete-appointment", doctorAuth, appointmentComplete);

router.post("/cancel-appointment", doctorAuth, appointmentCancel);

router.get("/dashboard", doctorAuth, doctorDashboard);

router.get("/profile", doctorAuth, doctorProfile);

router.post("/update-profile", doctorAuth, updateDoctorProfile);

module.exports = router;
