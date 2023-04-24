const router = require('express').Router();
const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));


// Login form submission
router.post('/login', async (req, res) => {
    const { name, password } = req.body;
  
    // Find user in database and compare passwords
    const user = await User.findOne({ name });
    const passwordMatch = password && user.password && await bcrypt.compare(password, user.password);
    
    // If user not found or passwords don't match, show error message
    if (!passwordMatch) {
      return res.render('login.ejs', { error: 'Invalid name or password' });
    }
  
    // Store user ID in session and redirect to dashboard
    req.session.userId = user._id;
    res.redirect('/dashboard');
  });


// Dashboard page
router.get('/dashboard', async (req, res) => {
    // Get user ID and role from session
    const userId = req.session.userId;
    const userRole = req.session.role;

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

    // Render dashboard page with user data and role
    if (userRole === 'admin') {
        res.render('admin.ejs', { user });
    } else {
        res.render('dash.ejs', { user });
    }
});

// Registration form submission
router.post('/register', async (req, res) => {
    const { name, password } = req.body;

    // Hash password with bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user in database
    const user = new User({
        name,
        password: hashedPassword
    });
    user.save();

    // Redirect to login page
    res.redirect('/login');
});

// Login page
router.get('/login', (req, res) => {
    res.render('login.ejs');
});

// Registration page
router.get('/register', (req, res) => {
    res.render('register.ejs');
});

module.exports = router;
