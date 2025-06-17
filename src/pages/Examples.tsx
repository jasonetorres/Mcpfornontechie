import React, { useState } from 'react';
import { Copy, Check, Lightbulb, Play, Workflow, Database, Shield, Brain, Usb, MessageSquare, ExternalLink, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

function Examples() {
  const [activeTab, setActiveTab] = useState('basics');
  const [codeCopied, setCopiedTemplate] = useState('');

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedTemplate(id);
    setTimeout(() => setCopiedTemplate(''), 2000);
  };

  const codeExamples = {
    basics: `// MCP in Simple Terms - The "USB-C for AI"
// Think of this as creating a "bridge" between AI and your data

What is MCP?
MCP stands for Model Context Protocol, an open standard created by Anthropic.

The Problem:
- AI without context can only give generic answers
- No standard way to connect AI to your systems
- Each integration requires custom development

The Solution:
MCP is like USB-C for AI integrations - a universal connector that lets 
AI agents access your external systems without coding.

Real Examples:
✅ Google Drive: File access and search capabilities
✅ YouTube Transcript: Grab and work with video transcripts  
✅ Google Maps: Location services and directions
✅ Asana: View tasks, projects, and comments
✅ GitHub: Read, search, and manage repositories`,
    
    demo: `// Live Demo: Community Member Lookup
// This is what we'll build together (no coding required!)

Step 1: Upload your spreadsheet
- community-members.csv
- Columns: Name, Role, Contributions, Email

Step 2: Connect to AI via MCP Server
- MCP creates the "bridge"
- AI can now "see" your data

Step 3: Ask questions using natural language
- "Who contributed the most this month?"
- "Find me all the marketing team members"
- "What's Sarah's email address?"

Step 4: Get smart, context-aware answers
- AI responds with YOUR specific data
- Specific, accurate, actionable insights`,
    
    tools: `// Popular MCP Servers You Should Try Right Now
// You don't need to be a programmer!

🔥 Top MCP Servers:
✅ Google Drive: File access and search capabilities
✅ YouTube Transcript: Grab and work with video transcripts
✅ Google Maps: Location services, directions, and place details
✅ Tavily Web Search: Web and local search capabilities
✅ Asana: View tasks, projects, workspaces, and comments
✅ Speech: Real-time voice interaction and transcription
✅ GitHub: Tools to read, search, and manage repositories
✅ Fetch: Web content fetching and conversion

No-Code Platforms for MCP:
✅ Zapier + AI integrations
✅ Microsoft Power Platform
✅ Google Apps Script (visual editor)
✅ Airtable + AI extensions
✅ Notion AI with databases

What to Look For:
- "Connect to external data"
- "Custom AI assistants"
- "Data integration"
- "Context-aware AI"`,

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
- Measure impact

Example MCP Prompts to Try:

Google Maps:
"Track the live GPS location of driver ID #123. Query Google Maps for 
real-time traffic data and adjust delivery time if delays exceed 5 minutes."

YouTube Transcript:
"Get the transcript from this YouTube video [link]. Then, summarize it 
into a blog post."

Google Drive:
"Find all relevant documents about our marketing budget and performance. 
Give me a quick summary of our Q1 performance and highlight key decisions 
we need to make."

Asana:
"Create a new task called 'Review Q4 metrics' due next Friday. Then find 
all tasks assigned to me this week and summarize them."`
  };

  const learningPaths = [
    {
      title: 'Complete Beginner',
      description: 'Never worked with AI or data connections',
      duration: '2-3 weeks',
      steps: [
        'Understand MCP fundamentals',
        'Learn about data sources and AI capabilities',
        'Try a no-code platform like Zapier',
        'Build your first simple connection',
        'Test with real questions'
      ],
      difficulty: 'Beginner',
      tools: ['Zapier', 'Google Sheets', 'ChatGPT'],
      route: '/beginner-path'
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
      tools: ['Airtable', 'Notion AI', 'Power Platform'],
      route: '/intermediate-path'
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
      tools: ['Custom APIs', 'Advanced Zapier', 'Multiple platforms'],
      route: '/advanced-path'
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

  const mcpServers = [
    {
      name: 'Google Drive',
      description: 'File access and search capabilities for Google Drive',
      useCase: 'Find documents, search content, organize files',
      icon: '📁',
      url: 'https://github.com/modelcontextprotocol/servers/tree/main/src/gdrive'
    },
    {
      name: 'YouTube Transcript',
      description: 'Grab and work with YouTube video transcripts',
      useCase: 'Summarize videos, extract key points, create content',
      icon: '🎥',
      url: 'https://github.com/modelcontextprotocol/servers/tree/main/src/youtube-transcript'
    },
    {
      name: 'Google Maps',
      description: 'Location services, directions, and place details',
      useCase: 'Track deliveries, find locations, get directions',
      icon: '🗺️',
      url: 'https://github.com/modelcontextprotocol/servers/tree/main/src/google-maps'
    },
    {
      name: 'Asana',
      description: 'View tasks, projects, workspaces, and comments',
      useCase: 'Project management, task tracking, team coordination',
      icon: '✅',
      url: 'https://github.com/modelcontextprotocol/servers/tree/main/src/asana'
    },
    {
      name: 'GitHub',
      description: 'Tools to read, search, and manage repositories',
      useCase: 'Code management, documentation, project tracking',
      icon: '🐙',
      url: 'https://github.com/modelcontextprotocol/servers/tree/main/src/github'
    },
    {
      name: 'Speech',
      description: 'Real-time voice interaction and transcription',
      useCase: 'Voice commands, meeting transcription, accessibility',
      icon: '🎤',
      url: 'https://github.com/modelcontextprotocol/servers/tree/main/src/speech'
    }
  ];

  const realExamples = [
    {
      title: 'Community Q&A Assistant',
      description: 'Sarah Chen automated community member lookups, saving 4 hours daily',
      impact: '95% faster response time',
      tools: ['Zapier', 'Google Sheets', 'ChatGPT'],
      category: 'Community Management'
    },
    {
      title: 'Marketing Campaign Generator',
      description: 'Mike Rodriguez increased email conversion rates by 300%',
      impact: '$180K additional monthly revenue',
      tools: ['Airtable', 'Claude AI', 'Mailchimp'],
      category: 'Marketing'
    },
    {
      title: 'Project Status Reporter',
      description: 'Lisa Park eliminated manual reporting, saving 5 hours weekly',
      impact: '90% improvement in project visibility',
      tools: ['Notion', 'GPT-4', 'Slack'],
      category: 'Project Management'
    },
    {
      title: 'Lead Scoring System',
      description: 'David Kim improved lead qualification accuracy by 60%',
      impact: '$250K additional quarterly revenue',
      tools: ['Power Platform', 'Salesforce', 'Azure AI'],
      category: 'Sales'
    }
  ];

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-foreground mb-4">Learn MCP (No Code Required)</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Master the concepts that will transform how you work with AI - the "USB-C for AI"
          </p>
        </div>

        {/* What is MCP Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-8">What is MCP?</h2>
          <div className="bg-gradient-to-r from-matrix-primary/20 to-matrix-secondary/20 border border-matrix-primary/30 rounded-xl p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4">The Problem</h3>
                <p className="text-muted-foreground mb-4">
                  AI is powerful but doesn't know about YOUR data. Without context, AI can only give generic answers. 
                  There wasn't a standard way to connect AI agents to your systems like Google Drive, Asana, or Slack.
                </p>
                <div className="bg-destructive/20 border border-destructive/30 rounded-lg p-4">
                  <p className="text-destructive text-sm">
                    <strong>Before MCP:</strong> Each AI integration required custom development from scratch. Super tedious!
                  </p>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4">The Solution</h3>
                <p className="text-muted-foreground mb-4">
                  MCP (Model Context Protocol) is an open standard created by Anthropic. Think of MCP as the 
                  <strong> USB-C of AI integrations</strong> - a universal connector that lets AI agents access 
                  your external systems without coding.
                </p>
                <div className="bg-matrix-primary/20 border border-matrix-primary/30 rounded-lg p-4">
                  <p className="text-matrix-primary text-sm">
                    <strong>With MCP:</strong> You don't need to be a developer to start using them! 
                    Connect AI to any tool with standardized MCP servers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Real Examples Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-8">Real Success Stories</h2>
          <p className="text-muted-foreground mb-8">
            See how non-developers are already transforming their work with MCP:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {realExamples.map((example, index) => (
              <div key={index} className="bg-card/50 backdrop-blur-md border border-border rounded-xl p-6 hover:bg-card transition-all duration-300">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-foreground">{example.title}</h3>
                  <span className="px-2 py-1 bg-matrix-primary/20 text-matrix-primary rounded text-xs">
                    {example.category}
                  </span>
                </div>
                <p className="text-muted-foreground mb-3">{example.description}</p>
                <div className="bg-green-500/20 rounded-lg p-3 mb-4">
                  <p className="text-green-400 font-semibold text-sm">
                    Impact: {example.impact}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {example.tools.map((tool, toolIndex) => (
                    <span key={toolIndex} className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link
              to="/success-stories"
              className="bg-gradient-to-r from-matrix-primary to-matrix-secondary hover:from-matrix-accent hover:to-matrix-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold transition-all duration-200 inline-flex items-center space-x-2"
            >
              <span>See All Success Stories</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Popular MCP Servers */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-8">Popular MCP Servers You Should Try</h2>
          <p className="text-muted-foreground mb-8">
            With over 3,000 MCP servers available, here are the most popular ones to get you started:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mcpServers.map((server, index) => (
              <div key={index} className="bg-card/50 backdrop-blur-md border border-border rounded-xl p-6 hover:bg-card transition-all duration-300">
                <div className="text-4xl mb-4">{server.icon}</div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{server.name}</h3>
                <p className="text-muted-foreground mb-3 text-sm">{server.description}</p>
                <div className="bg-matrix-primary/20 rounded-lg p-3 mb-4">
                  <p className="text-matrix-primary text-sm">
                    <strong>Use Case:</strong> {server.useCase}
                  </p>
                </div>
                <a
                  href={server.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-matrix-primary hover:text-matrix-secondary transition-colors duration-200 flex items-center space-x-1 text-sm"
                >
                  <span>View on GitHub</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              to="/templates"
              className="bg-gradient-to-r from-matrix-primary to-matrix-secondary hover:from-matrix-accent hover:to-matrix-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold transition-all duration-200 inline-flex items-center space-x-2"
            >
              <span>Browse Templates</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Core Concepts */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-8">Core Concepts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {concepts.map((concept, index) => (
              <div key={index} className="bg-card/50 backdrop-blur-md border border-border rounded-xl p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-matrix-primary to-matrix-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                    <concept.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{concept.title}</h3>
                    <p className="text-matrix-primary mb-3">{concept.description}</p>
                    <p className="text-muted-foreground text-sm">{concept.details}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Learning Paths */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-8">Choose Your Learning Path</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {learningPaths.map((path, index) => (
              <div key={index} className="bg-card/50 backdrop-blur-md border border-border rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-foreground">{path.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    path.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-400' :
                    path.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {path.difficulty}
                  </span>
                </div>
                
                <p className="text-muted-foreground mb-3">{path.description}</p>
                <p className="text-matrix-primary text-sm mb-4">Duration: {path.duration}</p>
                
                <div className="space-y-2 mb-4">
                  {path.steps.map((step, stepIndex) => (
                    <div key={stepIndex} className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-matrix-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-muted-foreground text-sm">{step}</span>
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
                
                <Link
                  to={path.route}
                  className="w-full bg-gradient-to-r from-matrix-primary to-matrix-secondary hover:from-matrix-accent hover:to-matrix-primary text-primary-foreground px-4 py-2 rounded-lg font-semibold transition-all duration-200 block text-center"
                >
                  Start This Path
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Learning */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Tutorial Navigation */}
          <div className="bg-card/50 backdrop-blur-md border border-border rounded-xl p-6">
            <h3 className="text-2xl font-bold text-foreground mb-6">Interactive Concepts</h3>
            <div className="space-y-3">
              {[
                { id: 'basics', title: 'MCP Basics', description: 'What is MCP and why it matters', icon: Lightbulb },
                { id: 'demo', title: 'Live Demo Code', description: 'What we\'ll build together (simplified)', icon: Play },
                { id: 'tools', title: 'MCP Servers & Tools', description: 'Popular servers and no-code platforms', icon: Workflow },
                { id: 'security', title: 'Security & Privacy', description: 'Keep your data safe while using AI', icon: Shield },
                { id: 'implementation', title: 'Implementation Guide', description: 'Step-by-step roadmap with examples', icon: MessageSquare }
              ].map((topic) => (
                <button
                  key={topic.id}
                  onClick={() => setActiveTab(topic.id)}
                  className={`w-full text-left p-4 rounded-lg transition-all duration-200 ${
                    activeTab === topic.id
                      ? 'bg-gradient-to-r from-matrix-primary to-matrix-secondary text-primary-foreground'
                      : 'bg-muted/50 text-muted-foreground hover:bg-muted'
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
          <div className="bg-card/50 backdrop-blur-md border border-border rounded-xl overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <span className="text-foreground font-medium">Concept Explanation</span>
              <button
                onClick={() => copyCode(codeExamples[activeTab as keyof typeof codeExamples], activeTab)}
                className="flex items-center space-x-1 text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {codeCopied === activeTab ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
                <span className="text-sm">Copy</span>
              </button>
            </div>
            <pre className="p-4 text-sm text-muted-foreground overflow-x-auto whitespace-pre-wrap">
              <code>{codeExamples[activeTab as keyof typeof codeExamples]}</code>
            </pre>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-matrix-primary/20 to-matrix-secondary/20 border border-matrix-primary/30 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-foreground mb-4">Ready to Start Building?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            The possibilities are endless! While some MCP servers are developed by official providers, 
            a vast majority are actually developed by community members. Because MCP is an open standard, 
            anyone can build an MCP server for any resource.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/demo"
              className="bg-gradient-to-r from-matrix-primary to-matrix-secondary hover:from-matrix-accent hover:to-matrix-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold transition-all duration-200"
            >
              Try Interactive Demo
            </Link>
            <Link
              to="/templates"
              className="border border-border text-foreground px-8 py-3 rounded-lg font-semibold hover:bg-muted transition-colors duration-200"
            >
              Browse Templates
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Examples;