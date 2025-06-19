import React, { useState, useEffect } from 'react'
import { Trophy, Star, Confetti, X } from 'lucide-react'

interface LevelUpModalProps {
  isOpen: boolean
  onClose: () => void
  level: number
  rewards?: string[]
}

export default function LevelUpModal({ isOpen, onClose, level, rewards = [] }: LevelUpModalProps) {
  const [animationComplete, setAnimationComplete] = useState(false)
  
  useEffect(() => {
    if (isOpen) {
      // Start animation sequence
      const timer = setTimeout(() => {
        setAnimationComplete(true)
      }, 1500)
      
      return () => clearTimeout(timer)
    } else {
      setAnimationComplete(false)
    }
  }, [isOpen])
  
  if (!isOpen) return null
  
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div 
        className="glass-strong max-w-md w-full rounded-xl overflow-hidden animate-scale-in"
      >
        <div className="relative">
          {/* Background effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/20 to-matrix-primary/20 overflow-hidden">
            {/* Animated particles */}
            <div className="absolute inset-0 overflow-hidden">
              {Array.from({ length: 20 }).map((_, i) => (
                <div 
                  key={i}
                  className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-matrix-rain"
                  style={{ 
                    left: `${Math.random() * 100}%`, 
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${2 + Math.random() * 3}s`
                  }}
                />
              ))}
            </div>
          </div>
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors duration-200 z-10"
          >
            <X className="w-5 h-5" />
          </button>
          
          {/* Content */}
          <div className="relative z-10 p-8 text-center">
            <div className="mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2 animate-matrix-glow">Level Up!</h2>
              <div className="text-4xl font-bold text-yellow-400 mb-4 animate-matrix-glow">
                Level {level}
              </div>
              <p className="text-matrix-secondary">
                Congratulations! You've reached a new level in your MCP journey.
              </p>
            </div>
            
            {/* Rewards - only show after initial animation */}
            {animationComplete && rewards.length > 0 && (
              <div className="mb-6 animate-fade-in">
                <h3 className="text-lg font-semibold text-foreground mb-3">Rewards Unlocked</h3>
                <div className="space-y-2">
                  {rewards.map((reward, index) => (
                    <div key={index} className="flex items-center space-x-2 bg-matrix-primary/20 rounded-lg p-3">
                      <Star className="w-5 h-5 text-yellow-400" />
                      <span className="text-matrix-primary">{reward}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Continue button - only show after initial animation */}
            {animationComplete && (
              <button
                onClick={onClose}
                className="btn-primary w-full animate-fade-in"
              >
                Continue Learning
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}