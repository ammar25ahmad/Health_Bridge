import AIChat from '../components/AIChat'

export default function AIAssistant() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">AI Health Education Assistant</h1>
        <p className="text-slate-600 text-sm mt-1">Ask general health education questions and get sourced answers</p>
      </div>
      <AIChat />
    </div>
  )
}
