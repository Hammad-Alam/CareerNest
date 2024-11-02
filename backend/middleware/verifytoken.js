var jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({
  path: path.join(__dirname, "./config.env"),
});

// Get the secret key for JSON Web Token verification
const JWT_SECRET = process.env.JSONWEBTOKEN;

// Middleware function to verify JSON Web Token (JWT) in requests.
const verifyToken = (req, res, next) => {
  // Check for JWT in 'auth-token' header
  const token = req.header("auth-token");

  // If token is missing, return 401 Unauthorized error
  if (!token) {
    return res.status(401).send({
      error: "Please authenticate using a valid token",
    });
  }

  try {
    // Verify the token using the secret key
    const data = jwt.verify(token, JWT_SECRET);

    // Extract user data from verified token and add to request object
    req.user = data.user;

    // Proceed to next middleware or route handler
    next();
  } catch (error) {
    // If token verification fails, return 401 Unauthorized error
    return res.status(401).send({
      error: "Please authenticate using a valid token",
    });
  }
};

module.exports = verifyToken;
