
// server/controllers/reportController.js
import Report from '../models/Report.js';
import User from '../models/User.js';

// Get all reports for a user
export const getUserReports = async (req, res) => {
  try {
    const reports = await Report.find({ userId: req.params.userId }).sort({ day: 1 });
    res.json(reports);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Create a new report
export const createReport = async (req, res) => {
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
export const updateReport = async (req, res) => {
  const { content, day } = req.body;

  try {
    const report = await Report.findById(req.params.id);
    if (!report) {
      return res.status(404).json({ msg: 'Report not found' });
    }

    // Check ownership
    if (report.userId.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    // Convert day to number and validate
    const dayNumber = Number(day);
    if (isNaN(dayNumber) || dayNumber < 1) {
      return res.status(400).json({ msg: 'Invalid day number' });
    }

    // Update fields
    report.content = content || ''; // Handle empty content
    report.day = dayNumber;
    
    await report.save();
    res.json(report);
    
  } catch (err) {
    console.error(err.message);
    if (err.name === 'CastError') {
      return res.status(400).json({ msg: 'Invalid report ID' });
    }
    res.status(500).send('Server error');
  }
};

// Get a report by ID
export const getReportById = async (req, res) => {
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
