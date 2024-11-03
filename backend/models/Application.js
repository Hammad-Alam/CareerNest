// Import mongoose library
const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define Application schema
const ApplicationSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  position: { type: String, required: true },
  experience: { type: String, required: true },
  education: { type: String, required: true },
  linkedin: { type: String, required: true },
  portfolio: { type: String, required: true },
  postedAt: { type: Date, default: Date.now },
});

// Create Applications model
const Applications = mongoose.model("application", ApplicationSchema);

// Export Applications model
module.exports = Applications;
