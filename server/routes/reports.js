// server/routes/reports.js
import express from 'express';
const router = express.Router();
import * as reportController from '../controllers/reportController.js'; // Assuming reportController exports are named
import auth from '../middleware/auth.js';

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

export default router;