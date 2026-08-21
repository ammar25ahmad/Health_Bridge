import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import axios from 'axios';
import './keepAlive.js';

const app = express();
const PORT = process.env.GATEWAY_PORT || 5000;

const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || 'https://healthbridge-auth.onrender.com';
const RESOURCE_SERVICE_URL = process.env.RESOURCE_SERVICE_URL || 'https://healthbridge-resource.onrender.com';
const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'https://healthbridge-ai-zei1.onrender.com';

app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL || 'https://healthbridge-frontend-dacf.onrender.com/', credentials: true }));
app.use(express.json());
app.use(cookieParser());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: { success: false, message: 'Too many requests, please try again later' },
});
app.use('/api', limiter);

const forwardRequest = async (req, res, targetUrl) => {
  try {
    const response = await axios({
      method: req.method,
      url: `${targetUrl}${req.originalUrl}`,
      data: req.body,
      headers: {
        'Content-Type': 'application/json',
        cookie: req.headers.cookie || '',
      },
      withCredentials: true,
    });

    if (response.headers['set-cookie']) {
      res.setHeader('set-cookie', response.headers['set-cookie']);
    }

    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(502).json({ success: false, message: 'Service unavailable' });
    }
  }
};

app.use('/api/auth', (req, res) => forwardRequest(req, res, AUTH_SERVICE_URL));
app.use('/api/resources', (req, res) => forwardRequest(req, res, RESOURCE_SERVICE_URL));
app.use('/api/articles', (req, res) => forwardRequest(req, res, RESOURCE_SERVICE_URL));
app.use('/api/questions', (req, res) => forwardRequest(req, res, RESOURCE_SERVICE_URL));
app.use('/api/ai', (req, res) => forwardRequest(req, res, AI_SERVICE_URL));

app.get('/health', async (req, res) => {
  const services = {};
  try {
    await axios.get(`${AUTH_SERVICE_URL}/health`, { timeout: 3000 });
    services.auth = 'healthy';
  } catch { services.auth = 'down'; }
  try {
    await axios.get(`${RESOURCE_SERVICE_URL}/health`, { timeout: 3000 });
    services.resource = 'healthy';
  } catch { services.resource = 'down'; }
  try {
    await axios.get(`${AI_SERVICE_URL}/health`, { timeout: 3000 });
    services.ai = 'healthy';
  } catch { services.ai = 'down'; }

  res.json({ status: 'gateway healthy', services });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`API Gateway running on port ${PORT}`);
  console.log(`  Auth Service:      ${AUTH_SERVICE_URL}`);
  console.log(`  Resource Service:  ${RESOURCE_SERVICE_URL}`);
  console.log(`  AI Service:        ${AI_SERVICE_URL}`);
});
