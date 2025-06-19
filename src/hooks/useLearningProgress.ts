import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useAchievements } from './useAchievements'
import { supabase } from '../lib/supabase'

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
  const { checkAchievements } = useAchievements()
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
      setLoading(true)
      
      // Fetch progress from Supabase
      const { data, error } = await supabase
        .from('learning_progress')
        .select('*')
        .eq('user_id', user.id)
        .eq('path_type', pathType)
        .eq('completed', true)
      
      if (error) {
        console.error('Error fetching learning progress:', error)
        return
      }
      
      if (data) {
        const completed = data.map((item: LearningProgress) => item.step_index)
        setCompletedSteps(completed)
      }
    } catch (error) {
      console.error('Error fetching learning progress:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleStep = async (stepIndex: number) => {
    if (!user) return

    setLoading(true)
    const isCompleted = completedSteps.includes(stepIndex)

    try {
      if (isCompleted) {
        // Remove completion
        const { error } = await supabase
          .from('learning_progress')
          .delete()
          .eq('user_id', user.id)
          .eq('path_type', pathType)
          .eq('step_index', stepIndex)
        
        if (error) throw error
        
        setCompletedSteps(prev => prev.filter(i => i !== stepIndex))
      } else {
        // Add completion
        const now = new Date().toISOString()
        const { error } = await supabase
          .from('learning_progress')
          .upsert({
            user_id: user.id,
            path_type: pathType,
            step_index: stepIndex,
            completed: true,
            completed_at: now
          })
        
        if (error) throw error
        
        setCompletedSteps(prev => [...prev, stepIndex])
      }

      // Check for new achievements after updating progress
      setTimeout(() => {
        checkAchievements()
      }, 100)
      
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