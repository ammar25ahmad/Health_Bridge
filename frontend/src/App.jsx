import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './store/authStore'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import RoleRoute from './components/RoleRoute'
import Loading from './components/Loading'

import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Resources from './pages/Resources'
import ResourceDetails from './pages/ResourceDetails'
import Education from './pages/Education'
import ArticleDetails from './pages/ArticleDetails'
import AIAssistant from './pages/AIAssistant'
import Agent from './pages/Agent'
import Profile from './pages/Profile'

import AdminDashboard from './admin/AdminDashboard'
import AdminResources from './admin/AdminResources'
import AdminEducation from './admin/AdminEducation'

import OrgDashboard from './organization/OrgDashboard'
import OrgResources from './organization/OrgResources'
import OrgEducation from './organization/OrgEducation'

export default function App() {
  const { loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/resources/:id" element={<ResourceDetails />} />
          <Route path="/education" element={<Education />} />
          <Route path="/education/:id" element={<ArticleDetails />} />

          <Route path="/dashboard" element={
            <ProtectedRoute><Dashboard /></ProtectedRoute>
          } />
          <Route path="/ai-assistant" element={
            <ProtectedRoute><AIAssistant /></ProtectedRoute>
          } />
          <Route path="/agent" element={
            <ProtectedRoute><Agent /></ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute><Profile /></ProtectedRoute>
          } />

          <Route path="/admin/dashboard" element={
            <RoleRoute roles={['ADMIN']}><AdminDashboard /></RoleRoute>
          } />
          <Route path="/admin/users" element={
            <RoleRoute roles={['ADMIN']}><AdminResources /></RoleRoute>
          } />
          <Route path="/admin/education" element={
            <RoleRoute roles={['ADMIN']}><AdminEducation /></RoleRoute>
          } />

          <Route path="/organization/dashboard" element={
            <RoleRoute roles={['ORGANIZATION']}><OrgDashboard /></RoleRoute>
          } />
          <Route path="/organization/resources" element={
            <RoleRoute roles={['ORGANIZATION']}><OrgResources /></RoleRoute>
          } />
          <Route path="/organization/education" element={
            <RoleRoute roles={['ORGANIZATION']}><OrgEducation /></RoleRoute>
          } />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
