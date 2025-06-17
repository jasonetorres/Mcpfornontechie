import React from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, Trophy, Clock, TrendingUp, ArrowRight, CheckCircle, Users, Play } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

export default function Dashboard() {
  const { user, profile } = useAuth()

  // Mock data - in a real app, this would come from your database
  const learningStats = {
    totalStepsCompleted: 12,
    totalTimeSpent: '8.5 hours',
    currentStreak: 5,
    pathsStarted: 2
  }

  const recentActivity = [
    {
      type: 'completed',
      title: 'Completed "Understanding MCP Fundamentals"',
      path: 'Beginner Path',
      time: '2 hours ago',
      url: '/beginner-path'
    },
    {
      type: 'started',
      title: 'Started "Choose Your Platform"',
      path: 'Beginner Path',
      time: '1 day ago',
      url: '/beginner-path'
    },
    {
      type: 'achievement',
      title: 'Earned "First Steps" achievement',
      path: 'General',
      time: '2 days ago',
      url: '/achievements'
    }
  ]

  const recommendedNext = [
    {
      title: 'Set Up Your First Connection',
      description: 'Connect a simple spreadsheet to AI using step-by-step guidance',
      path: 'Beginner Path',
      duration: '45 min',
      url: '/beginner-path'
    },
    {
      title: 'Platform Comparison Guide',
      description: 'Learn about different no-code platforms for MCP',
      path: 'Resources',
      duration: '15 min',
      url: '/platform-comparison'
    },
    {
      title: 'Community Q&A Template',
      description: 'Try our most popular template for community management',
      path: 'Templates',
      duration: '30 min',
      url: '/templates'
    }
  ]

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
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome back, {profile?.full_name || 'there'}! 👋
          </h1>
          <p className="text-gray-300">
            Continue your MCP learning journey and track your progress
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">{learningStats.totalStepsCompleted}</div>
            <div className="text-gray-300 text-sm">Steps Completed</div>
          </div>

          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">{learningStats.totalTimeSpent}</div>
            <div className="text-gray-300 text-sm">Time Spent</div>
          </div>

          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">{learningStats.currentStreak}</div>
            <div className="text-gray-300 text-sm">Day Streak</div>
          </div>

          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">{learningStats.pathsStarted}</div>
            <div className="text-gray-300 text-sm">Paths Started</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <Link
                  key={index}
                  to={activity.url}
                  className="flex items-start space-x-3 p-3 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition-colors duration-200"
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    activity.type === 'completed' ? 'bg-green-500/20' :
                    activity.type === 'started' ? 'bg-blue-500/20' :
                    'bg-purple-500/20'
                  }`}>
                    {activity.type === 'completed' ? (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    ) : activity.type === 'started' ? (
                      <Play className="w-4 h-4 text-blue-400" />
                    ) : (
                      <Trophy className="w-4 h-4 text-purple-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="text-white font-medium">{activity.title}</div>
                    <div className="text-gray-400 text-sm">{activity.path} • {activity.time}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Recommended Next */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-6">Recommended Next</h2>
            <div className="space-y-4">
              {recommendedNext.map((item, index) => (
                <Link
                  key={index}
                  to={item.url}
                  className="block p-4 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition-colors duration-200"
                >
                  <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-300 text-sm mb-3">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="text-gray-400 text-xs">
                      {item.path} • {item.duration}
                    </div>
                    <div className="flex items-center space-x-1 text-blue-400">
                      <span className="text-sm">Continue</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Learning Paths Progress */}
        <div className="mt-12 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Learning Paths Progress</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Beginner Path', progress: 60, url: '/beginner-path', color: 'from-green-500 to-teal-600' },
              { name: 'Intermediate Path', progress: 0, url: '/intermediate-path', color: 'from-yellow-500 to-orange-600' },
              { name: 'Advanced Path', progress: 0, url: '/advanced-path', color: 'from-red-500 to-pink-600' }
            ].map((path, index) => (
              <Link
                key={index}
                to={path.url}
                className="block p-4 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg transition-colors duration-200"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-white font-medium">{path.name}</h3>
                  <span className="text-gray-400 text-sm">{path.progress}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className={`bg-gradient-to-r ${path.color} h-2 rounded-full transition-all duration-300`}
                    style={{ width: `${path.progress}%` }}
                  ></div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-12 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Ready to Continue Learning?</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Pick up where you left off or explore new areas of MCP to expand your knowledge.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/beginner-path"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200"
            >
              Continue Learning Path
            </Link>
            <Link
              to="/templates"
              className="border border-white/20 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors duration-200"
            >
              Try a Template
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}