import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

export function useGuideProgress() {
  const { user } = useAuth();
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

  const markGuideCompleted = async (guideId: number) => {
    if (!user) return;

    setLoading(true);
    try {
      if (!completedGuides.includes(guideId)) {
        const newCompletedGuides = [...completedGuides, guideId];
        localStorage.setItem(`completed-guides-${user.id}`, JSON.stringify(newCompletedGuides));
        setCompletedGuides(newCompletedGuides);
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