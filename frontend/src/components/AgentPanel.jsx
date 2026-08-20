import { useState, useRef, useEffect } from 'react'
import { useAI } from '../hooks/useAI'
import { renderMarkdown } from '../utils/renderMarkdown'

export default function AgentPanel() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [toolCalls, setToolCalls] = useState([])
  const { loading, agentChat } = useAI()
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, toolCalls])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const msg = input.trim()
    if (!msg || loading) return

    setInput('')
    setMessages((prev) => [...prev, { role: 'user', content: msg }])
    setToolCalls([])

    const response = await agentChat(msg)
    if (response) {
      if (response.toolCalls) {
        setToolCalls(response.toolCalls)
      }
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: response.answer,
          resources: response.resources || [],
          articles: response.articles || [],
        },
      ])
    } else {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Sorry, the agent could not process your request.' },
      ])
    }
  }

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-xl border border-slate-200 overflow-hidden">
      <div className="bg-indigo-600 text-white px-4 py-3">
        <h3 className="font-semibold">Health Resource Agent</h3>
        <p className="text-xs text-indigo-100">Search for health resources and articles intelligently</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-slate-400 mt-20">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <p className="font-medium text-slate-600">What health resources do you need?</p>
            <p className="text-sm mt-1">Try: "I need vaccination resources"</p>
          </div>
        )}

        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className="max-w-[85%]">
              <div
                className={`rounded-xl px-4 py-3 ${
                  msg.role === 'user'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 text-slate-800'
                }`}
              >
                <div className="text-sm">{renderMarkdown(msg.content)}</div>
              </div>

              {msg.resources && msg.resources.length > 0 && (
                <div className="mt-2 space-y-2">
                  <p className="text-xs font-medium text-slate-500">Found Resources:</p>
                  {msg.resources.map((r, i) => (
                    <div key={i} className="bg-white border border-slate-200 rounded-lg p-3">
                      <p className="font-medium text-sm text-slate-800">{r.name}</p>
                      <p className="text-xs text-slate-500">{r.category} &middot; {r.location}</p>
                    </div>
                  ))}
                </div>
              )}

              {msg.articles && msg.articles.length > 0 && (
                <div className="mt-2 space-y-2">
                  <p className="text-xs font-medium text-slate-500">Related Articles:</p>
                  {msg.articles.map((a, i) => (
                    <div key={i} className="bg-white border border-slate-200 rounded-lg p-3">
                      <p className="font-medium text-sm text-slate-800">{a.title}</p>
                      <p className="text-xs text-slate-500">{a.category}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {toolCalls.length > 0 && (
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
            <p className="text-xs font-medium text-slate-600 mb-2">Agent Tools Executed:</p>
            {toolCalls.map((tc, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-slate-500">
                <span className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-2.5 h-2.5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span>{tc.tool}</span>
                <span className="text-slate-400">({tc.resultCount} results)</span>
              </div>
            ))}
          </div>
        )}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-slate-100 rounded-xl px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-slate-200 p-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe what health resources you need..."
            className="flex-1 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 transition-colors"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  )
}
