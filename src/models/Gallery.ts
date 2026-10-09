import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IGallery extends Document {
  imageUrl: string;
  caption: string;
  description: string;
  category?: string; // 'Workspaces', 'Events', 'Tech Talks', 'Achievements'
  altText: string;
  order: number;
}

const GallerySchema = new Schema<IGallery>(
  {
    imageUrl: { type: String, required: true },
    caption: { type: String, required: true },
    description: { type: String, default: '' },
    category: { type: String, default: 'Tech & Life' },
    altText: { type: String, default: '' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Gallery: Model<IGallery> =
  mongoose.models.Gallery || mongoose.model<IGallery>('Gallery', GallerySchema);

export default Gallery;
