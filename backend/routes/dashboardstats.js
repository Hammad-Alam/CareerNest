const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const Jobs = require("../models/Jobs");
const User = require("../models/User");
const Applications = require("../models/Application");
const verifyToken = require("../middleware/verifytoken");

// Route to retrieve admin dashboard statistics
router.get("/admin", verifyToken, async (req, res) => {
  try {
    // Retrieve dashboard statistics in parallel
    const [
      totalJobs,
      totalUsers,
      activeJobs,
      expiredJobs,
      topCategory,
      totalApplications,
    ] = await Promise.all([
      Jobs.countDocuments(),
      User.countDocuments(),
      Jobs.countDocuments({ status: "Available" }),
      Jobs.countDocuments({ status: "Expired" }),
      // Get top job category
      Jobs.aggregate([
        { $group: { _id: "$category", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 1 },
      ]),
      Applications.countDocuments(),
    ]);

    res.json({
      totalJobs,
      totalUsers,
      activeJobs,
      expiredJobs,
      topCategory,
      totalApplications,
    });
  } catch (error) {
    // Handle server error
    console.error(error);
    res.status(500).json({ message: "Error retrieving dashboard counts" });
  }
});

module.exports = router;
