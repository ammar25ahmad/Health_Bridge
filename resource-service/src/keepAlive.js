import cron from 'node-cron';
import axios from 'axios';

const SERVICE_URL = process.env.SERVICE_URL || `http://localhost:${process.env.PORT || 5002}`;

cron.schedule('*/5 * * * *', async () => {
  try {
    await axios.get(`${SERVICE_URL}/health`);
    console.log('[Keep-Alive] resource-service ping successful');
  } catch (error) {
    console.error('[Keep-Alive] resource-service ping failed:', error.message);
  }
});

console.log('[Keep-Alive] resource-service scheduled every 5 minutes');
