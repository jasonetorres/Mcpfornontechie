import React, { useState } from 'react';
import { Check, Zap, Users, Crown, Star, ArrowRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useSubscription } from '../hooks/useSubscription';
import { useCheckout } from '../hooks/useCheckout';
import { stripeProducts, getSubscriptionProducts, getOneTimeProducts } from '../stripe-config';
import AuthModal from '../components/AuthModal';

export default function Pricing() {
  const { user } = useAuth();
  const { subscription, getSubscriptionPlan, isActive } = useSubscription();
  const { createCheckoutSession, loading: checkoutLoading, error: checkoutError } = useCheckout();
  const [billingInterval, setBillingInterval] = useState<'monthly' | 'annual'>('monthly');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signup');

  const subscriptionProducts = getSubscriptionProducts();
  const oneTimeProducts = getOneTimeProducts();
  const currentPlan = getSubscriptionPlan();

  const handlePurchase = async (priceId: string, mode: 'payment' | 'subscription') => {
    if (!user) {
      setAuthMode('signup');
      setShowAuthModal(true);
      return;
    }

    await createCheckoutSession({
      priceId,
      mode,
      successUrl: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${window.location.origin}/pricing`,
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getFeatures = (planName: string) => {
    switch (planName) {
      case 'Starter':
        return [
          'Access to beginner learning path',
          'Community forum access',
          'Basic templates library',
          'Email support',
          'Progress tracking',
        ];
      case 'Pro':
        return [
          'All Starter features',
          'Access to all learning paths',
          'Premium templates',
          '1:1 expert support sessions',
          'Priority email support',
          'Advanced progress analytics',
          'Custom template requests',
        ];
      case 'Team':
        return [
          'All Pro features',
          'Up to 10 team members',
          'Team progress dashboard',
          'Dedicated account manager',
          'Custom onboarding session',
          'Team training materials',
          'Priority feature requests',
        ];
      default:
        return [];
    }
  };

  const getPlanIcon = (planName: string) => {
    switch (planName) {
      case 'Starter':
        return <Zap className="w-6 h-6" />;
      case 'Pro':
        return <Crown className="w-6 h-6" />;
      case 'Team':
        return <Users className="w-6 h-6" />;
      default:
        return <Star className="w-6 h-6" />;
    }
  };

  const getPlanColor = (planName: string) => {
    switch (planName) {
      case 'Starter':
        return 'from-blue-500 to-cyan-600';
      case 'Pro':
        return 'from-purple-500 to-pink-600';
      case 'Team':
        return 'from-orange-500 to-red-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const isCurrentPlan = (planName: string) => {
    return currentPlan === planName && isActive();
  };

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-foreground mb-4">Choose Your Plan</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Start building with MCP today. Upgrade anytime as your needs grow.
          </p>
          {user && (
            <div className="mt-4 inline-flex items-center space-x-2 bg-matrix-primary/20 text-matrix-primary px-4 py-2 rounded-full">
              <div className="w-2 h-2 bg-matrix-primary rounded-full animate-pulse"></div>
              <span>Current plan: {currentPlan}</span>
            </div>
          )}
        </div>

        {/* Error Display */}
        {checkoutError && (
          <div className="mb-8 bg-destructive/20 border border-destructive/30 rounded-lg p-4 text-center">
            <p className="text-destructive">{checkoutError}</p>
          </div>
        )}

        {/* Free Plan */}
        <div className="mb-12">
          <div className="bg-card/50 backdrop-blur-md border border-border rounded-xl p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-matrix-primary to-matrix-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-primary-foreground" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2">Free</h3>
            <div className="text-3xl font-bold text-foreground mb-4">$0</div>
            <p className="text-muted-foreground mb-6">Perfect for getting started with MCP</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="text-left">
                <h4 className="font-semibold text-foreground mb-2">What's Included:</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-matrix-primary" />
                    <span>Basic MCP concepts</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-matrix-primary" />
                    <span>Community forum access</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-matrix-primary" />
                    <span>Free templates</span>
                  </li>
                </ul>
              </div>
              <div className="text-left">
                <h4 className="font-semibold text-foreground mb-2">Learning Resources:</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-matrix-primary" />
                    <span>Interactive demo</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-matrix-primary" />
                    <span>Platform comparison guide</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-matrix-primary" />
                    <span>Basic tutorials</span>
                  </li>
                </ul>
              </div>
              <div className="text-left">
                <h4 className="font-semibold text-foreground mb-2">Support:</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-matrix-primary" />
                    <span>Community support</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-matrix-primary" />
                    <span>Documentation access</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-matrix-primary" />
                    <span>Weekly office hours</span>
                  </li>
                </ul>
              </div>
            </div>
            {!user ? (
              <button
                onClick={() => {
                  setAuthMode('signup');
                  setShowAuthModal(true);
                }}
                className="bg-gradient-to-r from-matrix-primary to-matrix-secondary hover:from-matrix-accent hover:to-matrix-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold transition-all duration-200"
              >
                Get Started Free
              </button>
            ) : (
              <div className="text-matrix-primary font-semibold">You're all set! Start exploring.</div>
            )}
          </div>
        </div>

        {/* Subscription Plans */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Subscription Plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {subscriptionProducts.map((product) => {
              const features = getFeatures(product.name);
              const icon = getPlanIcon(product.name);
              const colorClass = getPlanColor(product.name);
              const isCurrent = isCurrentPlan(product.name);

              return (
                <div
                  key={product.priceId}
                  className={`relative bg-card/50 backdrop-blur-md border rounded-xl p-8 transition-all duration-300 hover:scale-105 ${
                    product.name === 'Pro' 
                      ? 'border-matrix-primary shadow-lg shadow-matrix-primary/20' 
                      : 'border-border hover:border-matrix-primary/50'
                  }`}
                >
                  {product.name === 'Pro' && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-matrix-primary to-matrix-secondary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="text-center mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-r ${colorClass} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      {icon}
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">{product.name}</h3>
                    <div className="text-3xl font-bold text-foreground mb-2">
                      {formatPrice(product.price || 0)}
                      <span className="text-lg text-muted-foreground">/month</span>
                    </div>
                    <p className="text-muted-foreground">{product.description}</p>
                  </div>

                  <div className="space-y-3 mb-8">
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <Check className="w-5 h-5 text-matrix-primary mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => handlePurchase(product.priceId, product.mode)}
                    disabled={checkoutLoading || isCurrent}
                    className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ${
                      isCurrent
                        ? 'bg-muted text-muted-foreground cursor-not-allowed'
                        : product.name === 'Pro'
                        ? 'bg-gradient-to-r from-matrix-primary to-matrix-secondary hover:from-matrix-accent hover:to-matrix-primary text-primary-foreground'
                        : 'border border-border text-foreground hover:bg-muted'
                    }`}
                  >
                    {checkoutLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                        <span>Processing...</span>
                      </>
                    ) : isCurrent ? (
                      <span>Current Plan</span>
                    ) : (
                      <>
                        <span>Choose {product.name}</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* One-Time Courses */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">One-Time Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {oneTimeProducts.map((product) => (
              <div
                key={product.priceId}
                className="bg-card/50 backdrop-blur-md border border-border rounded-xl p-8 hover:border-matrix-primary/50 transition-all duration-300"
              >
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">{product.name}</h3>
                  <div className="text-3xl font-bold text-foreground mb-2">
                    {formatPrice(product.price || 0)}
                  </div>
                  <p className="text-muted-foreground">{product.description}</p>
                </div>

                <div className="space-y-3 mb-8">
                  <div className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-matrix-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Lifetime access to course materials</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-matrix-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Step-by-step video tutorials</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-matrix-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Downloadable templates and resources</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-matrix-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Certificate of completion</span>
                  </div>
                </div>

                <button
                  onClick={() => handlePurchase(product.priceId, product.mode)}
                  disabled={checkoutLoading}
                  className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  {checkoutLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <span>Purchase Course</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-card/50 backdrop-blur-md border border-border rounded-xl p-8">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Can I change plans anytime?</h3>
              <p className="text-muted-foreground">Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately for upgrades, or at the end of your billing cycle for downgrades.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">What payment methods do you accept?</h3>
              <p className="text-muted-foreground">We accept all major credit cards (Visa, MasterCard, American Express) through our secure Stripe payment processor.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Is there a free trial?</h3>
              <p className="text-muted-foreground">Our Free plan gives you access to core features with no time limit. You can upgrade to a paid plan whenever you're ready for more advanced features.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Can I cancel anytime?</h3>
              <p className="text-muted-foreground">Absolutely! You can cancel your subscription at any time. You'll continue to have access to paid features until the end of your current billing period.</p>
            </div>
          </div>
        </div>

        {/* Auth Modal */}
        <AuthModal 
          isOpen={showAuthModal} 
          onClose={() => setShowAuthModal(false)}
          defaultMode={authMode}
        />
      </div>
    </div>
  );
}