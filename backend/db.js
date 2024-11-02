const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, "./config.env") });

const mongoURI = process.env.DATABASE;

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB Successfully!");
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
  }
};

module.exports = connectToMongo;
