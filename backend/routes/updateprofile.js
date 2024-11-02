const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Import User model
const verifyToken = require("../middleware/verifytoken"); // Import token verification middleware

// Route: Update admin profile using PUT "/api/updateprofile/updateadmin" Requires login
router.put("/updateadmin/:id", verifyToken, async (req, res) => {
  try {
    // Extract specific fields from request body
    const { name, email, profilePicture, bio } = req.body;

    // Validate name
    if (!name || name.length < 3) {
      return res.status(400).send("Name is not valid");
    }

    // Validate email pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return res.status(400).send("Email is not valid");
    }

    // Validate bio length
    if (bio.length < 10) {
      return res.status(400).send("Bio is not valid");
    }

    // Convert URL parameter to MongoDB ObjectId
    const userId = new mongoose.Types.ObjectId(req.params.id);

    // Find user by id
    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found.");
    }

    // Create update object with only provided fields
    const update = {};
    if (name) update.name = name;
    if (email) update.email = email;
    if (profilePicture) update.profilePicture = profilePicture;
    if (bio) update.bio = bio;

    // Update user document
    user = await User.findByIdAndUpdate(
      userId,
      { $set: update },
      { new: true }
    );

    // Return updated user
    res.json({ user });
  } catch (error) {
    // Log error message
    console.log(error.message);
    // Return internal server error
    res.status(500).send("Internal Server Error.");
  }
});

// Route: Update user profile using PUT "/api/updateprofile/updateuser" Requires login
router.put("/updateuser/:id", verifyToken, async (req, res) => {
  try {
    // Extract specific fields from request body
    const {
      name,
      email,
      profilePicture,
      bio,
      resume,
      skills,
      experience,
      education,
    } = req.body;

    // Validate name
    if (!name || name.length < 3) {
      return res.status(400).send("Name is not valid");
    }

    // Validate email pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return res.status(400).send("Email is not valid");
    }

    // Validate bio length
    if (bio.length < 10) {
      return res.status(400).send("Bio is not valid");
    }

    // Validate skills (assuming at least three skill required)
    if (!skills || skills.length < 3) {
      return res.status(400).send("At least three skills are required");
    }

    // Validate experience format (e.g., "2 years", "5+ years")
    const experiencePattern = /^\d+(?:\+)? years?$/;
    if (experience && !experiencePattern.test(experience)) {
      return res.status(400).send("Invalid experience format");
    }

    // Validate education
    if (education) {
      if (
        !education.degreeLevel ||
        !education.degreeTitle ||
        !education.institutionName
      ) {
        return res.status(400).send("Education is missing required fields");
      }
      if (
        !education.startDate ||
        (!education.endDate && !education.currentlyStudying)
      ) {
        return res.status(400).send("Education has invalid dates");
      }
    }

    const userId = new mongoose.Types.ObjectId(req.params.id);

    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found.");
    }

    // Create update object with only provided field
    const update = {};
    if (name) update.name = name;
    if (email) update.email = email;
    if (profilePicture) update.profilePicture = profilePicture;
    if (bio) update.bio = bio;
    if (resume) update.resume = resume;
    if (skills) update.skills = skills;
    if (experience) update.experience = experience;
    if (education) update.education = education;

    // Update user object
    user = await User.findByIdAndUpdate(
      userId,
      { $set: update },
      { new: true }
    );

    // Return updated user
    res.json({ user });
  } catch (error) {
    // Log error message
    console.log(error.message);
    // Return internal server error
    res.status(500).send("Internal Server Error.");
  }
});

// Export router
module.exports = router;
