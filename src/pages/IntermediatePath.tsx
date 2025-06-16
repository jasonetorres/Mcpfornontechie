import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Clock, ArrowRight, Play, Book, Users, Zap, Shield, Database } from 'lucide-react';
import { useLearningProgress } from '../hooks/useLearningProgress';
import { useAuth } from '../contexts/AuthContext';

function IntermediatePath() {
  const { user } = useAuth();
  const { completedSteps, loading, toggleStep, getProgressPercentage } = useLearningProgress('intermediate');

  const pathSteps = [
    {
      title: 'Review MCP Architecture',
      description: 'Understand how MCP works under the hood and advanced concepts',
      duration: '20 min',
      resources: [
        { name: 'Technical Overview', type: 'Article', url: '/guides' },
        { name: 'Architecture Diagram', type: 'Visual', url: '/learn' },
        { name: 'Advanced Concepts Video', type: 'Video', url: '#' }
      ],
      tasks: [
        'Study the MCP protocol architecture',
        'Understand data flow and security models',
        'Learn about different connection types',
        'Review best practices and patterns'
      ]
    },
    {
      title: 'Select Advanced Platform',
      description: 'Choose between Airtable, Notion, or Power Platform based on your needs',
      duration: '30 min',
      resources: [
        { name: 'Advanced Platform Guide', type: 'Guide', url: '/platform-comparison' },
        { name: 'Feature Comparison Matrix', type: 'Comparison', url: '/platform-comparison' },
        { name: 'Platform Decision Tree', type: 'Tool', url: '#' }
      ],
      tasks: [
        'Evaluate platform capabilities vs requirements',
        'Consider scalability and team needs',
        'Set up advanced platform account',
        'Configure initial workspace'
      ]
    },
    {
      title: 'Build Multi-Source Connection',
      description: 'Connect multiple data sources to create a comprehensive AI assistant',
      duration: '2 hours',
      resources: [
        { name: 'Multi-Source Template', type: 'Template', url: '/templates' },
        { name: 'Advanced Tutorial Series', type: 'Video', url: '#' },
        { name: 'Integration Patterns Guide', type: 'Guide', url: '#' }
      ],
      tasks: [
        'Design your multi-source architecture',
        'Set up primary and secondary data connections',
        'Configure data synchronization',
        'Test cross-source queries'
      ]
    },
    {
      title: 'Implement Security Best Practices',
      description: 'Set up proper permissions, access controls, and data protection',
      duration: '45 min',
      resources: [
        { name: 'Security Checklist', type: 'Checklist', url: '#' },
        { name: 'Privacy & Compliance Guide', type: 'Guide', url: '#' },
        { name: 'Access Control Patterns', type: 'Reference', url: '#' }
      ],
      tasks: [
        'Configure role-based access controls',
        'Set up data encryption and secure transmission',
        'Implement audit logging',
        'Test security configurations'
      ]
    },
    {
      title: 'Scale Your Solution',
      description: 'Add more features, optimize performance, and prepare for team use',
      duration: '1-2 hours',
      resources: [
        { name: 'Scaling Guide', type: 'Guide', url: '#' },
        { name: 'Performance Optimization Tips', type: 'Tips', url: '#' },
        { name: 'Team Deployment Strategies', type: 'Strategy', url: '#' }
      ],
      tasks: [
        'Optimize query performance',
        'Add advanced features and workflows',
        'Create user documentation',
        'Plan team rollout strategy'
      ]
    }
  ];

  const progressPercentage = getProgressPercentage(pathSteps.length);

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Intermediate Path</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            For those comfortable with spreadsheets and online tools, ready to build more sophisticated solutions
          </p>
          <div className="mt-6 flex items-center justify-center space-x-4">
            <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm font-medium">
              Intermediate Level
            </span>
            <div className="flex items-center space-x-1 text-gray-300">
              <Clock className="w-4 h-4" />
              <span>1-2 weeks total</span>
            </div>
          </div>
        </div>

        {/* Auth Prompt for Non-Users */}
        {!user && (
          <div className="mb-12 bg-blue-600/20 border border-blue-500/30 rounded-xl p-6 text-center">
            <h3 className="text-lg font-semibold text-white mb-2">Track Your Progress</h3>
            <p className="text-blue-200 mb-4">
              Sign up for a free account to save your progress and unlock personalized features
            </p>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200">
              Create Free Account
            </button>
          </div>
        )}

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white font-medium">Your Progress</span>
            <span className="text-blue-300">{completedSteps.length}/{pathSteps.length} steps completed</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-yellow-500 to-orange-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Learning Steps */}
        <div className="space-y-8">
          {pathSteps.map((step, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden">
              {/* Step Header */}
              <div className="p-6 border-b border-white/10">
                <div className="flex items-start space-x-4">
                  <button
                    onClick={() => user && toggleStep(index)}
                    disabled={!user || loading}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                      completedSteps.includes(index)
                        ? 'bg-yellow-500 text-white'
                        : user
                        ? 'bg-gray-600 text-gray-300 hover:bg-gray-500 cursor-pointer'
                        : 'bg-gray-600 text-gray-300 cursor-not-allowed'
                    }`}
                  >
                    {completedSteps.includes(index) ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <span className="font-semibold">{index + 1}</span>
                    )}
                  </button>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                      <div className="flex items-center space-x-1 text-yellow-300">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">{step.duration}</span>
                      </div>
                    </div>
                    <p className="text-gray-300">{step.description}</p>
                  </div>
                </div>
              </div>

              {/* Step Content */}
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Resources */}
                  <div>
                    <h4 className="text-white font-semibold mb-4">Resources</h4>
                    <div className="space-y-3">
                      {step.resources.map((resource, resourceIndex) => (
                        <Link
                          key={resourceIndex}
                          to={resource.url}
                          className="flex items-center space-x-3 p-3 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition-colors duration-200"
                        >
                          <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center">
                            {resource.type === 'Video' ? <Play className="w-4 h-4 text-white" /> :
                             resource.type === 'Article' || resource.type === 'Guide' ? <Book className="w-4 h-4 text-white" /> :
                             resource.type === 'Template' ? <Zap className="w-4 h-4 text-white" /> :
                             <Database className="w-4 h-4 text-white" />}
                          </div>
                          <div>
                            <div className="text-white font-medium">{resource.name}</div>
                            <div className="text-gray-400 text-sm">{resource.type}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Tasks */}
                  <div>
                    <h4 className="text-white font-semibold mb-4">Tasks to Complete</h4>
                    <div className="space-y-2">
                      {step.tasks.map((task, taskIndex) => (
                        <div key={taskIndex} className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-300 text-sm">{task}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Next Steps */}
        <div className="mt-12 bg-gradient-to-r from-orange-600/20 to-red-600/20 border border-orange-500/30 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Ready for Advanced Challenges?</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            You've mastered the intermediate concepts. Time to tackle enterprise-level implementations and become an MCP expert.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/advanced-path"
              className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <span>Try Advanced Path</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/office-hours"
              className="border border-white/20 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors duration-200"
            >
              Get Expert Help
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IntermediatePath;