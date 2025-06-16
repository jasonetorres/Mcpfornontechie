import React, { useState } from 'react';
import { Copy, Check, Lightbulb, Play, Workflow, Database, Shield, Brain, Usb, MessageSquare } from 'lucide-react';

function Learn() {
  const [activeTab, setActiveTab] = useState('basics');
  const [codeCopied, setCodeCopied] = useState('');

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCodeCopied(id);
    setTimeout(() => setCodeCopied(''), 2000);
  };

  const codeExamples = {
    basics: `// MCP in Simple Terms
// Think of this as creating a "bridge" between AI and your data

const mcpServer = {
  name: "Community Helper",
  purpose: "Connect AI to our member spreadsheet",
  
  // What data can AI access?
  dataSource: "community-members.csv",
  
  // What questions can AI answer?
  capabilities: [
    "Who are our top contributors?",
    "Which members work in specific roles?",
    "How can I contact a specific member?"
  ]
};

// The "magic" happens here - AI can now understand YOUR data!`,
    
    demo: `// Live Demo: Community Member Lookup
// This is what we'll build together (no coding required!)

Step 1: Upload your spreadsheet
- community-members.csv
- Columns: Name, Role, Contributions, Email

Step 2: Connect to AI
- MCP creates the "bridge"
- AI can now "see" your data

Step 3: Ask questions
- "Who contributed the most this month?"
- "Find me all the marketing team members"
- "What's Sarah's email address?"

Step 4: Get smart answers
- AI responds with YOUR data
- Specific, accurate, actionable`,
    
    tools: `// No-Code Tools for Non-Developers
// You don't need to be a programmer!

Popular Platforms:
✅ Zapier + AI integrations
✅ Microsoft Power Platform
✅ Google Apps Script (visual editor)
✅ Airtable + AI extensions
✅ Notion AI with databases

What to Look For:
- "Connect to external data"
- "Custom AI assistants"
- "Data integration"
- "Context-aware AI"

Red Flags:
❌ "Black box" solutions
❌ No data connection options
❌ Generic responses only`,

    security: `// Security & Privacy Considerations
// Keep your data safe while using AI

Key Principles:
✅ You control what data AI can access
✅ Data stays in your systems (not AI company's)
✅ Audit trail of what AI accessed
✅ Revoke access anytime

Questions to Ask:
- Where is my data stored?
- Who can access my data?
- Can I see what data AI used?
- How do I remove access?

Best Practices:
- Start with non-sensitive data
- Use test/sample data first
- Review AI responses for accuracy
- Set up proper permissions`,

    implementation: `// Implementation Roadmap
// Your step-by-step journey to MCP success

Phase 1: Learn & Explore (Week 1)
- Understand MCP concepts
- Identify your use case
- Choose your platform

Phase 2: Prototype (Week 2-3)
- Start with simple data source
- Build basic connection
- Test with sample questions

Phase 3: Refine (Week 4)
- Add more data sources
- Improve AI responses
- Train your team

Phase 4: Scale (Month 2+)
- Connect additional tools
- Automate workflows
- Measure impact`
  };

  const learningPaths = [
    {
      title: 'Complete Beginner',
      description: 'Never worked with AI or data connections',
      duration: '2-3 weeks',
      steps: [
        'Understand what MCP is and why it matters',
        'Learn about data sources and AI capabilities',
        'Try a no-code platform like Zapier',
        'Build your first simple connection',
        'Test with real questions'
      ],
      difficulty: 'Beginner',
      tools: ['Zapier', 'Google Sheets', 'ChatGPT']
    },
    {
      title: 'Some Tech Experience',
      description: 'Comfortable with spreadsheets and online tools',
      duration: '1-2 weeks',
      steps: [
        'Dive into MCP architecture concepts',
        'Choose between multiple platforms',
        'Set up data connections',
        'Create custom AI assistants',
        'Implement security best practices'
      ],
      difficulty: 'Intermediate',
      tools: ['Airtable', 'Notion AI', 'Power Platform']
    },
    {
      title: 'Power User',
      description: 'Advanced with automation and integrations',
      duration: '3-5 days',
      steps: [
        'Understand MCP protocol details',
        'Build complex multi-source connections',
        'Create advanced workflows',
        'Implement custom solutions',
        'Train others in your organization'
      ],
      difficulty: 'Advanced',
      tools: ['Custom APIs', 'Advanced Zapier', 'Multiple platforms']
    }
  ];

  const concepts = [
    {
      icon: Usb,
      title: 'MCP as Universal Connector',
      description: 'Just like USB-C works with any device, MCP lets AI connect to any data source',
      details: 'MCP provides a standardized way for AI models to communicate with external tools and data sources. Think of it as creating a common language that both AI and your tools can understand.'
    },
    {
      icon: Database,
      title: 'Data Context is Everything',
      description: 'AI becomes exponentially more useful when it knows about YOUR specific data',
      details: 'Generic AI can tell you general information, but AI with context can answer questions about your customers, your team, your projects - making it truly valuable for your work.'
    },
    {
      icon: Shield,
      title: 'Security & Control',
      description: 'You decide what data AI can access and how it can be used',
      details: 'Unlike black-box AI solutions, MCP gives you granular control over data access. You can audit what data was used, revoke access anytime, and ensure sensitive information stays protected.'
    },
    {
      icon: Brain,
      title: 'Context-Aware Responses',
      description: 'AI responses become specific, accurate, and actionable',
      details: 'Instead of generic advice, AI can provide specific recommendations based on your actual data, current situation, and business context.'
    }
  ];

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">Learn MCP (No Code Required)</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Master the concepts that will transform how you work with AI
          </p>
        </div>

        {/* Core Concepts */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8">Core Concepts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {concepts.map((concept, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <concept.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">{concept.title}</h3>
                    <p className="text-blue-300 mb-3">{concept.description}</p>
                    <p className="text-gray-300 text-sm">{concept.details}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Learning Paths */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8">Choose Your Learning Path</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {learningPaths.map((path, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">{path.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    path.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-400' :
                    path.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {path.difficulty}
                  </span>
                </div>
                
                <p className="text-gray-300 mb-3">{path.description}</p>
                <p className="text-blue-300 text-sm mb-4">Duration: {path.duration}</p>
                
                <div className="space-y-2 mb-4">
                  {path.steps.map((step, stepIndex) => (
                    <div key={stepIndex} className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300 text-sm">{step}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {path.tools.map((tool, toolIndex) => (
                    <span key={toolIndex} className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs">
                      {tool}
                    </span>
                  ))}
                </div>
                
                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-200">
                  Start This Path
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Learning */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Tutorial Navigation */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
            <h3 className="text-2xl font-bold text-white mb-6">Interactive Concepts</h3>
            <div className="space-y-3">
              {[
                { id: 'basics', title: 'MCP Basics', description: 'What is MCP and why it matters', icon: Lightbulb },
                { id: 'demo', title: 'Live Demo Code', description: 'What we\'ll build together (simplified)', icon: Play },
                { id: 'tools', title: 'No-Code Tools', description: 'Platforms you can use without coding', icon: Workflow },
                { id: 'security', title: 'Security & Privacy', description: 'Keep your data safe while using AI', icon: Shield },
                { id: 'implementation', title: 'Implementation Roadmap', description: 'Step-by-step guide to success', icon: MessageSquare }
              ].map((topic) => (
                <button
                  key={topic.id}
                  onClick={() => setActiveTab(topic.id)}
                  className={`w-full text-left p-4 rounded-lg transition-all duration-200 ${
                    activeTab === topic.id
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <topic.icon className="w-5 h-5" />
                    <div>
                      <div className="font-semibold">{topic.title}</div>
                      <div className="text-sm opacity-80">{topic.description}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Code Example */}
          <div className="bg-slate-900/50 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <span className="text-white font-medium">Concept Explanation</span>
              <button
                onClick={() => copyCode(codeExamples[activeTab as keyof typeof codeExamples], activeTab)}
                className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors duration-200"
              >
                {codeCopied === activeTab ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
                <span className="text-sm">Copy</span>
              </button>
            </div>
            <pre className="p-4 text-sm text-gray-300 overflow-x-auto">
              <code>{codeExamples[activeTab as keyof typeof codeExamples]}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Learn;