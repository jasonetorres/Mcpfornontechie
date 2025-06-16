import React, { useState } from 'react';
import { Users, MessageSquare, Calendar, Star, ArrowRight, CheckCircle, Zap, Book, Heart } from 'lucide-react';

function JoinCommunity() {
  const [selectedPlan, setSelectedPlan] = useState('free');

  const communityStats = [
    { label: 'Active Members', value: '2,847', icon: Users },
    { label: 'Questions Answered', value: '5,621', icon: MessageSquare },
    { label: 'Projects Shared', value: '1,293', icon: Zap },
    { label: 'Success Stories', value: '387', icon: Star }
  ];

  const membershipPlans = [
    {
      id: 'free',
      name: 'Community Member',
      price: 'Free',
      description: 'Perfect for getting started and learning the basics',
      features: [
        'Access to Discord community',
        'Basic tutorials and guides',
        'Community Q&A support',
        'Monthly group office hours',
        'Template library access'
      ],
      limitations: [
        'Limited to group support',
        'Basic templates only'
      ],
      cta: 'Join Free Community',
      popular: false
    },
    {
      id: 'supporter',
      name: 'Community Supporter',
      price: '$9/month',
      description: 'Enhanced support and exclusive content for serious builders',
      features: [
        'Everything in Community Member',
        'Priority support in Discord',
        'Weekly 1:1 office hours slots',
        'Advanced templates and examples',
        'Early access to new content',
        'Direct access to experts'
      ],
      limitations: [],
      cta: 'Become a Supporter',
      popular: true
    },
    {
      id: 'champion',
      name: 'MCP Champion',
      price: '$29/month',
      description: 'For teams and organizations building at scale',
      features: [
        'Everything in Community Supporter',
        'Unlimited 1:1 support sessions',
        'Custom template development',
        'Team training sessions',
        'Priority feature requests',
        'Co-marketing opportunities'
      ],
      limitations: [],
      cta: 'Become a Champion',
      popular: false
    }
  ];

  const communityBenefits = [
    {
      icon: Users,
      title: 'Connect with Peers',
      description: 'Network with other non-developers building amazing AI solutions'
    },
    {
      icon: MessageSquare,
      title: 'Get Expert Help',
      description: 'Ask questions and get answers from experienced community members'
    },
    {
      icon: Book,
      title: 'Learn Together',
      description: 'Access exclusive tutorials, workshops, and learning resources'
    },
    {
      icon: Zap,
      title: 'Share Your Success',
      description: 'Showcase your projects and inspire others in the community'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Community Manager at TechCorp',
      avatar: '👩‍💼',
      quote: 'The MCP community helped me build my first AI assistant in just 2 weeks. The support is incredible!',
      project: 'Member Q&A Bot'
    },
    {
      name: 'Mike Rodriguez',
      role: 'Marketing Director at GrowthCo',
      avatar: '👨‍💻',
      quote: 'I went from knowing nothing about AI to automating our entire lead scoring process. This community is gold.',
      project: 'Lead Scoring System'
    },
    {
      name: 'Lisa Park',
      role: 'Project Manager at InnovateLab',
      avatar: '👩‍🔬',
      quote: 'The 1:1 support sessions are game-changing. I got personalized help that saved me weeks of trial and error.',
      project: 'Project Status Reporter'
    }
  ];

  const upcomingEvents = [
    {
      title: 'MCP Fundamentals Workshop',
      date: 'March 15, 2025',
      time: '2:00 PM EST',
      type: 'Workshop',
      attendees: 127
    },
    {
      title: 'Community Showcase',
      date: 'March 22, 2025',
      time: '3:00 PM EST',
      type: 'Showcase',
      attendees: 89
    },
    {
      title: 'Platform Deep Dive: Zapier',
      date: 'March 29, 2025',
      time: '1:00 PM EST',
      type: 'Tutorial',
      attendees: 156
    }
  ];

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">Join the MCP Community</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Connect with thousands of non-developers building amazing AI-powered solutions
          </p>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {communityStats.map((stat, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-gray-300 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Community Benefits */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Why Join Our Community?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {communityBenefits.map((benefit, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <benefit.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{benefit.title}</h3>
                <p className="text-gray-300 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Membership Plans */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Choose Your Membership Level</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {membershipPlans.map((plan) => (
              <div
                key={plan.id}
                className={`relative bg-white/5 backdrop-blur-md border rounded-xl p-6 transition-all duration-300 ${
                  plan.popular
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-white/10 hover:bg-white/10'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="text-3xl font-bold text-blue-400 mb-2">{plan.price}</div>
                  <p className="text-gray-300 text-sm">{plan.description}</p>
                </div>

                <div className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {plan.limitations.length > 0 && (
                  <div className="space-y-2 mb-6">
                    {plan.limitations.map((limitation, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <div className="w-5 h-5 mt-0.5 flex-shrink-0 text-gray-500">•</div>
                        <span className="text-gray-400 text-sm">{limitation}</span>
                      </div>
                    ))}
                  </div>
                )}

                <button
                  className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
                      : 'border border-white/20 text-white hover:bg-white/10'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">What Our Members Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="text-3xl">{testimonial.avatar}</div>
                  <div>
                    <h4 className="text-white font-semibold">{testimonial.name}</h4>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <blockquote className="text-gray-300 mb-4 italic">
                  "{testimonial.quote}"
                </blockquote>
                <div className="bg-blue-500/20 rounded-lg p-3">
                  <span className="text-blue-300 text-sm font-medium">Project: </span>
                  <span className="text-blue-200 text-sm">{testimonial.project}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Upcoming Community Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    event.type === 'Workshop' ? 'bg-green-500/20 text-green-400' :
                    event.type === 'Showcase' ? 'bg-purple-500/20 text-purple-400' :
                    'bg-blue-500/20 text-blue-400'
                  }`}>
                    {event.type}
                  </span>
                  <div className="flex items-center space-x-1 text-gray-400">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">{event.attendees}</span>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-white mb-2">{event.title}</h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-blue-400" />
                    <span className="text-blue-300 text-sm">{event.date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-4 h-4 flex items-center justify-center">🕐</span>
                    <span className="text-gray-300 text-sm">{event.time}</span>
                  </div>
                </div>
                
                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200">
                  Register
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Ready to Start Building with the Community?</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Join thousands of non-developers who are transforming their work with AI. Get the support, resources, and connections you need to succeed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2">
              <Heart className="w-5 h-5" />
              <span>Join Discord Community</span>
            </button>
            <button className="border border-white/20 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors duration-200">
              Schedule 1:1 Call
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JoinCommunity;