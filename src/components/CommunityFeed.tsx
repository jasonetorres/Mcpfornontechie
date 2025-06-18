import React, { useState } from 'react'
import { Heart, MessageSquare, Share2, Bookmark, MoreHorizontal, Trophy, Star, Users, Zap, X, Send } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'

interface CommunityPost {
  id: string
  author: {
    name: string
    avatar: string
    role: string
    level: string
  }
  content: string
  type: 'success_story' | 'question' | 'showcase' | 'tip'
  timestamp: string
  likes: number
  comments: number
  tags: string[]
  isLiked?: boolean
  isBookmarked?: boolean
  project?: {
    title: string
    description: string
    metrics: string
  }
}

const samplePosts: CommunityPost[] = [
  {
    id: '1',
    author: {
      name: 'Sarah Chen',
      avatar: '👩‍💼',
      role: 'Community Manager',
      level: 'MCP Expert'
    },
    content: 'Just automated our entire member onboarding process using MCP! Reduced manual work from 4 hours to 15 minutes per new member. The AI now handles welcome emails, role assignments, and even suggests relevant community connections based on interests.',
    type: 'success_story',
    timestamp: '2 hours ago',
    likes: 47,
    comments: 12,
    tags: ['automation', 'onboarding', 'community'],
    project: {
      title: 'Smart Member Onboarding',
      description: 'Automated workflow using Zapier + Airtable + GPT-4',
      metrics: '95% time reduction, 89% satisfaction increase'
    }
  },
  {
    id: '2',
    author: {
      name: 'Mike Rodriguez',
      avatar: '👨‍💻',
      role: 'Marketing Director',
      level: 'MCP Pro'
    },
    content: 'Quick tip: When setting up customer segmentation with MCP, always include a "confidence score" field. This helps the AI indicate how certain it is about each classification. Game changer for our email campaigns!',
    type: 'tip',
    timestamp: '5 hours ago',
    likes: 23,
    comments: 8,
    tags: ['tip', 'segmentation', 'marketing']
  },
  {
    id: '3',
    author: {
      name: 'Lisa Park',
      avatar: '👩‍🔬',
      role: 'Project Manager',
      level: 'MCP Beginner'
    },
    content: 'Need help with my first MCP project! I\'m trying to connect our project management tool to AI for status reports, but I\'m getting inconsistent responses. Has anyone worked with similar setups? Would love some guidance on prompt engineering.',
    type: 'question',
    timestamp: '1 day ago',
    likes: 15,
    comments: 24,
    tags: ['help', 'project-management', 'beginner']
  },
  {
    id: '4',
    author: {
      name: 'David Kim',
      avatar: '👨‍💼',
      role: 'Sales Manager',
      level: 'MCP Expert'
    },
    content: 'Excited to share my latest project: AI-powered lead scoring that increased our conversion rate by 60%! The system analyzes 15+ data points and provides actionable next steps for each prospect.',
    type: 'showcase',
    timestamp: '2 days ago',
    likes: 89,
    comments: 31,
    tags: ['showcase', 'sales', 'ai'],
    project: {
      title: 'Intelligent Lead Scoring',
      description: 'Power Platform + Salesforce + Azure AI integration',
      metrics: '60% conversion increase, $250K additional revenue'
    }
  }
]

export default function CommunityFeed() {
  const [posts, setPosts] = useState(samplePosts)
  const [filter, setFilter] = useState('all')
  const [newPostContent, setNewPostContent] = useState('')
  const [isPostingContent, setIsPostingContent] = useState(false)
  const [showNewPostForm, setShowNewPostForm] = useState(false)
  const { user } = useAuth()

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            isLiked: !post.isLiked,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1
          }
        : post
    ))
  }

  const handleBookmark = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, isBookmarked: !post.isBookmarked }
        : post
    ))
  }

  const handlePostContent = () => {
    if (!newPostContent.trim()) return;
    
    setIsPostingContent(true);
    
    // Simulate API call
    setTimeout(() => {
      const newPost: CommunityPost = {
        id: `new-${Date.now()}`,
        author: {
          name: user?.email?.split('@')[0] || 'Anonymous',
          avatar: '👤',
          role: 'Community Member',
          level: 'MCP Learner'
        },
        content: newPostContent,
        type: 'question',
        timestamp: 'Just now',
        likes: 0,
        comments: 0,
        tags: ['community'],
        isLiked: false,
        isBookmarked: false
      };
      
      setPosts([newPost, ...posts]);
      setNewPostContent('');
      setIsPostingContent(false);
      setShowNewPostForm(false);
    }, 1500);
  }

  const getPostIcon = (type: string) => {
    switch (type) {
      case 'success_story': return <Trophy className="w-5 h-5 text-yellow-400" />
      case 'question': return <MessageSquare className="w-5 h-5 text-blue-400" />
      case 'showcase': return <Star className="w-5 h-5 text-purple-400" />
      case 'tip': return <Zap className="w-5 h-5 text-green-400" />
      default: return <Users className="w-5 h-5 text-gray-400" />
    }
  }

  const getPostTypeColor = (type: string) => {
    switch (type) {
      case 'success_story': return 'badge-warning'
      case 'question': return 'badge-primary'
      case 'showcase': return 'badge-success'
      case 'tip': return 'badge-success'
      default: return 'badge-secondary'
    }
  }

  const filteredPosts = filter === 'all' ? posts : posts.filter(post => post.type === filter)

  return (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {[
          { id: 'all', name: 'All Posts', icon: Users },
          { id: 'success_story', name: 'Success Stories', icon: Trophy },
          { id: 'showcase', name: 'Showcases', icon: Star },
          { id: 'question', name: 'Questions', icon: MessageSquare },
          { id: 'tip', name: 'Tips', icon: Zap }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              filter === tab.id
                ? 'bg-matrix-primary text-primary-foreground'
                : 'glass text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span className="hidden sm:inline">{tab.name}</span>
            <span className="sm:hidden">{tab.id === 'all' ? 'All' : tab.icon}</span>
          </button>
        ))}
      </div>

      {/* New Post Form */}
      {user && (
        <div className="mb-6">
          {!showNewPostForm ? (
            <button 
              onClick={() => setShowNewPostForm(true)}
              className="glass w-full p-4 rounded-xl text-left text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200 flex items-center space-x-3"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-matrix-primary to-matrix-secondary rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-primary-foreground" />
              </div>
              <span>Share something with the community...</span>
            </button>
          ) : (
            <div className="glass p-4 rounded-xl animate-fade-in">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-r from-matrix-primary to-matrix-secondary rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary-foreground" />
                </div>
                <div className="text-sm font-medium text-foreground">
                  {user.email?.split('@')[0] || 'You'}
                </div>
              </div>
              <textarea
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                placeholder="What would you like to share or ask?"
                rows={4}
                className="form-input resize-none mb-3"
              />
              <div className="flex justify-between">
                <button
                  onClick={() => setShowNewPostForm(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePostContent}
                  disabled={!newPostContent.trim() || isPostingContent}
                  className="btn-primary py-2"
                >
                  {isPostingContent ? (
                    <>
                      <div className="loading-spinner mr-2"></div>
                      <span>Posting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      <span>Post</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Posts */}
      <div className="space-y-6">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <div key={post.id} className="glass rounded-xl p-6 hover:bg-card/70 transition-all duration-300">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="text-3xl">{post.author.avatar}</div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-foreground">{post.author.name}</span>
                      <span className={`${getPostTypeColor(post.type)}`}>
                        {post.author.level}
                      </span>
                    </div>
                    <div className="text-muted-foreground text-sm">{post.author.role}</div>
                    <div className="text-muted-foreground text-xs">{post.timestamp}</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {getPostIcon(post.type)}
                  <button className="text-muted-foreground hover:text-foreground transition-colors duration-200">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="mb-4">
                <p className="text-foreground leading-relaxed">{post.content}</p>
              </div>

              {/* Project Showcase */}
              {post.project && (
                <div className="glass bg-muted/20 rounded-lg p-4 mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Star className="w-4 h-4 text-matrix-primary" />
                    <span className="font-semibold text-foreground">{post.project.title}</span>
                  </div>
                  <p className="text-muted-foreground text-sm mb-2">{post.project.description}</p>
                  <div className="text-matrix-primary text-sm font-medium">
                    <p>{post.project.metrics}</p>
                  </div>
                </div>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag, index) => (
                  <span key={index} className="badge-secondary">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center space-x-6">
                  <button
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center space-x-2 transition-colors duration-200 ${
                      post.isLiked ? 'text-red-400' : 'text-muted-foreground hover:text-red-400'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${post.isLiked ? 'fill-current' : ''}`} />
                    <span className="text-sm">{post.likes}</span>
                  </button>
                  
                  <button className="flex items-center space-x-2 text-muted-foreground hover:text-blue-400 transition-colors duration-200">
                    <MessageSquare className="w-5 h-5" />
                    <span className="text-sm">{post.comments}</span>
                  </button>
                  
                  <button className="flex items-center space-x-2 text-muted-foreground hover:text-green-400 transition-colors duration-200">
                    <Share2 className="w-5 h-5" />
                    <span className="text-sm">Share</span>
                  </button>
                </div>
                
                <button
                  onClick={() => handleBookmark(post.id)}
                  className={`transition-colors duration-200 ${
                    post.isBookmarked ? 'text-matrix-primary' : 'text-muted-foreground hover:text-matrix-primary'
                  }`}
                >
                  <Bookmark className={`w-5 h-5 ${post.isBookmarked ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="glass p-8 text-center">
            <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="heading-sm mb-2">No posts found</h3>
            <p className="text-muted-foreground mb-4">
              {filter !== 'all' 
                ? `No ${filter.replace('_', ' ')} posts found. Try a different filter.`
                : 'No posts found. Be the first to share something!'}
            </p>
            {user && (
              <button 
                onClick={() => setShowNewPostForm(true)}
                className="btn-primary"
              >
                Create First Post
              </button>
            )}
          </div>
        )}
      </div>

      {/* Load More */}
      {filteredPosts.length > 0 && (
        <div className="text-center">
          <button className="btn-primary">
            Load More Posts
          </button>
        </div>
      )}
    </div>
  )
}