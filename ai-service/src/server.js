import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import aiRoutes from './routes/ai.routes.js';

const app = express();
const PORT = process.env.PORT || 5003;

app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/api/ai', aiRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ai-service healthy' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`AI service running on port ${PORT}`);
});
