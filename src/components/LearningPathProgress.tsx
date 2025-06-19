import React from 'react'
import { CheckCircle, Lock, Star, Trophy, Zap } from 'lucide-react'
import { useLearningProgress } from '../hooks/useLearningProgress'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'

interface LearningPathProgressProps {
  pathType: 'beginner' | 'intermediate' | 'advanced'
  totalSteps: number
  pathName: string
  pathDescription: string
  pathIcon: React.ReactNode
  pathColor: string
  nextPath?: string
}

export default function LearningPathProgress({
  pathType,
  totalSteps,
  pathName,
  pathDescription,
  pathIcon,
  pathColor,
  nextPath
}: LearningPathProgressProps) {
  const { user } = useAuth()
  const { completedSteps, toggleStep, getProgressPercentage } = useLearningProgress(pathType)
  
  const progressPercentage = getProgressPercentage(totalSteps)
  const isPathCompleted = completedSteps.length === totalSteps
  
  return (
    <div className="glass rounded-xl overflow-hidden">
      {/* Path Header */}
      <div className={`p-4 border-b border-border ${pathColor}`}>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center">
            {pathIcon}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">{pathName}</h3>
            <p className="text-sm text-muted-foreground">{pathDescription}</p>
          </div>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-foreground font-medium">Progress</span>
          <span className="text-sm text-matrix-primary">{Math.round(progressPercentage)}%</span>
        </div>
        <div className="progress-bar">
          <div 
            className={`progress-fill ${pathColor.replace('bg-', '')}`}
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>
      
      {/* Steps */}
      <div className="p-4">
        <div className="grid grid-cols-5 gap-2">
          {Array.from({ length: totalSteps }, (_, i) => i).map((stepIndex) => {
            const isCompleted = completedSteps.includes(stepIndex)
            const isAvailable = stepIndex === 0 || completedSteps.includes(stepIndex - 1)
            
            return (
              <button
                key={stepIndex}
                onClick={() => user && isAvailable && toggleStep(stepIndex)}
                disabled={!user || !isAvailable}
                className={`w-full aspect-square rounded-lg flex items-center justify-center transition-all duration-200 ${
                  isCompleted 
                    ? `${pathColor} text-primary-foreground` 
                    : isAvailable
                    ? 'bg-muted/50 text-foreground hover:bg-muted'
                    : 'bg-muted/30 text-muted-foreground cursor-not-allowed'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle className="w-5 h-5" />
                ) : isAvailable ? (
                  <span className="font-semibold">{stepIndex + 1}</span>
                ) : (
                  <Lock className="w-4 h-4" />
                )}
              </button>
            )
          })}
        </div>
      </div>
      
      {/* Path Completion */}
      {isPathCompleted ? (
        <div className="p-4 bg-green-500/20 border-t border-green-500/30">
          <div className="flex items-center space-x-3">
            <Trophy className="w-6 h-6 text-green-400" />
            <div>
              <h4 className="font-semibold text-green-400">Path Completed!</h4>
              {nextPath && (
                <Link to={nextPath} className="text-sm text-green-300 hover:text-green-200">
                  Continue to next path →
                </Link>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4 bg-matrix-primary/10 border-t border-matrix-primary/30">
          <div className="flex items-center space-x-3">
            <Zap className="w-5 h-5 text-matrix-primary" />
            <div className="text-sm text-matrix-secondary">
              {completedSteps.length > 0 
                ? `${totalSteps - completedSteps.length} more steps to complete this path!` 
                : 'Start your learning journey!'}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}