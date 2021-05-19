//library imports
require("dotenv").config();
const cors = require("cors");
const helmet = require("helmet");
const express = require("express");
const app = express();
const port = 5000; //custom port
app.use(cors());
// local imports
const registerRoute = require("./routes/register");
const loginRoute = require("./routes/login");
const check = require("./routes/checkLogin");
const otp = require("./routes/otp");

//mongoose connnect
const mongoose = require("mongoose");
mongoose.connect(process.env.mongo_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () =>
  console.log("I am connected to mongodb")
);

//middleware
app.use(express.json());
app.use(helmet()); //install helmet npm and also see morgon npm

//example
app.get("/", (req, res) => {
  res.send("Hello World!");
});

//routes used
// /api/ for vercel
app.use("/api/", registerRoute);
app.use("/api/", loginRoute);
app.use("/api/", check);
app.use("/api/", otp);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
