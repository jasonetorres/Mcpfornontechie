import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, Trophy, Clock, TrendingUp, ArrowRight, CheckCircle, Users, Play } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

export default function Dashboard() {
  const { user, profile } = useAuth()
  const [userStats, setUserStats] = useState({
    totalStepsCompleted: 0,
    totalTimeSpent: '0 hours',
    currentStreak: 0,
    pathsStarted: 0,
    accountAge: 0
  })
  const [recentActivity, setRecentActivity] = useState<any[]>([])
  const [recommendedNext, setRecommendedNext] = useState<any[]>([])

  useEffect(() => {
    if (user) {
      calculateUserStats()
      loadRecentActivity()
      generateRecommendations()
    }
  }, [user])

  const calculateUserStats = () => {
    if (!user) return

    try {
      // Get learning progress
      const progressData = localStorage.getItem('mock-progress')
      const allProgress = progressData ? JSON.parse(progressData) : []
      const userProgress = allProgress.filter((item: any) => item.user_id === user.id)
      
      // Get tutorial completions
      const tutorialData = localStorage.getItem('tutorial-completions')
      const allTutorials = tutorialData ? JSON.parse(tutorialData) : []
      const userTutorials = allTutorials.filter((item: any) => item.userId === user.id)
      
      // Get achievements
      const achievementData = localStorage.getItem(`achievements-${user.id}`)
      const achievements = achievementData ? JSON.parse(achievementData) : []
      const earnedAchievements = achievements.filter((a: any) => a.earned)

      // Calculate account age
      const mockUser = localStorage.getItem('mock-user')
      const userData = mockUser ? JSON.parse(mockUser) : null
      const accountCreated = userData?.created_at || profile?.created_at || new Date().toISOString()
      const accountAge = Math.floor((new Date().getTime() - new Date(accountCreated).getTime()) / (1000 * 60 * 60 * 24))

      // Calculate current streak (simplified - days since last activity)
      const lastActivity = userProgress.length > 0 ? 
        Math.max(...userProgress.map((p: any) => new Date(p.completed_at || p.created_at).getTime())) :
        new Date().getTime()
      const daysSinceLastActivity = Math.floor((new Date().getTime() - lastActivity) / (1000 * 60 * 60 * 24))
      const currentStreak = daysSinceLastActivity <= 1 ? Math.max(1, accountAge) : 0

      // Calculate total time spent (estimate based on completed steps)
      const completedSteps = userProgress.filter((item: any) => item.completed).length
      const tutorialsCompleted = userTutorials.length
      const totalMinutes = (completedSteps * 30) + (tutorialsCompleted * 45) // Estimate 30 min per step, 45 min per tutorial
      const totalHours = Math.floor(totalMinutes / 60)
      const remainingMinutes = totalMinutes % 60
      const timeSpent = totalHours > 0 ? 
        `${totalHours}h ${remainingMinutes}m` : 
        `${remainingMinutes} minutes`

      // Count unique paths started
      const pathsStarted = new Set(userProgress.map((item: any) => item.path_type)).size

      setUserStats({
        totalStepsCompleted: completedSteps + tutorialsCompleted,
        totalTimeSpent: timeSpent,
        currentStreak: Math.max(0, currentStreak),
        pathsStarted,
        accountAge
      })
    } catch (error) {
      console.error('Error calculating user stats:', error)
    }
  }

  const loadRecentActivity = () => {
    if (!user) return

    try {
      const activities: any[] = []

      // Get learning progress
      const progressData = localStorage.getItem('mock-progress')
      const allProgress = progressData ? JSON.parse(progressData) : []
      const userProgress = allProgress.filter((item: any) => item.user_id === user.id)
      
      // Add completed steps
      userProgress
        .filter((item: any) => item.completed)
        .sort((a: any, b: any) => new Date(b.completed_at).getTime() - new Date(a.completed_at).getTime())
        .slice(0, 3)
        .forEach((item: any) => {
          const timeAgo = getTimeAgo(item.completed_at)
          activities.push({
            type: 'completed',
            title: `Completed step ${item.step_index + 1} in ${item.path_type} path`,
            path: `${item.path_type.charAt(0).toUpperCase() + item.path_type.slice(1)} Path`,
            time: timeAgo,
            url: `/${item.path_type}-path`
          })
        })

      // Get tutorial completions
      const tutorialData = localStorage.getItem('tutorial-completions')
      const allTutorials = tutorialData ? JSON.parse(tutorialData) : []
      const userTutorials = allTutorials.filter((item: any) => item.userId === user.id)
      
      userTutorials
        .sort((a: any, b: any) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime())
        .slice(0, 2)
        .forEach((item: any) => {
          const timeAgo = getTimeAgo(item.completedAt)
          activities.push({
            type: 'completed',
            title: `Completed tutorial: ${item.tutorialId}`,
            path: 'Interactive Examples',
            time: timeAgo,
            url: '/examples'
          })
        })

      // Get achievements
      const achievementData = localStorage.getItem(`achievements-${user.id}`)
      const achievements = achievementData ? JSON.parse(achievementData) : []
      const earnedAchievements = achievements.filter((a: any) => a.earned && a.earnedDate)
      
      earnedAchievements
        .sort((a: any, b: any) => new Date(b.earnedDate).getTime() - new Date(a.earnedDate).getTime())
        .slice(0, 2)
        .forEach((achievement: any) => {
          const timeAgo = getTimeAgo(achievement.earnedDate)
          activities.push({
            type: 'achievement',
            title: `Earned "${achievement.title}" achievement`,
            path: 'Achievements',
            time: timeAgo,
            url: '/achievements'
          })
        })

      // If no activities, show account creation
      if (activities.length === 0) {
        const accountCreated = profile?.created_at || new Date().toISOString()
        const timeAgo = getTimeAgo(accountCreated)
        activities.push({
          type: 'started',
          title: 'Joined MCP Academy',
          path: 'Welcome',
          time: timeAgo,
          url: '/learn'
        })
      }

      // Sort all activities by time and take the most recent 3
      activities.sort((a, b) => {
        const timeA = parseTimeAgo(a.time)
        const timeB = parseTimeAgo(b.time)
        return timeA - timeB
      })

      setRecentActivity(activities.slice(0, 3))
    } catch (error) {
      console.error('Error loading recent activity:', error)
    }
  }

  const generateRecommendations = () => {
    if (!user) return

    try {
      const recommendations: any[] = []

      // Get user progress to determine what to recommend
      const progressData = localStorage.getItem('mock-progress')
      const allProgress = progressData ? JSON.parse(progressData) : []
      const userProgress = allProgress.filter((item: any) => item.user_id === user.id)
      
      const completedSteps = userProgress.filter((item: any) => item.completed).length
      const pathsStarted = new Set(userProgress.map((item: any) => item.path_type)).size

      if (completedSteps === 0) {
        // New user - recommend starting with basics
        recommendations.push({
          title: 'Start Your MCP Journey',
          description: 'Begin with our beginner-friendly introduction to MCP concepts',
          path: 'Learning Path',
          duration: '30 min',
          url: '/beginner-path'
        })
        recommendations.push({
          title: 'Watch the Live Demo',
          description: 'See MCP in action with our interactive demonstration',
          path: 'Demo',
          duration: '15 min',
          url: '/demo'
        })
      } else if (completedSteps < 3) {
        // Early learner - encourage to continue
        recommendations.push({
          title: 'Continue Your Learning Path',
          description: 'Keep building your MCP knowledge step by step',
          path: 'Learning Path',
          duration: '45 min',
          url: '/beginner-path'
        })
        recommendations.push({
          title: 'Try Your First Template',
          description: 'Apply what you\'ve learned with a ready-to-use template',
          path: 'Templates',
          duration: '30 min',
          url: '/templates'
        })
      } else if (pathsStarted === 1) {
        // Progressing user - suggest expanding
        recommendations.push({
          title: 'Explore Intermediate Concepts',
          description: 'Ready for more advanced MCP implementations',
          path: 'Intermediate Path',
          duration: '1 hour',
          url: '/intermediate-path'
        })
        recommendations.push({
          title: 'Join the Community',
          description: 'Connect with other MCP builders and share your progress',
          path: 'Community',
          duration: '10 min',
          url: '/join-community'
        })
      } else {
        // Advanced user - suggest community involvement
        recommendations.push({
          title: 'Share Your Success',
          description: 'Inspire others by sharing your MCP success story',
          path: 'Community',
          duration: '15 min',
          url: '/success-stories'
        })
        recommendations.push({
          title: 'Mentor Others',
          description: 'Help newcomers in our office hours sessions',
          path: 'Office Hours',
          duration: '1 hour',
          url: '/office-hours'
        })
      }

      setRecommendedNext(recommendations)
    } catch (error) {
      console.error('Error generating recommendations:', error)
    }
  }

  const getTimeAgo = (dateString: string) => {
    const now = new Date()
    const date = new Date(dateString)
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 1) return 'Just now'
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`
    
    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return `${diffInHours} hours ago`
    
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays} days ago`
    
    const diffInWeeks = Math.floor(diffInDays / 7)
    return `${diffInWeeks} weeks ago`
  }

  const parseTimeAgo = (timeAgo: string): number => {
    if (timeAgo === 'Just now') return 0
    
    const match = timeAgo.match(/(\d+)\s+(minutes?|hours?|days?|weeks?)\s+ago/)
    if (!match) return 0
    
    const value = parseInt(match[1])
    const unit = match[2]
    
    switch (unit) {
      case 'minute':
      case 'minutes':
        return value
      case 'hour':
      case 'hours':
        return value * 60
      case 'day':
      case 'days':
        return value * 60 * 24
      case 'week':
      case 'weeks':
        return value * 60 * 24 * 7
      default:
        return 0
    }
  }

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
          {userStats.accountAge === 0 && (
            <div className="mt-2 text-green-300 text-sm">
              🎉 Welcome to MCP Academy! You joined today.
            </div>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">{userStats.totalStepsCompleted}</div>
            <div className="text-gray-300 text-sm">Steps Completed</div>
          </div>

          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">{userStats.totalTimeSpent}</div>
            <div className="text-gray-300 text-sm">Time Spent</div>
          </div>

          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">{userStats.currentStreak}</div>
            <div className="text-gray-300 text-sm">Day Streak</div>
          </div>

          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">{userStats.pathsStarted}</div>
            <div className="text-gray-300 text-sm">Paths Started</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-6">Recent Activity</h2>
            {recentActivity.length > 0 ? (
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
            ) : (
              <div className="text-center py-8">
                <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400 mb-4">No activity yet</p>
                <Link
                  to="/learn"
                  className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
                >
                  Start your learning journey
                </Link>
              </div>
            )}
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
              { 
                name: 'Beginner Path', 
                progress: Math.min(100, (userStats.totalStepsCompleted / 5) * 100), 
                url: '/beginner-path', 
                color: 'from-green-500 to-teal-600' 
              },
              { 
                name: 'Intermediate Path', 
                progress: userStats.pathsStarted > 1 ? Math.min(100, ((userStats.totalStepsCompleted - 5) / 5) * 100) : 0, 
                url: '/intermediate-path', 
                color: 'from-yellow-500 to-orange-600' 
              },
              { 
                name: 'Advanced Path', 
                progress: userStats.pathsStarted > 2 ? Math.min(100, ((userStats.totalStepsCompleted - 10) / 5) * 100) : 0, 
                url: '/advanced-path', 
                color: 'from-red-500 to-pink-600' 
              }
            ].map((path, index) => (
              <Link
                key={index}
                to={path.url}
                className="block p-4 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg transition-colors duration-200"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-white font-medium">{path.name}</h3>
                  <span className="text-gray-400 text-sm">{Math.round(path.progress)}%</span>
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
            {userStats.totalStepsCompleted === 0 
              ? "Start your MCP journey today and join thousands of non-developers building with AI!"
              : "Keep building your MCP expertise and unlock new possibilities for your work."
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to={userStats.totalStepsCompleted === 0 ? "/learn" : "/beginner-path"}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200"
            >
              {userStats.totalStepsCompleted === 0 ? "Start Learning" : "Continue Learning Path"}
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