import React from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, Trophy, Clock, TrendingUp, ArrowRight, CheckCircle } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

export default function Dashboard() {
  const { profile } = useAuth()

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
      time: '2 hours ago'
    },
    {
      type: 'started',
      title: 'Started "Choose Your Platform"',
      path: 'Beginner Path',
      time: '1 day ago'
    },
    {
      type: 'achievement',
      title: 'Earned "First Steps" achievement',
      path: 'General',
      time: '2 days ago'
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
    }
  ]

  if (!profile) {
    return (
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-white">Loading dashboard...</div>
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
            Welcome back, {profile.full_name || 'there'}! 👋
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
                <div key={index} className="flex items-start space-x-3 p-3 bg-slate-800/50 rounded-lg">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    activity.type === 'completed' ? 'bg-green-500/20' :
                    activity.type === 'started' ? 'bg-blue-500/20' :
                    'bg-purple-500/20'
                  }`}>
                    {activity.type === 'completed' ? (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    ) : activity.type === 'started' ? (
                      <BookOpen className="w-4 h-4 text-blue-400" />
                    ) : (
                      <Trophy className="w-4 h-4 text-purple-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="text-white font-medium">{activity.title}</div>
                    <div className="text-gray-400 text-sm">{activity.path} • {activity.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Next */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-6">Recommended Next</h2>
            <div className="space-y-4">
              {recommendedNext.map((item, index) => (
                <div key={index} className="p-4 bg-slate-800/50 rounded-lg">
                  <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-300 text-sm mb-3">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="text-gray-400 text-xs">
                      {item.path} • {item.duration}
                    </div>
                    <Link
                      to={item.url}
                      className="text-blue-400 hover:text-blue-300 transition-colors duration-200 flex items-center space-x-1"
                    >
                      <span className="text-sm">Continue</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
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
      </div>
    </div>
  )
}