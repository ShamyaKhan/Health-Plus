const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/constants");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res.json({ success: false, message: "Unauthorized Access!" });
    }

    const decodedToken = await jwt.verify(token, JWT_SECRET);

    req.body = req.body || {};
    req.body.userId = decodedToken.id;

    next();
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

module.exports = userAuth;
