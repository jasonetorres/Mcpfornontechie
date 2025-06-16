import React, { useState } from 'react';
import { Book, Clock, Users, Star, ArrowRight, CheckCircle, Play, Download } from 'lucide-react';

function Guides() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Guides' },
    { id: 'getting-started', name: 'Getting Started' },
    { id: 'platforms', name: 'Platform Guides' },
    { id: 'use-cases', name: 'Use Cases' },
    { id: 'advanced', name: 'Advanced Topics' }
  ];

  const guides = [
    {
      id: 1,
      title: 'MCP Fundamentals: Your Complete Beginner\'s Guide',
      description: 'Everything you need to understand MCP and why it\'s the future of AI integration',
      category: 'getting-started',
      difficulty: 'Beginner',
      readTime: '15 min',
      rating: 4.9,
      readers: 2847,
      lastUpdated: '2 days ago',
      chapters: [
        'What is MCP and why does it matter?',
        'The USB-C analogy explained',
        'Real-world examples you can relate to',
        'Common misconceptions debunked',
        'Your first steps with MCP'
      ],
      author: 'Sarah Chen',
      authorRole: 'Community Manager'
    },
    {
      id: 2,
      title: 'Zapier + MCP: Building Your First AI Connection',
      description: 'Step-by-step guide to connecting a Google Sheet to AI using Zapier',
      category: 'platforms',
      difficulty: 'Beginner',
      readTime: '25 min',
      rating: 4.8,
      readers: 1923,
      lastUpdated: '1 week ago',
      chapters: [
        'Setting up your Zapier account',
        'Preparing your Google Sheet',
        'Creating the MCP bridge',
        'Testing your AI connection',
        'Troubleshooting common issues'
      ],
      author: 'Mike Rodriguez',
      authorRole: 'Marketing Director'
    },
    {
      id: 3,
      title: 'Microsoft Power Platform for MCP: Enterprise Guide',
      description: 'Leverage Power Platform to build enterprise-grade MCP solutions',
      category: 'platforms',
      difficulty: 'Intermediate',
      readTime: '35 min',
      rating: 4.7,
      readers: 1456,
      lastUpdated: '3 days ago',
      chapters: [
        'Power Platform overview for non-developers',
        'Setting up your environment',
        'Connecting to enterprise data sources',
        'Building custom AI assistants',
        'Security and compliance considerations'
      ],
      author: 'Lisa Park',
      authorRole: 'Project Manager'
    },
    {
      id: 4,
      title: 'Community Management with MCP: A Complete Playbook',
      description: 'Transform your community management with AI-powered insights and automation',
      category: 'use-cases',
      difficulty: 'Beginner',
      readTime: '20 min',
      rating: 4.9,
      readers: 1789,
      lastUpdated: '5 days ago',
      chapters: [
        'Identifying community management pain points',
        'Connecting member databases to AI',
        'Automating common questions',
        'Generating engagement insights',
        'Measuring success and ROI'
      ],
      author: 'David Kim',
      authorRole: 'Community Lead'
    },
    {
      id: 5,
      title: 'Marketing Automation with MCP: From Data to Campaigns',
      description: 'Create personalized marketing campaigns using customer data and AI',
      category: 'use-cases',
      difficulty: 'Intermediate',
      readTime: '30 min',
      rating: 4.6,
      readers: 1234,
      lastUpdated: '1 week ago',
      chapters: [
        'Customer data audit and preparation',
        'Segmentation strategies with AI',
        'Automated content generation',
        'Campaign personalization at scale',
        'Performance tracking and optimization'
      ],
      author: 'Emma Wilson',
      authorRole: 'Growth Manager'
    },
    {
      id: 6,
      title: 'Security Best Practices for MCP Implementations',
      description: 'Keep your data safe while building powerful AI connections',
      category: 'advanced',
      difficulty: 'Advanced',
      readTime: '40 min',
      rating: 4.8,
      readers: 892,
      lastUpdated: '4 days ago',
      chapters: [
        'Understanding MCP security model',
        'Data access controls and permissions',
        'Encryption and secure transmission',
        'Audit trails and monitoring',
        'Compliance considerations'
      ],
      author: 'Alex Thompson',
      authorRole: 'Security Consultant'
    },
    {
      id: 7,
      title: 'Airtable + AI: Building Smart Databases',
      description: 'Turn your Airtable bases into intelligent, AI-powered systems',
      category: 'platforms',
      difficulty: 'Beginner',
      readTime: '22 min',
      rating: 4.7,
      readers: 1567,
      lastUpdated: '6 days ago',
      chapters: [
        'Airtable basics for MCP',
        'Structuring data for AI consumption',
        'Setting up AI integrations',
        'Creating smart automations',
        'Advanced formulas and functions'
      ],
      author: 'Rachel Green',
      authorRole: 'Operations Manager'
    },
    {
      id: 8,
      title: 'Project Management Revolution: MCP for PMs',
      description: 'Supercharge your project management with AI-powered insights and automation',
      category: 'use-cases',
      difficulty: 'Intermediate',
      readTime: '28 min',
      rating: 4.8,
      readers: 1345,
      lastUpdated: '2 days ago',
      chapters: [
        'PM challenges that MCP solves',
        'Connecting project management tools',
        'Automated status reporting',
        'Risk identification with AI',
        'Resource optimization strategies'
      ],
      author: 'Tom Wilson',
      authorRole: 'Senior PM'
    }
  ];

  const filteredGuides = guides.filter(guide => 
    selectedCategory === 'all' || guide.category === selectedCategory
  );

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500/20 text-green-400';
      case 'Intermediate': return 'bg-yellow-500/20 text-yellow-400';
      case 'Advanced': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">No-Code MCP Guides</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Step-by-step tutorials to master MCP without writing a single line of code
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Featured Guide */}
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-xl p-8 mb-12">
          <div className="flex items-center space-x-2 mb-4">
            <Star className="w-5 h-5 text-yellow-400" />
            <span className="text-yellow-400 font-medium">Featured Guide</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">
                MCP Fundamentals: Your Complete Beginner's Guide
              </h2>
              <p className="text-blue-200 mb-6">
                Start your MCP journey with this comprehensive guide that explains everything in simple, non-technical terms. Perfect for complete beginners who want to understand the power of connecting AI to their data.
              </p>
              <div className="flex items-center space-x-6 mb-6">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-blue-400" />
                  <span className="text-blue-300">15 min read</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-green-400" />
                  <span className="text-green-300">2,847 readers</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span className="text-yellow-300">4.9/5</span>
                </div>
              </div>
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center space-x-2">
                <Book className="w-5 h-5" />
                <span>Start Reading</span>
              </button>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-6">
              <h3 className="text-white font-semibold mb-4">What You'll Learn:</h3>
              <div className="space-y-3">
                {[
                  'What MCP is and why it matters for non-developers',
                  'The "USB-C for AI" analogy explained simply',
                  'Real-world examples you can immediately relate to',
                  'Common misconceptions and myths debunked',
                  'Your concrete next steps to get started'
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredGuides.map((guide) => (
            <div key={guide.id} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-300">
              {/* Header */}
              <div className="p-6 border-b border-white/10">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-semibold text-white leading-tight">{guide.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(guide.difficulty)} flex-shrink-0 ml-3`}>
                    {guide.difficulty}
                  </span>
                </div>
                
                <p className="text-gray-300 mb-4">{guide.description}</p>
                
                {/* Stats */}
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4 text-blue-400" />
                    <span className="text-blue-300">{guide.readTime}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className="text-yellow-300">{guide.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4 text-green-400" />
                    <span className="text-green-300">{guide.readers.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Author */}
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">{guide.author.charAt(0)}</span>
                  </div>
                  <div>
                    <div className="text-white font-medium">{guide.author}</div>
                    <div className="text-gray-400 text-sm">{guide.authorRole}</div>
                  </div>
                </div>

                {/* Chapters */}
                <div className="mb-6">
                  <h4 className="text-white font-medium mb-3">What's Inside:</h4>
                  <div className="space-y-2">
                    {guide.chapters.slice(0, 3).map((chapter, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-300 text-sm">{chapter}</span>
                      </div>
                    ))}
                    {guide.chapters.length > 3 && (
                      <div className="text-gray-400 text-sm ml-3.5">
                        +{guide.chapters.length - 3} more chapters
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-3">
                  <button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2">
                    <Book className="w-4 h-4" />
                    <span>Read Guide</span>
                  </button>
                  <button className="px-4 py-2 border border-white/20 text-white rounded-lg font-medium hover:bg-white/10 transition-colors duration-200 flex items-center space-x-2">
                    <Download className="w-4 h-4" />
                    <span>PDF</span>
                  </button>
                </div>

                {/* Last Updated */}
                <div className="mt-4 text-xs text-gray-400">
                  Updated {guide.lastUpdated}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-green-600/20 to-teal-600/20 border border-green-500/30 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Want to Contribute a Guide?</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Share your MCP knowledge with the community! We're always looking for new perspectives and use cases.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200">
              Submit Your Guide
            </button>
            <button className="border border-white/20 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors duration-200">
              Guide Writing Tips
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Guides;