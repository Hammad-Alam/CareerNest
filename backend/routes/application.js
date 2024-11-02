const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Applications = require("../models/Application");
const verifyToken = require("../middleware/verifytoken");

// Route 1: Create a Application using POST "/api/application/createapplication". Login required
router.post(
  "/createapplication",
  verifyToken,
  // Validation for incoming request data
  [
    body("name", "Name is required and must be at least 3 characters long.")
      .trim()
      .isLength({ min: 3 }),
    body("email", "Invalid email address.").trim().isEmail(),
    body("phone", "Phone number must be at least 11 digits long.")
      .trim()
      .isLength({ min: 11 }),
    body("position", "Position is required and must be in format 'Job Title'.")
      .trim()
      .not()
      .isEmpty(),
    body("experience", "Experience must be in format '2+ years'.")
      .trim()
      .matches(/^\d+\+?\s?years?$/i),
    body(
      "education",
      "Invalid job type. Please select from: Full-time, Part-time, Internship, Contract."
    )
      .trim()
      .isIn(["Full-time", "Part-time", "Internship", "Contract"]),
    body("linkedin", "LinkedIn profile URL is required.")
      .trim()
      .not()
      .isEmpty(),
    body("resume", "Resume is required.").trim().not().isEmpty(),
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Create a new application
      const Application = new Applications({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        position: req.body.position,
        experience: req.body.experience,
        education: req.body.education,
        linkedin: req.body.linkedin,
        resume: req.body.resume,
      });

      // Save the application
      await Application.save();

      // Return the created application
      res
        .status(201)
        .json({ message: "Application created successfully", Application });
    } catch (error) {
      // Handle any errors
      console.error(error);
      res.status(500).json({ message: "Error creating application." });
    }
  }
);

module.exports = router;
