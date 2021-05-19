// Here we are handling backend api of our login page

const router = require("express").Router();
const User = require("../models/userModel");
const jwt = require("jsonwebtoken"); //used to givea unique token to a person if he/she is logged in
const bcrypt = require("bcryptjs"); //used to encrypt password

router.post("/login", async (req, res) => {
  try {
    //logic to indetify right email syntax
    // let FoundUser = NaN;
    // function validateEmail(email) {
    //   const re =
    //     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //   return re.test(String(email).toLowerCase());
    // }
    // if (validateEmail(req.body.nameValue)) {
    //changed nameValue to email
    FoundUser = await User.findOne({ email: req.body.email }); //findone is only for unique elements
    // } else {
    //   FoundUser = await User.findOne({ username: req.body.nameValue });
    // }
    if (!FoundUser) {
      throw new Error("user does not exist");
      // return res.status(403).json("user not found");
    }
    const validPass = await bcrypt.compare(
      req.body.password,
      FoundUser.password
    );
    if (!validPass) {
      throw new Error("invalid password");
      // return res.status(403).json("invalid password");
    }

    //assinging token
    const token = await jwt.sign(
      { userID: FoundUser._id },
      process.env.jwt_key
    );

    return res.status(200).json({ login: true, token: token });
  } catch (err) {
    // res.status(403).json(err);
    res.status(403).json({ error: err.message });
  }
});

module.exports = router;
