import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISkill extends Document {
  category: string; // e.g., 'SQA & Automation', 'Frontend', 'Backend & DB', 'Tools & Platforms', 'Operating Systems'
  name: string;
  proficiency: number; // 0 - 100
  icon?: string;
  order: number;
}

const SkillSchema = new Schema<ISkill>(
  {
    category: { type: String, required: true },
    name: { type: String, required: true },
    proficiency: { type: Number, required: true, min: 0, max: 100, default: 80 },
    icon: { type: String, default: '' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Skill: Model<ISkill> =
  mongoose.models.Skill || mongoose.model<ISkill>('Skill', SkillSchema);

export default Skill;
