import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, Zap, Trophy, ArrowRight, Calendar, Target, Star, Users } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useAchievements } from '../hooks/useAchievements'
import DailyStreak from './DailyStreak'
import XPRewards from './XPRewards'
import LearningPathProgress from './LearningPathProgress'

export default function LearningDashboard() {
  const { user, profile } = useAuth()
  const { achievements, getTotalPoints } = useAchievements()
  const [userStats, setUserStats] = useState({
    streak: 3,
    lastActive: new Date().toISOString(),
    xp: 145,
    level: 2,
    totalLessonsCompleted: 15
  })
  
  useEffect(() => {
    if (user) {
      // In a real app, we would fetch this data from the backend
      // For now, we'll use mock data
      console.log('Fetching user stats...')
    }
  }, [user])
  
  if (!user) {
    return (
      <div className="glass p-8 text-center">
        <div className="text-muted-foreground mb-4">Sign in to access your personalized learning dashboard</div>
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
              Ready to continue your MCP learning journey?
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="text-center">
              <div className="text-3xl font-bold text-matrix-primary">{userStats.level}</div>
              <div className="text-xs text-matrix-secondary">Level</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400">{getTotalPoints()}</div>
              <div className="text-xs text-yellow-300">Points</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">{achievements.filter(a => a.earned).length}</div>
              <div className="text-xs text-blue-300">Badges</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Learning Paths */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="heading-sm">Your Learning Paths</h3>
          
          <LearningPathProgress 
            pathType="beginner"
            totalSteps={5}
            pathName="Beginner Path"
            pathDescription="Perfect for those new to MCP"
            pathIcon={<BookOpen className="w-5 h-5 text-green-400" />}
            pathColor="bg-green-500/20"
            nextPath="/intermediate-path"
          />
          
          <LearningPathProgress 
            pathType="intermediate"
            totalSteps={5}
            pathName="Intermediate Path"
            pathDescription="For those with some experience"
            pathIcon={<Zap className="w-5 h-5 text-yellow-400" />}
            pathColor="bg-yellow-500/20"
            nextPath="/advanced-path"
          />
          
          <LearningPathProgress 
            pathType="advanced"
            totalSteps={5}
            pathName="Advanced Path"
            pathDescription="Master complex MCP implementations"
            pathIcon={<Target className="w-5 h-5 text-red-400" />}
            pathColor="bg-red-500/20"
          />
          
          {/* Continue Learning Button */}
          <div className="text-center mt-6">
            <Link to="/beginner-path" className="btn-primary">
              <BookOpen className="w-4 h-4 mr-2" />
              <span>Continue Learning</span>
            </Link>
          </div>
        </div>
        
        {/* Streak and Rewards */}
        <div className="space-y-6">
          <DailyStreak 
            streak={userStats.streak}
            lastActive={userStats.lastActive}
            xp={userStats.xp}
            level={userStats.level}
          />
          
          <XPRewards />
          
          {/* Recent Achievements */}
          <div className="glass rounded-xl p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Trophy className="w-5 h-5 text-yellow-400" />
                <h3 className="font-semibold text-foreground">Recent Achievements</h3>
              </div>
              <Link to="/achievements" className="text-xs text-matrix-primary hover:text-matrix-secondary">
                View All
              </Link>
            </div>
            
            <div className="space-y-3">
              {achievements.filter(a => a.earned).slice(0, 3).map((achievement) => (
                <div key={achievement.id} className="flex items-center space-x-3 p-2 glass rounded-lg">
                  <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                    <Star className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground">{achievement.title}</div>
                    <div className="text-xs text-muted-foreground">{achievement.points} points</div>
                  </div>
                </div>
              ))}
            </div>
            
            <Link to="/achievements" className="flex items-center justify-center space-x-1 mt-4 text-sm text-matrix-primary hover:text-matrix-secondary">
              <span>View all achievements</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          
          {/* Upcoming Events */}
          <div className="glass rounded-xl p-4">
            <div className="flex items-center space-x-2 mb-4">
              <Calendar className="w-5 h-5 text-matrix-primary" />
              <h3 className="font-semibold text-foreground">Upcoming</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 glass rounded-lg">
                <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <Users className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">Office Hours</div>
                  <div className="text-xs text-matrix-primary">Tomorrow at 2:00 PM</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 glass rounded-lg">
                <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <Trophy className="w-4 h-4 text-purple-400" />
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">Weekly Challenge</div>
                  <div className="text-xs text-muted-foreground">Ends in 3 days</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}