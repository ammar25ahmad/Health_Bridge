import { useState, useEffect } from 'react'
import { resourceApi } from '../api/resourceApi'

export function useResources(params = {}) {
  const [resources, setResources] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchResources = async (queryParams = params) => {
    setLoading(true)
    try {
      const res = await resourceApi.getResources(queryParams)
      setResources(res.data.data.resources || [])
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch resources')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchResources()
  }, [])

  return { resources, loading, error, refetch: fetchResources, setResources }
}

export function useArticles(params = {}) {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchArticles = async (queryParams = params) => {
    setLoading(true)
    try {
      const res = await resourceApi.getArticles(queryParams)
      setArticles(res.data.data.articles || [])
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch articles')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchArticles()
  }, [])

  return { articles, loading, error, refetch: fetchArticles, setArticles }
}
