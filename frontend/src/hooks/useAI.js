import { useState } from 'react'
import { aiApi } from '../api/aiApi'

export function useAI() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const chat = async (message) => {
    setLoading(true)
    setError(null)
    try {
      const res = await aiApi.chat({ message })
      return res.data.data
    } catch (err) {
      const msg = err.response?.data?.message || 'AI request failed'
      setError(msg)
      return null
    } finally {
      setLoading(false)
    }
  }

  const ragChat = async (message) => {
    setLoading(true)
    setError(null)
    try {
      const res = await aiApi.rag({ message })
      return res.data.data
    } catch (err) {
      const msg = err.response?.data?.message || 'RAG request failed'
      setError(msg)
      return null
    } finally {
      setLoading(false)
    }
  }

  const agentChat = async (message) => {
    setLoading(true)
    setError(null)
    try {
      const res = await aiApi.agent({ message })
      return res.data.data
    } catch (err) {
      const msg = err.response?.data?.message || 'Agent request failed'
      setError(msg)
      return null
    } finally {
      setLoading(false)
    }
  }

  return { loading, error, chat, ragChat, agentChat }
}
