export interface StripeProduct {
  priceId: string;
  name: string;
  description: string;
  mode: 'payment' | 'subscription';
  price?: number;
  currency?: string;
  interval?: 'month' | 'year';
}

export const stripeProducts: StripeProduct[] = [
  {
    priceId: 'price_1Rax3pRWDp0Sz2pAdoCUAn6c',
    name: 'One Time Courses',
    description: 'Access to individual learning paths and specialized courses',
    mode: 'payment',
    price: 15.00,
    currency: 'usd'
  },
  {
    priceId: 'price_1Rax2rRWDp0Sz2pAQF2JvsSB',
    name: 'Team',
    description: 'Get up to 10 users access to services',
    mode: 'subscription',
    price: 25.00,
    currency: 'usd',
    interval: 'month'
  },
  {
    priceId: 'price_1Rax2LRWDp0Sz2pAkHFvLJ9K',
    name: 'Pro',
    description: 'Power users with 1:1 support and advanced features',
    mode: 'subscription',
    price: 12.00,
    currency: 'usd',
    interval: 'month'
  },
  {
    priceId: 'price_1Rax29RWDp0Sz2pAnHVVPnZR',
    name: 'Starter',
    description: 'Individual users with essential features and community access',
    mode: 'subscription',
    price: 5.00,
    currency: 'usd',
    interval: 'month'
  }
];

export function getProductByPriceId(priceId: string): StripeProduct | undefined {
  return stripeProducts.find(product => product.priceId === priceId);
}

export function getSubscriptionProducts(): StripeProduct[] {
  return stripeProducts.filter(product => product.mode === 'subscription');
}

export function getOneTimeProducts(): StripeProduct[] {
  return stripeProducts.filter(product => product.mode === 'payment');
}