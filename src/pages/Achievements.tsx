import React from 'react'
import { Trophy, Star, Target, Zap, Users, BookOpen, Award, Lock } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

export default function Achievements() {
  const { profile } = useAuth()

  const achievements = [
    {
      id: 1,
      title: 'First Steps',
      description: 'Complete your first learning step',
      icon: Target,
      earned: true,
      earnedDate: '2025-01-15',
      category: 'Getting Started',
      points: 10
    },
    {
      id: 2,
      title: 'Knowledge Seeker',
      description: 'Complete 5 learning steps',
      icon: BookOpen,
      earned: true,
      earnedDate: '2025-01-16',
      category: 'Learning',
      points: 25
    },
    {
      id: 3,
      title: 'Path Starter',
      description: 'Start your first learning path',
      icon: Star,
      earned: true,
      earnedDate: '2025-01-15',
      category: 'Progress',
      points: 15
    },
    {
      id: 4,
      title: 'Beginner Graduate',
      description: 'Complete the entire Beginner Path',
      icon: Award,
      earned: false,
      earnedDate: null,
      category: 'Completion',
      points: 100
    },
    {
      id: 5,
      title: 'Community Member',
      description: 'Join the MCP Discord community',
      icon: Users,
      earned: false,
      earnedDate: null,
      category: 'Community',
      points: 20
    },
    {
      id: 6,
      title: 'Speed Learner',
      description: 'Complete 3 steps in one day',
      icon: Zap,
      earned: false,
      earnedDate: null,
      category: 'Speed',
      points: 30
    },
    {
      id: 7,
      title: 'Intermediate Explorer',
      description: 'Start the Intermediate Path',
      icon: Target,
      earned: false,
      earnedDate: null,
      category: 'Progress',
      points: 50
    },
    {
      id: 8,
      title: 'MCP Expert',
      description: 'Complete all three learning paths',
      icon: Trophy,
      earned: false,
      earnedDate: null,
      category: 'Mastery',
      points: 500
    }
  ]

  const earnedAchievements = achievements.filter(a => a.earned)
  const totalPoints = earnedAchievements.reduce((sum, a) => sum + a.points, 0)
  const totalPossiblePoints = achievements.reduce((sum, a) => sum + a.points, 0)

  const categories = ['All', 'Getting Started', 'Learning', 'Progress', 'Completion', 'Community', 'Speed', 'Mastery']
  const [selectedCategory, setSelectedCategory] = React.useState('All')

  const filteredAchievements = selectedCategory === 'All' 
    ? achievements 
    : achievements.filter(a => a.category === selectedCategory)

  if (!profile) {
    return (
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-white">Loading achievements...</div>
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
              {Math.round((earnedAchievements.length / achievements.length) * 100)}%
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
          {filteredAchievements.map((achievement) => (
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
                      <achievement.icon className="w-6 h-6 text-white" />
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
          ))}
        </div>

        {/* Next Achievement */}
        <div className="mt-12 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Keep Going!</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            You're doing great! Continue your learning journey to unlock more achievements and earn points.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200">
              Continue Learning
            </button>
            <button className="border border-white/20 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors duration-200">
              View Learning Paths
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}