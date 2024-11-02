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
      "Invalid education level. Please select from: Bachelor's, Master's, PhD, etc."
    )
      .trim()
      .not()
      .isEmpty(),
    body("linkedin", "Invalid LinkedIn profile URL.")
      .trim()
      .custom((value) => {
        const urlRegex = /^https?:\/\/.+/;
        return urlRegex.test(value);
      }),
    body("portfolio", "Invalid Portfolio URL.")
      .trim()
      .custom((value) => {
        const urlRegex = /^https?:\/\/.+/;
        return urlRegex.test(value);
      }),
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
        portfolio: req.body.portfolio,
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

// Route2: Get all applications using GET "/api/application/fetchallapplication". Login required
router.get("/fetchallapplication", verifyToken, async (req, res) => {
  try {
    const applications = await Applications.find();
    res.json(applications);
  } catch (error) {
    // Handle any errors
    console.error(error);
    res.status(500).json({ message: "Error fetching all applications." });
  }
});

module.exports = router;
