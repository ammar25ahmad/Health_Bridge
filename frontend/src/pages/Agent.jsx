import AgentPanel from '../components/AgentPanel'

export default function Agent() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Health Resource Agent</h1>
        <p className="text-slate-600 text-sm mt-1">Intelligent search for health resources and articles</p>
      </div>
      <AgentPanel />
    </div>
  )
}
