// backend/createAdminProper.js
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Load environment variables
const envPath = path.join(__dirname, './.env');
require('dotenv').config({ path: envPath });

async function createAdminProper() {
  try {
    console.log('🔄 Creating admin with proper Mongoose model...');
    await mongoose.connect(process.env.MONGO_URI);
    
    // Delete existing admin
    const Admin = require('./src/models/Admin');
    await Admin.deleteMany({ 
      $or: [
        { email: 'admin@learningcenter.com' },
        { username: 'admin' }
      ] 
    });
    console.log('🗑️ Cleared existing admin accounts');
    
    // Create new admin using Mongoose model
    const admin = new Admin({
      username: 'admin',
      email: 'admin@learningcenter.com',
      password: 'admin123', // Will be hashed by pre-save hook
      role: 'super-admin'
    });
    
    await admin.save();
    console.log('✅ Admin created with Mongoose model');
    
    // Verify
    const savedAdmin = await Admin.findOne({ email: 'admin@learningcenter.com' });
    console.log('\n📋 Created admin details:');
    console.log('   Email:', savedAdmin.email);
    console.log('   Username:', savedAdmin.username);
    console.log('   Password hash:', savedAdmin.password?.substring(0, 30) + '...');
    
    // Test password comparison
    console.log('\n🔑 Testing password verification:');
    const isMatch = await savedAdmin.comparePassword('admin123');
    console.log('   "admin123" matches:', isMatch);
    
    const isWrong = await savedAdmin.comparePassword('wrong');
    console.log('   "wrong" matches:', isWrong);
    
    if (isMatch) {
      console.log('\n🎉 SUCCESS! Admin should now be able to login.');
      console.log('   Email: admin@learningcenter.com');
      console.log('   Password: admin123');
    } else {
      console.log('\n❌ FAILED: Password comparison failed');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('Stack:', error.stack);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Connection closed');
  }
}

createAdminProper();