import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  category: {
    type: String,
    enum: ['Nutrition', 'Hygiene', 'Vaccination', 'First Aid', 'Preventive Care', 'Healthy Lifestyle'],
    required: true,
  },
  summary: { type: String, trim: true },
  content: { type: String, required: true },
  author: { type: String, trim: true, default: 'HealthBridge' },
  status: {
    type: String,
    enum: ['DRAFT', 'PUBLISHED'],
    default: 'PUBLISHED',
  },
}, { timestamps: true });

articleSchema.index({ title: 'text', content: 'text' });

export default mongoose.model('Article', articleSchema);
