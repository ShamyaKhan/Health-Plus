const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: {
    type: String,
    default:
      "https://cdn.pixabay.com/photo/2017/07/18/23/23/user-2517433_1280.png",
  },
  address: { type: Object, default: { line1: "", line2: "" } },
  phone: { type: String, default: "00000000000" },
  gender: { type: String, default: "Not Selected" },
  dob: { type: String, default: "Not Selected" },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
