const mongoose = require("mongoose");
const { Schema } = mongoose;

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

const User = mongoose.model("user", UserSchema);

module.exports = User;
