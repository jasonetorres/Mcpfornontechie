import React from 'react'
import { CheckCircle, Clock, Trophy, Target, Zap, Star } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

interface ProgressTrackerProps {
  currentModule?: number
  totalModules?: number
  completedModules?: number[]
  timeSpent?: string
  streak?: number
  showDetailed?: boolean
}

export default function ProgressTracker({ 
  currentModule = 1, 
  totalModules = 8, 
  completedModules = [], 
  timeSpent = "0h 0m",
  streak = 0,
  showDetailed = true 
}: ProgressTrackerProps) {
  const { user } = useAuth()
  
  const progressPercentage = (completedModules.length / totalModules) * 100
  
  const getModuleStatus = (moduleIndex: number) => {
    if (completedModules.includes(moduleIndex)) return 'completed'
    if (moduleIndex === currentModule) return 'current'
    if (moduleIndex < currentModule) return 'available'
    return 'locked'
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-blue-500 text-white'
      case 'current': return 'bg-blue-500 text-white animate-pulse'
      case 'available': return 'bg-gray-200 text-gray-700'
      case 'locked': return 'bg-gray-100 text-gray-400'
      default: return 'bg-gray-200 text-gray-700'
    }
  }

  if (!user && !showDetailed) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm text-center border border-border">
        <div className="text-muted-foreground mb-4">Sign in to track your progress</div>
        <button className="btn-primary">
          Sign In
        </button>
      </div>
    )
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-border">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Your Progress</h3>
        {user && (
          <div className="flex flex-col sm:flex-row items-end sm:items-center sm:space-x-4">
            <div className="flex items-center space-x-1">
              <Zap className="w-4 h-4 text-orange-500" />
              <span className="text-orange-500 text-sm">{streak} day streak</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4 text-blue-500" />
              <span className="text-blue-500 text-sm">{timeSpent}</span>
            </div>
          </div>
        )}
      </div>

      {/* Overall Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-foreground font-medium">Overall Progress</span>
          <span className="text-blue-500">{Math.round(progressPercentage)}%</span>
        </div>
        <div className="bg-gray-100 rounded-full h-2 overflow-hidden">
          <div 
            className="bg-blue-500 h-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Module Progress */}
      {showDetailed && (
        <div className="space-y-3">
          <h4 className="text-foreground font-medium">Modules</h4>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
            {Array.from({ length: totalModules }, (_, i) => i + 1).map((moduleNum) => {
              const status = getModuleStatus(moduleNum)
              return (
                <div
                  key={moduleNum}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-200 ${getStatusColor(status)}`}
                >
                  {status === 'completed' ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    moduleNum
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Achievement Preview */}
      {user && completedModules.length > 0 && (
        <div className="mt-6 pt-6 border-t border-border">
          <div className="flex items-center space-x-2 mb-3">
            <Trophy className="w-5 h-5 text-yellow-500" />
            <span className="text-foreground font-medium">Recent Achievement</span>
          </div>
          <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-100">
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="text-yellow-700 text-sm">
                {completedModules.length === 1 ? 'First Steps' : 
                 completedModules.length === 3 ? 'Getting Momentum' :
                 completedModules.length === 5 ? 'Halfway Hero' :
                 'MCP Explorer'}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}