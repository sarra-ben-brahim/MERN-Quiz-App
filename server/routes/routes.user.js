const express = require("express");
const router = express.Router();
const { register, login, logout } = require("../controllers/controller.user");
const { verifyToken, isAdmin } = require("../middleware/middleware.user");

// Public Routes
router.post("/register", register);
router.post("/login", login);

// Protected Routes
router.post("/logout", verifyToken, logout);

// Admin Route
router.get("/admin", [verifyToken, isAdmin], (req, res) => {
  res.status(200).json({ message: "Welcome, Admin!" });
});

module.exports = router;  
