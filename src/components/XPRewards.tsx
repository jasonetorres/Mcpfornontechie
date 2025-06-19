import React from 'react'
import { Star, Trophy, Zap, CheckCircle, BookOpen, Users, MessageSquare } from 'lucide-react'

interface XPReward {
  id: string
  title: string
  xp: number
  completed: boolean
  icon: React.ReactNode
}

export default function XPRewards() {
  const [dailyRewards, setDailyRewards] = React.useState<XPReward[]>([
    {
      id: 'daily-lesson',
      title: 'Complete a lesson',
      xp: 20,
      completed: false,
      icon: <BookOpen className="w-4 h-4 text-blue-400" />
    },
    {
      id: 'streak',
      title: 'Maintain your streak',
      xp: 10,
      completed: false,
      icon: <Zap className="w-4 h-4 text-orange-400" />
    },
    {
      id: 'community',
      title: 'Participate in community',
      xp: 15,
      completed: false,
      icon: <Users className="w-4 h-4 text-green-400" />
    },
    {
      id: 'quiz',
      title: 'Complete a quiz',
      xp: 25,
      completed: false,
      icon: <MessageSquare className="w-4 h-4 text-purple-400" />
    }
  ])
  
  const handleClaimReward = (id: string) => {
    setDailyRewards(dailyRewards.map(reward => 
      reward.id === id ? { ...reward, completed: true } : reward
    ))
  }
  
  return (
    <div className="glass rounded-xl p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Star className="w-5 h-5 text-yellow-400" />
          <h3 className="font-semibold text-foreground">Daily XP Rewards</h3>
        </div>
        <div className="text-xs text-muted-foreground">Resets in 12h 34m</div>
      </div>
      
      <div className="space-y-3">
        {dailyRewards.map((reward) => (
          <div key={reward.id} className="flex items-center justify-between p-3 glass rounded-lg">
            <div className="flex items-center space-x-3">
              {reward.icon}
              <span className="text-sm text-foreground">{reward.title}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="text-xs font-medium text-yellow-400">+{reward.xp} XP</div>
              {reward.completed ? (
                <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-3 h-3 text-green-400" />
                </div>
              ) : (
                <button 
                  onClick={() => handleClaimReward(reward.id)}
                  className="text-xs px-2 py-1 bg-matrix-primary/20 text-matrix-primary rounded-md hover:bg-matrix-primary/30 transition-colors duration-200"
                >
                  Claim
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Trophy className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-foreground">Weekly Challenge</span>
          </div>
          <div className="text-xs text-matrix-primary">3/7 days</div>
        </div>
        <div className="mt-2 progress-bar h-2">
          <div 
            className="progress-fill bg-gradient-to-r from-yellow-400 to-orange-500"
            style={{ width: '42.8%' }}
          ></div>
        </div>
        <div className="mt-2 text-xs text-muted-foreground text-center">
          Complete 7 days in a row to earn 100 bonus XP!
        </div>
      </div>
    </div>
  )
}