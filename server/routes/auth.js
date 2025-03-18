// server/routes/auth.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

// @route   POST api/auth/register
// @desc    Register user & get token
// @access  Public
router.post('/register', authController.register);

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', authController.login);

// @route   GET api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', auth, authController.getCurrentUser);

// @route   GET api/auth/users
// @desc    Get all users
// @access  Public
router.get('/users', authController.getAllUsers);

// @route   GET api/auth/users/:id
// @desc    Get user by ID
// @access  Public
router.get('/users/:id', authController.getUserById);

module.exports = router;
