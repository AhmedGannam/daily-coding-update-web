
// server/server.js
import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import connectDB from './config/db.js';

// Load environment variables
config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json({ extended: false }));
app.use(cors());

// Define routes
app.use('/api/auth', (await import('./routes/auth.js')).default);
app.use('/api/reports', (await import('./routes/reports.js')).default);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
