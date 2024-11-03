// Import mongoose library
const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define User Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["user", "admin"],
    default: "user",
  },
  profilePicture: {
    type: String,
    default: "",
  },
  bio: {
    type: String,
    default: "",
  },
  skills: [{ type: String }],
  resume: {
    type: String,
    default: "",
  },
  experience: { type: String, default: "" },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Create Users Model
const User = mongoose.model("user", UserSchema);

// Export Users Model
module.exports = User;
