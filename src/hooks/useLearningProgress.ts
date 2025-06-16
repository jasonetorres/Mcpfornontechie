import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'

export type PathType = 'beginner' | 'intermediate' | 'advanced'

interface LearningProgress {
  id: string
  user_id: string
  path_type: PathType
  step_index: number
  completed: boolean
  completed_at: string | null
  created_at: string
}

export function useLearningProgress(pathType: PathType) {
  const { user } = useAuth()
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) {
      fetchProgress()
    } else {
      setCompletedSteps([])
    }
  }, [user, pathType])

  const fetchProgress = async () => {
    if (!user) return

    try {
      // Get progress from localStorage for demo
      const progressData = localStorage.getItem('mock-progress')
      if (progressData) {
        const allProgress = JSON.parse(progressData)
        const userProgress = allProgress.filter((item: LearningProgress) => 
          item.user_id === user.id && 
          item.path_type === pathType && 
          item.completed
        )
        const completed = userProgress.map((item: LearningProgress) => item.step_index)
        setCompletedSteps(completed)
      }
    } catch (error) {
      console.error('Error fetching learning progress:', error)
    }
  }

  const toggleStep = async (stepIndex: number) => {
    if (!user) return

    setLoading(true)
    const isCompleted = completedSteps.includes(stepIndex)

    try {
      const progressData = localStorage.getItem('mock-progress')
      let allProgress = progressData ? JSON.parse(progressData) : []

      if (isCompleted) {
        // Remove completion
        allProgress = allProgress.filter((item: LearningProgress) => 
          !(item.user_id === user.id && 
            item.path_type === pathType && 
            item.step_index === stepIndex)
        )
        setCompletedSteps(prev => prev.filter(i => i !== stepIndex))
      } else {
        // Add completion
        const newProgress = {
          id: 'progress-' + Date.now(),
          user_id: user.id,
          path_type: pathType,
          step_index: stepIndex,
          completed: true,
          completed_at: new Date().toISOString(),
          created_at: new Date().toISOString()
        }
        allProgress.push(newProgress)
        setCompletedSteps(prev => [...prev, stepIndex])
      }

      localStorage.setItem('mock-progress', JSON.stringify(allProgress))
    } catch (error) {
      console.error('Error updating learning progress:', error)
    } finally {
      setLoading(false)
    }
  }

  const getProgressPercentage = (totalSteps: number) => {
    return (completedSteps.length / totalSteps) * 100
  }

  return {
    completedSteps,
    loading,
    toggleStep,
    getProgressPercentage,
    refreshProgress: fetchProgress
  }
}