// server/controllers/reportController.js
const Report = require('../models/Report');
const User = require('../models/User');

// Get all reports for a user
exports.getUserReports = async (req, res) => {
  try {
    const reports = await Report.find({ userId: req.params.userId }).sort({ day: 1 });
    res.json(reports);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Create a new report
exports.createReport = async (req, res) => {
  const { userId, date } = req.body;

  try {
    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Find the highest day number for this user
    const userReports = await Report.find({ userId });
    const highestDay = userReports.length > 0 
      ? Math.max(...userReports.map(report => report.day))
      : 0;

    // Create new report
    const newReport = new Report({
      userId,
      date,
      day: highestDay + 1
    });

    const report = await newReport.save();
    res.json(report);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Update a report
exports.updateReport = async (req, res) => {
  const { content } = req.body;

  try {
    let report = await Report.findById(req.params.id);
    if (!report) {
      return res.status(404).json({ msg: 'Report not found' });
    }

    // Check if user owns this report
    if (report.userId.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    // Update report
    report.content = content;
    await report.save();
    res.json(report);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Report not found' });
    }
    res.status(500).send('Server error');
  }
};

// Get a report by ID
exports.getReportById = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) {
      return res.status(404).json({ msg: 'Report not found' });
    }
    res.json(report);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Report not found' });
    }
    res.status(500).send('Server error');
  }
};
