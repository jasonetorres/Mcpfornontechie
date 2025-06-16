import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Clock, ArrowRight, Play, Book, Users, Zap, Shield, Database, Code, Settings } from 'lucide-react';

function AdvancedPath() {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const toggleStep = (stepIndex: number) => {
    if (completedSteps.includes(stepIndex)) {
      setCompletedSteps(completedSteps.filter(i => i !== stepIndex));
    } else {
      setCompletedSteps([...completedSteps, stepIndex]);
    }
  };

  const pathSteps = [
    {
      title: 'Master MCP Protocol',
      description: 'Deep dive into MCP specifications, advanced capabilities, and protocol internals',
      duration: '1 hour',
      resources: [
        { name: 'Protocol Documentation', type: 'Documentation', url: '#' },
        { name: 'Advanced Examples Repository', type: 'Code', url: '#' },
        { name: 'Protocol Deep Dive Video', type: 'Video', url: '#' }
      ],
      tasks: [
        'Study MCP protocol specifications',
        'Understand message types and data flows',
        'Learn about custom tool development',
        'Explore advanced configuration options'
      ]
    },
    {
      title: 'Custom Integration Setup',
      description: 'Build custom connectors and integrations for your specific tools and requirements',
      duration: '3-4 hours',
      resources: [
        { name: 'Custom Connector Guide', type: 'Guide', url: '#' },
        { name: 'API Integration Patterns', type: 'Reference', url: '#' },
        { name: 'Connector Development Kit', type: 'Tools', url: '#' }
      ],
      tasks: [
        'Design custom connector architecture',
        'Implement API integrations',
        'Build data transformation pipelines',
        'Test and validate custom connectors'
      ]
    },
    {
      title: 'Enterprise Implementation',
      description: 'Deploy MCP solutions across your organization with proper governance and scalability',
      duration: '1-2 days',
      resources: [
        { name: 'Enterprise Deployment Guide', type: 'Guide', url: '#' },
        { name: 'Governance Framework', type: 'Framework', url: '#' },
        { name: 'Scalability Patterns', type: 'Patterns', url: '#' }
      ],
      tasks: [
        'Design enterprise architecture',
        'Implement governance and compliance',
        'Set up monitoring and analytics',
        'Create deployment automation'
      ]
    },
    {
      title: 'Train Your Team',
      description: 'Create comprehensive training materials and onboard colleagues effectively',
      duration: '2-3 hours',
      resources: [
        { name: 'Training Template Library', type: 'Templates', url: '#' },
        { name: 'Presentation Materials', type: 'Slides', url: '/talk-resources' },
        { name: 'Assessment Tools', type: 'Tools', url: '#' }
      ],
      tasks: [
        'Develop training curriculum',
        'Create hands-on workshops',
        'Build assessment and certification',
        'Establish ongoing support processes'
      ]
    },
    {
      title: 'Contribute to Community',
      description: 'Share your expertise, mentor others, and help advance the MCP ecosystem',
      duration: 'Ongoing',
      resources: [
        { name: 'Contribution Guidelines', type: 'Guide', url: '#' },
        { name: 'Mentorship Program', type: 'Program', url: '/join-community' },
        { name: 'Speaker Resources', type: 'Resources', url: '/talk-resources' }
      ],
      tasks: [
        'Submit templates and examples',
        'Mentor community members',
        'Speak at events and conferences',
        'Contribute to documentation'
      ]
    }
  ];

  const progressPercentage = (completedSteps.length / pathSteps.length) * 100;

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Advanced Path</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            For power users ready to build enterprise-grade solutions and become MCP experts
          </p>
          <div className="mt-6 flex items-center justify-center space-x-4">
            <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm font-medium">
              Advanced Level
            </span>
            <div className="flex items-center space-x-1 text-gray-300">
              <Clock className="w-4 h-4" />
              <span>3-5 days total</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white font-medium">Your Progress</span>
            <span className="text-blue-300">{completedSteps.length}/{pathSteps.length} steps completed</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-red-500 to-pink-600 h-3 rounded-full transition-all duration-300"
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
                    onClick={() => toggleStep(index)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                      completedSteps.includes(index)
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
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
                      <div className="flex items-center space-x-1 text-red-300">
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
                          <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-600 rounded-lg flex items-center justify-center">
                            {resource.type === 'Video' ? <Play className="w-4 h-4 text-white" /> :
                             resource.type === 'Documentation' || resource.type === 'Guide' ? <Book className="w-4 h-4 text-white" /> :
                             resource.type === 'Code' ? <Code className="w-4 h-4 text-white" /> :
                             resource.type === 'Tools' ? <Settings className="w-4 h-4 text-white" /> :
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
                          <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
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

        {/* Expert Recognition */}
        <div className="mt-12 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Congratulations, MCP Expert!</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            You've mastered advanced MCP concepts. Now it's time to lead, teach, and help shape the future of AI integration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/join-community"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <Users className="w-5 h-5" />
              <span>Become a Mentor</span>
            </Link>
            <Link
              to="/submit-template"
              className="border border-white/20 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors duration-200"
            >
              Share Your Expertise
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdvancedPath;