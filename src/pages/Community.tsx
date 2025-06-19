import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, MessageSquare, Calendar, Trophy, Star, ArrowRight, ExternalLink, Heart, Zap, BookOpen, Search, Filter, X, Send, Edit, Trash2, MoreHorizontal, ChevronDown, Tag } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import CommunityFeed from '../components/CommunityFeed';

function Community() {
  const { user, profile } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [showNewDiscussionForm, setShowNewDiscussionForm] = useState(false);
  const [discussionFormData, setDiscussionFormData] = useState({
    title: '',
    content: '',
    tags: [] as string[],
    currentTag: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null);
  const [likedMembers, setLikedMembers] = useState<string[]>([]);
  const formRef = useRef<HTMLDivElement>(null);

  // Initialize userPosts state
  const [userPosts, setUserPosts] = useState<any[]>([]);
  // Load user discussions from localStorage
  const [userDiscussions, setUserDiscussions] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      const savedDiscussions = localStorage.getItem(`user-discussions-${user.id}`);
      if (savedDiscussions) {
        setUserDiscussions(JSON.parse(savedDiscussions));
      }
      
      // Load user posts from localStorage
      const savedPosts = localStorage.getItem(`user-posts-${user.id}`);
      if (savedPosts) {
        setUserPosts(JSON.parse(savedPosts));
      }

      // Load liked members from localStorage
      const savedLikedMembers = localStorage.getItem(`liked-members-${user.id}`);
      if (savedLikedMembers) {
        setLikedMembers(JSON.parse(savedLikedMembers));
      }
    }
  }, [user]);

  const communityStats = [
    { label: 'Active Members', value: '2,847', icon: Users },
    { label: 'Projects Shared', value: '1,293', icon: Zap },
    { label: 'Questions Answered', value: '5,621', icon: MessageSquare },
    { label: 'Success Stories', value: '387', icon: Trophy }
  ];

  const featuredMembers = [
    {
      id: 'member-1',
      name: 'Sarah Chen',
      role: 'Community Manager',
      company: 'TechCorp',
      avatar: '👩‍💼',
      contributions: 45,
      specialties: ['Community Building', 'Member Engagement', 'Event Planning'],
      recentProject: 'Built an AI-powered member Q&A system using Google Sheets and Zapier'
    },
    {
      id: 'member-2',
      name: 'Mike Rodriguez',
      role: 'Marketing Director',
      company: 'GrowthCo',
      avatar: '👨‍💻',
      contributions: 38,
      specialties: ['Customer Segmentation', 'Campaign Automation', 'Analytics'],
      recentProject: 'Created personalized email campaigns using Airtable and Claude API'
    },
    {
      id: 'member-3',
      name: 'Lisa Park',
      role: 'Project Manager',
      company: 'InnovateLab',
      avatar: '👩‍🔬',
      contributions: 42,
      specialties: ['Project Tracking', 'Team Coordination', 'Process Automation'],
      recentProject: 'Automated project status reports using Notion and GPT-4'
    }
  ];

  const discussionCategories = [
    { id: 'all', name: 'All Discussions' },
    { id: 'questions', name: 'Questions' },
    { id: 'help', name: 'Help Requests' },
    { id: 'showcase', name: 'Project Showcase' },
    { id: 'success', name: 'Success Stories' },
    { id: 'tips', name: 'Tips & Tricks' }
  ];

  const popularTags = [
    'zapier', 'power-platform', 'airtable', 'notion', 'beginner', 
    'security', 'marketing', 'community', 'project-management', 'sales'
  ];

  const recentDiscussions = [
    {
      id: '1',
      title: 'Best practices for connecting Salesforce to AI?',
      author: 'David Kim',
      authorAvatar: '👨‍💼',
      replies: 12,
      lastActivity: '2 hours ago',
      tags: ['salesforce', 'crm', 'beginner'],
      solved: false,
      content: 'I\'m trying to connect our Salesforce instance to an AI assistant using MCP. Has anyone done this before? What\'s the best approach for a non-developer? I\'ve tried using Zapier but I\'m running into some issues with the data structure.',
      category: 'questions',
      likes: 8,
      views: 124,
      isLiked: false
    },
    {
      id: '2',
      title: 'How to handle sensitive data in MCP connections?',
      author: 'Emma Wilson',
      authorAvatar: '👩‍💻',
      replies: 8,
      lastActivity: '4 hours ago',
      tags: ['security', 'privacy', 'best-practices'],
      solved: true,
      content: 'I need to connect our customer database to AI, but I\'m concerned about privacy and security. What are the best practices for handling sensitive data in MCP connections? Are there specific settings or approaches I should be using?',
      category: 'help',
      likes: 15,
      views: 203,
      isLiked: false
    },
    {
      id: '3',
      title: 'Zapier vs Power Platform for MCP - which is better?',
      author: 'Alex Thompson',
      authorAvatar: '👨‍🔧',
      replies: 15,
      lastActivity: '6 hours ago',
      tags: ['zapier', 'power-platform', 'comparison'],
      solved: false,
      content: 'I\'m trying to decide between Zapier and Power Platform for our MCP implementation. We\'re a small marketing team with basic technical skills. Which platform would you recommend and why? Cost is a factor but ease of use is more important.',
      category: 'questions',
      likes: 22,
      views: 315,
      isLiked: false
    },
    {
      id: '4',
      title: 'Success Story: Automated our entire onboarding process!',
      author: 'Rachel Green',
      authorAvatar: '👩‍🦰',
      replies: 23,
      lastActivity: '1 day ago',
      tags: ['success-story', 'onboarding', 'automation'],
      solved: false,
      content: 'Just wanted to share our success! We automated our entire employee onboarding process using MCP to connect our HR system, IT ticketing system, and Slack. New employees now get personalized welcome messages, automatic account creation, and a customized onboarding checklist. Reduced manual work by 85%!',
      category: 'success',
      likes: 47,
      views: 512,
      isLiked: false
    },
    {
      id: '5',
      title: 'Quick tip: Use "confidence scores" in your MCP setup',
      author: 'Michael Scott',
      authorAvatar: '👨‍💼',
      replies: 7,
      lastActivity: '2 days ago',
      tags: ['tips', 'best-practices', 'intermediate'],
      solved: false,
      content: 'Here\'s a quick tip that improved our MCP implementation: Add a "confidence score" field to your AI responses. This helps users understand how certain the AI is about each answer. We use a simple 1-5 scale, and it\'s been a game-changer for user trust!',
      category: 'tips',
      likes: 31,
      views: 278,
      isLiked: false
    },
    {
      id: '6',
      title: 'Project Showcase: AI-powered customer support triage',
      author: 'Jennifer Liu',
      authorAvatar: '👩‍💼',
      replies: 19,
      lastActivity: '3 days ago',
      tags: ['showcase', 'customer-support', 'airtable'],
      solved: false,
      content: 'Excited to share our latest project! We built an AI-powered customer support triage system using Airtable and Claude. The system automatically categorizes incoming tickets, suggests solutions from our knowledge base, and routes complex issues to the right specialist. Reduced response time by 62%!',
      category: 'showcase',
      likes: 38,
      views: 421,
      isLiked: false
    }
  ];

  // Combine sample discussions with user discussions
  const allDiscussions = [...userDiscussions, ...recentDiscussions];

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setDiscussionFormData({
      ...discussionFormData,
      [e.target.name]: e.target.value
    });
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && discussionFormData.currentTag.trim()) {
      e.preventDefault();
      if (!discussionFormData.tags.includes(discussionFormData.currentTag.trim())) {
        setDiscussionFormData({
          ...discussionFormData,
          tags: [...discussionFormData.tags, discussionFormData.currentTag.trim()],
          currentTag: ''
        });
      } else {
        setDiscussionFormData({
          ...discussionFormData,
          currentTag: ''
        });
      }
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setDiscussionFormData({
      ...discussionFormData,
      tags: discussionFormData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const handleQuickTag = (tag: string) => {
    if (!discussionFormData.tags.includes(tag)) {
      setDiscussionFormData({
        ...discussionFormData,
        tags: [...discussionFormData.tags, tag]
      });
    }
  };

  const handleSubmitDiscussion = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      const newDiscussion = {
        id: `user-${Date.now()}`,
        title: discussionFormData.title,
        author: profile?.full_name || user?.email?.split('@')[0] || 'Anonymous',
        authorAvatar: '👤',
        replies: 0,
        lastActivity: 'Just now',
        tags: discussionFormData.tags.length > 0 ? discussionFormData.tags : ['general'],
        solved: false,
        content: discussionFormData.content,
        category: 'questions',
        likes: 0,
        views: 1,
        isLiked: false
      };

      // Add to user discussions
      const updatedUserDiscussions = [newDiscussion, ...userDiscussions];
      setUserDiscussions(updatedUserDiscussions);
      
      // Save to localStorage
      if (user) {
        localStorage.setItem(`user-discussions-${user.id}`, JSON.stringify(updatedUserDiscussions));
      }

      setDiscussionFormData({
        title: '',
        content: '',
        tags: [],
        currentTag: ''
      });
      setShowNewDiscussionForm(false);
      setIsSubmitting(false);
    }, 1500);
  };

  const handleLikeDiscussion = (discussionId: string) => {
    // Update user discussions if the liked discussion is a user discussion
    const userDiscussion = userDiscussions.find(discussion => discussion.id === discussionId);
    if (userDiscussion) {
      const updatedUserDiscussions = userDiscussions.map(discussion => {
        if (discussion.id === discussionId) {
          return {
            ...discussion,
            likes: discussion.isLiked ? discussion.likes - 1 : discussion.likes + 1,
            isLiked: !discussion.isLiked
          };
        }
        return discussion;
      });
      setUserDiscussions(updatedUserDiscussions);
      if (user) {
        localStorage.setItem(`user-discussions-${user.id}`, JSON.stringify(updatedUserDiscussions));
      }
    } else {
      // Update sample discussions
      const updatedDiscussions = recentDiscussions.map(discussion => {
        if (discussion.id === discussionId) {
          return {
            ...discussion,
            likes: discussion.isLiked ? discussion.likes - 1 : discussion.likes + 1,
            isLiked: !discussion.isLiked
          };
        }
        return discussion;
      });
      // In a real app, we would update the server here
      console.log('Updated sample discussion:', updatedDiscussions.find(d => d.id === discussionId));
    }
  };

  // Filter discussions based on search query and category
  const filteredDiscussions = allDiscussions.filter(discussion => {
    const matchesSearch = searchQuery === '' || 
      discussion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      discussion.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      discussion.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || discussion.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Handle member like/heart
  const handleLikeMember = (memberId: string) => {
    if (!user) return;
    
    let updatedLikedMembers;
    if (likedMembers.includes(memberId)) {
      updatedLikedMembers = likedMembers.filter(id => id !== memberId);
    } else {
      updatedLikedMembers = [...likedMembers, memberId];
    }
    
    setLikedMembers(updatedLikedMembers);
    localStorage.setItem(`liked-members-${user.id}`, JSON.stringify(updatedLikedMembers));
  };

  // Filter members by specialty
  const filteredMembers = selectedSpecialty 
    ? featuredMembers.filter(member => 
        member.specialties.some(specialty => 
          specialty.toLowerCase() === selectedSpecialty.toLowerCase()
        )
      )
    : featuredMembers;

  // Handle specialty selection
  const handleSpecialtyClick = (specialty: string) => {
    if (selectedSpecialty === specialty) {
      setSelectedSpecialty(null);
    } else {
      setSelectedSpecialty(specialty);
    }
  };

  // Get all unique specialties
  const allSpecialties = Array.from(
    new Set(
      featuredMembers.flatMap(member => member.specialties)
    )
  );

  // Scroll to form when "Start New Discussion" is clicked
  useEffect(() => {
    if (showNewDiscussionForm && formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [showNewDiscussionForm]);

  return (
    <div className="container-responsive section-padding">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="heading-lg mb-4">MCP4 Everyone Community</h1>
          <p className="text-body text-muted-foreground max-w-2xl mx-auto">
            Join thousands of people building amazing AI-powered solutions with MCP
          </p>
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
              <span className="sm:hidden">{tab.id === 'overview' ? 'Home' : <tab.icon className="w-4 h-4" />}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-12">
            {/* Specialty Filter */}
            {selectedSpecialty && (
              <div className="glass p-4 rounded-xl animate-fade-in">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Tag className="w-4 h-4 text-matrix-primary" />
                    <span className="text-foreground font-medium">Filtering by specialty: <span className="text-matrix-primary">{selectedSpecialty}</span></span>
                  </div>
                  <button 
                    onClick={() => setSelectedSpecialty(null)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* All Specialties */}
            <div className="mb-4">
              <h3 className="heading-sm mb-4">Popular Specialties</h3>
              <div className="flex flex-wrap gap-2">
                {allSpecialties.map((specialty, index) => (
                  <button
                    key={index}
                    onClick={() => handleSpecialtyClick(specialty)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                      selectedSpecialty === specialty
                        ? 'bg-matrix-primary text-primary-foreground'
                        : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
                    }`}
                  >
                    {specialty}
                  </button>
                ))}
              </div>
            </div>

            {/* Featured Members */}
            <div>
              <h2 className="heading-md mb-8">Featured Community Members</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filteredMembers.map((member) => (
                  <div key={member.id} className="glass p-6 hover:bg-card/70 transition-all duration-300">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="text-3xl">{member.avatar}</div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">{member.name}</h3>
                        <p className="text-matrix-primary">{member.role}</p>
                        <p className="text-muted-foreground text-sm">{member.company}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 mb-4">
                      <button 
                        onClick={() => handleLikeMember(member.id)}
                        className={`flex items-center space-x-1 transition-colors duration-200 ${
                          likedMembers.includes(member.id) ? 'text-red-400' : 'text-muted-foreground hover:text-red-400'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${likedMembers.includes(member.id) ? 'fill-current' : ''}`} />
                        <span className="text-sm">{member.contributions + (likedMembers.includes(member.id) ? 1 : 0)}</span>
                      </button>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span className="text-yellow-300 text-sm">Top Contributor</span>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="text-foreground font-medium mb-2">Specialties:</h4>
                      <div className="flex flex-wrap gap-2">
                        {member.specialties.map((specialty, specIndex) => (
                          <button
                            key={specIndex}
                            onClick={() => handleSpecialtyClick(specialty)}
                            className={`badge-primary bg-purple-500/20 text-purple-300 border-purple-500/30 hover:bg-purple-500/30 transition-colors duration-200 cursor-pointer ${
                              selectedSpecialty === specialty ? 'bg-purple-500/40 border-purple-500/50' : ''
                            }`}
                          >
                            {specialty}
                          </button>
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

            {/* Join Community CTA */}
            <div className="glass-strong bg-gradient-to-r from-matrix-primary/10 to-matrix-secondary/10 border-matrix-primary/30 rounded-xl p-8 text-center">
              <h3 className="heading-md mb-4">Ready to Join Our Community?</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Connect with like-minded professionals, share your projects, get help, and learn from others building with MCP.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/join-community"
                  className="btn-primary"
                >
                  Join Discord Community
                </Link>
                <button className="btn-secondary">
                  Browse Forum
                </button>
              </div>
            </div>

            {/* Recent Discussions Preview */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="heading-md">Recent Discussions</h2>
                <Link to="#" onClick={() => setActiveTab('discussions')} className="text-matrix-primary hover:text-matrix-secondary flex items-center">
                  <span>View all</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
              
              <div className="space-y-4">
                {allDiscussions.slice(0, 3).map((discussion) => (
                  <div key={discussion.id} className="glass p-6 hover:bg-card/70 transition-all duration-300">
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
                        <button 
                          key={tagIndex} 
                          onClick={() => setSearchQuery(tag)}
                          className="badge-secondary hover:bg-muted/80 transition-colors duration-200"
                        >
                          #{tag}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 text-center">
                <button 
                  onClick={() => {
                    setActiveTab('discussions');
                    setShowNewDiscussionForm(true);
                  }}
                  className="btn-primary"
                >
                  Start New Discussion
                </button>
              </div>
            </div>

            {/* User Card - Show if logged in */}
            {user && profile && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-foreground mb-4">Your Community Profile</h3>
                <div className="glass p-6 hover:bg-card/70 transition-all duration-300">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-matrix-primary to-matrix-secondary rounded-full flex items-center justify-center overflow-hidden">
                      {profile.avatar_url ? (
                        <img src={profile.avatar_url} alt="Avatar" className="w-12 h-12 rounded-full object-cover" />
                      ) : (
                        <Users className="w-6 h-6 text-primary-foreground" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{profile.full_name || user.email?.split('@')[0]}</h3>
                      <p className="text-matrix-primary">{profile.role || 'Community Member'}</p>
                      <p className="text-muted-foreground text-sm">{profile.company || 'MCP Academy'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center space-x-1">
                      <Heart className="w-4 h-4 text-red-400" />
                      <span className="text-red-300 text-sm">{userDiscussions.length + userPosts.length}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span className="text-yellow-300 text-sm">Active Member</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-foreground font-medium mb-2">Your Activity:</h4>
                    <div className="flex flex-wrap gap-2">
                      <span className="badge-primary bg-purple-500/20 text-purple-300 border-purple-500/30">
                        {userDiscussions.length} Discussions
                      </span>
                      <span className="badge-primary bg-blue-500/20 text-blue-300 border-blue-500/30">
                        {userPosts.length} Posts
                      </span>
                      <span className="badge-primary bg-green-500/20 text-green-300 border-green-500/30">
                        {likedMembers.length} Connections
                      </span>
                    </div>
                  </div>
                  
                  <div className="glass bg-muted/20 rounded-lg p-3">
                    <h4 className="text-green-300 font-medium text-sm mb-1">Get More Involved:</h4>
                    <p className="text-muted-foreground text-sm">Share your MCP projects, answer questions, and connect with other members to increase your community standing!</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'discussions' && (
          <div>
            <div className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-8">
              <h2 className="heading-md">Community Discussions</h2>
              <button 
                onClick={() => setShowNewDiscussionForm(!showNewDiscussionForm)}
                className="btn-primary"
              >
                {showNewDiscussionForm ? 'Cancel' : 'Start New Discussion'}
              </button>
            </div>
            
            {/* New Discussion Form */}
            {showNewDiscussionForm && (
              <div ref={formRef} className="glass-strong p-6 mb-8 animate-fade-in">
                <h3 className="heading-sm mb-4">Create New Discussion</h3>
                <form onSubmit={handleSubmitDiscussion} className="space-y-4">
                  <div>
                    <label className="form-label">Title</label>
                    <input
                      type="text"
                      name="title"
                      value={discussionFormData.title}
                      onChange={handleInputChange}
                      required
                      className="form-input"
                      placeholder="What's your question or topic?"
                    />
                  </div>
                  
                  <div>
                    <label className="form-label">Content</label>
                    <textarea
                      name="content"
                      value={discussionFormData.content}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="form-input resize-none"
                      placeholder="Describe your question, share your experience, or tell your story..."
                    />
                  </div>
                  
                  <div>
                    <label className="form-label">Tags</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {discussionFormData.tags.map((tag) => (
                        <div key={tag} className="badge-primary flex items-center space-x-1">
                          <span>#{tag}</span>
                          <button 
                            type="button"
                            onClick={() => handleRemoveTag(tag)}
                            className="hover:text-foreground"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="relative">
                      <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="text"
                        name="currentTag"
                        value={discussionFormData.currentTag}
                        onChange={handleInputChange}
                        onKeyDown={handleAddTag}
                        className="form-input pl-9"
                        placeholder="Add tags (press Enter to add)"
                      />
                    </div>
                    <div className="mt-2">
                      <p className="text-sm text-muted-foreground mb-1">Popular tags:</p>
                      <div className="flex flex-wrap gap-2">
                        {popularTags.slice(0, 6).map((tag) => (
                          <button
                            key={tag}
                            type="button"
                            onClick={() => handleQuickTag(tag)}
                            className="badge-secondary hover:bg-muted"
                          >
                            #{tag}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowNewDiscussionForm(false)}
                      className="btn-secondary"
                      disabled={isSubmitting}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn-primary"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="loading-spinner mr-2"></div>
                          <span>Posting...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          <span>Post Discussion</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}
            
            {/* Search and Filters */}
            <div className="glass p-4 mb-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search discussions..."
                    className="form-input pl-10"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
                
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-muted-foreground" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="form-input py-2"
                  >
                    {discussionCategories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="mt-3 flex flex-wrap gap-2">
                {popularTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSearchQuery(tag)}
                    className={`badge-secondary hover:bg-muted ${
                      searchQuery === tag ? 'bg-matrix-primary/20 text-matrix-primary border-matrix-primary/30' : ''
                    }`}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Discussions List */}
            <div className="space-y-4">
              {filteredDiscussions.length > 0 ? (
                filteredDiscussions.map((discussion) => (
                  <div key={discussion.id} className="glass p-6 hover:bg-card/70 transition-all duration-300">
                    <div className="flex items-start space-x-4 mb-4">
                      <div className="text-2xl flex-shrink-0">{discussion.authorAvatar}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-lg font-semibold text-foreground mb-1">{discussion.title}</h3>
                            <div className="flex items-center flex-wrap gap-2 text-sm text-muted-foreground">
                              <span>{discussion.author}</span>
                              <span>•</span>
                              <span>{discussion.lastActivity}</span>
                              {discussion.solved && (
                                <>
                                  <span>•</span>
                                  <span className="badge-success">Solved</span>
                                </>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="relative group">
                              <button className="text-muted-foreground hover:text-foreground p-1 rounded-full hover:bg-muted">
                                <MoreHorizontal className="w-5 h-5" />
                              </button>
                              <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                                <div className="py-1">
                                  <button className="w-full text-left px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted">
                                    Report Discussion
                                  </button>
                                  <button className="w-full text-left px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted">
                                    Hide Discussion
                                  </button>
                                  <button className="w-full text-left px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted">
                                    Follow {discussion.author}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-muted-foreground mb-4 line-clamp-3">
                          {discussion.content}
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {discussion.tags.map((tag, tagIndex) => (
                            <button 
                              key={tagIndex} 
                              onClick={() => setSearchQuery(tag)}
                              className="badge-secondary hover:bg-muted/80 transition-colors duration-200"
                            >
                              #{tag}
                            </button>
                          ))}
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <button 
                              onClick={() => handleLikeDiscussion(discussion.id)}
                              className={`flex items-center space-x-1 hover:text-red-400 transition-colors duration-200 ${
                                discussion.isLiked ? 'text-red-400' : 'text-muted-foreground'
                              }`}
                            >
                              <Heart className={`w-4 h-4 ${discussion.isLiked ? 'fill-current' : ''}`} />
                              <span>{discussion.likes}</span>
                            </button>
                            
                            <div className="flex items-center space-x-1 text-muted-foreground">
                              <MessageSquare className="w-4 h-4" />
                              <span>{discussion.replies}</span>
                            </div>
                            
                            <div className="flex items-center space-x-1 text-muted-foreground">
                              <Users className="w-4 h-4" />
                              <span>{discussion.views}</span>
                            </div>
                          </div>
                          
                          <button className="text-matrix-primary hover:text-matrix-secondary flex items-center space-x-1">
                            <span>Read more</span>
                            <ChevronDown className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="glass p-8 text-center">
                  <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="heading-sm mb-2">No discussions found</h3>
                  <p className="text-muted-foreground mb-6">
                    {searchQuery 
                      ? `No discussions match "${searchQuery}". Try a different search term.` 
                      : 'No discussions in this category yet. Be the first to start one!'}
                  </p>
                  <button 
                    onClick={() => {
                      setShowNewDiscussionForm(true);
                      setSearchQuery('');
                      setSelectedCategory('all');
                    }}
                    className="btn-primary"
                  >
                    Start New Discussion
                  </button>
                </div>
              )}
            </div>
            
            {filteredDiscussions.length > 0 && (
              <div className="mt-8 text-center">
                <button className="btn-primary">
                  Load More Discussions
                </button>
              </div>
            )}
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
            
            <div className="mt-8 glass-strong bg-gradient-to-r from-matrix-primary/10 to-matrix-secondary/10 border-matrix-primary/30 p-6 rounded-xl text-center">
              <h3 className="heading-sm mb-4">Want to Host an Event?</h3>
              <p className="text-muted-foreground mb-6">
                Share your knowledge with the community by hosting a workshop, Q&A session, or showcase.
              </p>
              <button className="btn-primary">
                Propose an Event
              </button>
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

export default Community;