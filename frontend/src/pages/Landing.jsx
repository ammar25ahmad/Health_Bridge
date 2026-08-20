import { Link } from 'react-router-dom'

export default function Landing() {
  return (
    <div>
      <section className="bg-gradient-to-br from-cyan-600 via-cyan-700 to-teal-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Your Trusted Source for<br />Community Health Information
            </h1>
            <p className="text-lg text-cyan-100 mb-8 max-w-xl">
              HealthBridge connects citizens with reliable health resources,
              educational content, and AI-powered health information guidance.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/resources"
                className="bg-white text-cyan-700 px-6 py-3 rounded-lg font-semibold hover:bg-cyan-50 transition-colors"
              >
                Find Health Resources
              </Link>
              <Link
                to="/education"
                className="border border-white/30 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                Health Education
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">How HealthBridge Helps You</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Find health resources, learn about wellness, and get AI-powered educational guidance.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl border border-slate-200 p-6 text-center hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-cyan-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Health Resources</h3>
            <p className="text-sm text-slate-600">
              Find clinics, vaccination centers, emergency contacts, and community health programs near you.
            </p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-6 text-center hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Health Education</h3>
            <p className="text-sm text-slate-600">
              Access articles on nutrition, hygiene, vaccination, first aid, and preventive care.
            </p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-6 text-center hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">AI Health Assistant</h3>
            <p className="text-sm text-slate-600">
              Get answers to general health questions with sourced, educational AI responses.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-center">
            <h3 className="text-lg font-semibold text-amber-800 mb-2">Important Disclaimer</h3>
            <p className="text-sm text-amber-700 max-w-2xl mx-auto">
              HealthBridge provides general educational health information only.
              It is not a medical diagnosis and should not replace professional
              medical advice. Always consult qualified healthcare professionals
              for personal medical concerns.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
