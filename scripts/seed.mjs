import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI is not defined in .env.local or environment variables.');
  console.log('👉 Please create a .env.local file with your MongoDB connection string:');
  console.log('   MONGODB_URI="mongodb+srv://<username>:<password>@cluster0.mongodb.net/portfolio?retryWrites=true&w=majority"');
  process.exit(1);
}

const ProfileSchema = new mongoose.Schema({
  name: String,
  title: String,
  bio: String,
  aboutStory: String,
  status: String,
  statusBadge: String,
  location: String,
  email: String,
  phone: String,
  resumeUrl: String,
  avatarUrl: String,
  socialLinks: Object,
  metrics: Object,
}, { timestamps: true });

const EducationSchema = new mongoose.Schema({
  institution: String,
  degree: String,
  fieldOfStudy: String,
  passingYear: String,
  startYear: String,
  results: String,
  description: String,
  order: Number,
}, { timestamps: true });

const ExperienceSchema = new mongoose.Schema({
  company: String,
  role: String,
  location: String,
  duration: String,
  startDate: String,
  endDate: String,
  isCurrent: Boolean,
  responsibilities: [String],
  techStack: [String],
  order: Number,
}, { timestamps: true });

const SkillSchema = new mongoose.Schema({
  category: String,
  name: String,
  proficiency: Number,
  icon: String,
  order: Number,
}, { timestamps: true });

const ProjectSchema = new mongoose.Schema({
  title: String,
  description: String,
  longDescription: String,
  image: String,
  techStack: [String],
  liveUrl: String,
  githubUrl: String,
  category: String,
  featured: Boolean,
  order: Number,
}, { timestamps: true });

const HobbySchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  icon: String,
  order: Number,
}, { timestamps: true });

const TargetSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  timeframe: String,
  status: String,
  keyMilestones: [String],
  order: Number,
}, { timestamps: true });

const GallerySchema = new mongoose.Schema({
  imageUrl: String,
  caption: String,
  description: String,
  category: String,
  altText: String,
  order: Number,
}, { timestamps: true });

const MessageSchema = new mongoose.Schema({
  senderName: String,
  email: String,
  subject: String,
  body: String,
  read: Boolean,
}, { timestamps: true });

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
}, { timestamps: true });

const Profile = mongoose.models.Profile || mongoose.model('Profile', ProfileSchema);
const Education = mongoose.models.Education || mongoose.model('Education', EducationSchema);
const Experience = mongoose.models.Experience || mongoose.model('Experience', ExperienceSchema);
const Skill = mongoose.models.Skill || mongoose.model('Skill', SkillSchema);
const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema);
const Hobby = mongoose.models.Hobby || mongoose.model('Hobby', HobbySchema);
const Target = mongoose.models.Target || mongoose.model('Target', TargetSchema);
const Gallery = mongoose.models.Gallery || mongoose.model('Gallery', GallerySchema);
const Message = mongoose.models.Message || mongoose.model('Message', MessageSchema);
const User = mongoose.models.User || mongoose.model('User', UserSchema);

async function seed() {
  try {
    console.log('🔄 Connecting to MongoDB Atlas...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected successfully!');

    console.log('🌱 Seeding Profile...');
    await Profile.deleteMany({});
    await Profile.create({
      name: 'Pritom Chowdhury',
      title: 'Software Quality Assurance Engineer & Full-Stack Developer',
      bio: 'Passionate Quality Assurance Specialist and Full-Stack Web Developer based in Mirpur, Dhaka. Dedicated to engineering robust test automation frameworks, seamless digital experiences, and scalable cloud solutions.',
      aboutStory: 'I am a tech enthusiast with a strong foundation in Computer Science & Engineering from Bangladesh University of Business and Technology (BUBT). With hands-on expertise spanning Software Quality Assurance, automated test architecture (Selenium, Playwright, Postman), and modern full-stack web development (React, Next.js, Node.js, MongoDB), I bridge the gap between development agility and bulletproof software reliability.\n\nBeyond writing code and automated tests, I am an active Linux power-user (Zorin OS / Kali Linux) and tech investigator fascinated by distributed systems and machine learning workflows.',
      status: 'Available',
      statusBadge: 'Active for Hire / Open to New Projects',
      location: 'Mirpur, Dhaka, Bangladesh',
      email: 'pritom.chowdhury.dev@gmail.com',
      phone: '+880 1700-000000',
      resumeUrl: '#resume',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      socialLinks: {
        github: 'https://github.com',
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
        facebook: 'https://facebook.com',
        website: 'https://pritomchowdhury.dev',
      },
      metrics: {
        yearsExperience: '3+',
        completedProjects: '24+',
        automatedTests: '1,200+',
        contributions: '450+',
      },
    });

    console.log('🌱 Seeding Education...');
    await Education.deleteMany({});
    await Education.insertMany([
      {
        institution: 'Bangladesh University of Business and Technology (BUBT)',
        degree: 'Bachelor of Science (B.Sc.)',
        fieldOfStudy: 'Computer Science and Engineering (CSE)',
        startYear: '2019',
        passingYear: '2023',
        results: 'CGPA: 3.75 / 4.00',
        description: 'Major coursework in Algorithms, Software Engineering, Database Systems, Computer Networks, and Object-Oriented Analysis & Design.',
        order: 1,
      },
      {
        institution: 'Dhaka City College',
        degree: 'Higher Secondary Certificate (HSC)',
        fieldOfStudy: 'Science',
        startYear: '2016',
        passingYear: '2018',
        results: 'GPA: 5.00 / 5.00',
        description: 'Focus on Higher Mathematics, Physics, and Information & Communication Technology.',
        order: 2,
      },
    ]);

    console.log('🌱 Seeding Experience...');
    await Experience.deleteMany({});
    await Experience.insertMany([
      {
        company: 'Klozer.io',
        role: 'Outreach Analyst & QA Specialist',
        location: 'Dhaka, Bangladesh (Hybrid)',
        duration: '2023 - Present',
        startDate: 'Aug 2023',
        endDate: 'Present',
        isCurrent: true,
        responsibilities: [
          'Perform functional, regression, and API verification for cold outreach intelligence platforms.',
          'Design automated test suites utilizing Playwright and Postman, trimming regression cycle time by 40%.',
          'Analyze prospect conversion telemetry and collaborate with international engineering squads in sprint planning and bug triage using Jira.'
        ],
        techStack: ['Playwright', 'Postman', 'Jira', 'API Testing', 'TypeScript', 'Agile/Scrum'],
        order: 1,
      },
      {
        company: 'Fabcons Techno',
        role: 'IT Support & Web Operations Executive',
        location: 'Dhaka, Bangladesh',
        duration: '2021 - 2023',
        startDate: 'Jan 2021',
        endDate: 'Jul 2023',
        isCurrent: false,
        responsibilities: [
          'Maintained core web portal infrastructure, handled deployments, and ensured system uptime.',
          'Executed manual and automated smoke tests for client deliverables prior to production releases.',
          'Administered Linux server environments, DNS configurations, and customer-facing web operations.'
        ],
        techStack: ['Linux', 'Web Operations', 'Manual Testing', 'MySQL', 'Bash Scripting', 'Postman'],
        order: 2,
      },
    ]);

    console.log('🌱 Seeding Skills...');
    await Skill.deleteMany({});
    await Skill.insertMany([
      { category: 'SQA & Automation', name: 'Software Quality Assurance', proficiency: 95, icon: 'ShieldCheck', order: 1 },
      { category: 'SQA & Automation', name: 'Selenium WebDriver', proficiency: 90, icon: 'Cpu', order: 2 },
      { category: 'SQA & Automation', name: 'Playwright Automation', proficiency: 92, icon: 'CheckCircle2', order: 3 },
      { category: 'SQA & Automation', name: 'Postman & REST API Testing', proficiency: 95, icon: 'Terminal', order: 4 },
      { category: 'SQA & Automation', name: 'Jira & Agile Workflows', proficiency: 88, icon: 'Kanban', order: 5 },
      { category: 'Frontend Development', name: 'React.js', proficiency: 88, icon: 'Code', order: 6 },
      { category: 'Frontend Development', name: 'Next.js (App Router)', proficiency: 86, icon: 'Layers', order: 7 },
      { category: 'Frontend Development', name: 'Tailwind CSS', proficiency: 92, icon: 'Palette', order: 8 },
      { category: 'Frontend Development', name: 'TypeScript / JavaScript', proficiency: 85, icon: 'FileCode', order: 9 },
      { category: 'Backend & Databases', name: 'Node.js', proficiency: 82, icon: 'Server', order: 10 },
      { category: 'Backend & Databases', name: 'MongoDB & Mongoose', proficiency: 85, icon: 'Database', order: 11 },
      { category: 'Backend & Databases', name: 'RESTful API Architecture', proficiency: 90, icon: 'Network', order: 12 },
      { category: 'OS & DevOps Tools', name: 'Linux (Zorin OS / Kali Linux)', proficiency: 90, icon: 'TerminalSquare', order: 13 },
      { category: 'OS & DevOps Tools', name: 'Git & GitHub CI/CD', proficiency: 88, icon: 'GitBranch', order: 14 },
      { category: 'OS & DevOps Tools', name: 'Docker Containers', proficiency: 75, icon: 'Box', order: 15 },
    ]);

    console.log('🌱 Seeding Projects...');
    await Project.deleteMany({});
    await Project.insertMany([
      {
        title: 'Automated E-Commerce End-to-End Test Suite',
        description: 'Comprehensive cross-browser test automation framework created with Playwright and TypeScript, validating shopping cart checkout, authentication, and payment mocks.',
        longDescription: 'Created a production-grade automated testing suite that runs in GitHub Actions CI pipelines, executing over 250 parallel test specs with automated HTML report generation and video artifact logging.',
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
        techStack: ['Playwright', 'TypeScript', 'GitHub Actions', 'Docker', 'Allure Reports'],
        liveUrl: 'https://demo.playwright.dev',
        githubUrl: 'https://github.com',
        category: 'SQA & Automation',
        featured: true,
        order: 1,
      },
      {
        title: 'Klozer Outreach Analytics & Verification Portal',
        description: 'Scalable web application for tracking campaign deliverables, recipient email deliverability, and automated verification workflows.',
        longDescription: 'Engineered an interactive analytics dashboard with real-time response monitoring, webhook integration, and automated data integrity validation.',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
        techStack: ['Next.js', 'React', 'MongoDB', 'Tailwind CSS', 'Postman'],
        liveUrl: 'https://klozer.io',
        githubUrl: 'https://github.com',
        category: 'Web Application',
        featured: true,
        order: 2,
      },
      {
        title: 'RESTful API Automated Testing & Benchmark Harness',
        description: 'Postman and Newman automated test collection with Newman CLI integration for automated regression testing and performance benchmarking.',
        longDescription: 'Built pre-request script generators, mock servers, data-driven tests using CSV datasets, and automated SLA compliance reporting.',
        image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
        techStack: ['Postman', 'Newman', 'Node.js', 'Bash', 'JSON Schema'],
        liveUrl: 'https://documenter.getpostman.com',
        githubUrl: 'https://github.com',
        category: 'SQA & Automation',
        featured: true,
        order: 3,
      },
      {
        title: 'Linux Systems & Network Diagnostic Tool',
        description: 'Custom Bash & Python toolkit tailored for Zorin OS and Kali Linux to automate network packet inspection, latency audits, and log aggregation.',
        longDescription: 'Designed for DevOps and IT operational maintenance to quickly inspect socket connections, firewall rules, and automated DNS propagation status.',
        image: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=800&q=80',
        techStack: ['Bash', 'Python', 'Linux', 'Kali', 'Zorin OS', 'Wireshark'],
        liveUrl: '',
        githubUrl: 'https://github.com',
        category: 'Tools & DevOps',
        featured: false,
        order: 4,
      },
    ]);

    console.log('🌱 Seeding Hobbies, Targets & Gallery...');
    await Hobby.deleteMany({});
    await Hobby.insertMany([
      {
        title: 'Linux System Customization & Security Lab',
        description: 'Experimenting with Kali Linux security penetration tools, kernel optimizations, and custom desktop workflow configurations on Zorin OS.',
        category: 'Tech Lab',
        icon: 'Terminal',
        order: 1,
      },
      {
        title: 'Open Source Community & QA Mentorship',
        description: 'Contributing bug reproductions, documentation enhancements, and helping university students get started with software testing methodologies.',
        category: 'Community',
        icon: 'Users',
        order: 2,
      },
      {
        title: 'Competitive Gaming & Tactical Strategy',
        description: 'Sharpening rapid decision making, squad coordination, and tactical spatial awareness through competitive gaming.',
        category: 'Gaming',
        icon: 'Gamepad2',
        order: 3,
      },
      {
        title: 'Tech Blogging & Gadget Teardowns',
        description: 'Writing technical walkthroughs on test automation best practices and analyzing new hardware and consumer electronic architectures.',
        category: 'Writing',
        icon: 'BookOpen',
        order: 4,
      },
    ]);

    await Target.deleteMany({});
    await Target.insertMany([
      {
        title: 'Advanced Machine Learning Architectures',
        description: 'Deep diving into Neural Network foundations, LLM fine-tuning pipelines, and integrating AI inference into autonomous test agent validation.',
        category: 'Machine Learning',
        timeframe: '2026 - Ongoing',
        status: 'In Progress',
        keyMilestones: [
          'Master PyTorch fundamentals and tensor operations',
          'Build agentic test generators utilizing multi-model LLM pipelines',
          'Implement automated visual regression with computer vision models',
        ],
        order: 1,
      },
      {
        title: 'Scalable Distributed Web Systems & Microservices',
        description: 'Architecting high-throughput distributed architectures using Next.js micro-frontends, event-driven Node.js workers, and Redis caching layers.',
        category: 'Distributed Systems',
        timeframe: 'Q3 - Q4 2026',
        status: 'Planned',
        keyMilestones: [
          'Implement message-queue based asynchronous processing with RabbitMQ/Kafka',
          'Attain AWS Certified Solutions Architect credential',
          'Benchmark distributed MongoDB sharding and replica set failover',
        ],
        order: 2,
      },
      {
        title: 'ISTQB Certified Tester Advanced Level (CTAL)',
        description: 'Acquiring industry gold-standard certification in Test Automation Engineering and Advanced Test Analysis.',
        category: 'Certifications',
        timeframe: 'Late 2026',
        status: 'Targeted',
        keyMilestones: [
          'Complete CTAL Test Automation Engineering syllabus',
          'Publish comprehensive case study on resilient test suites',
        ],
        order: 3,
      },
    ]);

    await Gallery.deleteMany({});
    await Gallery.insertMany([
      {
        imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
        caption: 'Focused Workstation Setup',
        description: 'Dual monitor debugging setup running Zorin OS with Playwright test execution in real-time.',
        category: 'Workstation',
        altText: 'Developer workstation with code editor',
        order: 1,
      },
      {
        imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
        caption: 'BUBT Tech & SQA Workshop',
        description: 'Collaborative session on agile software testing practices and automated bug reporting.',
        category: 'Events',
        altText: 'University tech workshop',
        order: 2,
      },
      {
        imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
        caption: 'Engineering Team Standup',
        description: 'Sprint planning and retrospective discussions with cross-functional engineering peers.',
        category: 'Teamwork',
        altText: 'Team collaborating around laptop',
        order: 3,
      },
      {
        imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
        caption: 'Cybersecurity & Kali Linux Lab',
        description: 'Hands-on network audit and penetration simulation inside our local sandbox environment.',
        category: 'Lab',
        altText: 'Terminal screen with security logs',
        order: 4,
      },
    ]);

    console.log('🌱 Seeding Admin User...');
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

    console.log('🎉 Database seeding complete!');
    console.log(`🔐 Admin Login: ${adminEmail}`);
    console.log(`🔑 Admin Password: ${adminPassword}`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during seeding:', error);
    process.exit(1);
  }
}

seed();
