import api from './axios'

export const aiApi = {
  chat: (data) => api.post('/ai/chat', data),
  rag: (data) => api.post('/ai/rag', data),
  agent: (data) => api.post('/ai/agent', data),
}
