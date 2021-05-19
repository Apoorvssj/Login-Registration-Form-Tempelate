// This of checking if a user is logged in or not , but before it executes loggedIn.js middleware is executed first

const router = require("express").Router();
const isLogged = require("../middlewares/loggedIn");
router.get("/check", isLogged, async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json(user);
  } catch (err) {
    res.status(403).json(err);
  }
});

module.exports = router;
