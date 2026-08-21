import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import resourceRoutes from './routes/resource.routes.js';
import './keepAlive.js';

const app = express();
const PORT = process.env.PORT || 5002;

app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/api', resourceRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'resource-service healthy' });
});

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/healthbridge')
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, '0.0.0.0', () => console.log(`Resource service running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
