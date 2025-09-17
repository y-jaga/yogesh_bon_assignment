require("dotenv").config();
const mongoose = require("mongoose");

const mongoUri = process.env.MONGODB_URI;

const connnectDB = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log("MONGODB connected successfully.");
  } catch (error) {
    console.error("MONGODB connection FAILED", error.message);
    process.exit(1);
  }
};

module.exports = { connnectDB };
