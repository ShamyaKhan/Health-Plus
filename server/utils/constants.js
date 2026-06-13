require("dotenv").config();

const PORT = Number(process.env.PORT);
const MONGODB_URI = process.env.MONGODB_URI;

const CLOUDINARY_NAME = process.env.CLOUDINARY_NAME;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_SECRET_KEY = process.env.CLOUDINARY_SECRET_KEY;

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

const JWT_SECRET = process.env.JWT_SECRET;

module.exports = {
  PORT,
  MONGODB_URI,
  CLOUDINARY_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_SECRET_KEY,
  ADMIN_EMAIL,
  ADMIN_PASSWORD,
  JWT_SECRET,
};
