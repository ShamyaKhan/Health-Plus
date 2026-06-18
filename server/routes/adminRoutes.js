const express = require("express");
const upload = require("../middlewares/multer");
const adminAuth = require("../middlewares/adminAuth");
const { changeAvailability } = require("../controllers/doctorController");
const {
  createDoctor,
  adminLogin,
  allDoctors,
  appointmentsAdmin,
  cancelAppointment,
  adminDashboard,
} = require("../controllers/adminController");

const router = express.Router();

router.post("/create-doctor", adminAuth, upload.single("image"), createDoctor);

router.post("/login", adminLogin);

router.post("/all-doctors", adminAuth, allDoctors);

router.post("/change-availability", adminAuth, changeAvailability);

router.get("/appointments", adminAuth, appointmentsAdmin);

router.post("/cancel-appointment", adminAuth, cancelAppointment);

router.get("/dashboard", adminAuth, adminDashboard);

module.exports = router;
