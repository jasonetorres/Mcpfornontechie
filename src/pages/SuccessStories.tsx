import React, { useState } from 'react';
import { Star, Users, Clock, TrendingUp, ArrowRight, Play, ExternalLink, Filter } from 'lucide-react';

function SuccessStories() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImpact, setSelectedImpact] = useState('all');

  const categories = [
    { id: 'all', name: 'All Stories' },
    { id: 'community', name: 'Community Management' },
    { id: 'marketing', name: 'Marketing & Growth' },
    { id: 'project', name: 'Project Management' },
    { id: 'sales', name: 'Sales & Business' },
    { id: 'operations', name: 'Operations' }
  ];

  const impactLevels = [
    { id: 'all', name: 'All Impact Levels' },
    { id: 'time-saving', name: 'Time Saving' },
    { id: 'revenue-growth', name: 'Revenue Growth' },
    { id: 'team-efficiency', name: 'Team Efficiency' },
    { id: 'customer-satisfaction', name: 'Customer Satisfaction' }
  ];

  const successStories = [
    {
      id: 1,
      title: 'From 4 Hours to 15 Minutes: Automating Community Q&A',
      author: 'Sarah Chen',
      role: 'Community Manager',
      company: 'TechCorp',
      avatar: '👩‍💼',
      category: 'community',
      impact: 'time-saving',
      timeToImplement: '2 weeks',
      timeSaved: '3.75 hours/day',
      roi: '2400%',
      rating: 4.9,
      views: 2847,
      summary: 'Reduced community Q&A response time from 4 hours to 15 minutes using MCP to connect member database to AI assistant.',
      challenge: 'Managing a community of 5,000+ members meant spending 4+ hours daily answering repetitive questions about member information, contribution stats, and contact details.',
      solution: 'Built an MCP connection between our member spreadsheet and ChatGPT using Zapier. The AI can now instantly answer questions about any member.',
      results: [
        '95% reduction in response time (4 hours → 15 minutes)',
        '3.75 hours saved daily for strategic work',
        '89% increase in member satisfaction scores',
        'Freed up time to launch 3 new community initiatives'
      ],
      tools: ['Zapier', 'Google Sheets', 'ChatGPT', 'Discord'],
      quote: 'MCP transformed my role from reactive support to strategic community building. I now spend my time on initiatives that actually grow our community.',
      videoUrl: '#',
      caseStudyUrl: '#'
    },
    {
      id: 2,
      title: 'Personalized Campaigns at Scale: 300% Conversion Increase',
      author: 'Mike Rodriguez',
      role: 'Marketing Director',
      company: 'GrowthCo',
      avatar: '👨‍💻',
      category: 'marketing',
      impact: 'revenue-growth',
      timeToImplement: '3 weeks',
      timeSaved: '2 hours/day',
      roi: '450%',
      rating: 4.8,
      views: 1923,
      summary: 'Increased email campaign conversion rates by 300% using AI-powered customer segmentation and personalized content generation.',
      challenge: 'Creating personalized marketing campaigns for 10,000+ customers was impossible with our small team. Generic campaigns had 2% conversion rates.',
      solution: 'Connected our CRM to Claude AI via Airtable. The system automatically segments customers and generates personalized email content based on their behavior and preferences.',
      results: [
        '300% increase in email conversion rates (2% → 6%)',
        '$180K additional monthly revenue',
        '2 hours saved daily on campaign creation',
        '85% reduction in campaign preparation time'
      ],
      tools: ['Airtable', 'Claude AI', 'Mailchimp', 'Salesforce'],
      quote: 'We went from sending generic blasts to delivering personalized experiences at scale. Our customers notice the difference.',
      videoUrl: '#',
      caseStudyUrl: '#'
    },
    {
      id: 3,
      title: 'Project Chaos to Clarity: Automated Status Reports',
      author: 'Lisa Park',
      role: 'Project Manager',
      company: 'InnovateLab',
      avatar: '👩‍🔬',
      category: 'project',
      impact: 'team-efficiency',
      timeToImplement: '1 week',
      timeSaved: '5 hours/week',
      roi: '320%',
      rating: 4.9,
      views: 1456,
      summary: 'Eliminated manual status reporting and improved project visibility by 90% using AI-powered project analysis.',
      challenge: 'Managing 15+ concurrent projects meant spending entire Fridays creating status reports. Teams were always asking for updates.',
      solution: 'Built an MCP bridge between Notion project databases and GPT-4. The AI generates comprehensive status reports, identifies risks, and suggests optimizations.',
      results: [
        '5 hours saved weekly on status reporting',
        '90% improvement in project visibility',
        '40% reduction in project delays',
        '95% team satisfaction with new reporting'
      ],
      tools: ['Notion', 'GPT-4', 'Slack', 'Microsoft Project'],
      quote: 'I transformed from a status report generator to a strategic project leader. The AI handles the busy work so I can focus on solving real problems.',
      videoUrl: '#',
      caseStudyUrl: '#'
    },
    {
      id: 4,
      title: 'Lead Scoring Revolution: 60% More Qualified Leads',
      author: 'David Kim',
      role: 'Sales Manager',
      company: 'SalesForce Pro',
      avatar: '👨‍💼',
      category: 'sales',
      impact: 'revenue-growth',
      timeToImplement: '4 weeks',
      timeSaved: '1.5 hours/day',
      roi: '580%',
      rating: 4.7,
      views: 1234,
      summary: 'Improved lead qualification accuracy by 60% and increased sales team efficiency using AI-powered lead scoring.',
      challenge: 'Sales team was wasting time on unqualified leads. Manual lead scoring was inconsistent and time-consuming.',
      solution: 'Connected Salesforce to Azure AI using Power Platform. The system analyzes lead behavior, company data, and historical patterns to score leads automatically.',
      results: [
        '60% improvement in lead qualification accuracy',
        '1.5 hours saved daily per sales rep',
        '35% increase in conversion rates',
        '$250K additional quarterly revenue'
      ],
      tools: ['Power Platform', 'Salesforce', 'Azure AI', 'Excel'],
      quote: 'Our sales team now focuses on the right prospects at the right time. The AI does the analysis, we do the closing.',
      videoUrl: '#',
      caseStudyUrl: '#'
    },
    {
      id: 5,
      title: 'Customer Support Transformation: 80% Faster Resolution',
      author: 'Emma Wilson',
      role: 'Customer Success Manager',
      company: 'SupportTech',
      avatar: '👩‍💻',
      category: 'operations',
      impact: 'customer-satisfaction',
      timeToImplement: '2 weeks',
      timeSaved: '3 hours/day',
      roi: '400%',
      rating: 4.8,
      views: 1567,
      summary: 'Reduced average ticket resolution time by 80% and improved customer satisfaction scores using AI-powered support automation.',
      challenge: 'Support team was overwhelmed with 200+ daily tickets. Average resolution time was 4 hours, customer satisfaction was declining.',
      solution: 'Connected our knowledge base and ticket system to Claude AI via Zapier. The AI provides instant answers and suggests solutions to support agents.',
      results: [
        '80% reduction in average resolution time',
        '3 hours saved daily per support agent',
        '92% customer satisfaction score (up from 67%)',
        '50% reduction in escalated tickets'
      ],
      tools: ['Zapier', 'Claude AI', 'Zendesk', 'Confluence'],
      quote: 'We transformed from reactive firefighting to proactive customer success. Our customers get better help faster.',
      videoUrl: '#',
      caseStudyUrl: '#'
    },
    {
      id: 6,
      title: 'Content Creation at Scale: 10x Output Increase',
      author: 'Alex Thompson',
      role: 'Content Manager',
      company: 'ContentCorp',
      avatar: '👨‍🎨',
      category: 'marketing',
      impact: 'team-efficiency',
      timeToImplement: '2 weeks',
      timeSaved: '4 hours/day',
      roi: '650%',
      rating: 4.6,
      views: 1345,
      summary: 'Increased content production by 10x while maintaining quality using AI-powered content generation and optimization.',
      challenge: 'Creating enough quality content for 5 different audiences was impossible with our 2-person team. We were publishing 2 articles per week.',
      solution: 'Built an MCP system connecting our content calendar, audience data, and performance metrics to GPT-4 via Airtable for automated content generation.',
      results: [
        '10x increase in content output (2 → 20 articles/week)',
        '4 hours saved daily on content creation',
        '45% improvement in engagement rates',
        '200% increase in organic traffic'
      ],
      tools: ['Airtable', 'GPT-4', 'WordPress', 'Google Analytics'],
      quote: 'We went from content scarcity to content abundance. The AI handles the heavy lifting while we focus on strategy and creativity.',
      videoUrl: '#',
      caseStudyUrl: '#'
    }
  ];

  const filteredStories = successStories.filter(story => {
    const categoryMatch = selectedCategory === 'all' || story.category === selectedCategory;
    const impactMatch = selectedImpact === 'all' || story.impact === selectedImpact;
    return categoryMatch && impactMatch;
  });

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'time-saving': return 'bg-blue-500/20 text-blue-400';
      case 'revenue-growth': return 'bg-green-500/20 text-green-400';
      case 'team-efficiency': return 'bg-purple-500/20 text-purple-400';
      case 'customer-satisfaction': return 'bg-orange-500/20 text-orange-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">MCP Success Stories</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Real results from non-developers who transformed their work with MCP
          </p>
        </div>

        {/* Impact Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-blue-400 mb-1">387</div>
            <div className="text-blue-200 text-sm">Success Stories</div>
          </div>
          <div className="bg-gradient-to-r from-green-600/20 to-teal-600/20 border border-green-500/30 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-green-400 mb-1">2.4M</div>
            <div className="text-green-200 text-sm">Hours Saved</div>
          </div>
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-purple-400 mb-1">$12M</div>
            <div className="text-purple-200 text-sm">Revenue Generated</div>
          </div>
          <div className="bg-gradient-to-r from-orange-600/20 to-red-600/20 border border-orange-500/30 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-orange-400 mb-1">94%</div>
            <div className="text-orange-200 text-sm">Success Rate</div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <span className="text-gray-300 font-medium">Filter by:</span>
            </div>
          </div>
          
          {/* Category Filter */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
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
          </div>

          {/* Impact Filter */}
          <div className="flex flex-wrap gap-2">
            {impactLevels.map((impact) => (
              <button
                key={impact.id}
                onClick={() => setSelectedImpact(impact.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  selectedImpact === impact.id
                    ? 'bg-purple-600 text-white'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10'
                }`}
              >
                {impact.name}
              </button>
            ))}
          </div>
        </div>

        {/* Success Stories */}
        <div className="space-y-8">
          {filteredStories.map((story) => (
            <div key={story.id} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-300">
              {/* Header */}
              <div className="p-6 border-b border-white/10">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="text-4xl">{story.avatar}</div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{story.title}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-blue-300 font-medium">{story.author}</span>
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-300">{story.role} at {story.company}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getImpactColor(story.impact)}`}>
                      {story.impact.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span className="text-yellow-400">{story.rating}</span>
                      </div>
                      <span>{story.views.toLocaleString()} views</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-300 text-lg">{story.summary}</p>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-6">
                  {/* Key Metrics */}
                  <div>
                    <h4 className="text-white font-semibold mb-4">Key Metrics</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Time to Implement:</span>
                        <span className="text-blue-300">{story.timeToImplement}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Time Saved:</span>
                        <span className="text-green-300">{story.timeSaved}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">ROI:</span>
                        <span className="text-purple-300">{story.roi}</span>
                      </div>
                    </div>
                  </div>

                  {/* Tools Used */}
                  <div>
                    <h4 className="text-white font-semibold mb-4">Tools Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {story.tools.map((tool, index) => (
                        <span key={index} className="px-2 py-1 bg-slate-700/50 text-gray-300 rounded text-sm">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Results */}
                  <div>
                    <h4 className="text-white font-semibold mb-4">Key Results</h4>
                    <div className="space-y-2">
                      {story.results.slice(0, 2).map((result, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <TrendingUp className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">{result}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Challenge, Solution, Quote */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-slate-800/50 rounded-lg p-4">
                    <h4 className="text-red-300 font-semibold mb-2">The Challenge</h4>
                    <p className="text-gray-300 text-sm">{story.challenge}</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4">
                    <h4 className="text-green-300 font-semibold mb-2">The Solution</h4>
                    <p className="text-gray-300 text-sm">{story.solution}</p>
                  </div>
                </div>

                {/* Quote */}
                <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-lg p-4 mb-6">
                  <blockquote className="text-blue-200 italic">
                    "{story.quote}"
                  </blockquote>
                  <div className="text-blue-300 text-sm mt-2">— {story.author}</div>
                </div>

                {/* Actions */}
                <div className="flex space-x-4">
                  <button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2">
                    <Play className="w-4 h-4" />
                    <span>Watch Video</span>
                  </button>
                  <button className="flex-1 border border-white/20 text-white px-4 py-2 rounded-lg font-medium hover:bg-white/10 transition-colors duration-200 flex items-center justify-center space-x-2">
                    <ExternalLink className="w-4 h-4" />
                    <span>Read Full Case Study</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-green-600/20 to-teal-600/20 border border-green-500/30 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Ready to Write Your Success Story?</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Join hundreds of non-developers who have transformed their work with MCP. Your success story could be next!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200">
              Start Your Project
            </button>
            <button className="border border-white/20 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors duration-200">
              Share Your Story
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuccessStories;