require("dotenv").config();
const express = require("express");
const cors = require("cors");

const userRoute = require("./src/routes/user.route.js");
const billRoute = require("./src/routes/bill.route.js");
const rewardRoute = require("./src/routes/reward.route.js");

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json({ limit: "16kB" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

//routes
app.use("/api/v1/users", userRoute);
app.use("/api/v1/bill", billRoute);
app.use("/api/v1/reward", rewardRoute);

module.exports = { app };
