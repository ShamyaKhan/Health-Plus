const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { v2 } = require("cloudinary");
const Doctor = require("../models/Doctor");
const Appointment = require("../models/Appointment");
const {
  JWT_SECRET,
  STRIPE_SECRET_KEY,
  CURRENCY,
  CLIENT_URL,
} = require("../utils/constants");
const stripe = require("stripe")(STRIPE_SECRET_KEY);

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing Details!" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid Email Address!" });
    }

    if (password.length < 8) {
      return res.json({ success: false, message: "Password too short!" });
    }

    const salt = await bcrypt.genSalt(8);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    const newUser = new User(userData);
    const user = await newUser.save();
    const token = await jwt.sign({ id: user._id }, JWT_SECRET);

    res.json({ success: true, token });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

const UserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User Not Found!" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.json({ success: false, message: "Invalid Credentials!" });
    }

    const token = await jwt.sign({ id: user._id }, JWT_SECRET);

    res.json({ success: true, token });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await User.findById(userId).select("-password");
    res.json({ success: true, userData });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const { userId, name, phone, address, gender, dob } = req.body;
    const imageFile = req.file;

    if (!name || !phone || !gender || !dob) {
      return res.json({ success: false, message: "Missing Data!" });
    }

    await User.findByIdAndUpdate(userId, {
      name,
      phone,
      address: JSON.parse(address),
      dob,
      gender,
    });

    if (imageFile) {
      const imageUpload = await v2.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      const imageUrl = imageUpload.secure_url;
      await User.findByIdAndUpdate(userId, { image: imageUrl });
    }

    res.json({ success: true, message: "Profile Updated!" });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

const bookAppointment = async (req, res) => {
  try {
    const { userId, docId, slotDate, slotTime } = req.body;
    const docData = await Doctor.findById(docId).select("-password");

    if (!docData.available) {
      return res.json({ success: false, message: "Doctor Not Available!" });
    }

    let slots_booked = docData.slots_booked;

    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({ success: false, message: "Slot Not Available!" });
      } else {
        slots_booked[slotDate].push(slotTime);
      }
    } else {
      slots_booked[slotDate] = [];
      slots_booked[slotDate].push(slotTime);
    }

    const userData = await User.findById(userId).select("-password");

    delete docData.slots_booked;

    const appointmentData = {
      userId,
      docId,
      userData,
      docData,
      amount: docData.fees,
      slotTime,
      slotDate,
      date: Date.now(),
    };

    const newAppointment = new Appointment(appointmentData);
    await newAppointment.save();
    await Doctor.findByIdAndUpdate(docId, { slots_booked });

    res.json({ success: true, message: "Appointment Booked!" });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

const getUserAppointments = async (req, res) => {
  try {
    const { userId } = req.body;
    const appointments = await Appointment.find({ userId });
    res.json({ success: true, appointments });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

const cancelAppointment = async (req, res) => {
  try {
    const { userId, appointmentId } = req.body;
    const appointmentData = await Appointment.findById(appointmentId);

    if (appointmentData.userId !== userId) {
      return res.json({ success: false, message: "Unauthorized Action!" });
    }

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

const payOnline = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const appointmentData = await Appointment.findById(appointmentId);

    if (!appointmentData || appointmentData.cancelled) {
      return res.json({ success: false, message: "Appointment Not Found!" });
    }

    const currency = CURRENCY.toLowerCase();

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency,
            product_data: {
              name: `Appointment with Dr. ${appointmentData.docData.name}`,
            },
            unit_amount: appointmentData.amount * 100,
          },
          quantity: 1,
        },
      ],

      success_url: `${CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${CLIENT_URL}/appointments`,

      metadata: {
        appointmentId: appointmentData._id.toString(),
      },
    });

    res.json({ success: true, url: session.url });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const { sessionId } = req.body;

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return res.status(400).json({
        success: false,
        message: "Payment not completed",
      });
    }

    const appointmentId = session.metadata.appointmentId;

    await Appointment.findByIdAndUpdate(appointmentId, { payment: true });

    res.json({ success: true, message: "Payment verified" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

module.exports = {
  registerUser,
  UserLogin,
  getUserProfile,
  updateUserProfile,
  bookAppointment,
  getUserAppointments,
  cancelAppointment,
  payOnline,
  verifyPayment,
};
