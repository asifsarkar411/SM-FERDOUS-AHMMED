import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Profile from '@/models/Profile';
import Education from '@/models/Education';
import Experience from '@/models/Experience';
import Skill from '@/models/Skill';
import Project from '@/models/Project';
import Hobby from '@/models/Hobby';
import Target from '@/models/Target';
import Gallery from '@/models/Gallery';
import { initialSeedData } from '@/lib/seedData';

export async function GET() {
  try {
    const conn = await connectToDatabase();

    if (!conn) {
      return NextResponse.json({
        success: true,
        source: 'fallback',
        data: initialSeedData,
      });
    }

    const [
      profileDoc,
      educations,
      experiences,
      skills,
      projects,
      hobbies,
      targets,
      gallery,
    ] = await Promise.all([
      Profile.findOne().lean(),
      Education.find().sort({ order: 1, createdAt: -1 }).lean(),
      Experience.find().sort({ order: 1, createdAt: -1 }).lean(),
      Skill.find().sort({ order: 1, proficiency: -1 }).lean(),
      Project.find().sort({ order: 1, createdAt: -1 }).lean(),
      Hobby.find().sort({ order: 1, createdAt: -1 }).lean(),
      Target.find().sort({ order: 1, createdAt: -1 }).lean(),
      Gallery.find().sort({ order: 1, createdAt: -1 }).lean(),
    ]);

    const data = {
      profile: profileDoc || initialSeedData.profile,
      education: educations && educations.length > 0 ? educations : initialSeedData.education,
      experience: experiences && experiences.length > 0 ? experiences : initialSeedData.experience,
      skills: skills && skills.length > 0 ? skills : initialSeedData.skills,
      projects: projects && projects.length > 0 ? projects : initialSeedData.projects,
      hobbies: hobbies && hobbies.length > 0 ? hobbies : initialSeedData.hobbies,
      targets: targets && targets.length > 0 ? targets : initialSeedData.targets,
      gallery: gallery && gallery.length > 0 ? gallery : initialSeedData.gallery,
    };

    return NextResponse.json({
      success: true,
      source: profileDoc ? 'database' : 'hybrid-fallback',
      data,
    });
  } catch (error) {
    console.error('Error fetching portfolio data:', error);
    return NextResponse.json({
      success: true,
      source: 'error-fallback',
      data: initialSeedData,
    });
  }
}
