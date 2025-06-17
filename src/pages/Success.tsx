import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle, ArrowRight, Download, Users, Star } from 'lucide-react';
import { useSubscription } from '../hooks/useSubscription';

export default function Success() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const { subscription, refetch: refetchSubscription } = useSubscription();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Refetch subscription data after successful payment
    const timer = setTimeout(() => {
      refetchSubscription();
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [refetchSubscription]);

  const nextSteps = [
    {
      title: 'Explore Your Dashboard',
      description: 'Track your learning progress and access personalized features',
      icon: Star,
      link: '/dashboard',
      action: 'Go to Dashboard'
    },
    {
      title: 'Start Learning',
      description: 'Begin with our structured learning paths designed for your level',
      icon: CheckCircle,
      link: '/learn',
      action: 'Start Learning'
    },
    {
      title: 'Download Templates',
      description: 'Access our premium template library to jumpstart your projects',
      icon: Download,
      link: '/templates',
      action: 'Browse Templates'
    },
    {
      title: 'Join the Community',
      description: 'Connect with other MCP builders and get expert help',
      icon: Users,
      link: '/join-community',
      action: 'Join Community'
    }
  ];

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-16">
          <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">Payment Successful!</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Thank you for your purchase. You now have access to premium MCP Academy features.
          </p>
          {sessionId && (
            <div className="mt-4 text-sm text-muted-foreground">
              Session ID: {sessionId}
            </div>
          )}
        </div>

        {/* Subscription Status */}
        {isLoading ? (
          <div className="bg-card/50 backdrop-blur-md border border-border rounded-xl p-8 text-center mb-12">
            <div className="w-8 h-8 border-2 border-matrix-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Setting up your account...</p>
          </div>
        ) : subscription ? (
          <div className="bg-gradient-to-r from-matrix-primary/20 to-matrix-secondary/20 border border-matrix-primary/30 rounded-xl p-8 text-center mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-2">Welcome to MCP Academy!</h2>
            <p className="text-matrix-primary mb-4">
              Your subscription is now active and ready to use.
            </p>
            <div className="inline-flex items-center space-x-2 bg-matrix-primary/20 text-matrix-primary px-4 py-2 rounded-full">
              <div className="w-2 h-2 bg-matrix-primary rounded-full animate-pulse"></div>
              <span>Active Subscription</span>
            </div>
          </div>
        ) : (
          <div className="bg-card/50 backdrop-blur-md border border-border rounded-xl p-8 text-center mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-2">Purchase Complete!</h2>
            <p className="text-muted-foreground">
              Your one-time purchase has been processed successfully. You now have access to your course materials.
            </p>
          </div>
        )}

        {/* Next Steps */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">What's Next?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {nextSteps.map((step, index) => (
              <div key={index} className="bg-card/50 backdrop-blur-md border border-border rounded-xl p-6 hover:border-matrix-primary/50 transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-matrix-primary to-matrix-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                    <step.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                    <p className="text-muted-foreground mb-4">{step.description}</p>
                    <Link
                      to={step.link}
                      className="inline-flex items-center space-x-2 text-matrix-primary hover:text-matrix-secondary transition-colors duration-200"
                    >
                      <span>{step.action}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Support Section */}
        <div className="bg-card/50 backdrop-blur-md border border-border rounded-xl p-8 text-center">
          <h3 className="text-xl font-bold text-foreground mb-4">Need Help Getting Started?</h3>
          <p className="text-muted-foreground mb-6">
            Our team is here to help you make the most of your MCP Academy experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/office-hours"
              className="bg-gradient-to-r from-matrix-primary to-matrix-secondary hover:from-matrix-accent hover:to-matrix-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold transition-all duration-200"
            >
              Schedule 1:1 Support
            </Link>
            <Link
              to="/join-community"
              className="border border-border text-foreground px-8 py-3 rounded-lg font-semibold hover:bg-muted transition-colors duration-200"
            >
              Join Community
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}