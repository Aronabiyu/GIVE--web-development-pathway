const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Load environment variables
const envPath = path.join(__dirname, '../.env');
require('dotenv').config({ path: envPath });

console.log('🔑 Resetting admin password...');

async function resetAdminPassword() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');
    
    // Use the Admin model
    const Admin = require('../src/models/Admin');
    
    // Find the admin
    const admin = await Admin.findOne({ email: 'admin@learningcenter.com' });
    
    if (!admin) {
      console.log('❌ Admin not found! Creating new admin...');
      
      // Create new admin if doesn't exist
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('admin123', salt);
      
      const newAdmin = new Admin({
        username: 'admin',
        email: 'admin@learningcenter.com',
        password: hashedPassword,
        role: 'super-admin'
      });
      
      await newAdmin.save();
      console.log('✅ New admin created with password: admin123');
    } else {
      console.log('✅ Admin found, resetting password...');
      
      // Reset password
      const salt = await bcrypt.genSalt(10);
      admin.password = await bcrypt.hash('admin123', salt);
      await admin.save();
      
      console.log('✅ Password reset to: admin123');
    }
    
    // Verify
    const updatedAdmin = await Admin.findOne({ email: 'admin@learningcenter.com' });
    console.log('\n📋 Verification:');
    console.log('   Email:', updatedAdmin.email);
    console.log('   Username:', updatedAdmin.username);
    console.log('   Role:', updatedAdmin.role);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Connection closed');
  }
}

resetAdminPassword();