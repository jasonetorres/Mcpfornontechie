import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Trophy, Star, Target, Zap, Users, BookOpen, Award, Lock, Play, Download, ArrowRight } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useAchievements } from '../hooks/useAchievements'
import { useXP } from '../hooks/useXP'

const iconMap = {
  trophy: Trophy,
  star: Star,
  target: Target,
  zap: Zap,
  users: Users,
  book: BookOpen,
  award: Award,
  play: Play,
  download: Download
}

export default function Achievements() {
  const { user, profile } = useAuth()
  const { achievements, getTotalPoints, getCompletionPercentage } = useAchievements()
  const { level, totalXP } = useXP()
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [showConfetti, setShowConfetti] = useState(false)

  const earnedAchievements = achievements.filter(a => a.earned)
  const totalPoints = getTotalPoints()
  const totalPossiblePoints = achievements.reduce((sum, a) => sum + a.points, 0)
  const completionPercentage = getCompletionPercentage()

  const categories = ['All', 'Getting Started', 'Learning', 'Progress', 'Completion', 'Community', 'Speed', 'Mastery']

  const filteredAchievements = selectedCategory === 'All' 
    ? achievements 
    : achievements.filter(a => a.category === selectedCategory)
    
  // Show confetti animation when the page loads if user has achievements
  useEffect(() => {
    if (user && earnedAchievements.length > 0) {
      setShowConfetti(true)
      const timer = setTimeout(() => setShowConfetti(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [user, earnedAchievements.length])

  if (!user) {
    return (
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-12">
            <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-white mb-4">Sign In to View Achievements</h1>
            <p className="text-gray-300 mb-8">
              Create an account to track your progress and unlock achievements as you learn MCP!
            </p>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200">
              Sign Up Now
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-white mb-4">Your Achievements</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Track your progress and celebrate your learning milestones
          </p>
          
          {/* Level and XP */}
          <div className="mt-4 inline-flex items-center space-x-3 bg-matrix-primary/20 text-matrix-primary px-4 py-2 rounded-full">
            <Star className="w-5 h-5" />
            <span className="text-lg font-semibold">Level {level}</span>
            <span className="text-sm text-matrix-secondary">{totalXP} XP</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-blue-400 mb-1">{earnedAchievements.length}</div>
            <div className="text-blue-200 text-sm">Achievements Earned</div>
          </div>
          
          <div className="bg-gradient-to-r from-green-600/20 to-teal-600/20 border border-green-500/30 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-green-400 mb-1">{totalPoints}</div>
            <div className="text-green-200 text-sm">Points Earned</div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-purple-400 mb-1">
              {Math.round(completionPercentage)}%
            </div>
            <div className="text-purple-200 text-sm">Completion Rate</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white font-medium">Overall Progress</span>
            <span className="text-blue-300">{totalPoints} / {totalPossiblePoints} points</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${(totalPoints / totalPossiblePoints) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAchievements.map((achievement) => {
            const IconComponent = iconMap[achievement.icon as keyof typeof iconMap] || Target
            
            return (
              <div 
                key={achievement.id} 
                className={`relative overflow-hidden rounded-xl border transition-all duration-300 ${
                  achievement.earned
                    ? 'bg-gradient-to-br from-green-600/20 to-teal-600/20 border-green-500/30 hover:from-green-600/30 hover:to-teal-600/30'
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      achievement.earned
                        ? 'bg-gradient-to-r from-green-500 to-teal-600'
                        : 'bg-gray-600'
                    }`}>
                      {achievement.earned ? (
                        <IconComponent className="w-6 h-6 text-white" />
                      ) : (
                        <Lock className="w-6 h-6 text-gray-400" />
                      )}
                    </div>
                    <div className="text-right">
                      <div className={`text-sm font-medium ${
                        achievement.earned ? 'text-green-300' : 'text-gray-400'
                      }`}>
                        {achievement.points} pts
                      </div>
                      <div className="text-xs text-gray-400">{achievement.category}</div>
                    </div>
                  </div>

                  <h3 className={`text-lg font-semibold mb-2 ${
                    achievement.earned ? 'text-white' : 'text-gray-300'
                  }`}>
                    {achievement.title}
                  </h3>
                  
                  <p className={`text-sm mb-4 ${
                    achievement.earned ? 'text-green-200' : 'text-gray-400'
                  }`}>
                    {achievement.description}
                  </p>

                  {achievement.earned && achievement.earnedDate && (
                    <div className="text-xs text-green-300">
                      Earned on {new Date(achievement.earnedDate).toLocaleDateString()}
                    </div>
                  )}

                  {!achievement.earned && (
                    <div className="text-xs text-gray-500">
                      Not yet earned
                    </div>
                  )}
                </div>

                {achievement.earned && (
                  <div className="absolute top-2 right-2">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <Trophy className="w-3 h-3 text-white" />
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Next Achievement */}
        <div className="mt-12 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Keep Going!</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            You're doing great! Continue your learning journey to unlock more achievements and earn points.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/learn"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <span>Continue Learning</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/beginner-path"
              className="border border-white/20 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors duration-200"
            >
              View Learning Paths
            </Link>
          </div>
        </div>
      </div>
      
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {Array.from({ length: 100 }).map((_, i) => (
            <div 
              key={i}
              className="absolute w-2 h-2 rounded-full animate-matrix-rain"
              style={{ 
                left: `${Math.random() * 100}%`, 
                backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}