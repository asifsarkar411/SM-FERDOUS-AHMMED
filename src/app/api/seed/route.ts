import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectToDatabase from '@/lib/mongodb';
import Profile from '@/models/Profile';
import Education from '@/models/Education';
import Experience from '@/models/Experience';
import Skill from '@/models/Skill';
import Project from '@/models/Project';
import Hobby from '@/models/Hobby';
import Target from '@/models/Target';
import Gallery from '@/models/Gallery';
import Message from '@/models/Message';
import User from '@/models/User';
import { initialSeedData } from '@/lib/seedData';

export async function POST() {
  try {
    const conn = await connectToDatabase();
    if (!conn) {
      return NextResponse.json(
        { success: false, error: 'Database connection is not configured. Please set MONGODB_URI in your environment.' },
        { status: 500 }
      );
    }

    // 1. Seed or Update Profile
    await Profile.deleteMany({});
    await Profile.create(initialSeedData.profile);

    // 2. Education
    await Education.deleteMany({});
    await Education.insertMany(initialSeedData.education);

    // 3. Experience
    await Experience.deleteMany({});
    await Experience.insertMany(initialSeedData.experience);

    // 4. Skills
    await Skill.deleteMany({});
    await Skill.insertMany(initialSeedData.skills);

    // 5. Projects
    await Project.deleteMany({});
    await Project.insertMany(initialSeedData.projects);

    // 6. Hobbies
    await Hobby.deleteMany({});
    await Hobby.insertMany(initialSeedData.hobbies);

    // 7. Targets
    await Target.deleteMany({});
    await Target.insertMany(initialSeedData.targets);

    // 8. Gallery
    await Gallery.deleteMany({});
    await Gallery.insertMany(initialSeedData.gallery);

    // 9. Sample Messages
    await Message.deleteMany({});
    await Message.insertMany(initialSeedData.messages);

    // 10. Default Admin User
    const adminEmail = (process.env.ADMIN_EMAIL || 'admin@pritom.dev').toLowerCase();
    const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123456';
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    await User.deleteMany({ email: adminEmail });
    await User.create({
      name: 'Pritom Chowdhury (Admin)',
      email: adminEmail,
      password: hashedPassword,
      role: 'admin',
    });

    return NextResponse.json({
      success: true,
      message: 'Database seeded successfully with initial data for Pritom Chowdhury!',
      adminCredentials: {
        email: adminEmail,
        note: 'Default admin account has been created/updated.',
      },
    });
  } catch (error: unknown) {
    console.error('Error seeding database:', error);
    return NextResponse.json(
      { success: false, error: (error as Error).message || 'Failed to seed database' },
      { status: 500 }
    );
  }
}
