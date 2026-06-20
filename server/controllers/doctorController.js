const Doctor = require("../models/Doctor");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/constants");
const Appointment = require("../models/Appointment");

const changeAvailability = async (req, res) => {
  try {
    const { docId } = req.body;
    const doctor = await Doctor.findById(docId);
    await Doctor.findByIdAndUpdate(docId, { available: !doctor.available });
    res.json({ success: true, message: "Availability Updated!" });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

const doctorsList = async (req, res) => {
  try {
    const doctors = await Doctor.find({}).select(["-password", "-email"]);
    res.json({ success: true, doctors });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

const doctorLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await Doctor.findOne({ email });

    if (!doctor) {
      return res.json({ success: false, message: "Doctor Not Found!" });
    }

    const passwordMatch = await bcrypt.compare(password, doctor.password);

    if (!passwordMatch) {
      return res.json({ success: false, message: "Invalid Credentials" });
    }

    const token = jwt.sign({ id: doctor._id }, JWT_SECRET);

    res.json({ success: true, token });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

const doctorAppointments = async (req, res) => {
  try {
    const { docId } = req.body;
    const appointments = await Appointment.find({ docId });
    res.json({ success: true, appointments });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

const appointmentComplete = async (req, res) => {
  try {
    const { docId, appointmentId } = req.body;
    const appointmentData = await Appointment.findById(appointmentId);

    if (!appointmentData || appointmentData.docId !== docId) {
      return res.json({ success: false, message: "Mark Failed!" });
    }

    await Appointment.findByIdAndUpdate(appointmentId, { isComplete: true });

    res.json({ success: true, message: "Appointment Complete!" });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

const appointmentCancel = async (req, res) => {
  try {
    const { docId, appointmentId } = req.body;
    const appointmentData = await Appointment.findById(appointmentId);

    if (!appointmentData || appointmentData.docId !== docId) {
      return res.json({ success: false, message: "Cancellation Failed!" });
    }

    await Appointment.findByIdAndUpdate(appointmentId, { cancelled: true });

    res.json({ success: true, message: "Appointment Cancelled!" });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

const doctorDashboard = async (req, res) => {
  try {
    const { docId } = req.body;
    const appointments = await Appointment.find({ docId });

    let earning = 0;

    appointments.map((item) => {
      if (item.isComplete || item.payment) {
        earning += item.amount;
      }
    });

    let patients = [];

    appointments.map((item) => {
      if (!patients.includes(item.userId)) {
        patients.push(item.userId);
      }
    });

    const dashboardData = {
      earning,
      patients: patients.length,
      appointments: appointments.length,
      latestAppointments: appointments.reverse().slice(0, 5),
    };

    res.json({ success: true, dashboardData });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

const doctorProfile = async (req, res) => {
  try {
    const { docId } = req.body;
    const profileData = await Doctor.findById(docId).select("-password");

    if (!profileData) {
      return res.json({ success: false, message: "Doctor Not Found!" });
    }

    res.json({ success: true, profileData });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

const updateDoctorProfile = async (req, res) => {
  try {
    const { docId, fees, address, available } = req.body;

    await Doctor.findByIdAndUpdate(docId, { fees, address, available });

    res.json({ success: true, message: "Profile Updated!" });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

module.exports = {
  changeAvailability,
  doctorsList,
  doctorLogin,
  doctorAppointments,
  appointmentComplete,
  appointmentCancel,
  doctorDashboard,
  doctorProfile,
  updateDoctorProfile,
};
