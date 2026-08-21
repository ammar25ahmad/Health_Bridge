import cron from 'node-cron';
import axios from 'axios';

const SERVICE_URL = process.env.SERVICE_URL || `http://localhost:${process.env.GATEWAY_PORT || 5000}`;

cron.schedule('*/5 * * * *', async () => {
  try {
    await axios.get(`${SERVICE_URL}/health`);
    console.log('[Keep-Alive] api-gateway ping successful');
  } catch (error) {
    console.error('[Keep-Alive] api-gateway ping failed:', error.message);
  }
});

console.log('[Keep-Alive] api-gateway scheduled every 5 minutes');
