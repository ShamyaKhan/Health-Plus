const jwt = require("jsonwebtoken");
const {
  JWT_SECRET,
  ADMIN_EMAIL,
  ADMIN_PASSWORD,
} = require("../utils/constants");

const adminAuth = async (req, res, next) => {
  try {
    const { adminToken } = req.headers;

    if (!adminToken) {
      return res.json({ success: false, message: "Unauthorized Access!" });
    }

    const decodedToken = jwt.verify(adminToken, JWT_SECRET);

    if (decodedToken !== ADMIN_EMAIL + ADMIN_PASSWORD) {
      return res.json({ success: false, message: err.message });
    }

    next();
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

module.exports = adminAuth;
