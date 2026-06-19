const express = require("express");
const doctorAuth = require("../middlewares/doctorAuth");
const {
  doctorsList,
  doctorLogin,
  doctorAppointments,
  appointmentComplete,
  appointmentCancel,
} = require("../controllers/doctorController");

const router = express.Router();

router.get("/list", doctorsList);

router.post("/login", doctorLogin);

router.get("/appointments", doctorAuth, doctorAppointments);

router.post("/complete-appointment", doctorAuth, appointmentComplete);

router.post("/cancel-appointment", doctorAuth, appointmentCancel);

module.exports = router;
