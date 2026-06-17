const express = require("express");
const {
  registerUser,
  UserLogin,
  getUserProfile,
  updateUserProfile,
  bookAppointment,
  getUserAppointments,
  cancelAppointment,
  verifyPayment,
  payOnline,
} = require("../controllers/userController");
const userAuth = require("../middlewares/userAuth");
const upload = require("../middlewares/multer");

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", UserLogin);

router.get("/get-profile", userAuth, getUserProfile);

router.post(
  "/update-profile",
  upload.single("image"),
  userAuth,
  updateUserProfile,
);

router.post("/book-appointment", userAuth, bookAppointment);

router.get("/appointments", userAuth, getUserAppointments);

router.post("/cancel-appointment", userAuth, cancelAppointment);

router.post("/pay-online", userAuth, payOnline);

router.post("/verify-payment", verifyPayment);

module.exports = router;
