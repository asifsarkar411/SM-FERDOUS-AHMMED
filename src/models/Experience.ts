import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IExperience extends Document {
  company: string;
  role: string;
  location?: string;
  duration: string;
  startDate?: string;
  endDate?: string;
  isCurrent: boolean;
  responsibilities: string[];
  techStack: string[];
  order: number;
}

const ExperienceSchema = new Schema<IExperience>(
  {
    company: { type: String, required: true },
    role: { type: String, required: true },
    location: { type: String, default: '' },
    duration: { type: String, required: true },
    startDate: { type: String, default: '' },
    endDate: { type: String, default: '' },
    isCurrent: { type: Boolean, default: false },
    responsibilities: [{ type: String }],
    techStack: [{ type: String }],
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Experience: Model<IExperience> =
  mongoose.models.Experience || mongoose.model<IExperience>('Experience', ExperienceSchema);

export default Experience;
