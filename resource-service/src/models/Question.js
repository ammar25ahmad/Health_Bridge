import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  answer: { type: String },
  sources: [String],
  status: {
    type: String,
    enum: ['PENDING', 'ANSWERED'],
    default: 'PENDING',
  },
}, { timestamps: true });

export default mongoose.model('Question', questionSchema);
