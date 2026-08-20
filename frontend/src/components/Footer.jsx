export default function Footer() {
  return (
    <footer className="bg-slate-800 text-slate-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-cyan-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">H</span>
              </div>
              <span className="text-lg font-bold text-white">HealthBridge</span>
            </div>
            <p className="text-sm text-slate-400">
              AI-Powered Community Health Information & Support Platform.
              Providing general educational health information.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/resources" className="hover:text-cyan-400">Health Resources</a></li>
              <li><a href="/education" className="hover:text-cyan-400">Health Education</a></li>
              <li><a href="/ai-assistant" className="hover:text-cyan-400">AI Assistant</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3">Disclaimer</h3>
            <p className="text-sm text-slate-400">
              HealthBridge provides general educational information only.
              It is not a substitute for professional medical advice,
              diagnosis, or treatment.
            </p>
          </div>
        </div>
        <div className="border-t border-slate-700 mt-8 pt-6 text-center text-sm text-slate-500">
          <p>HealthBridge &copy; 2026. Built for LoopLearn Hackathon 2026.</p>
        </div>
      </div>
    </footer>
  )
}
