import React, { useState } from 'react';
import { Play, Pause, RotateCcw, CheckCircle, ArrowRight, Database, MessageSquare, Zap } from 'lucide-react';

function Demo() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const demoSteps = [
    {
      id: 0,
      title: 'The Problem: Generic AI',
      description: 'AI without context can only give generic answers',
      visual: '🤖❓',
      content: {
        question: 'Who are our top contributors this month?',
        aiResponse: 'I don\'t have access to your specific contributor data. Generally, top contributors are those who...',
        explanation: 'Without access to your data, AI can only provide generic, unhelpful responses.'
      },
      interactive: false
    },
    {
      id: 1,
      title: 'Connect Your Data Source',
      description: 'Link a spreadsheet with community member data',
      visual: '📊🔗',
      content: {
        dataSource: 'community-members.csv',
        columns: ['Name', 'Role', 'Contributions', 'Email', 'Join Date'],
        sampleData: [
          { name: 'Sarah Chen', role: 'Community Manager', contributions: 45, email: 'sarah@example.com' },
          { name: 'Mike Rodriguez', role: 'Developer', contributions: 38, email: 'mike@example.com' },
          { name: 'Lisa Park', role: 'Designer', contributions: 42, email: 'lisa@example.com' },
          { name: 'David Kim', role: 'Marketing', contributions: 29, email: 'david@example.com' }
        ]
      },
      interactive: true
    },
    {
      id: 2,
      title: 'MCP Creates the Bridge',
      description: 'MCP connects AI to your data securely',
      visual: '🌉✨',
      content: {
        explanation: 'MCP acts as a translator between AI and your data, creating a secure connection that allows AI to understand and query your information.',
        features: [
          'Secure data access',
          'Real-time queries',
          'Controlled permissions',
          'Audit trail'
        ]
      },
      interactive: false
    },
    {
      id: 3,
      title: 'Ask Smart Questions',
      description: 'Now AI can answer questions about YOUR data',
      visual: '💬🎯',
      content: {
        questions: [
          'Who are our top contributors this month?',
          'Which team members work in marketing?',
          'What\'s Sarah\'s email address?',
          'Who joined most recently?'
        ]
      },
      interactive: true
    },
    {
      id: 4,
      title: 'Get Context-Aware Answers',
      description: 'AI provides specific, actionable responses',
      visual: '🎯📈',
      content: {
        question: 'Who are our top contributors this month?',
        aiResponse: 'Based on your community data, the top contributors are:\n\n1. Sarah Chen (Community Manager) - 45 contributions\n2. Lisa Park (Designer) - 42 contributions\n3. Mike Rodriguez (Developer) - 38 contributions\n\nWould you like me to draft recognition messages for them?',
        explanation: 'Now AI gives specific, actionable answers based on your actual data!'
      },
      interactive: false
    }
  ];

  const nextStep = () => {
    if (currentStep < demoSteps.length - 1) {
      setCompletedSteps([...completedSteps, currentStep]);
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const resetDemo = () => {
    setCurrentStep(0);
    setCompletedSteps([]);
    setIsPlaying(false);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      const interval = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev < demoSteps.length - 1) {
            setCompletedSteps((completed) => [...completed, prev]);
            return prev + 1;
          } else {
            setIsPlaying(false);
            clearInterval(interval);
            return prev;
          }
        });
      }, 3000);
    }
  };

  const currentStepData = demoSteps[currentStep];

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-foreground mb-4">Interactive MCP Demo</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience how MCP transforms AI from generic to context-aware
          </p>
        </div>

        {/* Demo Controls */}
        <div className="flex justify-center space-x-4 mb-12">
          <button
            onClick={togglePlay}
            className="bg-gradient-to-r from-matrix-primary to-matrix-secondary hover:from-matrix-accent hover:to-matrix-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-all duration-200"
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            <span>{isPlaying ? 'Pause' : 'Auto Play'}</span>
          </button>
          <button
            onClick={resetDemo}
            className="border border-border text-foreground px-6 py-3 rounded-lg font-semibold hover:bg-muted transition-colors duration-200 flex items-center space-x-2"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Reset</span>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            {demoSteps.map((step, index) => (
              <div key={index} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                    completedSteps.includes(index)
                      ? 'bg-matrix-primary text-primary-foreground'
                      : index === currentStep
                      ? 'bg-matrix-secondary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {completedSteps.includes(index) ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    index + 1
                  )}
                </div>
                {index < demoSteps.length - 1 && (
                  <div
                    className={`w-16 h-1 mx-2 transition-all duration-300 ${
                      completedSteps.includes(index) ? 'bg-matrix-primary' : 'bg-muted'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <span className="text-muted-foreground">
              Step {currentStep + 1} of {demoSteps.length}
            </span>
          </div>
        </div>

        {/* Main Demo Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Step Info */}
          <div className="bg-card/50 backdrop-blur-md border border-border rounded-xl p-8">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">{currentStepData.visual}</div>
              <h2 className="text-2xl font-bold text-foreground mb-2">{currentStepData.title}</h2>
              <p className="text-matrix-primary">{currentStepData.description}</p>
            </div>

            {/* Step-specific content */}
            {currentStepData.id === 1 && (
              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="text-foreground font-semibold mb-3">Sample Data: {currentStepData.content.dataSource}</h4>
                <div className="space-y-2">
                  {currentStepData.content.sampleData.map((member: any, index: number) => (
                    <div key={index} className="bg-card/50 rounded p-3 text-sm">
                      <div className="text-foreground font-medium">{member.name}</div>
                      <div className="text-muted-foreground">{member.role} • {member.contributions} contributions</div>
                      <div className="text-muted-foreground">{member.email}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentStepData.id === 2 && (
              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="text-foreground font-semibold mb-3">MCP Features:</h4>
                <div className="space-y-2">
                  {currentStepData.content.features.map((feature: string, index: number) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-matrix-primary" />
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentStepData.id === 3 && (
              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="text-foreground font-semibold mb-3">Try These Questions:</h4>
                <div className="space-y-2">
                  {currentStepData.content.questions.map((question: string, index: number) => (
                    <div key={index} className="bg-matrix-primary/20 rounded p-2 text-matrix-primary">
                      "{question}"
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* AI Response Area */}
          <div className="bg-card/50 backdrop-blur-md border border-border rounded-xl p-8">
            <div className="flex items-center space-x-2 mb-4">
              <MessageSquare className="w-5 h-5 text-matrix-primary" />
              <h3 className="text-lg font-semibold text-foreground">AI Response</h3>
            </div>

            {(currentStepData.id === 0 || currentStepData.id === 4) && (
              <div className="space-y-4">
                <div className="bg-matrix-primary/20 rounded-lg p-4">
                  <div className="text-matrix-primary font-medium mb-2">Question:</div>
                  <div className="text-matrix-secondary">"{currentStepData.content.question}"</div>
                </div>
                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="text-muted-foreground font-medium mb-2">AI Response:</div>
                  <div className="text-foreground whitespace-pre-line">{currentStepData.content.aiResponse}</div>
                </div>
                <div className="bg-purple-500/20 rounded-lg p-4">
                  <div className="text-purple-300 font-medium mb-2">Explanation:</div>
                  <div className="text-purple-200">{currentStepData.content.explanation}</div>
                </div>
              </div>
            )}

            {currentStepData.id === 1 && (
              <div className="text-center py-8">
                <Database className="w-16 h-16 text-matrix-primary mx-auto mb-4" />
                <div className="text-muted-foreground">Connecting to your data source...</div>
                <div className="mt-4 bg-matrix-primary/20 rounded-lg p-4">
                  <div className="text-matrix-primary">✅ Connection established!</div>
                  <div className="text-matrix-secondary text-sm mt-1">AI can now access your community data</div>
                </div>
              </div>
            )}

            {currentStepData.id === 2 && (
              <div className="text-center py-8">
                <Zap className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                <div className="text-muted-foreground mb-4">MCP Bridge Active</div>
                <div className="bg-purple-500/20 rounded-lg p-4">
                  <div className="text-purple-200">AI is now connected to your data through a secure MCP bridge. It can understand and query your information while maintaining full security and control.</div>
                </div>
              </div>
            )}

            {currentStepData.id === 3 && (
              <div className="text-center py-8">
                <MessageSquare className="w-16 h-16 text-matrix-primary mx-auto mb-4" />
                <div className="text-muted-foreground mb-4">Ready for Questions!</div>
                <div className="bg-matrix-primary/20 rounded-lg p-4">
                  <div className="text-matrix-secondary">AI is now ready to answer specific questions about your community data. Try asking any of the sample questions!</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
              currentStep === 0
                ? 'bg-muted text-muted-foreground cursor-not-allowed'
                : 'bg-muted text-foreground hover:bg-accent'
            }`}
          >
            Previous
          </button>

          <div className="text-center">
            <div className="text-muted-foreground text-sm">
              {currentStep === demoSteps.length - 1 ? 'Demo Complete!' : 'Click Next to continue'}
            </div>
          </div>

          <button
            onClick={nextStep}
            disabled={currentStep === demoSteps.length - 1}
            className={`px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-all duration-200 ${
              currentStep === demoSteps.length - 1
                ? 'bg-muted text-muted-foreground cursor-not-allowed'
                : 'bg-gradient-to-r from-matrix-primary to-matrix-secondary hover:from-matrix-accent hover:to-matrix-primary text-primary-foreground'
            }`}
          >
            <span>Next</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Call to Action */}
        {currentStep === demoSteps.length - 1 && (
          <div className="mt-16 bg-gradient-to-r from-matrix-primary/20 to-matrix-secondary/20 border border-matrix-primary/30 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold text-foreground mb-4">Ready to Build Your Own?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              You've seen how MCP transforms AI from generic to context-aware. Now it's time to connect AI to YOUR data.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-matrix-primary to-matrix-secondary hover:from-matrix-accent hover:to-matrix-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold transition-all duration-200">
                Start Building Now
              </button>
              <button className="border border-border text-foreground px-8 py-3 rounded-lg font-semibold hover:bg-muted transition-colors duration-200">
                View Templates
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Demo;