import React, { useState } from 'react';
import { Users, MessageSquare, Calendar, Trophy, Star, ArrowRight, ExternalLink, Heart, Zap, BookOpen } from 'lucide-react';

function Community() {
  const [activeTab, setActiveTab] = useState('overview');

  const communityStats = [
    { label: 'Active Members', value: '2,847', icon: Users },
    { label: 'Projects Shared', value: '1,293', icon: Zap },
    { label: 'Questions Answered', value: '5,621', icon: MessageSquare },
    { label: 'Success Stories', value: '387', icon: Trophy }
  ];

  const featuredMembers = [
    {
      name: 'Sarah Chen',
      role: 'Community Manager',
      company: 'TechCorp',
      avatar: '👩‍💼',
      contributions: 45,
      specialties: ['Community Building', 'Member Engagement', 'Event Planning'],
      recentProject: 'Built an AI-powered member Q&A system using Google Sheets and Zapier'
    },
    {
      name: 'Mike Rodriguez',
      role: 'Marketing Director',
      company: 'GrowthCo',
      avatar: '👨‍💻',
      contributions: 38,
      specialties: ['Customer Segmentation', 'Campaign Automation', 'Analytics'],
      recentProject: 'Created personalized email campaigns using Airtable and Claude API'
    },
    {
      name: 'Lisa Park',
      role: 'Project Manager',
      company: 'InnovateLab',
      avatar: '👩‍🔬',
      contributions: 42,
      specialties: ['Project Tracking', 'Team Coordination', 'Process Automation'],
      recentProject: 'Automated project status reports using Notion and GPT-4'
    }
  ];

  const recentDiscussions = [
    {
      title: 'Best practices for connecting Salesforce to AI?',
      author: 'David Kim',
      replies: 12,
      lastActivity: '2 hours ago',
      tags: ['salesforce', 'crm', 'beginner'],
      solved: false
    },
    {
      title: 'How to handle sensitive data in MCP connections?',
      author: 'Emma Wilson',
      replies: 8,
      lastActivity: '4 hours ago',
      tags: ['security', 'privacy', 'best-practices'],
      solved: true
    },
    {
      title: 'Zapier vs Power Platform for MCP - which is better?',
      author: 'Alex Thompson',
      replies: 15,
      lastActivity: '6 hours ago',
      tags: ['zapier', 'power-platform', 'comparison'],
      solved: false
    },
    {
      title: 'Success Story: Automated our entire onboarding process!',
      author: 'Rachel Green',
      replies: 23,
      lastActivity: '1 day ago',
      tags: ['success-story', 'onboarding', 'automation'],
      solved: false
    }
  ];

  const upcomingEvents = [
    {
      title: 'MCP Office Hours',
      date: 'Every Friday',
      time: '2:00 PM EST',
      type: 'Weekly',
      description: 'Live Q&A with MCP experts and community members',
      attendees: 45
    },
    {
      title: 'No-Code AI Workshop',
      date: 'March 15, 2025',
      time: '1:00 PM EST',
      type: 'Workshop',
      description: 'Hands-on workshop building your first MCP connection',
      attendees: 127
    },
    {
      title: 'Community Showcase',
      date: 'March 22, 2025',
      time: '3:00 PM EST',
      type: 'Showcase',
      description: 'Members share their amazing MCP projects and success stories',
      attendees: 89
    }
  ];

  const learningPaths = [
    {
      title: 'MCP Fundamentals',
      description: 'Start here if you\'re completely new to MCP',
      modules: 5,
      duration: '2-3 hours',
      difficulty: 'Beginner',
      enrolled: 1247
    },
    {
      title: 'Platform Mastery',
      description: 'Deep dive into specific no-code platforms',
      modules: 8,
      duration: '4-6 hours',
      difficulty: 'Intermediate',
      enrolled: 892
    },
    {
      title: 'Advanced Patterns',
      description: 'Complex use cases and optimization techniques',
      modules: 6,
      duration: '3-4 hours',
      difficulty: 'Advanced',
      enrolled: 456
    }
  ];

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">MCP Community</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Join thousands of non-developers building amazing AI-powered solutions with MCP
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

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-12">
          {[
            { id: 'overview', name: 'Overview', icon: Users },
            { id: 'discussions', name: 'Discussions', icon: MessageSquare },
            { id: 'events', name: 'Events', icon: Calendar },
            { id: 'learning', name: 'Learning Paths', icon: BookOpen }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.name}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-12">
            {/* Featured Members */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-8">Featured Community Members</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {featuredMembers.map((member, index) => (
                  <div key={index} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="text-3xl">{member.avatar}</div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{member.name}</h3>
                        <p className="text-blue-300">{member.role}</p>
                        <p className="text-gray-400 text-sm">{member.company}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="flex items-center space-x-1">
                        <Heart className="w-4 h-4 text-red-400" />
                        <span className="text-red-300 text-sm">{member.contributions}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span className="text-yellow-300 text-sm">Top Contributor</span>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="text-white font-medium mb-2">Specialties:</h4>
                      <div className="flex flex-wrap gap-2">
                        {member.specialties.map((specialty, specIndex) => (
                          <span key={specIndex} className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs">
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-slate-800/50 rounded-lg p-3">
                      <h4 className="text-green-300 font-medium text-sm mb-1">Recent Project:</h4>
                      <p className="text-gray-300 text-sm">{member.recentProject}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Join Community CTA */}
            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">Ready to Join Our Community?</h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Connect with like-minded professionals, share your projects, get help, and learn from others building with MCP.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200">
                  Join Discord Community
                </button>
                <button className="border border-white/20 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors duration-200">
                  Browse Forum
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'discussions' && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-white">Recent Discussions</h2>
              <button className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200">
                Start New Discussion
              </button>
            </div>
            
            <div className="space-y-4">
              {recentDiscussions.map((discussion, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-lg font-semibold text-white">{discussion.title}</h3>
                        {discussion.solved && (
                          <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs font-medium">
                            Solved
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-300">
                        <span>by {discussion.author}</span>
                        <span>{discussion.replies} replies</span>
                        <span>{discussion.lastActivity}</span>
                      </div>
                    </div>
                    <button className="text-blue-400 hover:text-blue-300 transition-colors duration-200">
                      <ExternalLink className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {discussion.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="px-2 py-1 bg-gray-700/50 text-gray-300 rounded text-xs">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'events' && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-8">Upcoming Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      event.type === 'Weekly' ? 'bg-blue-500/20 text-blue-400' :
                      event.type === 'Workshop' ? 'bg-green-500/20 text-green-400' :
                      'bg-purple-500/20 text-purple-400'
                    }`}>
                      {event.type}
                    </span>
                    <div className="flex items-center space-x-1 text-gray-400">
                      <Users className="w-4 h-4" />
                      <span className="text-sm">{event.attendees}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-white mb-2">{event.title}</h3>
                  <p className="text-gray-300 mb-4">{event.description}</p>
                  
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
        )}

        {activeTab === 'learning' && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-8">Community Learning Paths</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {learningPaths.map((path, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">{path.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      path.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-400' :
                      path.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {path.difficulty}
                    </span>
                  </div>
                  
                  <p className="text-gray-300 mb-4">{path.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Modules:</span>
                      <span className="text-blue-300">{path.modules}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Duration:</span>
                      <span className="text-green-300">{path.duration}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Enrolled:</span>
                      <span className="text-purple-300">{path.enrolled.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <button className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2">
                    <span>Start Learning</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Community;