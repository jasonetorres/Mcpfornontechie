import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
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
      const { data, error } = await supabase
        .from('learning_progress')
        .select('*')
        .eq('user_id', user.id)
        .eq('path_type', pathType)
        .eq('completed', true)

      if (!error && data) {
        const completed = data.map(item => item.step_index)
        setCompletedSteps(completed)
      }
    } catch (error) {
      console.error('Error fetching learning progress:', error)
    }
  }

  const toggleStep = async (stepIndex: number) => {
    if (!user) return

    const isCompleted = completedSteps.includes(stepIndex)

    try {
      if (isCompleted) {
        // Remove completion
        await supabase
          .from('learning_progress')
          .delete()
          .eq('user_id', user.id)
          .eq('path_type', pathType)
          .eq('step_index', stepIndex)

        setCompletedSteps(prev => prev.filter(i => i !== stepIndex))
      } else {
        // Add completion
        await supabase
          .from('learning_progress')
          .insert({
            user_id: user.id,
            path_type: pathType,
            step_index: stepIndex,
            completed: true,
            completed_at: new Date().toISOString()
          })

        setCompletedSteps(prev => [...prev, stepIndex])
      }
    } catch (error) {
      console.error('Error updating learning progress:', error)
    }
  }

  const getProgressPercentage = (totalSteps: number) => {
    return (completedSteps.length / totalSteps) * 100
  }

  return {
    completedSteps,
    loading: false, // Removed loading state
    toggleStep,
    getProgressPercentage,
    refreshProgress: fetchProgress
  }
}