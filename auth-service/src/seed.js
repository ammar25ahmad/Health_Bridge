import 'dotenv/config';
import mongoose from 'mongoose';
import User from './models/User.js';

const DEMO_USERS = [
  { name: 'Admin User', email: 'admin@healthbridge.local', password: 'demo123', role: 'ADMIN' },
  { name: 'Organization User', email: 'organization@healthbridge.local', password: 'demo123', role: 'ORGANIZATION' },
  { name: 'Citizen User', email: 'citizen@healthbridge.local', password: 'demo123', role: 'CITIZEN' },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/healthbridge');
    console.log('Connected to MongoDB');

    for (const userData of DEMO_USERS) {
      const existing = await User.findOne({ email: userData.email });
      if (existing) {
        console.log(`  ${userData.email} already exists (${existing.role})`);
      } else {
        await User.create(userData);
        console.log(`  Created ${userData.email} (${userData.role})`);
      }
    }

    console.log('Seed complete');
  } catch (error) {
    console.error('Seed failed:', error.message);
  } finally {
    await mongoose.disconnect();
  }
}

seed();
