import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'

export interface Achievement {
  id: string
  title: string
  description: string
  category: string
  points: number
  icon: string
  earned: boolean
  earnedDate: string | null
  condition: (data: any) => boolean
}

const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first-steps',
    title: 'First Steps',
    description: 'Complete your first learning step',
    category: 'Getting Started',
    points: 10,
    icon: 'target',
    earned: false,
    earnedDate: null,
    condition: (data) => data.completedSteps >= 1
  },
  {
    id: 'knowledge-seeker',
    title: 'Knowledge Seeker',
    description: 'Complete 5 learning steps',
    category: 'Learning',
    points: 25,
    icon: 'book',
    earned: false,
    earnedDate: null,
    condition: (data) => data.completedSteps >= 5
  },
  {
    id: 'path-starter',
    title: 'Path Starter',
    description: 'Start your first learning path',
    category: 'Progress',
    points: 15,
    icon: 'star',
    earned: false,
    earnedDate: null,
    condition: (data) => data.pathsStarted >= 1
  },
  {
    id: 'beginner-graduate',
    title: 'Beginner Graduate',
    description: 'Complete the entire Beginner Path',
    category: 'Completion',
    points: 100,
    icon: 'award',
    earned: false,
    earnedDate: null,
    condition: (data) => data.beginnerPathCompleted
  },
  {
    id: 'community-member',
    title: 'Community Member',
    description: 'Join the MCP Discord community',
    category: 'Community',
    points: 20,
    icon: 'users',
    earned: false,
    earnedDate: null,
    condition: (data) => data.joinedCommunity
  },
  {
    id: 'speed-learner',
    title: 'Speed Learner',
    description: 'Complete 3 steps in one day',
    category: 'Speed',
    points: 30,
    icon: 'zap',
    earned: false,
    earnedDate: null,
    condition: (data) => data.stepsInOneDay >= 3
  },
  {
    id: 'intermediate-explorer',
    title: 'Intermediate Explorer',
    description: 'Start the Intermediate Path',
    category: 'Progress',
    points: 50,
    icon: 'target',
    earned: false,
    earnedDate: null,
    condition: (data) => data.intermediatePathStarted
  },
  {
    id: 'mcp-expert',
    title: 'MCP Expert',
    description: 'Complete all three learning paths',
    category: 'Mastery',
    points: 500,
    icon: 'trophy',
    earned: false,
    earnedDate: null,
    condition: (data) => data.allPathsCompleted
  },
  {
    id: 'tutorial-master',
    title: 'Tutorial Master',
    description: 'Complete 3 interactive tutorials',
    category: 'Learning',
    points: 40,
    icon: 'play',
    earned: false,
    earnedDate: null,
    condition: (data) => data.tutorialsCompleted >= 3
  },
  {
    id: 'template-user',
    title: 'Template User',
    description: 'Download and use your first template',
    category: 'Progress',
    points: 15,
    icon: 'download',
    earned: false,
    earnedDate: null,
    condition: (data) => data.templatesUsed >= 1
  }
]

export function useAchievements() {
  const { user } = useAuth()
  const [achievements, setAchievements] = useState<Achievement[]>(ACHIEVEMENTS)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) {
      loadAchievements()
      checkAchievements()
    } else {
      setAchievements(ACHIEVEMENTS)
    }
  }, [user])

  const loadAchievements = () => {
    if (!user) return

    try {
      const savedAchievements = localStorage.getItem(`achievements-${user.id}`)
      if (savedAchievements) {
        const parsed = JSON.parse(savedAchievements)
        setAchievements(parsed)
      } else {
        // Initialize with default achievements for new users
        setAchievements(ACHIEVEMENTS)
        saveAchievements(ACHIEVEMENTS)
      }
    } catch (error) {
      console.error('Error loading achievements:', error)
      setAchievements(ACHIEVEMENTS)
    }
  }

  const saveAchievements = (updatedAchievements: Achievement[]) => {
    if (!user) return

    try {
      localStorage.setItem(`achievements-${user.id}`, JSON.stringify(updatedAchievements))
    } catch (error) {
      console.error('Error saving achievements:', error)
    }
  }

  const checkAchievements = () => {
    if (!user) return

    const userData = getUserData()
    const updatedAchievements = achievements.map(achievement => {
      if (!achievement.earned && achievement.condition(userData)) {
        return {
          ...achievement,
          earned: true,
          earnedDate: new Date().toISOString()
        }
      }
      return achievement
    })

    const newlyEarned = updatedAchievements.filter((achievement, index) => 
      achievement.earned && !achievements[index].earned
    )

    if (newlyEarned.length > 0) {
      setAchievements(updatedAchievements)
      saveAchievements(updatedAchievements)
      
      // Show notifications for newly earned achievements
      newlyEarned.forEach(achievement => {
        console.log(`🏆 Achievement earned: ${achievement.title}`)
        // You could trigger a toast notification here
      })
    }
  }

  const getUserData = () => {
    if (!user) return {}

    try {
      // Get learning progress
      const progressData = localStorage.getItem('mock-progress')
      const allProgress = progressData ? JSON.parse(progressData) : []
      const userProgress = allProgress.filter((item: any) => item.user_id === user.id)
      
      // Get tutorial completions
      const tutorialData = localStorage.getItem('tutorial-completions')
      const allTutorials = tutorialData ? JSON.parse(tutorialData) : []
      const userTutorials = allTutorials.filter((item: any) => item.userId === user.id)
      
      // Get community status
      const communityStatus = localStorage.getItem(`community-${user.id}`)
      
      // Get template usage
      const templateUsage = localStorage.getItem(`templates-${user.id}`)
      const templatesUsed = templateUsage ? JSON.parse(templateUsage).length : 0

      // Calculate stats
      const completedSteps = userProgress.filter((item: any) => item.completed).length
      const beginnerSteps = userProgress.filter((item: any) => 
        item.path_type === 'beginner' && item.completed
      ).length
      const intermediateSteps = userProgress.filter((item: any) => 
        item.path_type === 'intermediate' && item.completed
      ).length
      const advancedSteps = userProgress.filter((item: any) => 
        item.path_type === 'advanced' && item.completed
      ).length

      // Check for steps completed in one day
      const today = new Date().toDateString()
      const stepsToday = userProgress.filter((item: any) => 
        item.completed && new Date(item.completed_at).toDateString() === today
      ).length

      const pathsStarted = new Set(userProgress.map((item: any) => item.path_type)).size
      
      return {
        completedSteps,
        pathsStarted,
        beginnerPathCompleted: beginnerSteps >= 5, // Assuming 5 steps in beginner path
        intermediatePathStarted: userProgress.some((item: any) => item.path_type === 'intermediate'),
        allPathsCompleted: beginnerSteps >= 5 && intermediateSteps >= 5 && advancedSteps >= 5,
        joinedCommunity: !!communityStatus,
        stepsInOneDay: stepsToday,
        tutorialsCompleted: userTutorials.length,
        templatesUsed
      }
    } catch (error) {
      console.error('Error getting user data:', error)
      return {}
    }
  }

  const markCommunityJoined = () => {
    if (!user) return

    localStorage.setItem(`community-${user.id}`, 'true')
    checkAchievements()
  }

  const markTemplateUsed = (templateId: string) => {
    if (!user) return

    try {
      const existing = localStorage.getItem(`templates-${user.id}`)
      const templates = existing ? JSON.parse(existing) : []
      
      if (!templates.includes(templateId)) {
        templates.push(templateId)
        localStorage.setItem(`templates-${user.id}`, JSON.stringify(templates))
        checkAchievements()
      }
    } catch (error) {
      console.error('Error marking template used:', error)
    }
  }

  const getEarnedAchievements = () => achievements.filter(a => a.earned)
  const getTotalPoints = () => getEarnedAchievements().reduce((sum, a) => sum + a.points, 0)
  const getCompletionPercentage = () => (getEarnedAchievements().length / achievements.length) * 100

  // Force check achievements when called
  const forceCheckAchievements = () => {
    checkAchievements()
  }

  return {
    achievements,
    loading,
    checkAchievements: forceCheckAchievements,
    markCommunityJoined,
    markTemplateUsed,
    getEarnedAchievements,
    getTotalPoints,
    getCompletionPercentage
  }
}