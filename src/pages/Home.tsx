import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, Book, Usb, Database, Shield, Brain, Users, MessageSquare, Workflow, ArrowRight, ExternalLink, Code } from 'lucide-react';

function Home() {
  const [demoStep, setDemoStep] = useState(0);

  const mcpBenefits = [
    {
      icon: Usb,
      title: 'USB-C for AI',
      description: 'MCP is the universal connector that lets AI talk to any tool, just like USB-C works with any device'
    },
    {
      icon: Database,
      title: 'Connect Your Data',
      description: 'Link spreadsheets, databases, and files so AI can give you personalized, context-aware answers'
    },
    {
      icon: Shield,
      title: 'Secure & Controlled',
      description: 'You decide what data AI can access and how it can be used - no black box mystery'
    },
    {
      icon: Brain,
      title: 'Smarter AI Responses',
      description: 'AI becomes truly useful when it knows about your specific data, not just general knowledge'
    }
  ];

  const demoSteps = [
    {
      title: 'The Problem',
      description: 'AI is powerful but doesn\'t know about YOUR data',
      visual: '🤖❓',
      details: 'Without context, AI can only give generic answers. It doesn\'t know about your customers, your team, or your specific business needs.'
    },
    {
      title: 'The Solution: MCP',
      description: 'MCP connects AI to your real data sources',
      visual: '🤖🔌📊',
      details: 'Think of MCP as a universal translator that lets AI understand and work with your spreadsheets, databases, and tools.'
    },
    {
      title: 'Connect Your Data',
      description: 'Link a Google Sheet with community member data',
      visual: '📋➡️🔗',
      details: 'We\'ll connect a simple spreadsheet containing community member information - names, roles, contributions, and contact details.'
    },
    {
      title: 'Ask Smart Questions',
      description: 'Now AI can answer questions about YOUR data',
      visual: '💬✨',
      details: 'Ask "Who are our top contributors?" or "Which members work in marketing?" and get accurate, personalized answers.'
    },
    {
      title: 'See the Magic',
      description: 'Watch AI provide context-aware responses',
      visual: '🎯📈',
      details: 'The AI now gives specific, actionable answers based on your actual data, not generic responses.'
    }
  ];

  const useCases = [
    {
      role: 'Community Manager',
      icon: Users,
      challenge: 'Answering member questions about contributors and events',
      solution: 'Connect member database to AI for instant, personalized responses',
      example: '"Who are our most active contributors this month?"'
    },
    {
      role: 'Marketing Manager',
      icon: MessageSquare,
      challenge: 'Creating personalized campaigns based on customer data',
      solution: 'Link customer spreadsheets to generate targeted content',
      example: '"Create email copy for our enterprise customers in healthcare"'
    },
    {
      role: 'Project Manager',
      icon: Workflow,
      challenge: 'Tracking project status across multiple tools',
      solution: 'Connect project data to get AI-powered status reports',
      example: '"What projects are behind schedule and why?"'
    },
    {
      role: 'Sales Professional',
      icon: Database,
      challenge: 'Understanding prospect needs from CRM data',
      solution: 'Connect CRM to AI for intelligent lead insights',
      example: '"Which prospects are most likely to close this quarter?"'
    }
  ];

  const popularMCPServers = [
    {
      name: 'Google Drive',
      description: 'File access and search capabilities',
      icon: '📁',
      useCase: 'Document management and search'
    },
    {
      name: 'YouTube Transcript',
      description: 'Extract and work with video transcripts',
      icon: '🎥',
      useCase: 'Content creation and analysis'
    },
    {
      name: 'Google Maps',
      description: 'Location services and directions',
      icon: '🗺️',
      useCase: 'Delivery tracking and logistics'
    },
    {
      name: 'Asana',
      description: 'Project management and task tracking',
      icon: '✅',
      useCase: 'Team coordination and reporting'
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="pt-16 pb-20 px-4 sm:px-6 lg:px-8 relative">
        {/* Bolt Badge - Top Right */}
        <div className="absolute top-8 right-8 z-10">
          <img 
            src="/white_circle_360x360.png" 
            alt="Powered by Bolt" 
            className="w-16 h-16 md:w-20 md:h-20 opacity-80 hover:opacity-100 transition-opacity duration-200"
          />
        </div>

        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center space-x-2 bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full mb-6">
              <Play className="w-4 h-4" />
              <span className="text-sm font-medium">Supporting: "The Missing Link" Talk</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              The{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                USB-C for AI
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Unleash AI's full potential without coding. Learn how MCP connects AI to YOUR data, 
              making it truly useful for community managers, marketers, project managers, and all non-technical professionals.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link 
              to="/demo"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-semibold flex items-center space-x-2 transition-all duration-200 transform hover:scale-105"
            >
              <Play className="w-5 h-5" />
              <span>Watch Live Demo</span>
            </Link>
            <Link 
              to="/learn"
              className="border border-white/20 text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors duration-200 flex items-center space-x-2"
            >
              <Book className="w-5 h-5" />
              <span>Start Learning</span>
            </Link>
          </div>

          {/* MCP Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {mcpBenefits.map((benefit, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <benefit.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{benefit.title}</h3>
                <p className="text-gray-300 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What is MCP Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">What is MCP?</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              MCP stands for Model Context Protocol - an open standard that's changing how AI works with data
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-white mb-4">❌ The Problem</h3>
              <p className="text-red-200 mb-4">
                AI is amazing, but it doesn't know about YOUR specific data. Without context, AI can only give generic answers.
              </p>
              <div className="bg-red-500/20 rounded-lg p-4">
                <p className="text-red-300 text-sm">
                  <strong>Before MCP:</strong> Each AI integration required custom development from scratch. 
                  No standard way to connect AI to your systems like Google Drive, Asana, or Slack.
                </p>
              </div>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-white mb-4">✅ The Solution</h3>
              <p className="text-green-200 mb-4">
                MCP is like <strong>USB-C for AI</strong> - a universal connector that lets AI access your data 
                without coding. Created by Anthropic as an open standard.
              </p>
              <div className="bg-green-500/20 rounded-lg p-4">
                <p className="text-green-300 text-sm">
                  <strong>With MCP:</strong> You don't need to be a developer! Connect AI to any tool 
                  using standardized MCP servers. Over 3,000 servers available.
                </p>
              </div>
            </div>
          </div>

          {/* Popular MCP Servers */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-white mb-8 text-center">Popular MCP Servers You Should Try</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {popularMCPServers.map((server, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 text-center">
                  <div className="text-4xl mb-3">{server.icon}</div>
                  <h4 className="text-white font-semibold mb-2">{server.name}</h4>
                  <p className="text-gray-300 text-sm mb-3">{server.description}</p>
                  <div className="bg-blue-500/20 rounded-lg p-2">
                    <p className="text-blue-300 text-xs">{server.useCase}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                to="/learn"
                className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors duration-200"
              >
                <span>Explore all MCP servers</span>
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Demo Preview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Live Demo Preview</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Get a taste of what we'll build together during the talk
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Demo Steps */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
              <h3 className="text-2xl font-bold text-white mb-6">Demo Steps</h3>
              <div className="space-y-4">
                {demoSteps.map((step, index) => (
                  <div 
                    key={index}
                    className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                      demoStep === index
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                        : 'bg-white/5 text-gray-300 hover:bg-white/10'
                    }`}
                    onClick={() => setDemoStep(index)}
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-2xl">{step.visual}</span>
                      <div>
                        <div className="font-semibold">{step.title}</div>
                        <div className="text-sm opacity-80">{step.description}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <Link 
                  to="/demo"
                  className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all duration-200"
                >
                  <Play className="w-5 h-5" />
                  <span>Try Full Interactive Demo</span>
                </Link>
              </div>
            </div>

            {/* Demo Details */}
            <div className="bg-slate-900/50 backdrop-blur-md border border-white/10 rounded-xl p-6">
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">{demoSteps[demoStep].visual}</div>
                <h4 className="text-xl font-bold text-white mb-2">{demoSteps[demoStep].title}</h4>
                <p className="text-blue-300 mb-4">{demoSteps[demoStep].description}</p>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-4">
                <p className="text-gray-300 leading-relaxed">{demoSteps[demoStep].details}</p>
              </div>
            </div>
          </div>

          {/* Use Cases for Different Roles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {useCases.map((useCase, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-600 rounded-lg flex items-center justify-center">
                    <useCase.icon className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-white">{useCase.role}</h4>
                </div>
                <div className="space-y-3">
                  <div>
                    <span className="text-red-300 font-medium">Challenge: </span>
                    <span className="text-gray-300">{useCase.challenge}</span>
                  </div>
                  <div>
                    <span className="text-green-300 font-medium">MCP Solution: </span>
                    <span className="text-gray-300">{useCase.solution}</span>
                  </div>
                  <div className="bg-blue-500/20 rounded-lg p-3">
                    <span className="text-blue-300 font-medium">Example Query: </span>
                    <span className="text-blue-200 italic">{useCase.example}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Example Prompts Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Example MCP Prompts</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              See how to use natural language to get AI to work with your data through MCP
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                <span>🗺️</span>
                <span>Google Maps</span>
              </h3>
              <div className="bg-slate-800/50 rounded-lg p-4">
                <p className="text-gray-300 text-sm italic">
                  "Track the live GPS location of driver ID #123. Query Google Maps for real-time traffic data 
                  and adjust the estimated delivery time if delays exceed 5 minutes."
                </p>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                <span>🎥</span>
                <span>YouTube Transcript</span>
              </h3>
              <div className="bg-slate-800/50 rounded-lg p-4">
                <p className="text-gray-300 text-sm italic">
                  "Get the transcript from this YouTube video [link]. Then, summarize it into a blog post 
                  with key takeaways and actionable insights."
                </p>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                <span>📁</span>
                <span>Google Drive</span>
              </h3>
              <div className="bg-slate-800/50 rounded-lg p-4">
                <p className="text-gray-300 text-sm italic">
                  "Find all relevant documents about our marketing budget. Give me a quick summary of our Q1 
                  performance and highlight the key decisions we need to make."
                </p>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                <span>✅</span>
                <span>Asana</span>
              </h3>
              <div className="bg-slate-800/50 rounded-lg p-4">
                <p className="text-gray-300 text-sm italic">
                  "Create a new task called 'Review Q4 metrics' due next Friday. Then find all tasks assigned 
                  to me this week and summarize them."
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link
              to="/resources"
              className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors duration-200"
            >
              <Code className="w-4 h-4" />
              <span>View complete prompt library</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Take Action After the Talk</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-12">
            Ready to start building? Here's everything you need to get started
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Book className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">No-Code Guides</h3>
              <p className="text-gray-300 mb-4">Step-by-step tutorials for popular platforms</p>
              <Link to="/guides" className="text-blue-400 hover:text-blue-300 flex items-center space-x-1 justify-center">
                <span>Browse Guides</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Community Support</h3>
              <p className="text-gray-300 mb-4">Join other non-developers building with AI</p>
              <Link to="/join-community" className="text-blue-400 hover:text-blue-300 flex items-center space-x-1 justify-center">
                <span>Join Community</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Workflow className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Template Library</h3>
              <p className="text-gray-300 mb-4">Ready-to-use templates for common use cases</p>
              <Link to="/templates" className="text-blue-400 hover:text-blue-300 flex items-center space-x-1 justify-center">
                <span>Get Templates</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-16 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Connect AI to Your Data?</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Don't let AI remain a black box. Start building context-aware AI solutions that actually understand your business.
              The possibilities are endless with MCP!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/start-building"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200"
              >
                Start Your First Project
              </Link>
              <Link 
                to="/talk-resources"
                className="border border-white/20 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors duration-200"
              >
                Download Slides
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;