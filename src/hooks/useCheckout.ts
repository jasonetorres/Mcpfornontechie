import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface CheckoutOptions {
  priceId: string;
  mode: 'payment' | 'subscription';
  successUrl?: string;
  cancelUrl?: string;
}

export function useCheckout() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createCheckoutSession = async (options: CheckoutOptions) => {
    if (!user) {
      setError('You must be signed in to make a purchase');
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const { data: { session } } = await user.getSession();
      
      if (!session) {
        setError('Authentication session not found');
        return null;
      }

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          price_id: options.priceId,
          mode: options.mode,
          success_url: options.successUrl || `${window.location.origin}/success`,
          cancel_url: options.cancelUrl || `${window.location.origin}/pricing`,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      if (data.url) {
        window.location.href = data.url;
      }

      return data;
    } catch (err: any) {
      console.error('Checkout error:', err);
      setError(err.message || 'An unexpected error occurred');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    createCheckoutSession,
    loading,
    error,
  };
}