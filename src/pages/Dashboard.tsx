import React from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, Trophy, Clock, TrendingUp, ArrowRight, CheckCircle, Users, Play } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import LearningDashboard from '../components/LearningDashboard'

export default function Dashboard() {
  const { user, profile } = useAuth()

  if (!user) {
    return (
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-12">
            <BookOpen className="w-16 h-16 text-blue-400 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-white mb-4">Sign In to View Dashboard</h1>
            <p className="text-gray-300 mb-8">
              Create an account to track your learning progress and access personalized features
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200">
                Sign Up Now
              </button>
              <Link
                to="/learn"
                className="border border-white/20 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors duration-200"
              >
                Explore Learning Paths
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-white mb-4">Your Learning Dashboard</h1>
          <p className="text-gray-300">
            Track your progress and continue your MCP learning journey
          </p>
        </div>

        {/* Learning Dashboard */}
        <LearningDashboard />
      </div>
    </div>
  )
}