import api from './axios'

export const resourceApi = {
  getResources: (params) => api.get('/resources', { params }),
  getResource: (id) => api.get(`/resources/${id}`),
  createResource: (data) => api.post('/resources', data),
  updateResource: (id, data) => api.put(`/resources/${id}`, data),
  deleteResource: (id) => api.delete(`/resources/${id}`),
  updateStatus: (id, status) => api.patch(`/resources/${id}/status`, { status }),
  getArticles: (params) => api.get('/articles', { params }),
  getArticle: (id) => api.get(`/articles/${id}`),
  createArticle: (data) => api.post('/articles', data),
  updateArticle: (id, data) => api.put(`/articles/${id}`, data),
  deleteArticle: (id) => api.delete(`/articles/${id}`),
  getQuestions: (params) => api.get('/questions', { params }),
  createQuestion: (data) => api.post('/questions', data),
  updateQuestion: (id, data) => api.patch(`/questions/${id}`, data),
}
