import React, { useState } from 'react';
import { Play, ExternalLink, Users, MessageSquare, Workflow, Database, FileSpreadsheet, Calendar, ShoppingCart, BarChart3, Filter, Code, Download, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useAchievements } from '../hooks/useAchievements';

function Examples() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedComplexity, setSelectedComplexity] = useState('all');
  const [activeTutorial, setActiveTutorial] = useState<number | null>(null);
  const [tutorialStep, setTutorialStep] = useState(0);
  const { user } = useAuth();
  const { checkAchievements } = useAchievements();

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
      tutorial: {
        steps: [
          {
            title: 'Prepare Your Data',
            content: 'Create a Google Sheet with member information',
            code: `// Sample CSV structure
Name,Role,Contributions,Email,Join_Date
Sarah Chen,Community Manager,45,sarah@example.com,2024-01-15
Mike Rodriguez,Developer,38,mike@example.com,2024-02-01
Lisa Park,Designer,42,lisa@example.com,2024-01-20`,
            action: 'Create the spreadsheet with this sample data'
          },
          {
            title: 'Set Up Zapier Integration',
            content: 'Connect Google Sheets to ChatGPT via Zapier',
            code: `// Zapier Webhook Configuration
{
  "trigger": "webhook",
  "action": "google_sheets_lookup",
  "ai_prompt": "Answer questions about community members using the provided data"
}`,
            action: 'Configure the Zapier automation'
          },
          {
            title: 'Test Your Bot',
            content: 'Try asking questions about your community members',
            code: `// Example questions to test:
"Who is our top contributor?"
"Find all marketing team members"
"What's Sarah's email address?"
"How many contributions does Mike have?"`,
            action: 'Test with these sample questions'
          }
        ]
      },
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
      tutorial: {
        steps: [
          {
            title: 'Set Up Customer Database',
            content: 'Create an Airtable base with customer information',
            code: `// Customer data structure
{
  "customer_id": "CUST001",
  "name": "Acme Corp",
  "industry": "Technology",
  "size": "Enterprise",
  "last_purchase": "2024-01-15",
  "engagement_score": 85
}`,
            action: 'Import your customer data into Airtable'
          },
          {
            title: 'Configure AI Segmentation',
            content: 'Set up Make.com to analyze customer data',
            code: `// Segmentation logic
if (customer.size === "Enterprise" && customer.engagement_score > 80) {
  segment = "High-Value Enterprise";
} else if (customer.industry === "Healthcare") {
  segment = "Healthcare Focused";
} else {
  segment = "General";
}`,
            action: 'Create segmentation rules in Make.com'
          },
          {
            title: 'Generate Personalized Content',
            content: 'Use Claude API to create targeted messaging',
            code: `// Content generation prompt
"Create a personalized email for \${customer.name} in the \${customer.industry} industry. 
They are a \${customer.size} company with engagement score \${customer.engagement_score}.
Focus on solutions relevant to their industry and company size."`,
            action: 'Test content generation with sample customers'
          }
        ]
      },
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
      tutorial: {
        steps: [
          {
            title: 'Set Up Project Database',
            content: 'Create a Notion database for project tracking',
            code: `// Project database properties
{
  "project_name": "Website Redesign",
  "status": "In Progress",
  "completion": 65,
  "due_date": "2024-03-15",
  "team_members": ["Alice", "Bob", "Carol"],
  "risks": ["Design approval pending", "Resource constraints"]
}`,
            action: 'Create your project database in Notion'
          },
          {
            title: 'Connect to Power Automate',
            content: 'Set up automated data extraction',
            code: `// Power Automate flow
1. Trigger: Daily at 9 AM
2. Get Notion database items
3. Filter active projects
4. Send to GPT-4 for analysis
5. Generate status report`,
            action: 'Configure the Power Automate workflow'
          },
          {
            title: 'Generate Status Reports',
            content: 'AI analyzes project data and creates reports',
            code: `// GPT-4 prompt for status reports
"Analyze the following project data and create a executive summary:
- Highlight projects at risk
- Identify resource bottlenecks  
- Suggest priority actions
- Predict completion dates"`,
            action: 'Test report generation with your project data'
          }
        ]
      },
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

  const startTutorial = (exampleId: number) => {
    setActiveTutorial(exampleId);
    setTutorialStep(0);
  };

  const nextTutorialStep = () => {
    const currentExample = examples.find(e => e.id === activeTutorial);
    if (currentExample && tutorialStep < currentExample.tutorial.steps.length - 1) {
      setTutorialStep(tutorialStep + 1);
    }
  };

  const prevTutorialStep = () => {
    if (tutorialStep > 0) {
      setTutorialStep(tutorialStep - 1);
    }
  };

  const completeTutorial = () => {
    // Track tutorial completion if user is logged in
    if (user && activeTutorial) {
      const completionData = {
        tutorialId: activeTutorial,
        completedAt: new Date().toISOString(),
        userId: user.id
      };
      
      // Store in localStorage for demo
      const existingCompletions = JSON.parse(localStorage.getItem('tutorial-completions') || '[]');
      existingCompletions.push(completionData);
      localStorage.setItem('tutorial-completions', JSON.stringify(existingCompletions));
      
      console.log('Tutorial completed:', completionData);
      
      // Check for achievements after completing tutorial
      setTimeout(() => {
        checkAchievements();
      }, 100);
    }
    
    setActiveTutorial(null);
    setTutorialStep(0);
  };

  const closeTutorial = () => {
    setActiveTutorial(null);
    setTutorialStep(0);
  };

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">Real-World MCP Examples</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            See how non-technical professionals are using MCP to supercharge their work with interactive tutorials
          </p>
          {user && (
            <div className="mt-4 text-green-300">
              ✅ Signed in - Your tutorial progress will be tracked!
            </div>
          )}
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
                <button 
                  onClick={() => startTutorial(example.id)}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-1"
                >
                  <Play className="w-3 h-3" />
                  <span>Start Tutorial</span>
                </button>
                <button className="flex-1 border border-white/20 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-white/10 transition-colors duration-200 flex items-center justify-center space-x-1">
                  <Download className="w-3 h-3" />
                  <span>Template</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Tutorial Modal */}
        {activeTutorial && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-white/10 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
              {(() => {
                const currentExample = examples.find(e => e.id === activeTutorial);
                const currentStep = currentExample?.tutorial.steps[tutorialStep];
                
                if (!currentExample || !currentStep) return null;

                return (
                  <>
                    {/* Header */}
                    <div className="p-6 border-b border-white/10">
                      <div className="flex items-center justify-between">
                        <div>
                          <h2 className="text-2xl font-bold text-white">{currentExample.title}</h2>
                          <p className="text-gray-300">Interactive Tutorial</p>
                        </div>
                        <button
                          onClick={closeTutorial}
                          className="text-gray-400 hover:text-white transition-colors duration-200"
                        >
                          ✕
                        </button>
                      </div>
                      
                      {/* Progress */}
                      <div className="mt-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-300">
                            Step {tutorialStep + 1} of {currentExample.tutorial.steps.length}
                          </span>
                          <span className="text-sm text-blue-300">
                            {Math.round(((tutorialStep + 1) / currentExample.tutorial.steps.length) * 100)}% Complete
                          </span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${((tutorialStep + 1) / currentExample.tutorial.steps.length) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 overflow-y-auto max-h-[60vh]">
                      <h3 className="text-xl font-semibold text-white mb-4">{currentStep.title}</h3>
                      <p className="text-gray-300 mb-6">{currentStep.content}</p>
                      
                      {/* Code Block */}
                      <div className="bg-slate-800 rounded-lg overflow-hidden mb-6">
                        <div className="flex items-center justify-between p-3 border-b border-white/10">
                          <span className="text-gray-300 text-sm font-medium">Code Example</span>
                          <button
                            onClick={() => navigator.clipboard.writeText(currentStep.code)}
                            className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                          >
                            Copy
                          </button>
                        </div>
                        <pre className="p-4 text-sm text-gray-300 overflow-x-auto">
                          <code>{currentStep.code}</code>
                        </pre>
                      </div>

                      {/* Action Item */}
                      <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="text-blue-300 font-medium mb-1">Action Required:</h4>
                            <p className="text-blue-200 text-sm">{currentStep.action}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="p-6 border-t border-white/10">
                      <div className="flex justify-between">
                        <button
                          onClick={prevTutorialStep}
                          disabled={tutorialStep === 0}
                          className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                            tutorialStep === 0
                              ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                              : 'bg-white/10 text-white hover:bg-white/20'
                          }`}
                        >
                          Previous
                        </button>
                        
                        <div className="flex space-x-3">
                          <button
                            onClick={closeTutorial}
                            className="px-6 py-2 border border-white/20 text-white rounded-lg font-medium hover:bg-white/10 transition-colors duration-200"
                          >
                            Close
                          </button>
                          
                          {tutorialStep < currentExample.tutorial.steps.length - 1 ? (
                            <button
                              onClick={nextTutorialStep}
                              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-200"
                            >
                              Next Step
                            </button>
                          ) : (
                            <button
                              onClick={completeTutorial}
                              className="px-6 py-2 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white rounded-lg font-medium transition-all duration-200"
                            >
                              Complete Tutorial
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        )}

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