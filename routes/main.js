const express = require('express');
const app = express.Router();
const User = require('../models/UserModel')
const mongoose = require('mongoose')

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Find user in database
    const user = await User.findOne({ email });

    // If user not found, redirect to login page with error message
    if (!user) {
        return res.render('login', { error: 'Invalid email or password' });
    }

    // Compare password with hashed password in database
    const passwordMatch = await bcrypt.compare(password, user.password);

    // If passwords don't match, redirect to login page with error message
    if (!passwordMatch) {
        return res.render('login', { error: 'Invalid email or password' });
    }

    // Store user ID in session
    req.session.userId = user._id;

    // Redirect to dashboard
    res.redirect('/dashboard');
});

// Dashboard page
app.get('/dashboard', async (req, res) => {
    // Get user ID from session
    const userId = req.session.userId;

    // If user ID not found, redirect to login page
    if (!userId) {
        return res.redirect('/login');
    }

    // Find user in database by ID
    const user = await User.findById(userId);

    // If user not found, redirect to login page
    if (!user) {
        return res.redirect('/login');
    }

    // Render dashboard page with user data
    res.render('dashboard', { user });
});

// Registration form submission
app.post('/register', async (req, res) => {
    const { email, password } = req.body;

    // Hash password with bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user in database
    await User.create({
        email,
        password: hashedPassword
    });

    // Redirect to login page
    res.redirect('/login');
});

app.get('/login', (res, req) => {
    req.render('login.ejs')
})

module.exports = app