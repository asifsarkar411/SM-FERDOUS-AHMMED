import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IHobby extends Document {
  title: string;
  description: string;
  category: string; // 'Hobby', 'Community', 'Sports', 'Interest'
  icon?: string;
  order: number;
}

const HobbySchema = new Schema<IHobby>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, default: 'Hobby' },
    icon: { type: String, default: '' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Hobby: Model<IHobby> =
  mongoose.models.Hobby || mongoose.model<IHobby>('Hobby', HobbySchema);

export default Hobby;
