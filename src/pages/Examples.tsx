import React, { useState } from 'react';
import { Play, ExternalLink, Users, MessageSquare, Workflow, Database, FileSpreadsheet, Calendar, ShoppingCart, BarChart3, Filter } from 'lucide-react';

function Examples() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedComplexity, setSelectedComplexity] = useState('all');

  const categories = [
    { id: 'all', name: 'All Examples', icon: Database },
    { id: 'community', name: 'Community Management', icon: Users },
    { id: 'marketing', name: 'Marketing & Growth', icon: MessageSquare },
    { id: 'project', name: 'Project Management', icon: Workflow },
    { id: 'sales', name: 'Sales & Business', icon: BarChart3 },
    { id: 'operations', name: 'Operations', icon: Calendar }
  ];

  const examples = [
    {
      id: 1,
      title: 'Community Q&A Bot',
      description: 'Auto-answer member questions using community data',
      category: 'community',
      role: 'Community Manager',
      dataSource: 'Member spreadsheet',
      complexity: 'Beginner',
      duration: '2-3 hours',
      tools: ['Google Sheets', 'Zapier', 'ChatGPT API'],
      features: [
        'Answer questions about members',
        'Provide contributor statistics',
        'Share contact information',
        'Track member engagement'
      ],
      demoUrl: '#',
      tutorialUrl: '#',
      templateUrl: '#'
    },
    {
      id: 2,
      title: 'Customer Insight Generator',
      description: 'Create personalized marketing content from CRM data',
      category: 'marketing',
      role: 'Marketing Manager',
      dataSource: 'CRM database',
      complexity: 'Intermediate',
      duration: '1-2 days',
      tools: ['Airtable', 'Make.com', 'Claude API'],
      features: [
        'Generate personalized email campaigns',
        'Segment customers automatically',
        'Create targeted content',
        'Track campaign performance'
      ],
      demoUrl: '#',
      tutorialUrl: '#',
      templateUrl: '#'
    },
    {
      id: 3,
      title: 'Project Status Reporter',
      description: 'Get AI-powered project updates from task data',
      category: 'project',
      role: 'Project Manager',
      dataSource: 'Task management tool',
      complexity: 'Beginner',
      duration: '3-4 hours',
      tools: ['Notion', 'Power Automate', 'GPT-4'],
      features: [
        'Automated status reports',
        'Risk identification',
        'Resource allocation insights',
        'Timeline predictions'
      ],
      demoUrl: '#',
      tutorialUrl: '#',
      templateUrl: '#'
    },
    {
      id: 4,
      title: 'Sales Lead Scorer',
      description: 'Prioritize prospects using historical data',
      category: 'sales',
      role: 'Sales Professional',
      dataSource: 'Sales pipeline',
      complexity: 'Advanced',
      duration: '3-5 days',
      tools: ['Salesforce', 'Zapier', 'Custom API'],
      features: [
        'Lead scoring automation',
        'Conversion probability',
        'Next best action suggestions',
        'Pipeline forecasting'
      ],
      demoUrl: '#',
      tutorialUrl: '#',
      templateUrl: '#'
    },
    {
      id: 5,
      title: 'Content Recommendation Engine',
      description: 'Suggest relevant content based on user behavior',
      category: 'marketing',
      role: 'Content Manager',
      dataSource: 'Analytics data',
      complexity: 'Intermediate',
      duration: '2-3 days',
      tools: ['Google Analytics', 'Bubble', 'OpenAI'],
      features: [
        'Personalized content suggestions',
        'Engagement optimization',
        'Content performance analysis',
        'Audience segmentation'
      ],
      demoUrl: '#',
      tutorialUrl: '#',
      templateUrl: '#'
    },
    {
      id: 6,
      title: 'Employee Onboarding Assistant',
      description: 'Answer new hire questions using company docs',
      category: 'operations',
      role: 'People Operations',
      dataSource: 'HR documents',
      complexity: 'Beginner',
      duration: '4-6 hours',
      tools: ['SharePoint', 'Power Platform', 'Azure AI'],
      features: [
        'Answer policy questions',
        'Provide process guidance',
        'Share relevant documents',
        'Track onboarding progress'
      ],
      demoUrl: '#',
      tutorialUrl: '#',
      templateUrl: '#'
    },
    {
      id: 7,
      title: 'Inventory Management Assistant',
      description: 'Monitor stock levels and predict reorder needs',
      category: 'operations',
      role: 'Operations Manager',
      dataSource: 'Inventory database',
      complexity: 'Intermediate',
      duration: '1-2 days',
      tools: ['Excel', 'Power BI', 'Azure AI'],
      features: [
        'Stock level monitoring',
        'Reorder predictions',
        'Supplier recommendations',
        'Cost optimization'
      ],
      demoUrl: '#',
      tutorialUrl: '#',
      templateUrl: '#'
    },
    {
      id: 8,
      title: 'Customer Support Classifier',
      description: 'Automatically categorize and route support tickets',
      category: 'operations',
      role: 'Customer Success',
      dataSource: 'Support ticket system',
      complexity: 'Advanced',
      duration: '2-4 days',
      tools: ['Zendesk', 'Zapier', 'Custom ML'],
      features: [
        'Automatic ticket classification',
        'Priority assignment',
        'Agent routing',
        'Response suggestions'
      ],
      demoUrl: '#',
      tutorialUrl: '#',
      templateUrl: '#'
    },
    {
      id: 9,
      title: 'Event Planning Assistant',
      description: 'Coordinate events using attendee and venue data',
      category: 'community',
      role: 'Event Coordinator',
      dataSource: 'Event management system',
      complexity: 'Beginner',
      duration: '3-5 hours',
      tools: ['Eventbrite', 'Google Sheets', 'ChatGPT'],
      features: [
        'Attendee management',
        'Venue recommendations',
        'Schedule optimization',
        'Communication automation'
      ],
      demoUrl: '#',
      tutorialUrl: '#',
      templateUrl: '#'
    }
  ];

  const filteredExamples = examples.filter(example => {
    const categoryMatch = selectedCategory === 'all' || example.category === selectedCategory;
    const complexityMatch = selectedComplexity === 'all' || example.complexity === selectedComplexity;
    return categoryMatch && complexityMatch;
  });

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
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
          <h1 className="text-4xl font-bold text-white mb-4">Real-World MCP Examples</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            See how non-technical professionals are using MCP to supercharge their work
          </p>
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
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  <category.icon className="w-4 h-4" />
                  <span>{category.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Complexity Filter */}
          <div className="flex flex-wrap gap-2">
            {['all', 'Beginner', 'Intermediate', 'Advanced'].map((complexity) => (
              <button
                key={complexity}
                onClick={() => setSelectedComplexity(complexity)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  selectedComplexity === complexity
                    ? 'bg-purple-600 text-white'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10'
                }`}
              >
                {complexity === 'all' ? 'All Levels' : complexity}
              </button>
            ))}
          </div>
        </div>

        {/* Examples Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExamples.map((example) => (
            <div key={example.id} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 group">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors duration-200">
                  {example.title}
                </h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getComplexityColor(example.complexity)}`}>
                  {example.complexity}
                </span>
              </div>
              
              <p className="text-gray-300 mb-4">{example.description}</p>
              
              <div className="space-y-3 mb-4">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-blue-400" />
                  <span className="text-sm text-blue-300">{example.role}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FileSpreadsheet className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-green-300">{example.dataSource}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-purple-400" />
                  <span className="text-sm text-purple-300">{example.duration}</span>
                </div>
              </div>
              
              {/* Features */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-white mb-2">Key Features:</h4>
                <div className="space-y-1">
                  {example.features.slice(0, 3).map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                      <span className="text-xs text-gray-300">{feature}</span>
                    </div>
                  ))}
                  {example.features.length > 3 && (
                    <div className="text-xs text-gray-400">+{example.features.length - 3} more features</div>
                  )}
                </div>
              </div>
              
              {/* Tools */}
              <div className="flex flex-wrap gap-2 mb-4">
                {example.tools.map((tool, toolIndex) => (
                  <span key={toolIndex} className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs">
                    {tool}
                  </span>
                ))}
              </div>
              
              {/* Actions */}
              <div className="flex space-x-2">
                <button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-1">
                  <Play className="w-3 h-3" />
                  <span>Demo</span>
                </button>
                <button className="flex-1 border border-white/20 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-white/10 transition-colors duration-200 flex items-center justify-center space-x-1">
                  <ExternalLink className="w-3 h-3" />
                  <span>Tutorial</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredExamples.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">No examples found for the selected filters.</div>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedComplexity('all');
              }}
              className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Don't See Your Use Case?</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            These are just examples to get you started. MCP can connect AI to virtually any data source for any use case.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200">
              Request Custom Example
            </button>
            <button className="border border-white/20 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors duration-200">
              Join Community
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Examples;