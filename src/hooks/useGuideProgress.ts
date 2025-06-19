import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useXP } from './useXP';

export function useGuideProgress() {
  const { user, addNotification } = useAuth();
  const { addXP } = useXP();
  const [completedGuides, setCompletedGuides] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchCompletedGuides();
    } else {
      setCompletedGuides([]);
    }
  }, [user]);

  const fetchCompletedGuides = () => {
    if (!user) return;

    setLoading(true);
    try {
      const completed = JSON.parse(localStorage.getItem(`completed-guides-${user.id}`) || '[]');
      setCompletedGuides(completed);
    } catch (error) {
      console.error('Error fetching completed guides:', error);
    } finally {
      setLoading(false);
    }
  };

  const markGuideCompleted = async (guideId: number, guideTitle: string) => {
    if (!user) return false;

    setLoading(true);
    try {
      if (!completedGuides.includes(guideId)) {
        const newCompletedGuides = [...completedGuides, guideId];
        localStorage.setItem(`completed-guides-${user.id}`, JSON.stringify(newCompletedGuides));
        setCompletedGuides(newCompletedGuides);
        
        // Award XP for completing the guide
        const xpAmount = 50;
        const leveledUp = await addXP(xpAmount, 'lesson_completed', `Completed guide: ${guideTitle}`);
        
        // Show notification
        addNotification({
          id: `guide-completed-${guideId}`,
          message: `Guide completed! You earned ${xpAmount} XP`,
          type: 'success',
          duration: 5000
        });
        
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error marking guide as completed:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const isGuideCompleted = (guideId: number) => {
    return completedGuides.includes(guideId);
  };

  const getCompletionPercentage = (totalGuides: number) => {
    if (totalGuides === 0) return 0;
    return (completedGuides.length / totalGuides) * 100;
  };

  return {
    completedGuides,
    loading,
    markGuideCompleted,
    isGuideCompleted,
    getCompletionPercentage,
    refreshCompletedGuides: fetchCompletedGuides
  };
}