const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Jobs = require("../models/Jobs");
const verifyToken = require("../middleware/verifytoken");

// Route 1: Create a Job using POST "/api/job/createjob". Login required
router.post(
  "/createjob",
  verifyToken,
  // Validation for incoming request data
  [
    body("title", "Enter a valid title")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Title must be at least 3 characters"),
    body("description", "Enter a valid description")
      .trim()
      .isLength({ min: 25 })
      .withMessage("Description must be at least 25 characters"),
    body("location", "Enter a valid location")
      .trim()
      .isLength({ min: 2 })
      .withMessage("Location must be at least 2 characters"),
    body("salary", "Invalid salary format")
      .trim()
      .matches(/^[A-Za-z]+\s?\d+,?\d*/)
      .withMessage("Salary must be in format 'RS 10000'"),
    body("experience", "Invalid experience format")
      .trim()
      .matches(/^\d+\+?\s?years?$/i)
      .withMessage("Experience must be in format '2+ years'"),
    body("jobType", "Select a valid job type")
      .trim()
      .isIn(["Full-time", "Part-time", "Internship", "Contract"])
      .withMessage("Invalid job type."),
    body("skills", "Enter at least one skill")
      .trim()
      .isArray({ min: 1 })
      .withMessage("At least one skill is required")
      .custom((skills) => skills.length === new Set(skills).size),
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Create a new job
      const Job = new Jobs({
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        location: req.body.location,
        salary: req.body.salary,
        experience: req.body.experience,
        jobType: req.body.jobType,
        skills: req.body.skills,
        status: req.body.status,
      });

      // Save the job
      await Job.save();

      // Return the created job
      res.status(201).json({ message: "Job created successfully", Job });
    } catch (error) {
      // Handle any errors
      console.error(error);
      res.status(500).json({ message: "Error creating job" });
    }
  }
);

// Route 2: Update an existing job using PUT "/api/job/updatejob". Login required
router.put(
  "/updatejob/:id",
  verifyToken,
  // Validation for incoming request data
  [
    body("title", "Enter a valid title")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Title must be at least 3 characters"),
    body("description", "Enter a valid description")
      .trim()
      .isLength({ min: 25 })
      .withMessage("Description must be at least 25 characters"),
    body("location", "Enter a valid location")
      .trim()
      .isLength({ min: 2 })
      .withMessage("Location must be at least 2 characters"),
    body("salary", "Invalid salary format")
      .trim()
      .matches(/^[A-Za-z]+\s?\d+,?\d*/)
      .withMessage("Salary must be in format 'RS 10000'"),
    body("experience", "Invalid experience format")
      .trim()
      .matches(/^\d+\+?\s?years?$/i)
      .withMessage("Experience must be in format '2+ years'"),
    body("jobType", "Select a valid job type")
      .trim()
      .isIn(["Full-time", "Part-time", "Internship", "Contract"])
      .withMessage("Invalid job type."),
    body("skills", "Enter at least one skill")
      .trim()
      .isArray({ min: 1 })
      .withMessage("At least one skill is required")
      .custom((skills) => skills.length === new Set(skills).size),
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const {
        title,
        description,
        category,
        location,
        salary,
        experience,
        skills,
        jobType,
        status,
      } = req.body;

      // Create a newJob object
      const newJob = {};
      if (title) {
        newJob.title = title;
      }
      if (description) {
        newJob.description = description;
      }
      if (category) {
        newJob.category = category;
      }
      if (location) {
        newJob.location = location;
      }
      if (salary) {
        newJob.salary = salary;
      }
      if (experience) {
        newJob.experience = experience;
      }
      if (jobType) {
        newJob.jobType = jobType;
      }
      if (skills) {
        newJob.skills = skills;
      }
      if (status) {
        newJob.status = status;
      }

      // Find the job to be updated and update it.
      let job = await Jobs.findById(req.params.id);
      if (!job) {
        return res.status(404).send("Not found.");
      }

      job = await Jobs.findByIdAndUpdate(
        req.params.id,
        { $set: newJob },
        { new: true }
      );

      res.status(201).json({ message: "Job updated successfully", job });
    } catch (error) {
      // Handle any errors
      console.error(error);
      res.status(500).json({ message: "Error updating job" });
    }
  }
);

// Route3: Delete a job using DELETE "/api/job/deletejob". Login required.
router.delete("/deletejob/:id", verifyToken, async (req, res) => {
  try {
    // Find the job to be deleted and delete it.
    let job = await Jobs.findById(req.params.id); // It takes the id of the job which you want to delete.
    if (!job) {
      return res.status(404).send("Not found.");
    }

    job = await Jobs.findByIdAndDelete(req.params.id);
    res.status(201).json({ message: "Job deleted successfully", job });
  } catch (error) {
    // Handle any errors
    console.error(error);
    res.status(500).json({ message: "Error deleting job" });
  }
});

// Route4: Get all job using GET "/api/job/fetchalljobs". Login required
router.get("/fetchalljobs", verifyToken, async (req, res) => {
  try {
    const jobs = await Jobs.find();
    res.json(jobs);
  } catch (error) {
    // Handle any errors
    console.error(error);
    res.status(500).json({ message: "Error fetching all jobs." });
  }
});

// Route5: Get job using GET "/api/job/getjob". Login required
router.get("/getjob/:id", verifyToken, async (req, res) => {
  try {
    let job = await Jobs.findById(req.params.id);
    if (!job) {
      return res.status(404).send("Not found.");
    }

    res.json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching job." });
  }
});

// Route6: Search job by category using GET "/api/job/searchjob". Login required.
router.get("/searchjob/:category", verifyToken, async (req, res) => {
  try {
    let job = await Jobs.find({ category: req.params.category });
    if (!job) {
      return res.status(404).send("Not found.");
    }

    res.json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error searching job." });
  }
});

module.exports = router;
