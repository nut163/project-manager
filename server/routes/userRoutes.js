const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passwordUtils = require('../utils/passwordUtils');
const jwtUtils = require('../utils/jwtUtils');

// User login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
        return res.status(400).json({ loginError: 'Invalid username or password' });
    }

    const isValidPassword = await passwordUtils.checkPassword(password, user.password);

    if (!isValidPassword) {
        return res.status(400).json({ loginError: 'Invalid username or password' });
    }

    const token = jwtUtils.generateToken(user);
    res.json({ token, username: user.username });
});

// User signup
router.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });

    if (existingUser) {
        return res.status(400).json({ signupError: 'Username already exists' });
    }

    const hashedPassword = await passwordUtils.hashPassword(password);
    const newUser = new User({ username, password: hashedPassword });

    await newUser.save();
    res.json({ signupSuccess: 'Account created successfully' });
});

// User account management
router.put('/account', jwtUtils.verifyToken, async (req, res) => {
    const { username, password, billingInfo, profileImage } = req.body;
    const user = await User.findById(req.userId);

    if (!user) {
        return res.status(400).json({ accountError: 'User not found' });
    }

    user.username = username || user.username;
    user.password = password ? await passwordUtils.hashPassword(password) : user.password;
    user.billingInfo = billingInfo || user.billingInfo;
    user.profileImage = profileImage || user.profileImage;

    await user.save();
    res.json({ accountSuccess: 'Account updated successfully' });
});

module.exports = router;