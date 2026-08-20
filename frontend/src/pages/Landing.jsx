import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/axios'

export default function Landing() {
  const [counts, setCounts] = useState({ resources: 0, articles: 0 })

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [res, art] = await Promise.all([
          api.get('/resources'),
          api.get('/articles'),
        ])
        setCounts({
          resources: res.data.data.resources?.length || 0,
          articles: art.data.data.articles?.length || 0,
        })
      } catch {}
    }
    fetchCounts()
  }, [])
  return (
    <div>
      {/* Hero Section */}
      <section className="hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span className="text-white/90 text-sm font-medium">AI-Powered Health Platform</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
                Your Trusted Source for
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-200 to-emerald-200"> Community Health</span>
              </h1>
              <p className="text-xl text-white/80 mb-8 max-w-lg leading-relaxed">
                Connect with reliable health resources, educational content, and AI-powered guidance — all in one place.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/resources"
                  className="bg-white text-cyan-700 px-8 py-4 rounded-xl font-semibold hover:bg-green-50 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                  Find Health Resources
                </Link>
                <Link
                  to="/education"
                  className="glass text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                  Health Education
                </Link>
              </div>
              <div className="flex items-center gap-6 mt-10">
                <div className="flex -space-x-3">
                  <div className="w-10 h-10 rounded-full bg-green-400 border-2 border-white flex items-center justify-center text-white text-sm font-bold">A</div>
                  <div className="w-10 h-10 rounded-full bg-cyan-400 border-2 border-white flex items-center justify-center text-white text-sm font-bold">B</div>
                  <div className="w-10 h-10 rounded-full bg-indigo-400 border-2 border-white flex items-center justify-center text-white text-sm font-bold">C</div>
                  <div className="w-10 h-10 rounded-full bg-amber-400 border-2 border-white flex items-center justify-center text-white text-sm font-bold">+</div>
                </div>
                <div>
                  <p className="text-white font-semibold">{counts.resources}+ Resources</p>
                  <p className="text-white/70 text-sm">Trusted by communities</p>
                </div>
              </div>
            </div>
            <div className="hidden lg:block relative">
              <div className="animate-float">
                <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-2xl p-4 shadow-lg">
                      <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center mb-3">
                        <svg className="w-6 h-6 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                      </div>
                      <p className="font-semibold text-slate-800 text-sm">Find Clinics</p>
                      <p className="text-xs text-slate-500">Near you</p>
                    </div>
                    <div className="bg-white rounded-2xl p-4 shadow-lg">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-3">
                        <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      </div>
                      <p className="font-semibold text-slate-800 text-sm">Vaccination</p>
                      <p className="text-xs text-slate-500">Centers</p>
                    </div>
                    <div className="bg-white rounded-2xl p-4 shadow-lg">
                      <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-3">
                        <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                      </div>
                      <p className="font-semibold text-slate-800 text-sm">AI Assistant</p>
                      <p className="text-xs text-slate-500">24/7 Help</p>
                    </div>
                    <div className="bg-white rounded-2xl p-4 shadow-lg">
                      <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-3">
                        <svg className="w-6 h-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                      </div>
                      <p className="font-semibold text-slate-800 text-sm">Articles</p>
                      <p className="text-xs text-slate-500">Health Tips</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative -mt-8 z-20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl p-5 text-center shadow-lg border border-slate-200/50">
              <p className="text-3xl font-extrabold text-cyan-600">{counts.resources}+</p>
              <p className="text-sm text-slate-600 mt-1">Health Resources</p>
            </div>
            <div className="bg-white rounded-2xl p-5 text-center shadow-lg border border-slate-200/50">
              <p className="text-3xl font-extrabold text-green-600">{counts.articles}+</p>
              <p className="text-sm text-slate-600 mt-1">Educational Articles</p>
            </div>
            <div className="bg-white rounded-2xl p-5 text-center shadow-lg border border-slate-200/50">
              <p className="text-3xl font-extrabold text-indigo-600">24/7</p>
              <p className="text-sm text-slate-600 mt-1">AI Assistance</p>
            </div>
            <div className="bg-white rounded-2xl p-5 text-center shadow-lg border border-slate-200/50">
              <p className="text-3xl font-extrabold text-amber-600">100%</p>
              <p className="text-sm text-slate-600 mt-1">Free Access</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <span className="inline-block text-cyan-600 font-semibold text-sm tracking-wider uppercase mb-3">Why HealthBridge</span>
          <h2 className="text-4xl font-extrabold text-slate-800 mb-4">Everything you need for better health</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Find health resources, learn about wellness, and get AI-powered educational guidance — all in one trusted platform.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-8 border border-slate-100 card-hover group">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-cyan-200 group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">Health Resources</h3>
            <p className="text-slate-600 leading-relaxed">
              Find clinics, vaccination centers, emergency contacts, and community health programs near you with AI-powered search.
            </p>
            <Link to="/resources" className="inline-flex items-center gap-2 text-cyan-600 font-semibold mt-4 hover:gap-3 transition-all">
              Explore Resources
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>
          <div className="bg-white rounded-2xl p-8 border border-slate-100 card-hover group">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-green-200 group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">Health Education</h3>
            <p className="text-slate-600 leading-relaxed">
              Access expert articles on nutrition, hygiene, vaccination, first aid, and preventive care with quality scoring.
            </p>
            <Link to="/education" className="inline-flex items-center gap-2 text-green-600 font-semibold mt-4 hover:gap-3 transition-all">
              Start Learning
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>
          <div className="bg-white rounded-2xl p-8 border border-slate-100 card-hover group">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-indigo-200 group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">AI Health Assistant</h3>
            <p className="text-slate-600 leading-relaxed">
              Get answers to general health questions with sourced, educational AI responses and intelligent resource recommendations.
            </p>
            <Link to="/ai-assistant" className="inline-flex items-center gap-2 text-indigo-600 font-semibold mt-4 hover:gap-3 transition-all">
              Try AI Assistant
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600 py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-extrabold text-white mb-6">Ready to take control of your health?</h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Join thousands of communities accessing reliable health information and AI-powered guidance.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/register" className="bg-white text-cyan-700 px-8 py-4 rounded-xl font-bold hover:bg-green-50 transition-all shadow-lg text-lg">
              Get Started Free
            </Link>
            <Link to="/resources" className="glass text-white px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition-all text-lg">
              Browse Resources
            </Link>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="bg-amber-50 border-y border-amber-200">
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>
            <h3 className="text-lg font-semibold text-amber-800">Medical Disclaimer</h3>
          </div>
          <p className="text-sm text-amber-700 max-w-2xl mx-auto">
            HealthBridge provides general educational health information only. It is not a medical diagnosis and should not replace professional medical advice. Always consult qualified healthcare professionals for personal medical concerns.
          </p>
        </div>
      </section>
    </div>
  )
}
