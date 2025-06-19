import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle, ArrowRight, Play, Book, Star, Trophy, Clock, Zap, Lock } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useXP } from '../hooks/useXP'
import InteractiveQuiz from '../components/InteractiveQuiz'
import LevelUpModal from '../components/LevelUpModal'

export default function MCPBasicsCourse() {
  const { user } = useAuth()
  const { addXP, level } = useXP()
  const [activeModule, setActiveModule] = useState(0)
  const [completedModules, setCompletedModules] = useState<number[]>([])
  const [showLevelUp, setShowLevelUp] = useState(false)
  const [newLevel, setNewLevel] = useState(1)
  const [quizCompleted, setQuizCompleted] = useState(false)
  
  useEffect(() => {
    // In a real app, we would fetch the user's progress from the backend
    if (user) {
      const savedProgress = localStorage.getItem(`mcp-basics-progress-${user.id}`)
      if (savedProgress) {
        setCompletedModules(JSON.parse(savedProgress))
      }
    }
  }, [user])
  
  const handleCompleteModule = async () => {
    if (!user) return
    
    if (!completedModules.includes(activeModule)) {
      const newCompletedModules = [...completedModules, activeModule]
      setCompletedModules(newCompletedModules)
      localStorage.setItem(`mcp-basics-progress-${user.id}`, JSON.stringify(newCompletedModules))
      
      // Award XP for completing the module
      const xpAmount = 30
      const leveledUp = await addXP(xpAmount, 'lesson_completed', `Completed MCP Basics Module ${activeModule + 1}`)
      
      if (leveledUp) {
        setNewLevel(level + 1)
        setShowLevelUp(true)
      }
    }
    
    // Move to next module if not the last one
    if (activeModule < courseModules.length - 1) {
      setActiveModule(activeModule + 1)
    }
  }
  
  const handleQuizComplete = async (score: number) => {
    setQuizCompleted(true)
    
    if (user) {
      // Award XP based on quiz score
      const xpAmount = Math.round((score / 3) * 50) // 50 XP for perfect score
      const leveledUp = await addXP(xpAmount, 'quiz_completed', `Completed MCP Basics Quiz with score ${score}/3`)
      
      if (leveledUp) {
        setNewLevel(level + 1)
        setShowLevelUp(true)
      }
    }
  }
  
  const courseModules = [
    {
      title: 'Introduction to MCP',
      description: 'Learn what MCP is and why it matters for non-developers',
      duration: '15 min',
      content: (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-foreground">What is MCP?</h3>
          <p className="text-muted-foreground">
            MCP (Model Context Protocol) is an open standard created by Anthropic that allows AI models to connect to external data sources and tools. Think of it as a universal connector - like USB-C for AI integrations.
          </p>
          
          <div className="glass p-4 rounded-lg">
            <h4 className="font-semibold text-foreground mb-2">The Problem MCP Solves:</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>AI without context can only give generic answers</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>No standard way to connect AI to your systems</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>Each integration required custom development</span>
              </li>
            </ul>
          </div>
          
          <div className="glass p-4 rounded-lg">
            <h4 className="font-semibold text-foreground mb-2">The MCP Solution:</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>Standardized way for AI to access external data</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>No coding required - works with no-code platforms</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>You control what data AI can access</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>Works with any AI model that supports MCP</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-matrix-primary/20 p-4 rounded-lg">
            <h4 className="font-semibold text-matrix-primary mb-2">Key Takeaway:</h4>
            <p className="text-matrix-secondary">
              MCP makes AI truly useful by connecting it to YOUR specific data, without requiring any coding skills.
            </p>
          </div>
        </div>
      )
    },
    {
      title: 'The USB-C Analogy',
      description: 'Understand MCP through a simple, relatable analogy',
      duration: '10 min',
      content: (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-foreground">MCP: The USB-C for AI</h3>
          <p className="text-muted-foreground">
            One of the easiest ways to understand MCP is to think of it like USB-C, the universal connector for devices.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass p-4 rounded-lg">
              <h4 className="font-semibold text-foreground mb-2">USB-C:</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>One connector works with many devices</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>No need for different cables</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Standardized interface</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Plug and play functionality</span>
                </li>
              </ul>
            </div>
            
            <div className="glass p-4 rounded-lg">
              <h4 className="font-semibold text-foreground mb-2">MCP:</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-matrix-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>One protocol works with many data sources</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-matrix-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>No need for custom integrations</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-matrix-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>Standardized communication</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-matrix-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>Connect and use immediately</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="glass p-4 rounded-lg">
            <h4 className="font-semibold text-foreground mb-2">Why This Matters:</h4>
            <p className="text-muted-foreground">
              Before USB-C, you needed different cables for different devices. Similarly, before MCP, you needed custom code for each AI integration. Now, just like you can use one USB-C cable for many devices, you can use MCP to connect AI to many different data sources without custom development.
            </p>
          </div>
          
          <div className="bg-matrix-primary/20 p-4 rounded-lg">
            <h4 className="font-semibold text-matrix-primary mb-2">Key Takeaway:</h4>
            <p className="text-matrix-secondary">
              MCP standardizes how AI connects to external systems, making it accessible to everyone - not just developers.
            </p>
          </div>
        </div>
      )
    },
    {
      title: 'Real-World Examples',
      description: 'See how MCP is being used in practical applications',
      duration: '20 min',
      content: (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-foreground">MCP in Action</h3>
          <p className="text-muted-foreground">
            Let's look at some real-world examples of how non-developers are using MCP to solve everyday business problems.
          </p>
          
          <div className="space-y-6">
            <div className="glass p-6 rounded-lg">
              <h4 className="font-semibold text-foreground mb-2">Community Management</h4>
              <div className="flex items-start space-x-4">
                <div className="text-3xl">👥</div>
                <div>
                  <p className="text-muted-foreground mb-3">
                    Sarah, a community manager, connected her member database to AI using MCP. Now she can instantly answer questions like:
                  </p>
                  <ul className="space-y-2 text-matrix-secondary">
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-matrix-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span>"Who are our top contributors this month?"</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-matrix-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span>"Find all marketing team members"</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-matrix-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span>"What's Sarah's email address?"</span>
                    </li>
                  </ul>
                  <div className="mt-3 text-green-400">
                    <strong>Result:</strong> Reduced response time from 4 hours to 15 minutes daily
                  </div>
                </div>
              </div>
            </div>
            
            <div className="glass p-6 rounded-lg">
              <h4 className="font-semibold text-foreground mb-2">Marketing Campaigns</h4>
              <div className="flex items-start space-x-4">
                <div className="text-3xl">📊</div>
                <div>
                  <p className="text-muted-foreground mb-3">
                    Mike, a marketing director, connected his customer database to AI using MCP. The system now:
                  </p>
                  <ul className="space-y-2 text-matrix-secondary">
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-matrix-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span>Automatically segments customers based on behavior</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-matrix-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span>Generates personalized email content for each segment</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-matrix-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span>Suggests optimal send times based on past engagement</span>
                    </li>
                  </ul>
                  <div className="mt-3 text-green-400">
                    <strong>Result:</strong> 300% increase in email conversion rates
                  </div>
                </div>
              </div>
            </div>
            
            <div className="glass p-6 rounded-lg">
              <h4 className="font-semibold text-foreground mb-2">Project Management</h4>
              <div className="flex items-start space-x-4">
                <div className="text-3xl">📋</div>
                <div>
                  <p className="text-muted-foreground mb-3">
                    Lisa, a project manager, connected her project tracking system to AI using MCP. She can now:
                  </p>
                  <ul className="space-y-2 text-matrix-secondary">
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-matrix-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span>Generate comprehensive status reports automatically</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-matrix-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span>Identify potential risks and bottlenecks early</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-matrix-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span>Get AI-powered suggestions for resource optimization</span>
                    </li>
                  </ul>
                  <div className="mt-3 text-green-400">
                    <strong>Result:</strong> 5 hours saved weekly on reporting, 40% reduction in delays
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-matrix-primary/20 p-4 rounded-lg">
            <h4 className="font-semibold text-matrix-primary mb-2">Key Takeaway:</h4>
            <p className="text-matrix-secondary">
              MCP transforms AI from a generic tool to a context-aware assistant that understands your specific data and business needs.
            </p>
          </div>
        </div>
      )
    },
    {
      title: 'Knowledge Check',
      description: 'Test your understanding of MCP concepts',
      duration: '5 min',
      content: (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-foreground">Test Your Knowledge</h3>
          <p className="text-muted-foreground mb-4">
            Let's see how well you understand the core concepts of MCP. Complete this quiz to earn XP and track your progress!
          </p>
          
          <InteractiveQuiz 
            questions={[
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
            ]}
            title="MCP Fundamentals Quiz"
            onComplete={handleQuizComplete}
          />
          
          {quizCompleted && (
            <div className="glass-strong bg-gradient-to-r from-green-600/10 to-teal-600/10 p-6 rounded-xl text-center animate-fade-in">
              <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="heading-sm mb-2">Course Completed!</h3>
              <p className="text-muted-foreground mb-4">
                Congratulations on completing the MCP Basics course! You've taken your first step toward mastering MCP.
              </p>
              <Link to="/beginner-path" className="btn-primary">
                <Play className="w-4 h-4 mr-2" />
                <span>Continue to Beginner Path</span>
              </Link>
            </div>
          )}
        </div>
      )
    }
  ]
  
  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">MCP Basics Course</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Master the fundamentals of Model Context Protocol in this interactive course
          </p>
          
          {user && (
            <div className="mt-4 flex items-center justify-center space-x-4">
              <div className="flex items-center space-x-2 bg-matrix-primary/20 text-matrix-primary px-3 py-1 rounded-full">
                <Star className="w-4 h-4" />
                <span>Level {level}</span>
              </div>
              <div className="flex items-center space-x-2 bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full">
                <Trophy className="w-4 h-4" />
                <span>+30 XP per module</span>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Module Navigation */}
          <div className="space-y-6">
            <div className="glass rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Course Modules</h3>
              <div className="space-y-3">
                {courseModules.map((module, index) => {
                  const isCompleted = completedModules.includes(index)
                  const isActive = activeModule === index
                  const isLocked = !user && index > 0
                  
                  return (
                    <button
                      key={index}
                      onClick={() => !isLocked && setActiveModule(index)}
                      disabled={isLocked}
                      className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                        isActive
                          ? 'bg-matrix-primary/20 border border-matrix-primary/50'
                          : isCompleted
                          ? 'bg-green-500/20 border border-green-500/30'
                          : isLocked
                          ? 'bg-muted/30 border border-muted cursor-not-allowed'
                          : 'bg-muted/50 border border-border hover:bg-muted'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center space-x-2">
                          {isCompleted ? (
                            <CheckCircle className="w-4 h-4 text-green-400" />
                          ) : isLocked ? (
                            <Lock className="w-4 h-4 text-muted-foreground" />
                          ) : (
                            <div className={`w-4 h-4 rounded-full border ${
                              isActive ? 'border-matrix-primary' : 'border-muted-foreground'
                            }`}></div>
                          )}
                          <span className={`font-medium ${
                            isActive ? 'text-matrix-primary' : 
                            isCompleted ? 'text-green-400' :
                            isLocked ? 'text-muted-foreground' : 'text-foreground'
                          }`}>
                            Module {index + 1}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1 text-xs">
                          <Clock className={`w-3 h-3 ${
                            isLocked ? 'text-muted-foreground' : 'text-muted-foreground'
                          }`} />
                          <span className={isLocked ? 'text-muted-foreground' : 'text-muted-foreground'}>
                            {module.duration}
                          </span>
                        </div>
                      </div>
                      <div className={`text-sm ${
                        isLocked ? 'text-muted-foreground' : 'text-muted-foreground'
                      }`}>
                        {module.title}
                      </div>
                    </button>
                  )
                })}
              </div>
              
              {!user && (
                <div className="mt-4 p-3 bg-blue-500/20 border border-blue-500/30 rounded-lg">
                  <p className="text-blue-300 text-sm">
                    Sign in to track your progress and earn XP!
                  </p>
                </div>
              )}
            </div>
            
            {/* Course Progress */}
            {user && (
              <div className="glass rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Your Progress</h3>
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-foreground">Course Completion</span>
                    <span className="text-sm text-matrix-primary">
                      {Math.round((completedModules.length / courseModules.length) * 100)}%
                    </span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ width: `${(completedModules.length / courseModules.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-green-300">{completedModules.length}/{courseModules.length} completed</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Trophy className="w-4 h-4 text-yellow-400" />
                    <span className="text-yellow-300">+{30 * completedModules.length} XP earned</span>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Module Content */}
          <div className="lg:col-span-3">
            <div className="glass rounded-xl p-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">
                  {courseModules[activeModule].title}
                </h2>
                <p className="text-gray-300">
                  {courseModules[activeModule].description}
                </p>
              </div>
              
              <div className="mb-8">
                {courseModules[activeModule].content}
              </div>
              
              {/* Navigation Buttons */}
              <div className="flex justify-between">
                <button
                  onClick={() => activeModule > 0 && setActiveModule(activeModule - 1)}
                  disabled={activeModule === 0}
                  className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                    activeModule === 0
                      ? 'bg-muted/50 text-muted-foreground cursor-not-allowed'
                      : 'bg-muted text-foreground hover:bg-muted/80'
                  }`}
                >
                  Previous
                </button>
                
                {activeModule < courseModules.length - 1 ? (
                  <button
                    onClick={handleCompleteModule}
                    className="bg-gradient-to-r from-matrix-primary to-matrix-secondary hover:from-matrix-accent hover:to-matrix-primary text-primary-foreground px-6 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center space-x-2"
                  >
                    <span>Next Module</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleCompleteModule}
                    className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center space-x-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Complete Course</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Next Steps */}
        <div className="mt-12 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Ready to Apply Your Knowledge?</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Now that you understand the basics of MCP, it's time to start building your first connection.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/beginner-path"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <Book className="w-5 h-5" />
              <span>Start Beginner Path</span>
            </Link>
            <Link
              to="/templates"
              className="border border-white/20 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors duration-200"
            >
              Browse Templates
            </Link>
          </div>
        </div>
      </div>
      
      {/* Level Up Modal */}
      <LevelUpModal 
        isOpen={showLevelUp}
        onClose={() => setShowLevelUp(false)}
        level={newLevel}
        rewards={[
          'Access to Intermediate Templates',
          'Community Forum Badge',
          'Bonus XP Multiplier (1.2x)'
        ]}
      />
    </div>
  )
}