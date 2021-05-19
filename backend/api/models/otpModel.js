const mongoose = require("mongoose");

//an ideal user schema, you can change however you please
const otpSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    min: 10,
    max: 40,
    unique: true,
  },
  otp: {
    type: Number,
    required: true,
    min: 100001,
    max: 999999,
  },
  createdAt: { type: Date, expires: "10m", default: Date.now },
});

module.exports = mongoose.model("otp", otpSchema);
