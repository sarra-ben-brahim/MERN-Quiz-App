const express = require("express");
const router = express.Router();
const { register, login, logout } = require("../controllers/controller.user");
const { verifyToken, isAdmin } = require("../middleware/middleware.user");
const passport = require("../config/passport-setup");
const jwt = require("jsonwebtoken");

// Public Routes
router.post("/register", register);
router.post("/login", login);

// Google OAuth Routes
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    const token = jwt.sign(
      { id: req.user._id, role: req.user.role },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    // Set cookie with token
    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000,
    });

    // Redirect to frontend dashboard
    //res.redirect("http://localhost:3000/dashboard");

 
    res.status(200).json({
      message: "Logged in successfully",
      user: {
        id: req.user._id,
        firstName: req.user.firstName,
        role: req.user.role
      },
      token
    });
  }
);

// Protected Routes
router.post("/logout", verifyToken, logout);

router.get("/admin", [verifyToken, isAdmin], (req, res) => {
  res.status(200).json({ message: "Welcome, Admin!" });
});


module.exports = router;