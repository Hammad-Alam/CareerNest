const connectToMongo = require("./db");
const express = require("express");
const app = express();
const port = process.env.PORT;
const cors = require("cors");

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Define API routes
app.use("/api/auth", require("./routes/auth")); // Authentication routes
app.use("/api/updateprofile", require("./routes/updateprofile")); // Profile update routes
app.use("/api/job", require("./routes/job")); // Job management routes
app.use("/api/dashboardstats", require("./routes/dashboardstats")); // Dashboard statistics routes
app.use("/api/application", require("./routes/application")); // Job application routes

// Start server and listen on specified port
app.listen(port, () => {
  console.log(`CareerNest backend listening on port: http://localhost:${port}`);
});

// Establish connection to MongoDB
connectToMongo();
