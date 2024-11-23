const mongoose = require("mongoose"); // MongoDB object modeling tool
const dotenv = require("dotenv"); // Environment variable management
const path = require("path"); // Path manipulation utility

// Load environment variables from config.env file
dotenv.config({ path: path.join(__dirname, "./config.env") });

// Retrieve MongoDB connection URI from environment variables
const MONGO_URI = process.env.MONGO_URI;

const connectToMongo = async () => {
  try {
    // Attempt to connect to MongoDB using mongoose
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB Successfully!");
  } catch (error) {
    // Handle connection errors
    console.log("Error connecting to MongoDB", error);
  }
};

// Export the connectToMongo function
module.exports = connectToMongo;
