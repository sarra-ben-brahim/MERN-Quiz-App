const User = require('../models/model.user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');

// Register User
module.exports.register = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ errors: { email: { message: "Email already exists" } } });
    }

    try {
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const newUser = await User.create({ name, email, password: hashedPassword });
        return res.status(201).json(newUser);
    } catch (err) {
        // Handle Mongoose validation errors
        if (err.name === 'ValidationError') {
            const errors = {};
            for (const key in err.errors) {
                errors[key] = { message: err.errors[key].message };
            }
            return res.status(400).json({ errors });
        }
        console.error('Error creating user:', err);
        return res.status(500).json({ error: "Internal server error" });
    }
});

// Login User
module.exports.login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Check for missing fields
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    // Compare passwords
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        return res.status(401).json({ message: "Incorrect password" });
    }

    // Generate tokens
    const accessToken = jwt.sign({ id: user._id, email: user.email }, process.env.SECRET_KEY, { expiresIn: '1m' });
    const refreshToken = jwt.sign({ id: user._id, email: user.email }, process.env.SECRET_KEY2, { expiresIn: '5m' });

    // Set cookies
    res.cookie('access_token', accessToken, { maxAge: 60000, httpOnly: true, sameSite: 'strict' });
    res.cookie('refresh_token', refreshToken, { maxAge: 300000, httpOnly: true, sameSite: 'strict' });

    return res.status(200).json({ message: "Login successful" });
});
