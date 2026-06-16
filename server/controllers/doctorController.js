const Doctor = require("../models/Doctor");

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
module.exports = { changeAvailability, doctorsList };
