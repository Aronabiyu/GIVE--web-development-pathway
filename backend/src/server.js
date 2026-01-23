// backend/src/server.js (update)
require("dotenv").config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const lessonRoutes = require('./routes/lesson');
const contactRoutes = require('./routes/contact');
const adminRoutes = require('./routes/admin'); // Add this

const app = express();

connectDB();

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'], // Add your frontend URLs
  credentials: true
}));

app.use(express.json());

// Public routes
app.use('/api/lessons', lessonRoutes);
app.use('/api/contact', contactRoutes);

// Admin routes
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});