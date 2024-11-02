const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const verifyToken = require("../middleware/verifytoken");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, "./config.env") });

// Secret key for JWT token.
const JWT_SECRET = process.env.JSONWEBTOKEN;

// Route 1: Create a User using POST "/api/auth/createuser". No login required
router.post(
  "/createuser",
  [
    // Validation for incoming request data (name, email, password)
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password is invalid.")
      .isLength({
        min: 8,
      })
      .withMessage("Password should be at least 8 characters.")
      .matches(/.*[a-z].*/)
      .withMessage("Password should contain at least one lowercase letter.") // at least one lowercase letter
      .matches(/.*[A-Z].*/)
      .withMessage("Password should contain at least one uppercase letter.") // at least one uppercase letter
      .matches(/.*[0-9].*/)
      .withMessage("Password should contain at least one numeric value."), // at least one number
  ],
  async (req, res) => {
    let success = false; // Initialize success status

    // If there are validation errors, return Bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, error: errors.array() });
    }

    // Try-catch block to handle errors and exceptions
    try {
      // Check whether the user with this email already exists
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        // Corrected to check if 'user' (not 'User') exists
        return res.status(400).json({
          success,
          error: "Sorry, a user with this email already exists.",
        });
      }

      // Generate salt and hash the password before storing
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      const { role } = req.body;

      // Create a new user in the database
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass, // Store the hashed password
        role: role === "admin" ? "admin" : "user",
      });

      // JWT payload containing the user's unique ID
      const data = {
        user: {
          id: user.id,
        },
      };

      // Generate JWT token using the user's ID and secret key
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true; // Mark success as true after user is successfully created
      res.json({ success, authToken }); // Send success response with JWT token
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error.");
    }
  }
);

// Route 2: Login a User using POST "/api/auth/login". No login required
router.post(
  "/login",
  [
    // Validation for incoming request data (email and password)
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false; // Initialize success status

    // If there are validation errors, return Bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, error: errors.array() });
    }

    // Destructure email and password from the request body
    const { email, password } = req.body;

    try {
      // Find the user with the given email
      let user = await User.findOne({ email });
      if (!user) {
        // Return if user does not exist
        return res.status(400).json({
          success,
          error: "Please try to login with correct credentials.",
        });
      }

      // Compare the provided password with the stored hashed password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        // Return if password does not match
        return res.status(400).json({
          success,
          error: "Please enter correct credentials to login.",
        });
      }

      // JWT payload containing the user's unique ID
      const data = {
        user: {
          id: user.id,
        },
      };

      // Generate JWT token using the user's ID and secret key
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true; // Mark success as true after successful login
      res.json({ success, authToken }); // Send success response with JWT token
    } catch (error) {
      console.error(error.message); // Log the error message for debugging
      res.status(500).send("Internal server error."); // Send generic error message
    }
  }
);

// Route3: Get loggedin User Details using: POST "/api/auth/getuser". Login required
router.get("/getuser", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id; // The ID is extracted from the JWT payload
    const user = await User.findById(userId).select("-password"); // Fetch user excluding the password
    res.json(user);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

// Route4: Change password using: PUT "/api/auth/changepassword". Login required
router.put("/changepassword/:id", verifyToken, async (req, res) => {
  try {
    // Extract password from request body
    const { password } = req.body;

    // Validate password length (min 8 characters)
    if (
      !password ||
      password.length < 8 ||
      !/[a-z]/.test(password) ||
      !/[A-Z]/.test(password) ||
      !/\d/.test(password)
    ) {
      return res.status(400).send("Password is not valid.");
    }

    // Find user by ID from URL parameter
    const userId = new mongoose.Types.ObjectId(req.params.id);
    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found.");
    }

    // Hash password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user password
    user = await User.findByIdAndUpdate(
      userId,
      { $set: { password: hashedPassword } }, // Update password directly
      { new: true }
    );

    res.json({ user });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error.");
  }
});

// Route5: Forgot Password using: POST "/api/auth/forgotpassword". No login required
router.post("/forgotpassword", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Email validation (add your preferred regex pattern)
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Email not found." });
    }

    // Password validation
    if (
      !password ||
      password.length < 8 ||
      !/[a-z]/.test(password) ||
      !/[A-Z]/.test(password) ||
      !/\d/.test(password)
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Password is not valid." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ success: true, message: "Password reset successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

module.exports = router;
