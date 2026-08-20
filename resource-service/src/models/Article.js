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
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: {
    type: String,
    enum: ['DRAFT', 'PUBLISHED'],
    default: 'PUBLISHED',
  },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  classification: {
    category: String,
    keywords: [String],
    qualityScore: Number,
  },
}, { timestamps: true });

articleSchema.index({ title: 'text', content: 'text' });

export default mongoose.model('Article', articleSchema);
