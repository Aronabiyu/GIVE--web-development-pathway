// backend/testAdminLogin.js
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Load environment variables
const envPath = path.join(__dirname, './.env');
require('dotenv').config({ path: envPath });

async function testAdminLogin() {
  try {
    console.log('🔐 Testing admin login...');
    await mongoose.connect(process.env.MONGO_URI);
    
    const Admin = require('./src/models/Admin');
    
    // Find admin
    const admin = await Admin.findOne({ email: 'admin@learningcenter.com' });
    
    if (!admin) {
      console.log('❌ Admin not found in database');
      return;
    }
    
    console.log('\n📋 Admin found:');
    console.log('   Email:', admin.email);
    console.log('   Username:', admin.username);
    console.log('   Password hash length:', admin.password?.length || 0);
    
    // Test password comparison
    console.log('\n🔑 Testing password "admin123":');
    const isMatch = await admin.comparePassword('admin123');
    console.log('   Password matches:', isMatch);
    
    if (!isMatch) {
      console.log('\n💡 Trying to check hash manually...');
      try {
        const manualCheck = await bcrypt.compare('admin123', admin.password);
        console.log('   Manual bcrypt.compare result:', manualCheck);
      } catch (bcryptError) {
        console.log('   Bcrypt error:', bcryptError.message);
      }
    }
    
    // Test wrong password
    console.log('\n🔑 Testing wrong password "wrongpass":');
    const isWrongMatch = await admin.comparePassword('wrongpass');
    console.log('   Wrong password matches:', isWrongMatch);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Connection closed');
  }
}

testAdminLogin();