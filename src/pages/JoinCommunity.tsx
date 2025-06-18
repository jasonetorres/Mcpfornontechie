import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, MessageSquare, Calendar, Trophy, Star, ArrowRight, ExternalLink, Heart, Zap, BookOpen, Check } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useAchievements } from '../hooks/useAchievements';

function JoinCommunity() {
  const [activeTab, setActiveTab] = useState('overview');
  const [joinedDiscord, setJoinedDiscord] = useState(false);
  const [joinedForum, setJoinedForum] = useState(false);
  const { user } = useAuth();
  const { markCommunityJoined } = useAchievements();

  const handleJoinCommunity = (platform: 'discord' | 'forum') => {
    if (user) {
      markCommunityJoined();
      console.log('User joined community - achievement tracking updated');
    }
    
    if (platform === 'discord') {
      // Here you would typically redirect to Discord or open the community platform
      window.open('https://discord.gg/mcp4everyone', '_blank');
      setJoinedDiscord(true);
    } else {
      // Open forum in new tab
      window.open('https://forum.mcp4everyone.com', '_blank');
      setJoinedForum(true);
    }
  };

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

  const communityBenefits = [
    {
      title: 'Get Help When You Need It',
      description: 'Stuck on a problem? Our community members and experts are ready to help.',
      icon: '🤝'
    },
    {
      title: 'Share Your Success',
      description: 'Celebrate your wins and inspire others with your MCP projects.',
      icon: '🏆'
    },
    {
      title: 'Learn From Others',
      description: 'See how others are using MCP and learn from their experiences.',
      icon: '📚'
    },
    {
      title: 'Network With Peers',
      description: 'Connect with other non-technical professionals using AI.',
      icon: '🌐'
    },
    {
      title: 'Stay Up-to-Date',
      description: 'Be the first to know about new MCP features and best practices.',
      icon: '📣'
    },
    {
      title: 'Advance Your Career',
      description: 'Build your reputation as an MCP expert and open new opportunities.',
      icon: '📈'
    }
  ];

  return (
    <div className="container-responsive section-padding">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="heading-lg mb-4">Join the MCP4 Everyone Community</h1>
          <p className="text-body text-muted-foreground max-w-2xl mx-auto">
            Connect with thousands of people building amazing AI-powered solutions with MCP
          </p>
          {user && (
            <div className="mt-4 text-matrix-primary">
              ✅ Signed in - Joining the community will unlock achievements!
            </div>
          )}
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
          {communityStats.map((stat, index) => (
            <div key={index} className="glass p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-matrix-primary to-matrix-secondary rounded-lg flex items-center justify-center mb-4 mx-auto">
                <stat.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
              <div className="text-muted-foreground text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Community Benefits */}
        <div className="mb-12 sm:mb-16">
          <h2 className="heading-md text-center mb-8">Why Join Our Community?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {communityBenefits.map((benefit, index) => (
              <div key={index} className="glass p-6 hover:bg-card/70 transition-all duration-300">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="text-3xl">{benefit.icon}</div>
                  <h3 className="text-lg font-semibold text-foreground">{benefit.title}</h3>
                </div>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Join Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 sm:mb-16">
          <div className="glass-strong bg-gradient-to-r from-blue-600/10 to-purple-600/10 border-blue-500/30 rounded-xl p-6 sm:p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="text-4xl">💬</div>
              <div>
                <h3 className="heading-sm">Join Our Discord</h3>
                <p className="text-muted-foreground">Real-time chat, help, and collaboration</p>
              </div>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-start space-x-3">
                <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-foreground font-medium">Live Chat Support</div>
                  <div className="text-muted-foreground text-sm">Get help in real-time from community members</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-foreground font-medium">Dedicated Channels</div>
                  <div className="text-muted-foreground text-sm">Specific spaces for different topics and platforms</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-foreground font-medium">Weekly Events</div>
                  <div className="text-muted-foreground text-sm">Office hours, workshops, and community calls</div>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => handleJoinCommunity('discord')}
              className="btn-primary w-full"
              disabled={joinedDiscord}
            >
              {joinedDiscord ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  <span>Discord Joined</span>
                </>
              ) : (
                <>
                  <Users className="w-4 h-4 mr-2" />
                  <span>Join Discord Community</span>
                </>
              )}
            </button>
            
            <div className="text-center mt-3 text-sm text-muted-foreground">
              Already a member? <a href="https://discord.gg/mcp4everyone" target="_blank" rel="noopener noreferrer" className="text-matrix-primary hover:text-matrix-secondary">Open Discord</a>
            </div>
          </div>
          
          <div className="glass-strong bg-gradient-to-r from-green-600/10 to-teal-600/10 border-green-500/30 rounded-xl p-6 sm:p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="text-4xl">📝</div>
              <div>
                <h3 className="heading-sm">Join Our Forum</h3>
                <p className="text-muted-foreground">Structured discussions and knowledge base</p>
              </div>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-start space-x-3">
                <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-foreground font-medium">Searchable Knowledge</div>
                  <div className="text-muted-foreground text-sm">Find solutions to common problems</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-foreground font-medium">Detailed Discussions</div>
                  <div className="text-muted-foreground text-sm">In-depth conversations about MCP topics</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-foreground font-medium">Build Your Reputation</div>
                  <div className="text-muted-foreground text-sm">Earn badges and recognition for your contributions</div>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => handleJoinCommunity('forum')}
              className="btn-primary w-full"
              disabled={joinedForum}
            >
              {joinedForum ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  <span>Forum Joined</span>
                </>
              ) : (
                <>
                  <MessageSquare className="w-4 h-4 mr-2" />
                  <span>Join Community Forum</span>
                </>
              )}
            </button>
            
            <div className="text-center mt-3 text-sm text-muted-foreground">
              Already a member? <a href="https://forum.mcp4everyone.com" target="_blank" rel="noopener noreferrer" className="text-matrix-primary hover:text-matrix-secondary">Open Forum</a>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 sm:mb-12">
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
                  ? 'bg-matrix-primary text-primary-foreground'
                  : 'glass text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.name}</span>
              <span className="sm:hidden">{tab.id === 'overview' ? 'Home' : tab.icon}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-12">
            {/* Featured Members */}
            <div>
              <h2 className="heading-md mb-8">Featured Community Members</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {featuredMembers.map((member, index) => (
                  <div key={index} className="glass p-6 hover:bg-card/70 transition-all duration-300">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="text-3xl">{member.avatar}</div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">{member.name}</h3>
                        <p className="text-matrix-primary">{member.role}</p>
                        <p className="text-muted-foreground text-sm">{member.company}</p>
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
                      <h4 className="text-foreground font-medium mb-2">Specialties:</h4>
                      <div className="flex flex-wrap gap-2">
                        {member.specialties.map((specialty, specIndex) => (
                          <span key={specIndex} className="badge-primary bg-purple-500/20 text-purple-300 border-purple-500/30">
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="glass bg-muted/20 rounded-lg p-3">
                      <h4 className="text-green-300 font-medium text-sm mb-1">Recent Project:</h4>
                      <p className="text-muted-foreground text-sm">{member.recentProject}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Community Guidelines */}
            <div className="glass-strong bg-gradient-to-r from-matrix-primary/10 to-matrix-secondary/10 border-matrix-primary/30 rounded-xl p-6 sm:p-8">
              <h3 className="heading-md mb-6 text-center">Community Guidelines</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">🤝</div>
                    <div>
                      <h4 className="text-foreground font-semibold">Be Respectful</h4>
                      <p className="text-muted-foreground text-sm">Treat others with kindness and respect. We're all here to learn and grow together.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">🔍</div>
                    <div>
                      <h4 className="text-foreground font-semibold">Search First</h4>
                      <p className="text-muted-foreground text-sm">Before asking a question, search to see if it's been answered already.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">🙋‍♀️</div>
                    <div>
                      <h4 className="text-foreground font-semibold">Help Others</h4>
                      <p className="text-muted-foreground text-sm">Share your knowledge and experience to help fellow community members.</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">📝</div>
                    <div>
                      <h4 className="text-foreground font-semibold">Be Specific</h4>
                      <p className="text-muted-foreground text-sm">When asking questions, provide details and context to help others help you.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">🏆</div>
                    <div>
                      <h4 className="text-foreground font-semibold">Share Successes</h4>
                      <p className="text-muted-foreground text-sm">Celebrate your wins and inspire others with your MCP projects.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">🔒</div>
                    <div>
                      <h4 className="text-foreground font-semibold">Respect Privacy</h4>
                      <p className="text-muted-foreground text-sm">Don't share sensitive data or personal information in public channels.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'discussions' && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="heading-md">Recent Discussions</h2>
              <Link
                to="/community"
                className="btn-primary"
              >
                View Full Community
              </Link>
            </div>
            
            <div className="space-y-4">
              {recentDiscussions.map((discussion, index) => (
                <div key={index} className="glass p-6 hover:bg-card/70 transition-all duration-300">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-lg font-semibold text-foreground">{discussion.title}</h3>
                        {discussion.solved && (
                          <span className="badge-success">
                            Solved
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>by {discussion.author}</span>
                        <span>{discussion.replies} replies</span>
                        <span>{discussion.lastActivity}</span>
                      </div>
                    </div>
                    <button className="text-muted-foreground hover:text-foreground transition-colors duration-200">
                      <ExternalLink className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {discussion.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="badge-secondary">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 text-center">
              <Link
                to="/community"
                className="btn-primary"
              >
                Browse All Discussions
              </Link>
            </div>
          </div>
        )}

        {activeTab === 'events' && (
          <div>
            <h2 className="heading-md mb-8">Upcoming Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="glass p-6 hover:bg-card/70 transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`badge-primary ${
                      event.type === 'Weekly' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' :
                      event.type === 'Workshop' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                      'bg-purple-500/20 text-purple-400 border-purple-500/30'
                    }`}>
                      {event.type}
                    </span>
                    <div className="flex items-center space-x-1 text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span className="text-sm">{event.attendees}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-foreground mb-2">{event.title}</h3>
                  <p className="text-muted-foreground mb-4">{event.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-matrix-primary" />
                      <span className="text-matrix-secondary text-sm">{event.date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-4 h-4 flex items-center justify-center">🕐</span>
                      <span className="text-muted-foreground text-sm">{event.time}</span>
                    </div>
                  </div>
                  
                  <Link
                    to="/office-hours"
                    className="btn-primary w-full inline-flex justify-center"
                  >
                    Register
                  </Link>
                </div>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <Link
                to="/office-hours"
                className="btn-primary"
              >
                View All Events
              </Link>
            </div>
          </div>
        )}

        {activeTab === 'learning' && (
          <div>
            <h2 className="heading-md mb-8">Community Learning Paths</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {learningPaths.map((path, index) => (
                <div key={index} className="glass p-6 hover:bg-card/70 transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-foreground">{path.title}</h3>
                    <span className={`badge-primary ${
                      path.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                      path.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                      'bg-red-500/20 text-red-400 border-red-500/30'
                    }`}>
                      {path.difficulty}
                    </span>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">{path.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Modules:</span>
                      <span className="text-matrix-primary">{path.modules}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Duration:</span>
                      <span className="text-green-300">{path.duration}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Enrolled:</span>
                      <span className="text-purple-300">{path.enrolled.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <Link
                    to="/learn"
                    className="btn-primary w-full inline-flex justify-center items-center"
                  >
                    <span>Start Learning</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default JoinCommunity;