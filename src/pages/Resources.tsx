import React from 'react';
import { Link } from 'react-router-dom';
import { Book, Users, Workflow, Download, ExternalLink, ArrowRight, Play, FileText, Video, Headphones, Code, Globe } from 'lucide-react';

function Resources() {
  const resourceCategories = [
    {
      title: 'Getting Started',
      description: 'Everything you need to begin your MCP journey',
      icon: Book,
      resources: [
        {
          title: 'MCP Fundamentals Guide',
          description: 'Complete beginner\'s guide to understanding MCP',
          type: 'Guide',
          duration: '15 min read',
          url: '/learn',
          icon: FileText
        },
        {
          title: 'No-Code Platform Comparison',
          description: 'Compare popular platforms for building MCP connections',
          type: 'Comparison',
          duration: '10 min read',
          url: '/platform-comparison',
          icon: FileText
        },
        {
          title: 'MCP Setup Checklist',
          description: 'Step-by-step checklist for your first MCP project',
          type: 'Checklist',
          duration: '5 min',
          url: '/guides',
          icon: FileText
        }
      ]
    },
    {
      title: 'Video Tutorials',
      description: 'Watch and learn with step-by-step video guides',
      icon: Play,
      resources: [
        {
          title: 'MCP Explained in 5 Minutes',
          description: 'Quick overview of MCP concepts and benefits',
          type: 'Video',
          duration: '5 min',
          url: '/demo',
          icon: Video
        },
        {
          title: 'Building Your First MCP Connection',
          description: 'Complete walkthrough using Zapier and Google Sheets',
          type: 'Tutorial',
          duration: '20 min',
          url: '/examples',
          icon: Video
        },
        {
          title: 'Advanced MCP Patterns',
          description: 'Complex use cases and best practices',
          type: 'Advanced',
          duration: '35 min',
          url: '/guides',
          icon: Video
        }
      ]
    },
    {
      title: 'Templates & Tools',
      description: 'Ready-to-use templates and helpful tools',
      icon: Workflow,
      resources: [
        {
          title: 'MCP Template Library',
          description: 'Pre-built templates for common use cases',
          type: 'Templates',
          duration: 'Various',
          url: '/templates',
          icon: FileText
        },
        {
          title: 'MCP Server Directory',
          description: 'Browse 3000+ available MCP servers',
          type: 'Directory',
          duration: 'Browse',
          url: '#',
          icon: Globe
        },
        {
          title: 'MCP Project Planner',
          description: 'Interactive tool to plan your MCP implementation',
          type: 'Tool',
          duration: '10 min',
          url: '/start-building',
          icon: FileText
        }
      ]
    },
    {
      title: 'Community & Support',
      description: 'Connect with other MCP builders and get help',
      icon: Users,
      resources: [
        {
          title: 'MCP Community Forum',
          description: 'Ask questions and share your MCP projects',
          type: 'Community',
          duration: 'Ongoing',
          url: '/join-community',
          icon: FileText
        },
        {
          title: 'Weekly Office Hours',
          description: 'Live Q&A sessions with MCP experts',
          type: 'Live',
          duration: '1 hour',
          url: '/office-hours',
          icon: Video
        },
        {
          title: 'MCP Success Stories',
          description: 'Real examples from the community',
          type: 'Case Studies',
          duration: '5-10 min each',
          url: '/success-stories',
          icon: FileText
        }
      ]
    }
  ];

  const talkResources = [
    {
      title: 'Talk Slides & Notes',
      description: 'Download the complete presentation materials',
      icon: Download,
      items: [
        'Complete slide deck (PDF)',
        'Speaker notes and talking points',
        'Demo script and data files',
        'Additional resources mentioned'
      ]
    },
    {
      title: 'Demo Materials',
      description: 'Everything used in the live demonstration',
      icon: Play,
      items: [
        'Sample community data (CSV)',
        'MCP server configuration',
        'Step-by-step demo guide',
        'Troubleshooting tips'
      ]
    },
    {
      title: 'Next Steps Guide',
      description: 'Your roadmap after attending the talk',
      icon: ArrowRight,
      items: [
        'Immediate action items',
        'Platform recommendations',
        'Learning path suggestions',
        'Community resources'
      ]
    }
  ];

  const mcpPromptLibrary = [
    {
      category: 'Twilio MCP Server',
      prompt: 'Send a text message to customer ID #{customer_id} with the following message: "Your order #{order_number} has been shipped and will arrive on #{delivery_date}." Then, schedule a follow-up call for 2 days after delivery.',
      useCase: 'Order notifications and customer follow-up'
    },
    {
      category: 'GitHub MCP Server',
      prompt: 'Find all open pull requests in the repository that have been waiting for review for more than 3 days. For each one, add a comment tagging the assigned reviewers and asking for an update.',
      useCase: 'Development workflow management'
    },
    {
      category: 'JetBrains MCP Server',
      prompt: 'Analyze the current project for code quality issues. Generate a report of the top 5 areas that need refactoring, with specific recommendations for each.',
      useCase: 'Code quality improvement'
    },
    {
      category: 'Notion MCP Server',
      prompt: 'Create a new page in my workspace called "Weekly Status Report". Include sections for project updates, blockers, and next steps. Then, populate it with data from my project database.',
      useCase: 'Automated documentation and reporting'
    },
    {
      category: 'Miro MCP Server',
      prompt: 'Create a new board for our product roadmap. Add swimlanes for Q1, Q2, Q3, and Q4. Then add sticky notes for each planned feature from our product backlog database.',
      useCase: 'Visual planning and collaboration'
    }
  ];

  const podcasts = [
    {
      title: 'The AI Context Podcast',
      description: 'Weekly discussions about AI, data, and context',
      episodes: 24,
      url: '#'
    },
    {
      title: 'No-Code AI Builder',
      description: 'Building AI solutions without programming',
      episodes: 18,
      url: '#'
    },
    {
      title: 'MCP Deep Dive',
      description: 'Technical discussions about MCP implementation',
      episodes: 12,
      url: '#'
    }
  ];

  // MCP Servers list - consistent across the site
  const mcpServers = [
    {
      name: 'Twilio MCP Server',
      description: 'For messaging and voice capabilities',
      url: 'https://github.com/twilio-labs/mcp'
    },
    {
      name: 'GitHub MCP Server',
      description: 'For repository, issue, and PR access',
      url: 'https://github.com/github/github-mcp-server'
    },
    {
      name: 'JetBrains MCP Server',
      description: 'For IDE and development tool integration',
      url: 'https://github.com/JetBrains/mcp-jetbrains'
    },
    {
      name: 'Notion MCP Server',
      description: 'For workspace and database access',
      url: 'https://github.com/makenotion/notion-mcp-server'
    },
    {
      name: 'Miro MCP Server',
      description: 'For visual collaboration',
      url: 'https://github.com/k-jarzyna/mcp-miro'
    },
    {
      name: 'ElevenLabs MCP',
      description: 'For voice synthesis and audio generation',
      url: 'https://github.com/elevenlabs/elevenlabs-mcp'
    }
  ];

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">MCP Resources</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Everything you need to master MCP and build amazing AI-powered solutions
          </p>
        </div>

        {/* MCP Servers Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8">Popular MCP Servers You Should Try</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mcpServers.map((server, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
                <h3 className="text-lg font-semibold text-white mb-2">{server.name}</h3>
                <p className="text-gray-300 mb-4">{server.description}</p>
                <a
                  href={server.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors duration-200 flex items-center space-x-1"
                >
                  <span>View on GitHub</span>
                  <ExternalLink className="w-4 h-4 ml-1" />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Talk-Specific Resources */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8">Talk Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {talkResources.map((resource, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <resource.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{resource.title}</h3>
                </div>
                <p className="text-blue-200 mb-4">{resource.description}</p>
                <div className="space-y-2 mb-4">
                  {resource.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                      <span className="text-blue-100 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
                <Link
                  to="/talk-resources"
                  className="inline-flex items-center space-x-1 text-blue-300 hover:text-blue-200 transition-colors duration-200"
                >
                  <span>Access Resources</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* MCP Prompt Library */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8">MCP Prompt Library</h2>
          <p className="text-gray-300 mb-8">
            Ready-to-use prompts for popular MCP servers. Copy, customize, and use these with your AI agents.
          </p>
          <div className="space-y-6">
            {mcpPromptLibrary.map((example, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">{example.category}</h3>
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
                    {example.useCase}
                  </span>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-4 mb-4">
                  <p className="text-gray-300 italic">"{example.prompt}"</p>
                </div>
                <button
                  onClick={() => navigator.clipboard.writeText(example.prompt)}
                  className="text-blue-400 hover:text-blue-300 transition-colors duration-200 flex items-center space-x-1"
                >
                  <Code className="w-4 h-4" />
                  <span>Copy Prompt</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Main Resource Categories */}
        <div className="space-y-12">
          {resourceCategories.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <category.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{category.title}</h2>
                  <p className="text-gray-300">{category.description}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.resources.map((resource, resourceIndex) => (
                  <div key={resourceIndex} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 group">
                    <div className="flex items-start space-x-3 mb-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <resource.icon className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors duration-200">
                          {resource.title}
                        </h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs">
                            {resource.type}
                          </span>
                          <span className="text-gray-400 text-xs">{resource.duration}</span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 mb-4">{resource.description}</p>
                    
                    <Link
                      to={resource.url}
                      className="inline-flex items-center space-x-1 text-blue-400 hover:text-blue-300 transition-colors duration-200"
                    >
                      <span>Access Resource</span>
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Podcasts Section */}
        <div className="mt-16">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
              <Headphones className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Podcasts & Audio</h2>
              <p className="text-gray-300">Learn while you commute or exercise</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {podcasts.map((podcast, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-2">{podcast.title}</h3>
                <p className="text-gray-300 mb-3">{podcast.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-orange-300 text-sm">{podcast.episodes} episodes</span>
                  <button className="text-orange-400 hover:text-orange-300 transition-colors duration-200">
                    Listen Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-green-600/20 to-teal-600/20 border border-green-500/30 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Ready to Start Building?</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            You have all the resources you need. Pick a template, choose your platform, and start connecting AI to your data today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/start-building"
              className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200"
            >
              Start Building Now
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

export default Resources;