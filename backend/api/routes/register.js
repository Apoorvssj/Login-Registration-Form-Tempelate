// Here we are handling backend api of our registerion page

const router = require("express").Router();
const User = require("../models/userModel");
const otp = require("../models/otpModel");
const bcrypt = require("bcryptjs");

router.post("/register", async (req, res) => {
  try {
    // FindEmail = await User.findOne({ email: req.body.email });
    // if (FindEmail) {
    //   throw new Error("user already exists"); //this error goes in our frontend catch response
    //   // return res.status(403).json("user already exists");
    // }

    Foundotp = await otp.findOne({ email: req.body.email, otp: req.body.otp });
    if (!Foundotp) {
      throw new Error("otp does not match"); //sending err to catch()
      // return res.status(403).json("otp does not match");
    }
    //password ecryption using bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    const save = await user.save(); //saving to mongoDB database
    res.status(200).json({
      register: true,
    });
  } catch (err) {
    // res.status(403).json(err);
    res.status(403).json({ error: err.message }); //this is send in 2nd then() of fetch in frontend as a response
  }
});

module.exports = router;
