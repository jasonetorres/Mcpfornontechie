import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Play, Book, Usb, Database, Shield, Brain, Users, MessageSquare, Workflow, ArrowRight, ExternalLink, Code, Globe } from 'lucide-react';

function Home() {
  const [demoStep, setDemoStep] = useState(0);
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    console.log('Navigating to:', path); // Debug log
    navigate(path);
    // Ensure page scrolls to top after navigation
    setTimeout(() => window.scrollTo(0, 0), 100);
  };

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
      <section className="section-padding-lg relative">
        {/* Bolt Badge - Top Right */}
        <div className="absolute top-8 right-8 z-10">
          <img 
            src="/white_circle_360x360.png" 
            alt="Powered by Bolt" 
            className="w-16 h-16 md:w-20 md:h-20 opacity-80 hover:opacity-100 transition-opacity duration-200"
          />
        </div>

        <div className="container-responsive text-center">
          <div className="mb-8">
            <div className="inline-flex items-center space-x-2 text-matrix-primary text-sm font-medium mb-6">
              <Play className="w-4 h-4" />
              <span>Learn MCP - No Coding Required</span>
            </div>
            <h1 className="heading-xl mb-6 leading-tight">
              The{' '}
              <span className="bg-gradient-to-r from-matrix-primary to-matrix-secondary bg-clip-text text-transparent matrix-glow">
                USB-C for AI
              </span>
            </h1>
            <p className="text-body max-w-3xl mx-auto leading-relaxed text-muted-foreground">
              Master the Model Context Protocol (MCP) and unleash AI's full potential without coding. 
              Perfect for everyone - from community managers to marketers, project managers, and all non-technical professionals.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button 
              onClick={() => handleNavigation('/demo')}
              className="btn-primary"
            >
              <Play className="w-5 h-5 mr-2" />
              <span>Watch Live Demo</span>
            </button>
            <button 
              onClick={() => handleNavigation('/learn')}
              className="btn-secondary"
            >
              <Book className="w-5 h-5 mr-2" />
              <span>Start Learning</span>
            </button>
          </div>

          {/* MCP Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {mcpBenefits.map((benefit, index) => (
              <div key={index} className="card">
                <div className="w-12 h-12 bg-gradient-to-r from-matrix-primary to-matrix-secondary rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <benefit.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What is MCP Section */}
      <section className="section-padding bg-muted/20">
        <div className="container-responsive">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-4">What is MCP?</h2>
            <p className="text-body text-muted-foreground max-w-2xl mx-auto">
              MCP stands for Model Context Protocol - an open standard that's changing how AI works with data
            </p>
          </div>

          <div className="grid-responsive-2 gap-12 mb-16">
            <div className="glass-strong bg-destructive/10 border-destructive/30 p-8 rounded-xl">
              <h3 className="heading-md mb-4">❌ The Problem</h3>
              <p className="text-muted-foreground mb-4">
                AI is amazing, but it doesn't know about YOUR specific data. Without context, AI can only give generic answers.
              </p>
              <div className="bg-destructive/20 p-4 rounded-lg">
                <p className="text-destructive text-sm">
                  <strong>Before MCP:</strong> Each AI integration required custom development from scratch. 
                  No standard way to connect AI to your systems like Google Drive, Asana, or Slack.
                </p>
              </div>
            </div>

            <div className="glass-strong bg-matrix-primary/10 border-matrix-primary/30 p-8 rounded-xl">
              <h3 className="heading-md mb-4">✅ The Solution</h3>
              <p className="text-muted-foreground mb-4">
                MCP is like <strong>USB-C for AI</strong> - a universal connector that lets AI access your data 
                without coding. Created by Anthropic as an open standard.
              </p>
              <div className="bg-matrix-primary/20 p-4 rounded-lg">
                <p className="text-matrix-primary text-sm">
                  <strong>With MCP:</strong> You don't need to be a developer! Connect AI to any tool 
                  using standardized MCP servers. Over 3,000 servers available.
                </p>
              </div>
            </div>
          </div>

          {/* Popular MCP Servers */}
          <div className="mb-16">
            <h3 className="heading-md mb-8 text-center">Popular MCP Servers You Should Try</h3>
            <div className="grid-responsive">
              {popularMCPServers.map((server, index) => (
                <div key={index} className="card text-center">
                  <div className="text-4xl mb-3">{server.icon}</div>
                  <h4 className="text-foreground font-semibold mb-2">{server.name}</h4>
                  <p className="text-muted-foreground text-sm mb-3">{server.description}</p>
                  <div className="text-matrix-primary text-xs">
                    <p>{server.useCase}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <button
                onClick={() => handleNavigation('/learn')}
                className="inline-flex items-center space-x-2 text-matrix-primary hover:text-matrix-secondary transition-colors duration-200"
              >
                <span>Explore all MCP servers</span>
                <ExternalLink className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Demo Preview */}
      <section className="section-padding">
        <div className="container-responsive">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-4">See MCP in Action</h2>
            <p className="text-body text-muted-foreground max-w-2xl mx-auto">
              Experience how MCP transforms AI from generic to context-aware
            </p>
          </div>

          <div className="grid-responsive-2 gap-8 mb-12">
            {/* Demo Steps */}
            <div className="glass p-6">
              <h3 className="heading-md mb-6">How It Works</h3>
              <div className="space-y-4">
                {demoSteps.map((step, index) => (
                  <div 
                    key={index}
                    className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                      demoStep === index
                        ? 'bg-gradient-to-r from-matrix-primary to-matrix-secondary text-primary-foreground'
                        : 'glass text-muted-foreground hover:bg-muted'
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
                <button 
                  onClick={() => handleNavigation('/demo')}
                  className="btn-primary w-full"
                >
                  <Play className="w-5 h-5 mr-2" />
                  <span>Try Full Interactive Demo</span>
                </button>
              </div>
            </div>

            {/* Demo Details */}
            <div className="glass p-6">
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">{demoSteps[demoStep].visual}</div>
                <h4 className="heading-sm mb-2">{demoSteps[demoStep].title}</h4>
                <p className="text-matrix-primary mb-4">{demoSteps[demoStep].description}</p>
              </div>
              <div className="glass bg-muted/20 p-4 rounded-lg">
                <p className="text-muted-foreground leading-relaxed">{demoSteps[demoStep].details}</p>
              </div>
            </div>
          </div>

          {/* Use Cases for Different Roles */}
          <div className="grid-responsive-2">
            {useCases.map((useCase, index) => (
              <div key={index} className="glass p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-matrix-primary to-matrix-secondary rounded-lg flex items-center justify-center">
                    <useCase.icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <h4 className="text-lg font-semibold text-foreground">{useCase.role}</h4>
                </div>
                <div className="space-y-3">
                  <div>
                    <span className="text-destructive font-medium">Challenge: </span>
                    <span className="text-muted-foreground">{useCase.challenge}</span>
                  </div>
                  <div>
                    <span className="text-matrix-primary font-medium">MCP Solution: </span>
                    <span className="text-muted-foreground">{useCase.solution}</span>
                  </div>
                  <div className="bg-matrix-primary/20 p-3 rounded-lg">
                    <span className="text-matrix-primary font-medium">Example Query: </span>
                    <span className="text-matrix-secondary italic">{useCase.example}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Example Prompts Section */}
      <section className="section-padding bg-muted/20">
        <div className="container-responsive">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-4">Example MCP Prompts</h2>
            <p className="text-body text-muted-foreground max-w-2xl mx-auto">
              See how to use natural language to get AI to work with your data through MCP
            </p>
          </div>

          <div className="grid-responsive-2">
            <div className="glass p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
                <span>🗺️</span>
                <span>Google Maps</span>
              </h3>
              <div className="glass bg-muted/20 p-4 rounded-lg">
                <p className="text-muted-foreground text-sm italic">
                  "Track the live GPS location of driver ID #123. Query Google Maps for real-time traffic data 
                  and adjust the estimated delivery time if delays exceed 5 minutes."
                </p>
              </div>
            </div>

            <div className="glass p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
                <span>🎥</span>
                <span>YouTube Transcript</span>
              </h3>
              <div className="glass bg-muted/20 p-4 rounded-lg">
                <p className="text-muted-foreground text-sm italic">
                  "Get the transcript from this YouTube video [link]. Then, summarize it into a blog post 
                  with key takeaways and actionable insights."
                </p>
              </div>
            </div>

            <div className="glass p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
                <span>📁</span>
                <span>Google Drive</span>
              </h3>
              <div className="glass bg-muted/20 p-4 rounded-lg">
                <p className="text-muted-foreground text-sm italic">
                  "Find all relevant documents about our marketing budget. Give me a quick summary of our Q1 
                  performance and highlight the key decisions we need to make."
                </p>
              </div>
            </div>

            <div className="glass p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
                <span>✅</span>
                <span>Asana</span>
              </h3>
              <div className="glass bg-muted/20 p-4 rounded-lg">
                <p className="text-muted-foreground text-sm italic">
                  "Create a new task called 'Review Q4 metrics' due next Friday. Then find all tasks assigned 
                  to me this week and summarize them."
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <button
              onClick={() => handleNavigation('/resources')}
              className="inline-flex items-center space-x-2 text-matrix-primary hover:text-matrix-secondary transition-colors duration-200"
            >
              <Code className="w-4 h-4" />
              <span>View complete prompt library</span>
            </button>
          </div>
        </div>
      </section>

      {/* Learning Resources */}
      <section className="section-padding">
        <div className="container-responsive text-center">
          <h2 className="heading-lg mb-4">Everything You Need to Succeed</h2>
          <p className="text-body text-muted-foreground max-w-2xl mx-auto mb-12">
            From beginner tutorials to advanced templates - we've got you covered
          </p>
          
          <div className="grid-responsive-3">
            <div className="glass p-6">
              <div className="w-12 h-12 bg-gradient-to-r from-matrix-primary to-matrix-secondary rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Book className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Step-by-Step Guides</h3>
              <p className="text-muted-foreground mb-4">Comprehensive tutorials for every skill level</p>
              <button 
                onClick={() => handleNavigation('/guides')}
                className="text-matrix-primary hover:text-matrix-secondary flex items-center space-x-1 justify-center"
              >
                <span>Browse Guides</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>
            
            <div className="glass p-6">
              <div className="w-12 h-12 bg-gradient-to-r from-matrix-primary to-matrix-secondary rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Users className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Active Community</h3>
              <p className="text-muted-foreground mb-4">Connect with thousands of MCP builders</p>
              <button 
                onClick={() => handleNavigation('/join-community')}
                className="text-matrix-primary hover:text-matrix-secondary flex items-center space-x-1 justify-center"
              >
                <span>Join Community</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>
            
            <div className="glass p-6">
              <div className="w-12 h-12 bg-gradient-to-r from-matrix-primary to-matrix-secondary rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Workflow className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Ready-to-Use Templates</h3>
              <p className="text-muted-foreground mb-4">Pre-built solutions for common use cases</p>
              <button 
                onClick={() => handleNavigation('/templates')}
                className="text-matrix-primary hover:text-matrix-secondary flex items-center space-x-1 justify-center"
              >
                <span>Get Templates</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-16 glass-strong bg-gradient-to-r from-matrix-primary/10 to-matrix-secondary/10 border-matrix-primary/30 p-8 rounded-xl">
            <h3 className="heading-md mb-4">Ready to Transform Your Work with AI?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join thousands of people who are already building amazing AI-powered solutions with MCP.
              Start your journey today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => handleNavigation('/start-building')}
                className="btn-primary"
              >
                Start Your First Project
              </button>
              <button 
                onClick={() => handleNavigation('/learn')}
                className="btn-secondary"
              >
                Explore Learning Paths
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;