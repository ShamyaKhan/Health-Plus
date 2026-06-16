const express = require("express");
const { doctorsList } = require("../controllers/doctorController");

const router = express.Router();

router.get("/list", doctorsList);

module.exports = router;
