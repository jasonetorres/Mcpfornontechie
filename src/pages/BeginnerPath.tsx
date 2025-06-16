import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Clock, ArrowRight, Play, Book, Users, Zap } from 'lucide-react';

function BeginnerPath() {
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
      title: 'Understand MCP Fundamentals',
      description: 'Learn what MCP is and why it matters for non-developers',
      duration: '30 min',
      resources: [
        { name: 'MCP Fundamentals Guide', type: 'Article', url: '/guides' },
        { name: 'Video: MCP in 5 Minutes', type: 'Video', url: '/demo' },
        { name: 'USB-C Analogy Explained', type: 'Interactive', url: '/learn' }
      ],
      tasks: [
        'Read the MCP Fundamentals Guide',
        'Watch the 5-minute overview video',
        'Complete the interactive USB-C analogy',
        'Take the knowledge check quiz'
      ]
    },
    {
      title: 'Choose Your Platform',
      description: 'Select a no-code platform that fits your needs and experience level',
      duration: '15 min',
      resources: [
        { name: 'Platform Comparison Guide', type: 'Guide', url: '/platform-comparison' },
        { name: 'Zapier vs Power Platform', type: 'Comparison', url: '/platform-comparison' },
        { name: 'Beginner Platform Quiz', type: 'Quiz', url: '#' }
      ],
      tasks: [
        'Review platform comparison chart',
        'Take the platform recommendation quiz',
        'Sign up for your chosen platform',
        'Complete platform onboarding'
      ]
    },
    {
      title: 'Set Up Your First Connection',
      description: 'Connect a simple spreadsheet to AI using step-by-step guidance',
      duration: '45 min',
      resources: [
        { name: 'Google Sheets + Zapier Template', type: 'Template', url: '/templates' },
        { name: 'Step-by-step Video Tutorial', type: 'Video', url: '#' },
        { name: 'Sample Data Files', type: 'Download', url: '/talk-resources' }
      ],
      tasks: [
        'Download the community member template',
        'Set up your Google Sheet with sample data',
        'Create your first Zapier automation',
        'Test the AI connection'
      ]
    },
    {
      title: 'Test and Iterate',
      description: 'Ask questions, test responses, and refine your setup',
      duration: '30 min',
      resources: [
        { name: 'Testing Checklist', type: 'Checklist', url: '#' },
        { name: 'Common Issues Guide', type: 'Troubleshooting', url: '#' },
        { name: 'Optimization Tips', type: 'Guide', url: '#' }
      ],
      tasks: [
        'Test 5 different types of questions',
        'Verify AI responses are accurate',
        'Optimize your data structure',
        'Document what works best'
      ]
    },
    {
      title: 'Join the Community',
      description: 'Share your success, get help, and connect with other builders',
      duration: '10 min',
      resources: [
        { name: 'Discord Community', type: 'Community', url: '/join-community' },
        { name: 'Success Stories', type: 'Inspiration', url: '/success-stories' },
        { name: 'Office Hours', type: 'Support', url: '/office-hours' }
      ],
      tasks: [
        'Join the Discord community',
        'Introduce yourself in #introductions',
        'Share your first success',
        'Schedule office hours if needed'
      ]
    }
  ];

  const progressPercentage = (completedSteps.length / pathSteps.length) * 100;

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Complete Beginner Path</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Perfect for those who have never worked with AI or data connections before
          </p>
          <div className="mt-6 flex items-center justify-center space-x-4">
            <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium">
              Beginner Level
            </span>
            <div className="flex items-center space-x-1 text-gray-300">
              <Clock className="w-4 h-4" />
              <span>2-3 weeks total</span>
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
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-300"
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
                        ? 'bg-green-500 text-white'
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
                      <div className="flex items-center space-x-1 text-blue-300">
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
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                            {resource.type === 'Video' ? <Play className="w-4 h-4 text-white" /> :
                             resource.type === 'Article' || resource.type === 'Guide' ? <Book className="w-4 h-4 text-white" /> :
                             <Zap className="w-4 h-4 text-white" />}
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
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
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
        <div className="mt-12 bg-gradient-to-r from-green-600/20 to-teal-600/20 border border-green-500/30 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Ready for the Next Level?</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Once you've completed the beginner path, you'll be ready to tackle more advanced MCP implementations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/intermediate-path"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <span>Try Intermediate Path</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/join-community"
              className="border border-white/20 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors duration-200"
            >
              Join Community
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BeginnerPath;