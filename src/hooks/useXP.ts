import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'

export interface XPActivity {
  id: string
  type: 'lesson_completed' | 'quiz_completed' | 'streak_maintained' | 'achievement_earned' | 'community_participation'
  xp: number
  timestamp: string
  details: string
}

export function useXP() {
  const { user } = useAuth()
  const [totalXP, setTotalXP] = useState(0)
  const [level, setLevel] = useState(1)
  const [recentActivities, setRecentActivities] = useState<XPActivity[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) {
      fetchXPData()
    } else {
      setTotalXP(0)
      setLevel(1)
      setRecentActivities([])
    }
  }, [user])

  const fetchXPData = async () => {
    if (!user) return

    setLoading(true)
    try {
      // In a real app, we would fetch this from the backend
      // For now, we'll use mock data stored in localStorage
      const xpData = localStorage.getItem(`xp-${user.id}`)
      if (xpData) {
        const parsedData = JSON.parse(xpData)
        setTotalXP(parsedData.totalXP || 0)
        setLevel(calculateLevel(parsedData.totalXP || 0))
        setRecentActivities(parsedData.activities || [])
      } else {
        // Initialize with default values for new users
        const defaultXP = 0
        const defaultActivities: XPActivity[] = []
        setTotalXP(defaultXP)
        setLevel(calculateLevel(defaultXP))
        setRecentActivities(defaultActivities)
        
        // Save default values
        localStorage.setItem(`xp-${user.id}`, JSON.stringify({
          totalXP: defaultXP,
          activities: defaultActivities
        }))
      }
    } catch (error) {
      console.error('Error fetching XP data:', error)
    } finally {
      setLoading(false)
    }
  }

  const calculateLevel = (xp: number): number => {
    // Simple level calculation: level = 1 + floor(xp / 100)
    // This means each level requires 100 XP
    return 1 + Math.floor(xp / 100)
  }

  const addXP = async (amount: number, type: XPActivity['type'], details: string): Promise<void> => {
    if (!user) return

    try {
      // Create new activity
      const newActivity: XPActivity = {
        id: `xp-${Date.now()}`,
        type,
        xp: amount,
        timestamp: new Date().toISOString(),
        details
      }

      // Update state
      const newTotalXP = totalXP + amount
      const newLevel = calculateLevel(newTotalXP)
      const leveledUp = newLevel > level
      
      setTotalXP(newTotalXP)
      setLevel(newLevel)
      setRecentActivities([newActivity, ...recentActivities].slice(0, 10)) // Keep only 10 most recent

      // Save to localStorage
      localStorage.setItem(`xp-${user.id}`, JSON.stringify({
        totalXP: newTotalXP,
        activities: [newActivity, ...recentActivities].slice(0, 10)
      }))

      // Return whether user leveled up
      return leveledUp
    } catch (error) {
      console.error('Error adding XP:', error)
    }
  }

  const getXPForNextLevel = (): number => {
    // XP needed for next level = (current level + 1) * 100 - current XP
    return (level + 1) * 100 - totalXP
  }

  const getXPProgress = (): number => {
    // Progress within current level (0-100%)
    const levelMinXP = level * 100 - 100
    const levelMaxXP = level * 100
    const xpInLevel = totalXP - levelMinXP
    return (xpInLevel / (levelMaxXP - levelMinXP)) * 100
  }

  return {
    totalXP,
    level,
    recentActivities,
    loading,
    addXP,
    getXPForNextLevel,
    getXPProgress,
    refreshXP: fetchXPData
  }
}