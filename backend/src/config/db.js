// backend/src/config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Validate MONGO_URI exists
        if (!process.env.MONGO_URI) {
            throw new Error('MONGO_URI is not defined in environment variables');
        }
        
        console.log('Connecting to MongoDB...');
        
        // Modern Mongoose (v6+) - no options needed
        const conn = await mongoose.connect(process.env.MONGO_URI);
        
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
        console.log(`📊 Database: ${conn.connection.name}`);
        
        return conn;
        
    } catch (err) {
        console.error('❌ MongoDB connection FAILED:', err.message);
        
        // Exit process with failure
        process.exit(1);
    }
};

module.exports = connectDB;