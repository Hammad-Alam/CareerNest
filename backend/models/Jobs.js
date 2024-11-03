// Import mongoose library
const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define Jobs schema
const JobSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  salary: {
    type: String,
    required: true,
  },
  experience: { type: String, required: true },
  jobType: {
    type: String,
    enum: ["Full-time", "Part-time", "Internship", "Contract"],
  },
  skills: [{ type: String }],
  postedAt: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["Available", "Expired"],
    default: "Available",
  },
});

// Create Jobs model
const Jobs = mongoose.model("job", JobSchema);

// Export Jobs model
module.exports = Jobs;
