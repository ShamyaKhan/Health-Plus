const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/constants");

const doctorAuth = async (req, res, next) => {
  try {
    const { doctortoken } = req.headers;

    if (!doctortoken) {
      return res.json({ success: false, message: "Unauthorized Access!" });
    }

    const decodedToken = await jwt.verify(doctortoken, JWT_SECRET);

    req.body = req.body || {};
    req.body.docId = decodedToken.id;

    next();
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

module.exports = doctorAuth;
