import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProfile extends Document {
  name: string;
  title: string;
  bio: string;
  aboutStory: string;
  status: string;
  statusBadge: string;
  location: string;
  email: string;
  phone: string;
  resumeUrl: string;
  avatarUrl: string;
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    website?: string;
  };
  metrics: {
    yearsExperience: string;
    completedProjects: string;
    automatedTests: string;
    contributions: string;
  };
  updatedAt: Date;
}

const ProfileSchema = new Schema<IProfile>(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    bio: { type: String, required: true },
    aboutStory: { type: String, default: '' },
    status: { type: String, default: 'Available' },
    statusBadge: { type: String, default: 'Active for Hire / Open to New Projects' },
    location: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: '' },
    resumeUrl: { type: String, default: '' },
    avatarUrl: { type: String, default: '' },
    socialLinks: {
      github: { type: String, default: '' },
      linkedin: { type: String, default: '' },
      twitter: { type: String, default: '' },
      facebook: { type: String, default: '' },
      website: { type: String, default: '' },
    },
    metrics: {
      yearsExperience: { type: String, default: '2+' },
      completedProjects: { type: String, default: '15+' },
      automatedTests: { type: String, default: '500+' },
      contributions: { type: String, default: '120+' },
    },
  },
  { timestamps: true }
);

export const Profile: Model<IProfile> =
  mongoose.models.Profile || mongoose.model<IProfile>('Profile', ProfileSchema);

export default Profile;
