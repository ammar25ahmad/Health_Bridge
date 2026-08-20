import axios from 'axios';

const RESOURCE_SERVICE_URL = process.env.RESOURCE_SERVICE_URL || 'http://localhost:5002';

export async function searchArticles(query, category = null) {
  try {
    const params = { search: query, limit: 5 };
    if (category) params.category = category;
    const response = await axios.get(`${RESOURCE_SERVICE_URL}/api/articles`, { params, timeout: 5000 });
    return response.data.data.articles || [];
  } catch (error) {
    console.error('searchArticles error:', error.message);
    return [];
  }
}
