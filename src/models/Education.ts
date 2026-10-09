import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IEducation extends Document {
  institution: string;
  degree: string;
  fieldOfStudy: string;
  passingYear: string;
  startYear?: string;
  results: string;
  description?: string;
  order: number;
}

const EducationSchema = new Schema<IEducation>(
  {
    institution: { type: String, required: true },
    degree: { type: String, required: true },
    fieldOfStudy: { type: String, default: '' },
    passingYear: { type: String, required: true },
    startYear: { type: String, default: '' },
    results: { type: String, default: '' },
    description: { type: String, default: '' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Education: Model<IEducation> =
  mongoose.models.Education || mongoose.model<IEducation>('Education', EducationSchema);

export default Education;
