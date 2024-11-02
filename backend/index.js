const connectToMongo = require("./db");
const express = require("express");
const app = express();
const port = process.env.PORT;
const cors = require("cors");

app.use(cors());
app.use(express.json());

// Available Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/updateprofile", require("./routes/updateprofile"));
app.use("/api/job", require("./routes/job"));
app.use("/api/dashboardstats", require("./routes/dashboardstats"));
app.use("/api/application", require("./routes/application"));

app.listen(port, () => {
  console.log(`CareerNest backend listening on port: http://localhost:${port}`);
});
connectToMongo();
