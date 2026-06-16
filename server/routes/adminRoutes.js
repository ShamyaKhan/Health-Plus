const express = require("express");
const upload = require("../middlewares/multer");
const {
  createDoctor,
  adminLogin,
  allDoctors,
} = require("../controllers/adminController");
const adminAuth = require("../middlewares/adminAuth");
const { changeAvailability } = require("../controllers/doctorController");

const router = express.Router();

router.post("/create-doctor", adminAuth, upload.single("image"), createDoctor);

router.post("/login", adminLogin);

router.post("/all-doctors", adminAuth, allDoctors);

router.post("/change-availability", adminAuth, changeAvailability);

module.exports = router;
