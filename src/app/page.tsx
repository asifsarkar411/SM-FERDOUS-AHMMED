import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Education from '@/components/Education';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Target from '@/components/Target';
import Hobbies from '@/components/Hobbies';
import Gallery from '@/components/Gallery';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

import connectToDatabase from '@/lib/mongodb';
import Profile from '@/models/Profile';
import EducationModel from '@/models/Education';
import ExperienceModel from '@/models/Experience';
import SkillModel from '@/models/Skill';
import ProjectModel from '@/models/Project';
import HobbyModel from '@/models/Hobby';
import TargetModel from '@/models/Target';
import GalleryModel from '@/models/Gallery';
import { initialSeedData } from '@/lib/seedData';

export const revalidate = 60; // revalidate every minute for dynamic updates

async function getPortfolioData() {
  try {
    const conn = await connectToDatabase();
    if (!conn) {
      return initialSeedData;
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
      EducationModel.find().sort({ order: 1, createdAt: -1 }).lean(),
      ExperienceModel.find().sort({ order: 1, createdAt: -1 }).lean(),
      SkillModel.find().sort({ order: 1, proficiency: -1 }).lean(),
      ProjectModel.find().sort({ order: 1, createdAt: -1 }).lean(),
      HobbyModel.find().sort({ order: 1, createdAt: -1 }).lean(),
      TargetModel.find().sort({ order: 1, createdAt: -1 }).lean(),
      GalleryModel.find().sort({ order: 1, createdAt: -1 }).lean(),
    ]);

    // Parse ObjectIds and Mongo objects to plain JSON
    const serialize = (obj: unknown) => JSON.parse(JSON.stringify(obj));

    return {
      profile: profileDoc ? serialize(profileDoc) : initialSeedData.profile,
      education: educations && educations.length > 0 ? serialize(educations) : initialSeedData.education,
      experience: experiences && experiences.length > 0 ? serialize(experiences) : initialSeedData.experience,
      skills: skills && skills.length > 0 ? serialize(skills) : initialSeedData.skills,
      projects: projects && projects.length > 0 ? serialize(projects) : initialSeedData.projects,
      hobbies: hobbies && hobbies.length > 0 ? serialize(hobbies) : initialSeedData.hobbies,
      targets: targets && targets.length > 0 ? serialize(targets) : initialSeedData.targets,
      gallery: gallery && gallery.length > 0 ? serialize(gallery) : initialSeedData.gallery,
    };
  } catch (err) {
    console.error('Error fetching data for page.tsx, serving seed fallback:', err);
    return initialSeedData;
  }
}

export default async function HomePage() {
  const data = await getPortfolioData();

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-black text-slate-900 dark:text-slate-100 flex flex-col transition-colors duration-200">
      {/* Sticky Top Navbar */}
      <Navbar
        statusBadge={data.profile.statusBadge}
        name={data.profile.name}
        avatarUrl={data.profile.avatarUrl}
      />

      {/* Main Content Sections */}
      <Hero profile={data.profile} />
      <About profile={data.profile} />
      <Experience experiences={data.experience} />
      <Education educations={data.education} />
      <Skills skills={data.skills} />
      <Projects projects={data.projects} />
      <Target targets={data.targets} />
      <Hobbies hobbies={data.hobbies} />
      <Gallery gallery={data.gallery} />
      <Contact profile={data.profile} />

      {/* Footer */}
      <Footer />
    </main>
  );
}
