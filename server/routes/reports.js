// server/routes/reports.js
const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const auth = require('../middleware/auth');

// @route   GET api/reports/user/:userId
// @desc    Get all reports for a user
// @access  Public
router.get('/user/:userId', reportController.getUserReports);

// @route   POST api/reports
// @desc    Create a new report
// @access  Private
router.post('/', auth, reportController.createReport);

// @route   PUT api/reports/:id
// @desc    Update a report
// @access  Private
router.put('/:id', auth, reportController.updateReport);

// @route   GET api/reports/:id
// @desc    Get a report by ID
// @access  Public
router.get('/:id', reportController.getReportById);

module.exports = router;
