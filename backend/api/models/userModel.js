const mongoose = require("mongoose");

// an ideal user schema , you can change however you please.
const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 6,
    max: 20,
  },
  email: {
    type: String,
    required: true,
    min: 10,
    max: 40,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
