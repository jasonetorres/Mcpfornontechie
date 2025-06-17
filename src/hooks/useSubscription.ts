import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { getProductByPriceId } from '../stripe-config';

export interface UserSubscription {
  customer_id: string;
  subscription_id: string | null;
  subscription_status: string;
  price_id: string | null;
  current_period_start: number | null;
  current_period_end: number | null;
  cancel_at_period_end: boolean;
  payment_method_brand: string | null;
  payment_method_last4: string | null;
}

export function useSubscription() {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<UserSubscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchSubscription();
    } else {
      setSubscription(null);
      setLoading(false);
    }
  }, [user]);

  const fetchSubscription = async () => {
    try {
      setLoading(true);
      setError(null);

      // For demo purposes, simulate subscription data
      const mockSubscription = {
        customer_id: 'cus_mock123',
        subscription_id: 'sub_mock123',
        subscription_status: 'active',
        price_id: 'price_1Rax2LRWDp0Sz2pAkHFvLJ9K', // Pro plan
        current_period_start: Math.floor(Date.now() / 1000),
        current_period_end: Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60), // 30 days from now
        cancel_at_period_end: false,
        payment_method_brand: 'visa',
        payment_method_last4: '4242'
      };

      // Check if user has a stored subscription preference
      const storedSub = localStorage.getItem(`subscription-${user?.id}`);
      if (storedSub) {
        setSubscription(JSON.parse(storedSub));
      } else {
        // Default to free plan
        setSubscription(null);
      }
    } catch (err) {
      console.error('Error in fetchSubscription:', err);
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const getSubscriptionPlan = () => {
    if (!subscription || !subscription.price_id) {
      return 'Free';
    }

    const product = getProductByPriceId(subscription.price_id);
    return product?.name || 'Unknown Plan';
  };

  const isActive = () => {
    return subscription?.subscription_status === 'active';
  };

  const isPastDue = () => {
    return subscription?.subscription_status === 'past_due';
  };

  const isCanceled = () => {
    return subscription?.subscription_status === 'canceled';
  };

  const willCancelAtPeriodEnd = () => {
    return subscription?.cancel_at_period_end || false;
  };

  return {
    subscription,
    loading,
    error,
    refetch: fetchSubscription,
    getSubscriptionPlan,
    isActive,
    isPastDue,
    isCanceled,
    willCancelAtPeriodEnd,
  };
}