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
    <div className="flex flex-col h-[600px] bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
          <div>
            <h3 className="font-bold text-white">Health Resource Agent</h3>
            <p className="text-xs text-white/70">Intelligent search with tool execution</p>
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span className="text-xs text-white/80">Online</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.length === 0 && (
          <div className="text-center mt-16">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <svg className="w-10 h-10 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">What health resources do you need?</h3>
            <p className="text-slate-500 text-sm mb-6">I'll search across our knowledge base to find the best matches</p>
            <div className="flex flex-wrap justify-center gap-2 max-w-lg mx-auto">
              {['I need vaccination resources', 'Find mental wellness support', 'Emergency contacts near me'].map((q) => (
                <button key={q} onClick={() => setInput(q)} className="bg-white border border-slate-200 text-slate-700 px-4 py-2.5 rounded-xl text-sm font-medium hover:border-indigo-300 hover:bg-indigo-50 transition-all">
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className="flex items-end gap-3 max-w-[85%]">
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-indigo-200">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                </div>
              )}
              <div className="max-w-full">
                <div
                  className={`rounded-2xl px-5 py-4 ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-br-md'
                      : 'bg-slate-50 border border-slate-200 text-slate-800 rounded-bl-md'
                  }`}
                >
                  <div className="text-sm leading-relaxed">{renderMarkdown(msg.content)}</div>
                </div>

                {msg.resources && msg.resources.length > 0 && (
                  <div className="mt-3 space-y-2">
                    <p className="text-xs font-semibold text-slate-500">Found Resources:</p>
                    {msg.resources.map((r, i) => (
                      <div key={i} className="bg-white border border-slate-200 rounded-xl p-3 shadow-sm">
                        <p className="font-semibold text-sm text-slate-800">{r.name}</p>
                        <p className="text-xs text-slate-500">{r.category} &middot; {r.location}</p>
                      </div>
                    ))}
                  </div>
                )}

                {msg.articles && msg.articles.length > 0 && (
                  <div className="mt-3 space-y-2">
                    <p className="text-xs font-semibold text-slate-500">Related Articles:</p>
                    {msg.articles.map((a, i) => (
                      <div key={i} className="bg-white border border-slate-200 rounded-xl p-3 shadow-sm">
                        <p className="font-semibold text-sm text-slate-800">{a.title}</p>
                        <p className="text-xs text-slate-500">{a.category}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {msg.role === 'user' && (
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-xl flex items-center justify-center text-white text-xs font-bold flex-shrink-0">A</div>
              )}
            </div>
          </div>
        ))}

        {toolCalls.length > 0 && (
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
            <p className="text-xs font-semibold text-slate-600 mb-3">Agent Tools Executed:</p>
            {toolCalls.map((tc, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-slate-500 mb-1.5">
                <span className="w-5 h-5 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-3 h-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                </span>
                <span className="font-medium">{tc.tool}</span>
                <span className="text-slate-400">({tc.resultCount} results)</span>
              </div>
            ))}
          </div>
        )}

        {loading && (
          <div className="flex justify-start">
            <div className="flex items-end gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-indigo-200">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
              </div>
              <div className="bg-slate-100 rounded-2xl rounded-bl-md px-5 py-4">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-slate-200 p-4">
        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe what health resources you need..."
            className="flex-1 border border-slate-300 rounded-xl px-5 py-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 transition-all shadow-lg shadow-indigo-200 flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            Search
          </button>
        </form>
      </div>
    </div>
  )
}
