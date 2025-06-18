import React, { useState, useEffect } from 'react'
import { TrendingUp, Clock, Target, Zap, BookOpen, Users, Trophy, ArrowRight, Calendar, Bell } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import ProgressTracker from './ProgressTracker'
import { Link } from 'react-router-dom'

interface Recommendation {
  id: string
  title: string
  description: string
  type: 'course' | 'template' | 'community' | 'practice'
  priority: 'high' | 'medium' | 'low'
  estimatedTime: string
  reason: string
  action: string
  url: string
}

interface Activity {
  id: string
  type: 'completed' | 'started' | 'achievement' | 'community'
  title: string
  description: string
  timestamp: string
  icon: string
}

export default function PersonalizedDashboard() {
  const { user, profile } = useAuth()
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [recentActivity, setRecentActivity] = useState<Activity[]>([])
  const [userStats, setUserStats] = useState({
    totalTime: '12h 30m',
    completedModules: 15,
    currentStreak: 7,
    nextMilestone: 'MCP Intermediate',
    progressToNext: 65
  })

  useEffect(() => {
    if (user) {
      generatePersonalizedRecommendations()
      loadRecentActivity()
    }
  }, [user])

  const generatePersonalizedRecommendations = () => {
    // Simulate AI-powered recommendations based on user progress
    const recs: Recommendation[] = [
      {
        id: '1',
        title: 'Complete MCP Security Module',
        description: 'Learn best practices for securing your MCP implementations',
        type: 'course',
        priority: 'high',
        estimatedTime: '45 min',
        reason: 'You\'ve completed basic modules but haven\'t covered security yet',
        action: 'Start Module',
        url: '/mcp-basics'
      },
      {
        id: '2',
        title: 'Try Customer Segmentation Template',
        description: 'Perfect for your marketing background',
        type: 'template',
        priority: 'high',
        estimatedTime: '2 hours',
        reason: 'Based on your role and completed modules',
        action: 'Download Template',
        url: '/templates'
      },
      {
        id: '3',
        title: 'Join Marketing Automation Discussion',
        description: 'Active thread about advanced marketing workflows',
        type: 'community',
        priority: 'medium',
        estimatedTime: '15 min',
        reason: 'Matches your interests and experience level',
        action: 'Join Discussion',
        url: '/community'
      },
      {
        id: '4',
        title: 'Practice in MCP Sandbox',
        description: 'Test your knowledge with interactive exercises',
        type: 'practice',
        priority: 'medium',
        estimatedTime: '30 min',
        reason: 'Reinforce what you\'ve learned',
        action: 'Start Practice',
        url: '/sandbox'
      }
    ]
    setRecommendations(recs)
  }

  const loadRecentActivity = () => {
    const activities: Activity[] = [
      {
        id: '1',
        type: 'completed',
        title: 'Completed MCP Fundamentals',
        description: 'Finished all 8 modules with 95% score',
        timestamp: '2 hours ago',
        icon: '🎓'
      },
      {
        id: '2',
        type: 'achievement',
        title: 'Earned "Quick Learner" Badge',
        description: 'Completed 3 modules in one day',
        timestamp: '1 day ago',
        icon: '⚡'
      },
      {
        id: '3',
        type: 'community',
        title: 'Helped a Community Member',
        description: 'Answered question about Zapier integration',
        timestamp: '2 days ago',
        icon: '🤝'
      },
      {
        id: '4',
        type: 'started',
        title: 'Started Advanced Path',
        description: 'Began intermediate MCP concepts',
        timestamp: '3 days ago',
        icon: '🚀'
      }
    ]
    setRecentActivity(activities)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-500/30 bg-red-500/10'
      case 'medium': return 'border-yellow-500/30 bg-yellow-500/10'
      case 'low': return 'border-green-500/30 bg-green-500/10'
      default: return 'border-border bg-muted/50'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'course': return <BookOpen className="w-5 h-5 text-blue-400" />
      case 'template': return <Zap className="w-5 h-5 text-purple-400" />
      case 'community': return <Users className="w-5 h-5 text-green-400" />
      case 'practice': return <Target className="w-5 h-5 text-orange-400" />
      default: return <BookOpen className="w-5 h-5 text-gray-400" />
    }
  }

  if (!user) {
    return (
      <div className="glass p-8 text-center">
        <div className="text-muted-foreground mb-4">Sign in to access your personalized dashboard</div>
        <button className="btn-primary">
          Sign In
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="glass-strong bg-gradient-to-r from-matrix-primary/10 to-matrix-secondary/10 border-matrix-primary/30 rounded-xl p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="heading-md mb-2">
              Welcome back, {profile?.full_name || 'there'}! 👋
            </h2>
            <p className="text-matrix-secondary">
              You're on a {userStats.currentStreak} day learning streak! Keep it up!
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-matrix-primary">{userStats.progressToNext}%</div>
            <div className="text-matrix-secondary text-sm">to {userStats.nextMilestone}</div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass p-4 text-center">
          <Clock className="w-6 h-6 text-blue-400 mx-auto mb-2" />
          <div className="text-xl font-bold text-foreground">{userStats.totalTime}</div>
          <div className="text-muted-foreground text-sm">Time Spent</div>
        </div>
        
        <div className="glass p-4 text-center">
          <BookOpen className="w-6 h-6 text-green-400 mx-auto mb-2" />
          <div className="text-xl font-bold text-foreground">{userStats.completedModules}</div>
          <div className="text-muted-foreground text-sm">Modules Done</div>
        </div>
        
        <div className="glass p-4 text-center">
          <Zap className="w-6 h-6 text-orange-400 mx-auto mb-2" />
          <div className="text-xl font-bold text-foreground">{userStats.currentStreak}</div>
          <div className="text-muted-foreground text-sm">Day Streak</div>
        </div>
        
        <div className="glass p-4 text-center">
          <Trophy className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
          <div className="text-xl font-bold text-foreground">12</div>
          <div className="text-muted-foreground text-sm">Achievements</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Personalized Recommendations */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="heading-sm">Recommended for You</h3>
            <div className="flex items-center space-x-1 text-matrix-primary">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm">AI-powered</span>
            </div>
          </div>
          
          <div className="space-y-4">
            {recommendations.map((rec) => (
              <div key={rec.id} className={`glass border rounded-xl p-4 ${getPriorityColor(rec.priority)}`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start space-x-3">
                    {getTypeIcon(rec.type)}
                    <div>
                      <h4 className="font-semibold text-foreground">{rec.title}</h4>
                      <p className="text-muted-foreground text-sm">{rec.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">{rec.estimatedTime}</div>
                    <div className={`text-xs font-medium ${
                      rec.priority === 'high' ? 'text-red-400' :
                      rec.priority === 'medium' ? 'text-yellow-400' :
                      'text-green-400'
                    }`}>
                      {rec.priority} priority
                    </div>
                  </div>
                </div>
                
                <div className="glass p-3 mb-3">
                  <div className="text-xs text-muted-foreground mb-1">Why this is recommended:</div>
                  <div className="text-sm text-foreground">{rec.reason}</div>
                </div>
                
                <Link to={rec.url} className="btn-primary inline-flex text-sm py-2">
                  <span>{rec.action}</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Progress & Activity */}
        <div className="space-y-6">
          {/* Progress Tracker */}
          <ProgressTracker 
            currentModule={3}
            totalModules={8}
            completedModules={[1, 2]}
            timeSpent={userStats.totalTime}
            streak={userStats.currentStreak}
          />

          {/* Recent Activity */}
          <div className="glass p-6">
            <h3 className="heading-sm mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 glass rounded-lg">
                  <div className="text-xl">{activity.icon}</div>
                  <div className="flex-1">
                    <div className="font-medium text-foreground text-sm">{activity.title}</div>
                    <div className="text-muted-foreground text-xs">{activity.description}</div>
                    <div className="text-muted-foreground text-xs mt-1">{activity.timestamp}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="glass p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Calendar className="w-5 h-5 text-matrix-primary" />
              <h3 className="heading-sm">Upcoming</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 text-matrix-primary rounded-lg">
                <Bell className="w-4 h-4 text-matrix-primary" />
                <div>
                  <div className="font-medium text-foreground text-sm">Office Hours</div>
                  <div className="text-matrix-primary text-xs">Tomorrow at 2:00 PM</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 glass rounded-lg">
                <Users className="w-4 h-4 text-blue-400" />
                <div>
                  <div className="font-medium text-foreground text-sm">Community Showcase</div>
                  <div className="text-muted-foreground text-xs">Friday at 3:00 PM</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}