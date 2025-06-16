import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Clock, Users, Zap, Database, MessageSquare, Workflow, Star, Play } from 'lucide-react';

function StartBuilding() {
  const [selectedPath, setSelectedPath] = useState('beginner');

  const buildingPaths = [
    {
      id: 'beginner',
      title: 'Complete Beginner',
      description: 'Never worked with AI or data connections before',
      duration: '2-3 weeks',
      difficulty: 'Beginner',
      steps: [
        {
          title: 'Understand MCP Fundamentals',
          description: 'Learn what MCP is and why it matters',
          duration: '30 min',
          resources: ['MCP Fundamentals Guide', 'Video: MCP in 5 Minutes'],
          action: 'Read Guide'
        },
        {
          title: 'Choose Your Platform',
          description: 'Select a no-code platform that fits your needs',
          duration: '15 min',
          resources: ['Platform Comparison Guide', 'Zapier vs Power Platform'],
          action: 'Compare Platforms'
        },
        {
          title: 'Set Up Your First Connection',
          description: 'Connect a simple spreadsheet to AI',
          duration: '45 min',
          resources: ['Google Sheets + Zapier Template', 'Step-by-step Video'],
          action: 'Use Template'
        },
        {
          title: 'Test and Iterate',
          description: 'Ask questions and refine your setup',
          duration: '30 min',
          resources: ['Testing Checklist', 'Common Issues Guide'],
          action: 'Start Testing'
        },
        {
          title: 'Join the Community',
          description: 'Share your success and get help',
          duration: '10 min',
          resources: ['Discord Community', 'Success Stories'],
          action: 'Join Now'
        }
      ]
    },
    {
      id: 'intermediate',
      title: 'Some Experience',
      description: 'Comfortable with spreadsheets and online tools',
      duration: '1-2 weeks',
      difficulty: 'Intermediate',
      steps: [
        {
          title: 'Review MCP Architecture',
          description: 'Understand how MCP works under the hood',
          duration: '20 min',
          resources: ['Technical Overview', 'Architecture Diagram'],
          action: 'Learn More'
        },
        {
          title: 'Select Advanced Platform',
          description: 'Choose between Airtable, Notion, or Power Platform',
          duration: '30 min',
          resources: ['Advanced Platform Guide', 'Feature Comparison'],
          action: 'Compare Options'
        },
        {
          title: 'Build Multi-Source Connection',
          description: 'Connect multiple data sources to one AI assistant',
          duration: '2 hours',
          resources: ['Multi-Source Template', 'Advanced Tutorial'],
          action: 'Download Template'
        },
        {
          title: 'Implement Security Best Practices',
          description: 'Set up proper permissions and access controls',
          duration: '45 min',
          resources: ['Security Checklist', 'Privacy Guide'],
          action: 'Review Security'
        },
        {
          title: 'Scale Your Solution',
          description: 'Add more features and optimize performance',
          duration: '1-2 hours',
          resources: ['Scaling Guide', 'Performance Tips'],
          action: 'Optimize Setup'
        }
      ]
    },
    {
      id: 'advanced',
      title: 'Power User',
      description: 'Advanced with automation and integrations',
      duration: '3-5 days',
      difficulty: 'Advanced',
      steps: [
        {
          title: 'Master MCP Protocol',
          description: 'Deep dive into MCP specifications and capabilities',
          duration: '1 hour',
          resources: ['Protocol Documentation', 'Advanced Examples'],
          action: 'Study Protocol'
        },
        {
          title: 'Custom Integration Setup',
          description: 'Build custom connectors for your specific tools',
          duration: '3-4 hours',
          resources: ['Custom Connector Guide', 'API Documentation'],
          action: 'Build Custom'
        },
        {
          title: 'Enterprise Implementation',
          description: 'Deploy MCP solutions across your organization',
          duration: '1-2 days',
          resources: ['Enterprise Guide', 'Deployment Checklist'],
          action: 'Plan Deployment'
        },
        {
          title: 'Train Your Team',
          description: 'Create training materials and onboard colleagues',
          duration: '2-3 hours',
          resources: ['Training Templates', 'Presentation Materials'],
          action: 'Create Training'
        },
        {
          title: 'Contribute to Community',
          description: 'Share your expertise and help others',
          duration: 'Ongoing',
          resources: ['Contribution Guide', 'Mentorship Program'],
          action: 'Get Involved'
        }
      ]
    }
  ];

  const quickStarts = [
    {
      title: 'Community Manager Assistant',
      description: 'Answer questions about community members',
      platform: 'Zapier + Google Sheets',
      time: '30 minutes',
      difficulty: 'Beginner',
      icon: Users,
      features: ['Member lookup', 'Contribution stats', 'Contact info']
    },
    {
      title: 'Marketing Campaign Generator',
      description: 'Create personalized campaigns from customer data',
      platform: 'Airtable + Claude',
      time: '1 hour',
      difficulty: 'Intermediate',
      icon: MessageSquare,
      features: ['Customer segmentation', 'Content generation', 'A/B testing']
    },
    {
      title: 'Project Status Reporter',
      description: 'Automated project updates from task data',
      platform: 'Notion + GPT-4',
      time: '45 minutes',
      difficulty: 'Beginner',
      icon: Workflow,
      features: ['Status reports', 'Risk identification', 'Timeline tracking']
    },
    {
      title: 'Sales Lead Scorer',
      description: 'Prioritize prospects using historical data',
      platform: 'Power Platform + Azure AI',
      time: '2 hours',
      difficulty: 'Advanced',
      icon: Database,
      features: ['Lead scoring', 'Conversion prediction', 'Pipeline forecasting']
    }
  ];

  const currentPath = buildingPaths.find(path => path.id === selectedPath);

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
          <h1 className="text-4xl font-bold text-white mb-4">Start Building with MCP</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Your personalized roadmap to building AI-powered solutions without coding
          </p>
        </div>

        {/* Path Selection */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8">Choose Your Learning Path</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {buildingPaths.map((path) => (
              <button
                key={path.id}
                onClick={() => setSelectedPath(path.id)}
                className={`text-left p-6 rounded-xl border transition-all duration-200 ${
                  selectedPath === path.id
                    ? 'bg-blue-600/20 border-blue-500'
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-white">{path.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(path.difficulty)}`}>
                    {path.difficulty}
                  </span>
                </div>
                <p className="text-gray-300 mb-3">{path.description}</p>
                <div className="flex items-center space-x-2 text-sm text-blue-300">
                  <Clock className="w-4 h-4" />
                  <span>{path.duration}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Path Details */}
        {currentPath && (
          <div className="mb-16">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Your {currentPath.title} Path</h2>
                <div className="flex items-center space-x-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(currentPath.difficulty)}`}>
                    {currentPath.difficulty}
                  </span>
                  <div className="flex items-center space-x-1 text-blue-300">
                    <Clock className="w-4 h-4" />
                    <span>{currentPath.duration}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {currentPath.steps.map((step, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-slate-800/50 rounded-lg">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-semibold text-sm">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                        <div className="flex items-center space-x-1 text-gray-400">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm">{step.duration}</span>
                        </div>
                      </div>
                      <p className="text-gray-300 mb-3">{step.description}</p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {step.resources.map((resource, resourceIndex) => (
                          <span key={resourceIndex} className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs">
                            {resource}
                          </span>
                        ))}
                      </div>
                      <button className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2">
                        <span>{step.action}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Quick Start Templates */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8">Quick Start Templates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quickStarts.map((template, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <template.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-white">{template.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(template.difficulty)}`}>
                        {template.difficulty}
                      </span>
                    </div>
                    <p className="text-gray-300 mb-2">{template.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
                      <span>{template.platform}</span>
                      <span>•</span>
                      <span>{template.time}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {template.features.map((feature, featureIndex) => (
                    <span key={featureIndex} className="px-2 py-1 bg-green-500/20 text-green-300 rounded text-xs">
                      {feature}
                    </span>
                  ))}
                </div>
                
                <div className="flex space-x-3">
                  <Link
                    to="/templates"
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    <Zap className="w-4 h-4" />
                    <span>Use Template</span>
                  </Link>
                  <Link
                    to="/demo"
                    className="px-4 py-2 border border-white/20 text-white rounded-lg font-medium hover:bg-white/10 transition-colors duration-200 flex items-center space-x-2"
                  >
                    <Play className="w-4 h-4" />
                    <span>Demo</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Success Metrics */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8">What Success Looks Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-r from-green-600/20 to-teal-600/20 border border-green-500/30 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <CheckCircle className="w-8 h-8 text-green-400" />
                <h3 className="text-lg font-semibold text-white">Week 1</h3>
              </div>
              <ul className="space-y-2 text-green-200">
                <li>• Understand MCP fundamentals</li>
                <li>• Choose your platform</li>
                <li>• Complete first connection</li>
                <li>• Ask your first AI question</li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Star className="w-8 h-8 text-blue-400" />
                <h3 className="text-lg font-semibold text-white">Month 1</h3>
              </div>
              <ul className="space-y-2 text-blue-200">
                <li>• Multiple data sources connected</li>
                <li>• Team members using your solution</li>
                <li>• Measurable time savings</li>
                <li>• Contributing to community</li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Zap className="w-8 h-8 text-purple-400" />
                <h3 className="text-lg font-semibold text-white">Month 3</h3>
              </div>
              <ul className="space-y-2 text-purple-200">
                <li>• Advanced automations running</li>
                <li>• Training others in your org</li>
                <li>• Significant productivity gains</li>
                <li>• Recognized as AI champion</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Ready to Begin Your Journey?</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Join thousands of non-developers who are already building amazing AI-powered solutions with MCP.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/templates"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200"
            >
              Start with a Template
            </Link>
            <Link
              to="/join-community"
              className="border border-white/20 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors duration-200"
            >
              Join the Community
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StartBuilding;