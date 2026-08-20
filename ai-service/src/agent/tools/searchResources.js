import axios from 'axios';

const RESOURCE_SERVICE_URL = process.env.RESOURCE_SERVICE_URL || 'http://localhost:5002';

export async function searchResources(query, category = null) {
  try {
    const params = { search: query, status: 'APPROVED', limit: 5 };
    if (category) params.category = category;
    const response = await axios.get(`${RESOURCE_SERVICE_URL}/api/resources`, { params, timeout: 5000 });
    return response.data.data.resources || [];
  } catch (error) {
    console.error('searchResources error:', error.message);
    return [];
  }
}
