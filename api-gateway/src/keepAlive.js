import cron from 'node-cron';
import axios from 'axios';

const services = [
  { name: 'auth-service', url: process.env.AUTH_SERVICE_URL || 'https://healthbridge-auth.onrender.com' },
  { name: 'resource-service', url: process.env.RESOURCE_SERVICE_URL || 'https://healthbridge-resource.onrender.com' },
  { name: 'ai-service', url: process.env.AI_SERVICE_URL || 'https://healthbridge-ai-zei1.onrender.com' },
];

cron.schedule('*/5 * * * *', async () => {
  for (const service of services) {
    try {
      await axios.get(`${service.url}/health`, { timeout: 10000 });
      console.log(`[Keep-Alive] ${service.name} ping successful`);
    } catch (error) {
      console.error(`[Keep-Alive] ${service.name} ping failed:`, error.message);
    }
  }
});

console.log('[Keep-Alive] Pinging auth, resource, ai services every 5 minutes');
