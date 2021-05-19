// Generating random otp
const router = require("express").Router();
const otpModel = require("../models/otpModel");
const User = require("../models/userModel");
const nodemailer = require("nodemailer");
const user = process.env.emailID;
const pass = process.env.password;

let mailTransporter = nodemailer.createTransport({
  port: 465,
  secure: true,
  host: "smtp.gmail.com",
  auth: {
    user: `${user}`,
    pass: `${pass}`,
  },
});

let getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
};

router.post("/otp", async (req, res) => {
  try {
    FindEmail = await User.findOne({ email: req.body.email });
    if (FindEmail) {
      throw new Error("user already exists"); //sending err to catch()
      // return res.status(403).json("user already exists");
    }
    let genotp = getRandomInt(100001, 999999);
    const Foundemail = await otpModel.findOne({ email: req.body.email });

    let sendmail = async () => {
      await mailTransporter.sendMail({
        from: `${user}`,
        to: req.body.email,
        subject: "OTP for you",
        html: `
        <div>
          <h1>Email Confirmation</h1>
          <h2>Hello ${req.body.email}</h2>
          <p>${genotp}</p>
        </div>
        `,
      });
    };

    if (Foundemail) {
      genotp = Foundemail.otp;
      sendmail();
      return res.status(200).json(Foundemail);
    }

    const NEW_OTP = new otpModel({
      email: req.body.email,
      otp: genotp,
    });

    const save = await NEW_OTP.save(sendmail()); //saving to mongoDB database
    res.status(200).json("Otp sent");
  } catch (err) {
    // res.send(err.message);
    // res.status(403).json(err);
    res.status(403).json({ error: err.message }); //this is send in 2nd then() of fetch in frontend as a response
    console.log(err);
  }
});

module.exports = router;
