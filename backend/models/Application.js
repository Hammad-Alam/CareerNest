const mongoose = require("mongoose");
const { Schema } = mongoose;

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

const Applications = mongoose.model("application", ApplicationSchema);

module.exports = Applications;
