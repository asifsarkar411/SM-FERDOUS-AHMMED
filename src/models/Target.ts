import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ITarget extends Document {
  title: string;
  description: string;
  category: string; // 'Machine Learning', 'Cloud & DevOps', 'Architecture', 'Certification'
  timeframe: string; // e.g. 'Q2-Q4 2026', 'Immediate'
  status: string; // 'In Progress', 'Planned', 'Researching'
  keyMilestones: string[];
  order: number;
}

const TargetSchema = new Schema<ITarget>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, default: 'Machine Learning' },
    timeframe: { type: String, default: 'Ongoing' },
    status: { type: String, default: 'In Progress' },
    keyMilestones: [{ type: String }],
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Target: Model<ITarget> =
  mongoose.models.Target || mongoose.model<ITarget>('Target', TargetSchema);

export default Target;
