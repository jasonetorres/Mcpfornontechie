import React, { useState } from 'react';
import { Check, X, Star, ArrowRight, Zap, Shield, Users, DollarSign } from 'lucide-react';

function PlatformComparison() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Platforms' },
    { id: 'beginner', name: 'Beginner Friendly' },
    { id: 'enterprise', name: 'Enterprise Ready' },
    { id: 'free', name: 'Free Options' },
    { id: 'advanced', name: 'Advanced Features' }
  ];

  const platforms = [
    {
      name: 'Zapier',
      description: 'The most beginner-friendly automation platform',
      logo: '⚡',
      pricing: 'Free tier available, $19.99/month for premium',
      difficulty: 'Beginner',
      category: ['beginner', 'free'],
      rating: 4.8,
      users: '5M+',
      pros: [
        'Extremely user-friendly interface',
        'Huge library of pre-built integrations',
        'Excellent documentation and tutorials',
        'Strong community support',
        'No coding required'
      ],
      cons: [
        'Can get expensive with heavy usage',
        'Limited customization options',
        'Some advanced features require paid plans'
      ],
      bestFor: [
        'Complete beginners',
        'Simple automations',
        'Quick prototyping',
        'Small to medium teams'
      ],
      mcpFeatures: {
        dataConnections: 'Excellent',
        aiIntegrations: 'Good',
        customization: 'Limited',
        security: 'Good',
        scalability: 'Medium'
      },
      setupTime: '15-30 minutes',
      learningCurve: 'Very Easy'
    },
    {
      name: 'Microsoft Power Platform',
      description: 'Enterprise-grade low-code platform with deep Office integration',
      logo: '🔷',
      pricing: '$5-40/user/month depending on features',
      difficulty: 'Intermediate',
      category: ['enterprise', 'advanced'],
      rating: 4.6,
      users: '40M+',
      pros: [
        'Deep integration with Microsoft ecosystem',
        'Enterprise security and compliance',
        'Powerful AI capabilities with Azure',
        'Scalable for large organizations',
        'Visual development environment'
      ],
      cons: [
        'Steeper learning curve',
        'Can be complex for simple use cases',
        'Requires Microsoft ecosystem for best value'
      ],
      bestFor: [
        'Enterprise organizations',
        'Microsoft Office users',
        'Complex business processes',
        'Teams needing governance'
      ],
      mcpFeatures: {
        dataConnections: 'Excellent',
        aiIntegrations: 'Excellent',
        customization: 'Excellent',
        security: 'Excellent',
        scalability: 'Excellent'
      },
      setupTime: '1-2 hours',
      learningCurve: 'Moderate'
    },
    {
      name: 'Airtable',
      description: 'Spreadsheet-database hybrid with powerful automation features',
      logo: '📊',
      pricing: 'Free tier available, $10-24/user/month for teams',
      difficulty: 'Beginner',
      category: ['beginner', 'free'],
      rating: 4.7,
      users: '300K+',
      pros: [
        'Familiar spreadsheet interface',
        'Powerful database capabilities',
        'Great for data organization',
        'Strong API and integration options',
        'Collaborative features'
      ],
      cons: [
        'Limited automation compared to dedicated platforms',
        'Can become expensive for large teams',
        'Learning curve for advanced features'
      ],
      bestFor: [
        'Data-heavy projects',
        'Content management',
        'Project tracking',
        'Teams familiar with spreadsheets'
      ],
      mcpFeatures: {
        dataConnections: 'Good',
        aiIntegrations: 'Good',
        customization: 'Good',
        security: 'Good',
        scalability: 'Good'
      },
      setupTime: '30-45 minutes',
      learningCurve: 'Easy'
    },
    {
      name: 'Notion',
      description: 'All-in-one workspace with AI capabilities and database features',
      logo: '📝',
      pricing: 'Free for personal use, $8-15/user/month for teams',
      difficulty: 'Beginner',
      category: ['beginner', 'free'],
      rating: 4.5,
      users: '30M+',
      pros: [
        'All-in-one workspace solution',
        'Built-in AI assistant',
        'Flexible database system',
        'Great for documentation',
        'Strong community and templates'
      ],
      cons: [
        'Can be slow with large datasets',
        'Limited automation capabilities',
        'Learning curve for advanced database features'
      ],
      bestFor: [
        'Knowledge management',
        'Documentation projects',
        'Small teams',
        'Content creation workflows'
      ],
      mcpFeatures: {
        dataConnections: 'Limited',
        aiIntegrations: 'Good',
        customization: 'Good',
        security: 'Good',
        scalability: 'Limited'
      },
      setupTime: '20-30 minutes',
      learningCurve: 'Easy'
    },
    {
      name: 'Make.com (formerly Integromat)',
      description: 'Visual automation platform with advanced features',
      logo: '🔧',
      pricing: 'Free tier available, $9-29/month for premium',
      difficulty: 'Intermediate',
      category: ['advanced', 'free'],
      rating: 4.6,
      users: '500K+',
      pros: [
        'Visual workflow builder',
        'Advanced logic and branching',
        'Competitive pricing',
        'Strong API capabilities',
        'Good error handling'
      ],
      cons: [
        'Steeper learning curve than Zapier',
        'Smaller community and resources',
        'Interface can be overwhelming for beginners'
      ],
      bestFor: [
        'Complex automations',
        'Users outgrowing Zapier',
        'Budget-conscious teams',
        'Advanced workflow requirements'
      ],
      mcpFeatures: {
        dataConnections: 'Excellent',
        aiIntegrations: 'Good',
        customization: 'Excellent',
        security: 'Good',
        scalability: 'Good'
      },
      setupTime: '45-60 minutes',
      learningCurve: 'Moderate'
    },
    {
      name: 'Bubble',
      description: 'No-code platform for building full web applications',
      logo: '🫧',
      pricing: 'Free tier available, $25-115/month for production apps',
      difficulty: 'Advanced',
      category: ['advanced', 'free'],
      rating: 4.3,
      users: '1M+',
      pros: [
        'Build complete web applications',
        'No coding required',
        'Powerful database and logic capabilities',
        'Custom user interfaces',
        'Hosting included'
      ],
      cons: [
        'Significant learning curve',
        'Can be slow for complex applications',
        'Limited mobile app capabilities'
      ],
      bestFor: [
        'Building custom applications',
        'Startups and entrepreneurs',
        'Complex business logic',
        'Custom user experiences'
      ],
      mcpFeatures: {
        dataConnections: 'Good',
        aiIntegrations: 'Limited',
        customization: 'Excellent',
        security: 'Good',
        scalability: 'Good'
      },
      setupTime: '2-4 hours',
      learningCurve: 'Difficult'
    }
  ];

  const filteredPlatforms = platforms.filter(platform => 
    selectedCategory === 'all' || platform.category.includes(selectedCategory)
  );

  const getFeatureIcon = (rating: string) => {
    switch (rating) {
      case 'Excellent': return <Check className="w-5 h-5 text-green-400" />;
      case 'Good': return <Check className="w-5 h-5 text-blue-400" />;
      case 'Limited': return <X className="w-5 h-5 text-yellow-400" />;
      default: return <X className="w-5 h-5 text-red-400" />;
    }
  };

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
          <h1 className="text-4xl font-bold text-white mb-4">Platform Comparison Guide</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Choose the right no-code platform for your MCP projects
          </p>
        </div>

        {/* Quick Decision Helper */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8">Quick Decision Helper</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-r from-green-600/20 to-teal-600/20 border border-green-500/30 rounded-xl p-6">
              <div className="text-3xl mb-3">🚀</div>
              <h3 className="text-lg font-semibold text-white mb-2">Just Starting Out?</h3>
              <p className="text-green-200 mb-4">New to automation and AI</p>
              <div className="text-green-300 font-medium">Recommended: Zapier</div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-xl p-6">
              <div className="text-3xl mb-3">🏢</div>
              <h3 className="text-lg font-semibold text-white mb-2">Enterprise User?</h3>
              <p className="text-blue-200 mb-4">Need security and compliance</p>
              <div className="text-blue-300 font-medium">Recommended: Power Platform</div>
            </div>
            
            <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-xl p-6">
              <div className="text-3xl mb-3">📊</div>
              <h3 className="text-lg font-semibold text-white mb-2">Data Heavy?</h3>
              <p className="text-purple-200 mb-4">Lots of spreadsheets and databases</p>
              <div className="text-purple-300 font-medium">Recommended: Airtable</div>
            </div>
            
            <div className="bg-gradient-to-r from-orange-600/20 to-red-600/20 border border-orange-500/30 rounded-xl p-6">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="text-lg font-semibold text-white mb-2">Budget Conscious?</h3>
              <p className="text-orange-200 mb-4">Need powerful features for less</p>
              <div className="text-orange-300 font-medium">Recommended: Make.com</div>
            </div>
          </div>
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

        {/* Platform Comparison */}
        <div className="space-y-8">
          {filteredPlatforms.map((platform, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden">
              {/* Header */}
              <div className="p-6 border-b border-white/10">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-4xl">{platform.logo}</div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{platform.name}</h3>
                      <p className="text-gray-300">{platform.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(platform.difficulty)}`}>
                      {platform.difficulty}
                    </span>
                    <div className="flex items-center space-x-1 mt-2">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span className="text-yellow-400">{platform.rating}</span>
                      <span className="text-gray-400">({platform.users} users)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Pricing and Setup */}
                  <div>
                    <h4 className="text-white font-semibold mb-4">Pricing & Setup</h4>
                    <div className="space-y-3">
                      <div>
                        <span className="text-gray-400 text-sm">Pricing:</span>
                        <div className="text-green-300">{platform.pricing}</div>
                      </div>
                      <div>
                        <span className="text-gray-400 text-sm">Setup Time:</span>
                        <div className="text-blue-300">{platform.setupTime}</div>
                      </div>
                      <div>
                        <span className="text-gray-400 text-sm">Learning Curve:</span>
                        <div className="text-purple-300">{platform.learningCurve}</div>
                      </div>
                    </div>
                  </div>

                  {/* MCP Features */}
                  <div>
                    <h4 className="text-white font-semibold mb-4">MCP Capabilities</h4>
                    <div className="space-y-2">
                      {Object.entries(platform.mcpFeatures).map(([feature, rating]) => (
                        <div key={feature} className="flex items-center justify-between">
                          <span className="text-gray-300 text-sm capitalize">
                            {feature.replace(/([A-Z])/g, ' $1').trim()}
                          </span>
                          <div className="flex items-center space-x-2">
                            {getFeatureIcon(rating)}
                            <span className="text-sm text-gray-400">{rating}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Best For */}
                  <div>
                    <h4 className="text-white font-semibold mb-4">Best For</h4>
                    <div className="space-y-2">
                      {platform.bestFor.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                          <span className="text-gray-300 text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Pros and Cons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                  <div>
                    <h4 className="text-green-400 font-semibold mb-3">Pros</h4>
                    <div className="space-y-2">
                      {platform.pros.map((pro, proIndex) => (
                        <div key={proIndex} className="flex items-start space-x-2">
                          <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">{pro}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-red-400 font-semibold mb-3">Cons</h4>
                    <div className="space-y-2">
                      {platform.cons.map((con, conIndex) => (
                        <div key={conIndex} className="flex items-start space-x-2">
                          <X className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">{con}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="mt-6 pt-6 border-t border-white/10">
                  <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center space-x-2">
                    <span>Get Started with {platform.name}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Decision Matrix */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-white mb-8">Quick Comparison Matrix</h2>
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left p-4 text-white font-semibold">Platform</th>
                    <th className="text-center p-4 text-white font-semibold">Difficulty</th>
                    <th className="text-center p-4 text-white font-semibold">Setup Time</th>
                    <th className="text-center p-4 text-white font-semibold">Starting Price</th>
                    <th className="text-center p-4 text-white font-semibold">Best For</th>
                  </tr>
                </thead>
                <tbody>
                  {platforms.map((platform, index) => (
                    <tr key={index} className="border-b border-white/5">
                      <td className="p-4">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{platform.logo}</span>
                          <span className="text-white font-medium">{platform.name}</span>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(platform.difficulty)}`}>
                          {platform.difficulty}
                        </span>
                      </td>
                      <td className="p-4 text-center text-gray-300">{platform.setupTime}</td>
                      <td className="p-4 text-center text-gray-300">{platform.pricing.split(',')[0]}</td>
                      <td className="p-4 text-center text-gray-300">{platform.bestFor[0]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Still Not Sure Which Platform to Choose?</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Join our community or attend office hours to get personalized recommendations based on your specific needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200">
              Get Personal Recommendation
            </button>
            <button className="border border-white/20 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors duration-200">
              Join Office Hours
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlatformComparison;