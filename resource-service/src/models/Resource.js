import mongoose from 'mongoose';

const resourceSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  category: {
    type: String,
    enum: ['Clinics', 'Vaccination Centers', 'Emergency Contacts', 'Mental Wellness', 'Preventive Care', 'Public Health Programs'],
    required: true,
  },
  description: { type: String, required: true },
  location: { type: String, trim: true },
  contactInformation: { type: String, trim: true },
  availability: { type: String, trim: true },
  status: {
    type: String,
    enum: ['PENDING', 'APPROVED', 'REJECTED', 'ACTIVE', 'INACTIVE'],
    default: 'PENDING',
  },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  organization: { type: String, trim: true },
  analysis: {
    category: String,
    resourceType: String,
    relevanceScore: Number,
  },
}, { timestamps: true });

resourceSchema.index({ name: 'text', description: 'text' });
resourceSchema.index({ category: 1, status: 1 });

export default mongoose.model('Resource', resourceSchema);
