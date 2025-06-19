import React from 'react'
import { Calendar, Flame, Trophy, Star, CheckCircle } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

interface DailyStreakProps {
  streak: number
  lastActive: string
  xp: number
  level: number
}

export default function DailyStreak({ streak, lastActive, xp, level }: DailyStreakProps) {
  const { user } = useAuth()
  
  if (!user) {
    return null
  }
  
  // Calculate days since last activity
  const lastActiveDate = new Date(lastActive)
  const today = new Date()
  const diffTime = Math.abs(today.getTime() - lastActiveDate.getTime())
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
  
  // Calculate XP needed for next level (simple formula: level * 100)
  const nextLevelXP = (level + 1) * 100
  const xpProgress = (xp % 100) / 100 * 100 // Get percentage within current level
  
  return (
    <div className="glass rounded-xl p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Flame className={`w-5 h-5 ${streak > 0 ? 'text-orange-400' : 'text-muted-foreground'}`} />
          <h3 className="font-semibold text-foreground">Daily Streak</h3>
        </div>
        <div className="flex items-center space-x-1 text-sm">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <span className="text-muted-foreground">
            {diffDays === 0 ? 'Today' : diffDays === 1 ? 'Yesterday' : `${diffDays} days ago`}
          </span>
        </div>
      </div>
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            streak > 0 ? 'bg-gradient-to-r from-orange-500 to-red-500' : 'bg-muted'
          }`}>
            <span className="text-white font-bold">{streak}</span>
          </div>
          <div>
            <div className="font-medium text-foreground">
              {streak > 0 ? `${streak} day streak!` : 'Start your streak!'}
            </div>
            <div className="text-xs text-muted-foreground">
              {streak > 0 
                ? 'Keep going to earn bonus XP!' 
                : 'Complete a lesson today to start your streak'}
            </div>
          </div>
        </div>
        
        {streak >= 7 && (
          <div className="flex items-center space-x-1">
            <Trophy className="w-4 h-4 text-yellow-400" />
            <span className="text-yellow-400 text-sm font-medium">
              {streak >= 30 ? 'Monthly Master' : streak >= 14 ? 'Fortnight Finisher' : 'Week Warrior'}
            </span>
          </div>
        )}
      </div>
      
      {/* XP and Level */}
      <div className="mb-2">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-matrix-primary" />
            <span className="text-sm font-medium text-foreground">Level {level}</span>
          </div>
          <span className="text-xs text-matrix-secondary">{xp} XP</span>
        </div>
        <div className="progress-bar h-1.5">
          <div 
            className="progress-fill bg-gradient-to-r from-matrix-primary to-matrix-secondary"
            style={{ width: `${xpProgress}%` }}
          ></div>
        </div>
        <div className="flex justify-end mt-1">
          <span className="text-xs text-muted-foreground">
            {Math.floor(xpProgress)}% to Level {level + 1}
          </span>
        </div>
      </div>
      
      {/* Streak Calendar - Simplified Version */}
      <div className="flex justify-between mt-4 pt-4 border-t border-border">
        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => {
          // For demo purposes, we'll show some random completed days
          const isCompleted = [0, 2, 3, 5].includes(index)
          const isToday = index === 6 // Sunday is today in this example
          
          return (
            <div key={index} className="flex flex-col items-center">
              <div className="text-xs text-muted-foreground mb-1">{day}</div>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                isCompleted 
                  ? 'bg-matrix-primary text-primary-foreground' 
                  : isToday
                  ? 'border-2 border-matrix-primary/50 text-matrix-primary'
                  : 'bg-muted/50 text-muted-foreground'
              }`}>
                {isCompleted ? <CheckCircle className="w-3 h-3" /> : ''}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}