import React, { useState } from 'react'
import { Code, Play, BookOpen, Users, Lightbulb, ArrowRight, Zap, Target, CheckCircle } from 'lucide-react'
import MCPSandbox from '../components/MCPSandbox'
import InteractiveQuiz from '../components/InteractiveQuiz'

const sandboxQuestions = [
  {
    id: '1',
    question: 'What is the primary purpose of MCP (Model Context Protocol)?',
    options: [
      'To replace all existing APIs',
      'To provide a standardized way for AI to access external data sources',
      'To make AI models faster',
      'To encrypt data communications'
    ],
    correctAnswer: 1,
    explanation: 'MCP acts as a universal connector that allows AI models to access and interact with external data sources in a standardized way, similar to how USB-C works for devices.',
    hint: 'Think about the USB-C analogy we discussed earlier.'
  },
  {
    id: '2',
    question: 'Which of these is NOT a benefit of using MCP?',
    options: [
      'Standardized integration approach',
      'Improved data security and control',
      'Automatic code generation',
      'Context-aware AI responses'
    ],
    correctAnswer: 2,
    explanation: 'MCP provides standardization, security, and context-awareness, but it doesn\'t automatically generate code. You still need to set up the connections and configurations.',
    hint: 'MCP is about connecting and accessing data, not creating code automatically.'
  },
  {
    id: '3',
    question: 'What should you do FIRST when setting up an MCP connection?',
    options: [
      'Choose your AI model',
      'Write complex prompts',
      'Prepare and organize your data source',
      'Set up authentication'
    ],
    correctAnswer: 2,
    explanation: 'Before connecting anything, you need to ensure your data is properly organized and structured. Clean, well-organized data leads to better AI responses.',
    hint: 'Good data in, good responses out. What comes before the connection?'
  }
]

export default function Sandbox() {
  const [activeTab, setActiveTab] = useState('practice')
  const [quizCompleted, setQuizCompleted] = useState(false)

  const practiceScenarios = [
    {
      id: 'community',
      title: 'Community Management',
      description: 'Practice managing community member data and queries',
      difficulty: 'Beginner',
      estimatedTime: '15 min',
      icon: '👥'
    },
    {
      id: 'marketing',
      title: 'Customer Segmentation',
      description: 'Learn to segment customers for targeted campaigns',
      difficulty: 'Intermediate',
      estimatedTime: '25 min',
      icon: '📊'
    },
    {
      id: 'projects',
      title: 'Project Tracking',
      description: 'Generate automated project status reports',
      difficulty: 'Beginner',
      estimatedTime: '20 min',
      icon: '📋'
    },
    {
      id: 'sales',
      title: 'Lead Scoring',
      description: 'Implement AI-powered lead qualification',
      difficulty: 'Advanced',
      estimatedTime: '35 min',
      icon: '💼'
    }
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'badge-success'
      case 'Intermediate': return 'badge-warning'
      case 'Advanced': return 'badge-error'
      default: return 'badge-secondary'
    }
  }

  const handleQuizComplete = (score: number) => {
    setQuizCompleted(true)
    console.log(`Quiz completed with score: ${score}/${sandboxQuestions.length}`)
  }

  return (
    <div className="container-responsive section-padding">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="heading-lg mb-4">MCP Practice Sandbox</h1>
          <p className="text-body-sm text-muted-foreground max-w-2xl mx-auto">
            Practice your MCP skills in a safe environment with interactive exercises and real-world scenarios
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 sm:mb-12">
          {[
            { id: 'practice', name: 'Interactive Practice', icon: Play },
            { id: 'quiz', name: 'Knowledge Check', icon: Lightbulb },
            { id: 'scenarios', name: 'Real Scenarios', icon: Users }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-matrix-primary to-matrix-secondary text-primary-foreground'
                  : 'glass text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <tab.icon className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">{tab.name}</span>
              <span className="sm:hidden">{tab.name.split(' ')[0]}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'practice' && (
          <div className="space-y-8">
            <MCPSandbox />
            
            {/* Practice Tips */}
            <div className="glass-strong bg-gradient-to-r from-blue-600/10 to-purple-600/10 p-6 sm:p-8 rounded-xl">
              <h3 className="heading-sm mb-4">Practice Tips</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-foreground font-semibold mb-3">Getting Started:</h4>
                  <ul className="space-y-2 text-matrix-secondary">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Start with simple queries to understand the data</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Try different question formats (specific vs. general)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Notice how AI uses context from your data</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Experiment with follow-up questions</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-foreground font-semibold mb-3">Advanced Practice:</h4>
                  <ul className="space-y-2 text-blue-300">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Ask for data analysis and insights</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Request specific formatting (lists, tables)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Try conditional queries ("if X then Y")</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Practice with edge cases and error handling</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'quiz' && (
          <div className="max-w-3xl mx-auto">
            <InteractiveQuiz 
              questions={sandboxQuestions}
              title="MCP Knowledge Check"
              onComplete={handleQuizComplete}
            />
            
            {quizCompleted && (
              <div className="mt-8 glass-strong bg-gradient-to-r from-green-600/10 to-teal-600/10 p-6 rounded-xl text-center animate-fade-in">
                <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="heading-sm mb-2">Ready for the Next Challenge?</h3>
                <p className="text-muted-foreground mb-4">
                  Now that you've tested your knowledge, try applying it in the interactive practice sandbox!
                </p>
                <button 
                  onClick={() => setActiveTab('practice')}
                  className="btn-primary"
                >
                  <Play className="w-4 h-4 mr-2" />
                  <span>Try Interactive Practice</span>
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'scenarios' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="heading-md mb-4">Real-World Practice Scenarios</h2>
              <p className="text-body-sm text-muted-foreground max-w-2xl mx-auto">
                Apply your MCP knowledge to realistic business scenarios. Each scenario includes sample data and guided exercises.
              </p>
            </div>

            <div className="grid-responsive-2">
              {practiceScenarios.map((scenario) => (
                <div key={scenario.id} className="card-interactive">
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="text-4xl">{scenario.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-foreground">{scenario.title}</h3>
                        <span className={`${getDifficultyColor(scenario.difficulty)}`}>
                          {scenario.difficulty}
                        </span>
                      </div>
                      <p className="text-muted-foreground mb-3 text-sm">{scenario.description}</p>
                      <div className="text-matrix-primary text-sm">
                        Estimated time: {scenario.estimatedTime}
                      </div>
                    </div>
                  </div>
                  
                  <button className="btn-primary w-full">
                    <Play className="w-4 h-4 mr-2" />
                    <span>Start Scenario</span>
                  </button>
                </div>
              ))}
            </div>

            {/* Scenario Benefits */}
            <div className="glass-strong bg-gradient-to-r from-green-600/10 to-teal-600/10 p-6 sm:p-8 rounded-xl text-center">
              <h3 className="heading-sm mb-6">Why Practice with Scenarios?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <BookOpen className="w-8 h-8 text-green-400 mx-auto mb-3" />
                  <h4 className="text-foreground font-semibold mb-2">Real Context</h4>
                  <p className="text-green-200 text-sm">Practice with actual business problems you might encounter</p>
                </div>
                <div>
                  <Users className="w-8 h-8 text-teal-400 mx-auto mb-3" />
                  <h4 className="text-foreground font-semibold mb-2">Guided Learning</h4>
                  <p className="text-teal-200 text-sm">Step-by-step guidance with hints and best practices</p>
                </div>
                <div>
                  <Target className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
                  <h4 className="text-foreground font-semibold mb-2">Build Confidence</h4>
                  <p className="text-yellow-200 text-sm">Gain confidence before implementing in your real work</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-12 sm:mt-16 glass-strong bg-gradient-to-r from-matrix-primary/10 to-matrix-secondary/10 p-6 sm:p-8 rounded-xl text-center">
          <h3 className="heading-sm mb-4">Ready to Apply Your Skills?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Once you're comfortable with the sandbox, try building your first real MCP connection with our templates and guides.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary">
              <Zap className="w-4 h-4 mr-2" />
              <span>Browse Templates</span>
            </button>
            <button className="btn-secondary">
              <Users className="w-4 h-4 mr-2" />
              <span>Join Community</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}