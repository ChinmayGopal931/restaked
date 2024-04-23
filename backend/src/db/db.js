//require("dotenv").config({ path: "../.env" });
const mongoose = require("mongoose");

const uri = 'mongodb+srv://automycta:mzzSOCQ3UTkZxg54@restaked0.o1saw.mongodb.net/?retryWrites=true&w=majority&appName=Restaked0';

const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    throw err;
  }
};

module.exports = connectDB;
