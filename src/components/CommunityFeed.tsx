import React, { useState } from 'react'
import { Heart, MessageSquare, Share2, Bookmark, MoreHorizontal, Trophy, Star, Users, Zap } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

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
      case 'success_story': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'question': return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'showcase': return 'bg-purple-500/20 text-purple-400 border-purple-500/30'
      case 'tip': return 'bg-green-500/20 text-green-400 border-green-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const filteredPosts = filter === 'all' ? posts : posts.filter(post => post.type === filter)

  return (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
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
                : 'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.name}</span>
          </button>
        ))}
      </div>

      {/* Posts */}
      <div className="space-y-6">
        {filteredPosts.map((post) => (
          <div key={post.id} className="bg-card/50 backdrop-blur-md border border-border rounded-xl p-6 hover:bg-card transition-all duration-300">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="text-3xl">{post.author.avatar}</div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-foreground">{post.author.name}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPostTypeColor(post.type)}`}>
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
              <div className="bg-muted/50 border border-border rounded-lg p-4 mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Star className="w-4 h-4 text-matrix-primary" />
                  <span className="font-semibold text-foreground">{post.project.title}</span>
                </div>
                <p className="text-muted-foreground text-sm mb-2">{post.project.description}</p>
                <div className="bg-matrix-primary/20 border border-matrix-primary/30 rounded-lg p-2">
                  <span className="text-matrix-primary text-sm font-medium">{post.project.metrics}</span>
                </div>
              </div>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag, index) => (
                <span key={index} className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs">
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
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <button className="bg-gradient-to-r from-matrix-primary to-matrix-secondary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:from-matrix-accent hover:to-matrix-primary transition-all duration-200">
          Load More Posts
        </button>
      </div>
    </div>
  )
}