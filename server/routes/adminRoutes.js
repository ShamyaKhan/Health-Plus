const express = require("express");
const upload = require("../middlewares/multer");
const { createDoctor, adminLogin } = require("../controllers/adminController");
const adminAuth = require("../middlewares/adminAuth");

const router = express.Router();

router.post("/create-doctor", adminAuth, upload.single("image"), createDoctor);

router.post("/login", adminLogin);

module.exports = router;
