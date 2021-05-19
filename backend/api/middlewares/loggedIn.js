// This is the middleware(of checkLogin.js) for checking if a user is logged in or not ,wether he/she have an authorised token of not

const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
module.exports = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(403).json({ status: "you need to login" });
    }
    const { userID } = await jwt.verify(authorization, process.env.jwt_key);
    const USER = await User.findById(userID);
    req.user = USER;
    next();
  } catch (err) {
    return res.status(403).json(err);
  }
};
