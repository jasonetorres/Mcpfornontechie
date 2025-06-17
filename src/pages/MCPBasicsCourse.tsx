import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Clock, ArrowRight, Play, Book, Users, Zap, Database, Shield, Brain, Usb, MessageSquare, ExternalLink, ChevronDown, ChevronRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLearningProgress } from '../hooks/useLearningProgress';

export default function MCPBasicsCourse() {
  const { user } = useAuth();
  const { completedSteps, loading, toggleStep, getProgressPercentage } = useLearningProgress('beginner');
  const [expandedSection, setExpandedSection] = useState<number | null>(0);

  const courseModules = [
    {
      title: 'What is MCP? The USB-C Analogy',
      duration: '15 min',
      description: 'Understand MCP using simple, everyday analogies',
      content: {
        overview: 'Just like USB-C is a universal connector for devices, MCP is a universal connector for AI and data.',
        keyPoints: [
          'MCP stands for Model Context Protocol',
          'Created by Anthropic as an open standard',
          'Think of it as "USB-C for AI"',
          'Connects AI to any data source without coding'
        ],
        analogy: {
          title: 'The USB-C Analogy',
          explanation: 'Remember when every device had different charging cables? iPhone had Lightning, Android had micro-USB, laptops had their own connectors. Then USB-C came along - one cable that works with everything.',
          comparison: [
            {
              before: 'Before USB-C: Different cables for every device',
              after: 'After USB-C: One universal connector'
            },
            {
              before: 'Before MCP: Custom code for every AI integration',
              after: 'After MCP: One universal protocol for all AI connections'
            }
          ]
        },
        realWorldExample: {
          scenario: 'Community Manager Sarah',
          problem: 'Sarah spends 4 hours daily answering questions about community members: "Who\'s our top contributor?" "What\'s Mike\'s email?" "Which members work in marketing?"',
          solution: 'With MCP, Sarah connects her member spreadsheet to AI. Now she asks questions in plain English and gets instant, accurate answers.',
          result: 'Sarah saves 3.75 hours daily and can focus on growing the community instead of looking up information.'
        }
      }
    },
    {
      title: 'The Problem MCP Solves',
      duration: '10 min',
      description: 'Why AI without context is like a librarian without access to books',
      content: {
        overview: 'AI is incredibly smart, but it doesn\'t know about YOUR specific data, customers, or business.',
        problems: [
          {
            title: 'Generic Responses',
            description: 'AI can only give general advice because it doesn\'t know your specific situation',
            example: 'You: "Who are our best customers?" AI: "I don\'t have access to your customer data. Generally, good customers are..."'
          },
          {
            title: 'No Context',
            description: 'AI doesn\'t know about your team, projects, or company information',
            example: 'You: "Is the Johnson project on track?" AI: "I don\'t have information about your specific projects."'
          },
          {
            title: 'Wasted Time',
            description: 'You have to manually look up information that AI could find instantly',
            example: 'Spending hours creating reports that AI could generate in minutes if it had access to your data'
          }
        ],
        libraryAnalogy: {
          title: 'The Librarian Analogy',
          explanation: 'Imagine hiring the world\'s smartest librarian, but not giving them access to any books. They can answer general questions about literature, but they can\'t help you find the specific book you need or tell you what\'s available in your library.',
          connection: 'That\'s AI without MCP - incredibly knowledgeable but unable to help with your specific needs because it can\'t access your data.'
        }
      }
    },
    {
      title: 'How MCP Works (No Technical Jargon)',
      duration: '20 min',
      description: 'The simple 3-step process that makes AI context-aware',
      content: {
        overview: 'MCP works in three simple steps: Connect, Ask, Get Smart Answers',
        steps: [
          {
            number: 1,
            title: 'Connect Your Data',
            description: 'Link your spreadsheets, databases, or tools to AI using MCP',
            visual: '📊 ➡️ 🔗 ➡️ 🤖',
            details: [
              'Use tools like Zapier (no coding required)',
              'Connect Google Sheets, Airtable, or other data sources',
              'MCP creates a secure bridge between your data and AI',
              'You control what data AI can access'
            ],
            example: 'Sarah connects her "Community Members" Google Sheet to ChatGPT using Zapier'
          },
          {
            number: 2,
            title: 'Ask Questions in Plain English',
            description: 'Talk to AI like you would talk to a knowledgeable colleague',
            visual: '💬 "Who are our top contributors?"',
            details: [
              'No special commands or technical language needed',
              'Ask questions naturally, like talking to a person',
              'AI understands context and relationships in your data',
              'Can handle complex, multi-part questions'
            ],
            example: 'Sarah asks: "Who are our top 3 contributors this month, and what are their email addresses?"'
          },
          {
            number: 3,
            title: 'Get Smart, Specific Answers',
            description: 'Receive accurate, actionable responses based on YOUR data',
            visual: '🎯 Specific answers with your actual data',
            details: [
              'AI gives specific answers using your real data',
              'Responses are accurate and up-to-date',
              'Can suggest next actions or insights',
              'Saves hours of manual data lookup'
            ],
            example: 'AI responds: "Top contributors: 1) Mike Rodriguez (45 contributions, mike@company.com) 2) Lisa Park (42 contributions, lisa@company.com) 3) David Kim (38 contributions, david@company.com)"'
          }
        ],
        securityNote: {
          title: 'Security & Privacy',
          points: [
            'Your data stays in your systems (Google Sheets, Airtable, etc.)',
            'You control exactly what AI can access',
            'Can revoke access anytime',
            'Full audit trail of what AI accessed'
          ]
        }
      }
    },
    {
      title: 'Choosing Your No-Code Platform',
      duration: '15 min',
      description: 'Pick the right tool for your skill level and needs',
      content: {
        overview: 'You don\'t need to code! Several user-friendly platforms make MCP accessible to everyone.',
        platforms: [
          {
            name: 'Zapier',
            difficulty: 'Beginner',
            bestFor: 'Complete beginners, simple automations',
            pros: ['Extremely user-friendly', 'Huge library of integrations', 'Great tutorials'],
            cons: ['Can get expensive with heavy use', 'Limited customization'],
            pricing: 'Free tier available, $19.99/month for premium',
            setupTime: '15-30 minutes',
            recommendation: 'Start here if you\'ve never done automation before'
          },
          {
            name: 'Microsoft Power Platform',
            difficulty: 'Intermediate',
            bestFor: 'Office 365 users, enterprise teams',
            pros: ['Deep Office integration', 'Enterprise security', 'Powerful AI features'],
            cons: ['Steeper learning curve', 'Best value requires Microsoft ecosystem'],
            pricing: '$5-40/user/month',
            setupTime: '1-2 hours',
            recommendation: 'Great if you already use Microsoft Office'
          },
          {
            name: 'Airtable',
            difficulty: 'Beginner',
            bestFor: 'Data-heavy projects, spreadsheet users',
            pros: ['Familiar spreadsheet interface', 'Powerful database features', 'Great for organization'],
            cons: ['Limited automation compared to Zapier', 'Can get expensive for large teams'],
            pricing: 'Free tier available, $10-24/user/month',
            setupTime: '30-45 minutes',
            recommendation: 'Perfect if you love spreadsheets and want more power'
          }
        ],
        decisionTree: {
          title: 'Which Platform Should You Choose?',
          questions: [
            {
              question: 'Are you completely new to automation?',
              answer: 'Yes → Start with Zapier',
              explanation: 'Zapier has the gentlest learning curve and best beginner resources'
            },
            {
              question: 'Do you use Microsoft Office daily?',
              answer: 'Yes → Consider Power Platform',
              explanation: 'You\'ll get the most value from the deep Office integration'
            },
            {
              question: 'Do you work with lots of data and love spreadsheets?',
              answer: 'Yes → Try Airtable',
              explanation: 'Airtable combines spreadsheet familiarity with database power'
            },
            {
              question: 'Do you need something free to start?',
              answer: 'Yes → Zapier or Airtable free tiers',
              explanation: 'Both offer generous free tiers to get you started'
            }
          ]
        }
      }
    },
    {
      title: 'Your First MCP Project: Step-by-Step',
      duration: '45 min',
      description: 'Build a working MCP connection from start to finish',
      content: {
        overview: 'Let\'s build Sarah\'s Community Q&A Assistant together. You\'ll have a working MCP connection by the end of this module.',
        project: {
          title: 'Community Member Q&A Assistant',
          goal: 'Create an AI assistant that can answer questions about community members',
          whatYoullBuild: 'An AI that can instantly answer questions like "Who\'s our top contributor?" or "What\'s Mike\'s email?"'
        },
        prerequisites: {
          title: 'What You\'ll Need (All Free)',
          items: [
            'Google account (for Google Sheets)',
            'Zapier account (free tier)',
            'ChatGPT account (free tier works)',
            '30-45 minutes of time'
          ]
        },
        steps: [
          {
            step: 1,
            title: 'Prepare Your Data',
            time: '10 minutes',
            description: 'Create a Google Sheet with community member information',
            instructions: [
              'Open Google Sheets and create a new spreadsheet',
              'Name it "Community Members"',
              'Create columns: Name, Role, Contributions, Email, Join_Date',
              'Add 5-10 sample members (you can use fake data for practice)',
              'Make sure the sheet is shared (anyone with link can view)'
            ],
            sampleData: `Name,Role,Contributions,Email,Join_Date
Sarah Chen,Community Manager,45,sarah@example.com,2024-01-15
Mike Rodriguez,Developer,38,mike@example.com,2024-02-01
Lisa Park,Designer,42,lisa@example.com,2024-01-20
David Kim,Marketing,29,david@example.com,2024-02-10
Emma Wilson,Support,35,emma@example.com,2024-01-25`,
            tips: [
              'Keep column names simple (no spaces or special characters work best)',
              'Make sure data is consistent (same date format, etc.)',
              'You can always add more data later'
            ]
          },
          {
            step: 2,
            title: 'Set Up Zapier Connection',
            time: '15 minutes',
            description: 'Create the bridge between your data and AI',
            instructions: [
              'Go to zapier.com and sign up for a free account',
              'Click "Create Zap"',
              'For the trigger, choose "Webhooks by Zapier"',
              'Select "Catch Hook" and copy the webhook URL',
              'For the action, choose "OpenAI (ChatGPT)"',
              'Connect your OpenAI account',
              'In the prompt, tell ChatGPT to answer questions using the Google Sheet data'
            ],
            promptTemplate: `You are a helpful assistant that answers questions about community members. Use the data from the Google Sheet to provide specific, accurate answers. 

When someone asks about members, look up the information and provide helpful details like their role, contribution count, and contact information.

Google Sheet data: [Zapier will insert the sheet data here]

Question: [User's question will go here]

Please provide a helpful, specific answer based on the data.`,
            troubleshooting: [
              'If you can\'t find OpenAI in Zapier, search for "ChatGPT"',
              'Make sure your Google Sheet is publicly viewable',
              'Test the connection with a simple question first'
            ]
          },
          {
            step: 3,
            title: 'Connect Your Google Sheet',
            time: '10 minutes',
            description: 'Link your member data to the AI assistant',
            instructions: [
              'In your Zapier action, add "Google Sheets" as a data source',
              'Connect your Google account',
              'Select your "Community Members" spreadsheet',
              'Choose the worksheet with your data',
              'Map the columns to the AI prompt'
            ],
            tips: [
              'Make sure Zapier can access your Google Sheet',
              'Test the connection to ensure data flows correctly',
              'You can preview the data Zapier will send to ChatGPT'
            ]
          },
          {
            step: 4,
            title: 'Test Your AI Assistant',
            time: '10 minutes',
            description: 'Try asking questions and see the magic happen',
            testQuestions: [
              'Who is our top contributor?',
              'What\'s Sarah\'s email address?',
              'Which members work in marketing?',
              'Who joined most recently?',
              'List all developers in our community'
            ],
            expectedResults: [
              'AI should give specific answers using your actual data',
              'Responses should include names, roles, and other details',
              'AI should handle variations in how you ask questions',
              'If data isn\'t found, AI should say so clearly'
            ],
            troubleshooting: [
              'If AI gives generic answers, check that your Google Sheet data is being passed correctly',
              'If you get errors, verify all connections are working',
              'Try simpler questions first, then get more complex'
            ]
          }
        ],
        celebration: {
          title: 'Congratulations! 🎉',
          message: 'You\'ve just built your first MCP connection! You now have an AI assistant that knows about your community members and can answer questions instantly.',
          nextSteps: [
            'Try more complex questions',
            'Add more data to your spreadsheet',
            'Share the assistant with your team',
            'Explore other use cases for your work'
          ]
        }
      }
    },
    {
      title: 'Common Use Cases & Examples',
      duration: '20 min',
      description: 'See how others are using MCP in their daily work',
      content: {
        overview: 'MCP isn\'t just for community management. Here are real examples from different roles and industries.',
        useCases: [
          {
            role: 'Marketing Manager',
            challenge: 'Creating personalized email campaigns for 1000+ customers',
            solution: 'Connected customer database to AI for automatic segmentation and personalized content',
            example: 'AI generates different email copy for enterprise vs. small business customers automatically',
            results: '300% increase in email conversion rates, 2 hours saved daily',
            tools: ['Airtable', 'Claude AI', 'Mailchimp']
          },
          {
            role: 'Project Manager',
            challenge: 'Spending entire Fridays creating status reports for 15+ projects',
            solution: 'Connected project tracking data to AI for automated report generation',
            example: 'AI creates comprehensive status reports, identifies risks, and suggests optimizations',
            results: '5 hours saved weekly, 90% improvement in project visibility',
            tools: ['Notion', 'GPT-4', 'Slack']
          },
          {
            role: 'Sales Professional',
            challenge: 'Manually scoring leads and missing high-value prospects',
            solution: 'Connected CRM to AI for intelligent lead scoring and prioritization',
            example: 'AI analyzes lead behavior and company data to predict conversion probability',
            results: '60% improvement in lead qualification, $250K additional quarterly revenue',
            tools: ['Salesforce', 'Power Platform', 'Azure AI']
          },
          {
            role: 'Customer Support Manager',
            challenge: 'Team overwhelmed with 200+ daily tickets, 4-hour average resolution time',
            solution: 'Connected knowledge base to AI for instant answer suggestions',
            example: 'AI provides support agents with relevant solutions and answers instantly',
            results: '80% reduction in resolution time, 92% customer satisfaction',
            tools: ['Zendesk', 'Claude AI', 'Confluence']
          },
          {
            role: 'HR Manager',
            challenge: 'New employees constantly asking the same policy and process questions',
            solution: 'Created AI assistant with access to HR documents and policies',
            example: 'Employees ask "What\'s the vacation policy?" and get instant, accurate answers',
            results: '70% reduction in HR inquiries, faster employee onboarding',
            tools: ['SharePoint', 'Power Platform', 'Teams']
          }
        ],
        industryExamples: [
          {
            industry: 'Healthcare',
            useCase: 'Patient information lookup and appointment scheduling',
            benefit: 'Faster patient care, reduced administrative burden'
          },
          {
            industry: 'Education',
            useCase: 'Student progress tracking and personalized learning recommendations',
            benefit: 'Better student outcomes, teacher time savings'
          },
          {
            industry: 'Retail',
            useCase: 'Inventory management and customer preference analysis',
            benefit: 'Reduced stockouts, improved customer satisfaction'
          },
          {
            industry: 'Real Estate',
            useCase: 'Property matching and client communication automation',
            benefit: 'Faster property matches, improved client experience'
          }
        ]
      }
    },
    {
      title: 'Security, Privacy & Best Practices',
      duration: '15 min',
      description: 'Keep your data safe while getting the benefits of AI',
      content: {
        overview: 'Security doesn\'t have to be complicated. Follow these simple guidelines to keep your data safe.',
        securityPrinciples: [
          {
            principle: 'You Control Your Data',
            explanation: 'Your data stays in your systems (Google Sheets, Airtable, etc.). AI doesn\'t store or own your information.',
            example: 'When you connect a Google Sheet to AI, the data remains in Google Sheets. AI just reads it when you ask questions.'
          },
          {
            principle: 'Least Privilege Access',
            explanation: 'Only give AI access to the specific data it needs for its job.',
            example: 'If you\'re building a customer service assistant, don\'t give it access to financial data or employee records.'
          },
          {
            principle: 'Audit Trail',
            explanation: 'You can see exactly what data AI accessed and when.',
            example: 'Most platforms show logs of what questions were asked and what data was used to answer them.'
          },
          {
            principle: 'Revocable Access',
            explanation: 'You can remove AI\'s access to your data anytime.',
            example: 'If you no longer want AI to access a spreadsheet, you can disconnect it with one click.'
          }
        ],
        bestPractices: [
          {
            category: 'Getting Started',
            practices: [
              'Start with non-sensitive data (like public information or test data)',
              'Use sample/dummy data for your first projects',
              'Test thoroughly before giving AI access to important data',
              'Start small and expand gradually'
            ]
          },
          {
            category: 'Data Management',
            practices: [
              'Keep sensitive data (SSNs, passwords, financial info) in separate, disconnected systems',
              'Use clear, descriptive names for your data sources',
              'Regularly review what data AI has access to',
              'Remove access to data that\'s no longer needed'
            ]
          },
          {
            category: 'Team Collaboration',
            practices: [
              'Train team members on what data they can and cannot share with AI',
              'Create clear guidelines for your organization',
              'Regularly review and update access permissions',
              'Document your MCP implementations for future reference'
            ]
          }
        ],
        redFlags: {
          title: 'Red Flags: When NOT to Use MCP',
          situations: [
            'Highly regulated data (medical records, financial data) without proper compliance review',
            'Personal information of customers without their consent',
            'Confidential business information that could harm your company if leaked',
            'Any data you wouldn\'t feel comfortable sharing with a trusted colleague'
          ]
        },
        questionsToAsk: [
          'Where is my data stored? (It should stay in your systems)',
          'Who can access my data? (Only you and authorized team members)',
          'Can I see what data AI used? (Yes, through audit logs)',
          'How do I remove access? (Should be simple and immediate)',
          'What happens if I delete my account? (Your data should remain yours)'
        ]
      }
    },
    {
      title: 'Next Steps & Advanced Concepts',
      duration: '10 min',
      description: 'Where to go from here and what\'s possible as you grow',
      content: {
        overview: 'You\'ve learned the basics! Here\'s how to continue your MCP journey and what becomes possible as you gain experience.',
        immediateNextSteps: [
          {
            title: 'Expand Your First Project',
            description: 'Add more data and functionality to your community assistant',
            actions: [
              'Add more columns to your spreadsheet (skills, location, interests)',
              'Try more complex questions ("Who are the designers in California?")',
              'Connect additional data sources (event attendance, survey responses)',
              'Share the assistant with team members'
            ]
          },
          {
            title: 'Try a Different Use Case',
            description: 'Apply MCP to another area of your work',
            suggestions: [
              'Project tracking and status reporting',
              'Customer feedback analysis',
              'Inventory or resource management',
              'Event planning and coordination'
            ]
          },
          {
            title: 'Join the Community',
            description: 'Connect with other MCP builders for support and inspiration',
            benefits: [
              'Get help when you\'re stuck',
              'Share your successes and learn from others',
              'Discover new use cases and techniques',
              'Stay updated on new MCP developments'
            ]
          }
        ],
        advancedConcepts: [
          {
            title: 'Multi-Source Connections',
            description: 'Connect AI to multiple data sources for richer insights',
            example: 'Combine customer data, support tickets, and sales information for comprehensive customer insights',
            whenReady: 'After you\'re comfortable with single-source connections'
          },
          {
            title: 'Automated Workflows',
            description: 'Set up AI to take actions, not just answer questions',
            example: 'AI automatically creates support tickets, sends emails, or updates spreadsheets based on triggers',
            whenReady: 'When you want to move beyond Q&A to automation'
          },
          {
            title: 'Custom AI Assistants',
            description: 'Create specialized AI assistants for specific roles or departments',
            example: 'Separate assistants for sales, support, and marketing, each with access to relevant data',
            whenReady: 'When you have multiple use cases and want to organize them'
          },
          {
            title: 'Enterprise Integration',
            description: 'Connect to enterprise systems like CRMs, ERPs, and databases',
            example: 'AI that can query Salesforce, update inventory systems, and generate executive reports',
            whenReady: 'When you need to scale across your organization'
          }
        ],
        learningPath: {
          title: 'Your Continued Learning Journey',
          phases: [
            {
              phase: 'Weeks 1-2: Master the Basics',
              goals: ['Complete your first MCP project', 'Understand security basics', 'Try 2-3 different use cases'],
              resources: ['This course', 'Community Q&A', 'Platform documentation']
            },
            {
              phase: 'Weeks 3-4: Expand and Optimize',
              goals: ['Connect multiple data sources', 'Share with team members', 'Measure time/cost savings'],
              resources: ['Advanced tutorials', 'Community examples', 'Office hours']
            },
            {
              phase: 'Month 2+: Scale and Innovate',
              goals: ['Implement across departments', 'Train colleagues', 'Explore automation'],
              resources: ['Enterprise guides', 'Mentorship program', 'Speaking opportunities']
            }
          ]
        },
        resources: [
          {
            title: 'MCP Academy Community',
            description: 'Join thousands of non-developers building with MCP',
            link: '/join-community'
          },
          {
            title: 'Template Library',
            description: 'Pre-built solutions for common use cases',
            link: '/templates'
          },
          {
            title: 'Weekly Office Hours',
            description: 'Get live help from MCP experts',
            link: '/office-hours'
          },
          {
            title: 'Success Stories',
            description: 'Learn from others who\'ve transformed their work with MCP',
            link: '/success-stories'
          }
        ]
      }
    }
  ];

  const toggleSection = (index: number) => {
    setExpandedSection(expandedSection === index ? null : index);
  };

  const progressPercentage = getProgressPercentage(courseModules.length);

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">MCP Basics: Complete Course</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to understand and implement MCP, explained in simple terms for non-technical people
          </p>
          <div className="mt-6 flex items-center justify-center space-x-4">
            <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium">
              Beginner Friendly
            </span>
            <div className="flex items-center space-x-1 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>2.5 hours total</span>
            </div>
            <div className="flex items-center space-x-1 text-muted-foreground">
              <Users className="w-4 h-4" />
              <span>No coding required</span>
            </div>
          </div>
        </div>

        {/* Auth Prompt for Non-Users */}
        {!user && (
          <div className="mb-12 bg-matrix-primary/20 border border-matrix-primary/30 rounded-xl p-6 text-center">
            <h3 className="text-lg font-semibold text-foreground mb-2">Track Your Progress</h3>
            <p className="text-matrix-primary mb-4">
              Sign up for a free account to save your progress and unlock personalized features
            </p>
            <button className="bg-gradient-to-r from-matrix-primary to-matrix-secondary hover:from-matrix-accent hover:to-matrix-primary text-primary-foreground px-6 py-2 rounded-lg font-medium transition-all duration-200">
              Create Free Account
            </button>
          </div>
        )}

        {/* Progress Bar */}
        {user && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-2">
              <span className="text-foreground font-medium">Course Progress</span>
              <span className="text-matrix-primary">{completedSteps.length}/{courseModules.length} modules completed</span>
            </div>
            <div className="w-full bg-muted rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-matrix-primary to-matrix-secondary h-3 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Course Modules */}
        <div className="space-y-4">
          {courseModules.map((module, index) => (
            <div key={index} className="bg-card/50 backdrop-blur-md border border-border rounded-xl overflow-hidden">
              {/* Module Header */}
              <div 
                className="p-6 cursor-pointer hover:bg-muted/50 transition-colors duration-200"
                onClick={() => toggleSection(index)}
              >
                <div className="flex items-center space-x-4">
                  {user && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleStep(index);
                      }}
                      disabled={loading}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                        completedSteps.includes(index)
                          ? 'bg-matrix-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground hover:bg-accent cursor-pointer'
                      }`}
                    >
                      {completedSteps.includes(index) ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <span className="font-semibold">{index + 1}</span>
                      )}
                    </button>
                  )}
                  {!user && (
                    <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                      <span className="font-semibold text-muted-foreground">{index + 1}</span>
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-semibold text-foreground">{module.title}</h3>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1 text-matrix-primary">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm">{module.duration}</span>
                        </div>
                        {expandedSection === index ? (
                          <ChevronDown className="w-5 h-5 text-muted-foreground" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                    <p className="text-muted-foreground">{module.description}</p>
                  </div>
                </div>
              </div>

              {/* Module Content */}
              {expandedSection === index && (
                <div className="border-t border-border">
                  <div className="p-6 space-y-6">
                    {/* Module 1: What is MCP */}
                    {index === 0 && (
                      <div className="space-y-6">
                        <div className="bg-matrix-primary/10 border border-matrix-primary/20 rounded-lg p-4">
                          <p className="text-matrix-primary font-medium">{module.content.overview}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-foreground font-semibold mb-3">Key Points:</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {module.content.keyPoints.map((point, i) => (
                              <div key={i} className="flex items-center space-x-2">
                                <CheckCircle className="w-4 h-4 text-matrix-primary flex-shrink-0" />
                                <span className="text-muted-foreground">{point}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="bg-muted/50 rounded-lg p-6">
                          <h4 className="text-foreground font-semibold mb-4">{module.content.analogy.title}</h4>
                          <p className="text-muted-foreground mb-4">{module.content.analogy.explanation}</p>
                          <div className="space-y-3">
                            {module.content.analogy.comparison.map((comp, i) => (
                              <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-destructive/20 border border-destructive/30 rounded p-3">
                                  <span className="text-destructive text-sm">{comp.before}</span>
                                </div>
                                <div className="bg-matrix-primary/20 border border-matrix-primary/30 rounded p-3">
                                  <span className="text-matrix-primary text-sm">{comp.after}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-6">
                          <h4 className="text-green-400 font-semibold mb-3">Real-World Example: {module.content.realWorldExample.scenario}</h4>
                          <div className="space-y-3">
                            <div>
                              <span className="text-destructive font-medium">Problem: </span>
                              <span className="text-muted-foreground">{module.content.realWorldExample.problem}</span>
                            </div>
                            <div>
                              <span className="text-matrix-primary font-medium">MCP Solution: </span>
                              <span className="text-muted-foreground">{module.content.realWorldExample.solution}</span>
                            </div>
                            <div>
                              <span className="text-green-400 font-medium">Result: </span>
                              <span className="text-muted-foreground">{module.content.realWorldExample.result}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Module 2: The Problem */}
                    {index === 1 && (
                      <div className="space-y-6">
                        <div className="bg-matrix-primary/10 border border-matrix-primary/20 rounded-lg p-4">
                          <p className="text-matrix-primary font-medium">{module.content.overview}</p>
                        </div>

                        <div className="space-y-4">
                          {module.content.problems.map((problem, i) => (
                            <div key={i} className="bg-muted/50 rounded-lg p-4">
                              <h5 className="text-foreground font-semibold mb-2">{problem.title}</h5>
                              <p className="text-muted-foreground mb-3">{problem.description}</p>
                              <div className="bg-destructive/20 border border-destructive/30 rounded p-3">
                                <span className="text-destructive text-sm italic">"{problem.example}"</span>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-6">
                          <h4 className="text-blue-400 font-semibold mb-3">{module.content.libraryAnalogy.title}</h4>
                          <p className="text-muted-foreground mb-3">{module.content.libraryAnalogy.explanation}</p>
                          <p className="text-blue-300 italic">{module.content.libraryAnalogy.connection}</p>
                        </div>
                      </div>
                    )}

                    {/* Module 3: How MCP Works */}
                    {index === 2 && (
                      <div className="space-y-6">
                        <div className="bg-matrix-primary/10 border border-matrix-primary/20 rounded-lg p-4">
                          <p className="text-matrix-primary font-medium">{module.content.overview}</p>
                        </div>

                        <div className="space-y-6">
                          {module.content.steps.map((step, i) => (
                            <div key={i} className="bg-muted/50 rounded-lg p-6">
                              <div className="flex items-start space-x-4 mb-4">
                                <div className="w-10 h-10 bg-gradient-to-r from-matrix-primary to-matrix-secondary rounded-full flex items-center justify-center flex-shrink-0">
                                  <span className="text-primary-foreground font-bold">{step.number}</span>
                                </div>
                                <div className="flex-1">
                                  <h5 className="text-foreground font-semibold mb-2">{step.title}</h5>
                                  <p className="text-muted-foreground mb-3">{step.description}</p>
                                  <div className="text-2xl mb-3">{step.visual}</div>
                                </div>
                              </div>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                  <h6 className="text-foreground font-medium mb-2">How it works:</h6>
                                  <ul className="space-y-1">
                                    {step.details.map((detail, j) => (
                                      <li key={j} className="flex items-start space-x-2">
                                        <div className="w-1.5 h-1.5 bg-matrix-primary rounded-full mt-2 flex-shrink-0"></div>
                                        <span className="text-muted-foreground text-sm">{detail}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                <div className="bg-green-500/10 border border-green-500/20 rounded p-3">
                                  <h6 className="text-green-400 font-medium mb-2">Example:</h6>
                                  <p className="text-green-300 text-sm">{step.example}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
                          <h4 className="text-orange-400 font-semibold mb-3">{module.content.securityNote.title}</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {module.content.securityNote.points.map((point, i) => (
                              <div key={i} className="flex items-center space-x-2">
                                <Shield className="w-4 h-4 text-orange-400 flex-shrink-0" />
                                <span className="text-orange-300 text-sm">{point}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Module 4: Choosing Platform */}
                    {index === 3 && (
                      <div className="space-y-6">
                        <div className="bg-matrix-primary/10 border border-matrix-primary/20 rounded-lg p-4">
                          <p className="text-matrix-primary font-medium">{module.content.overview}</p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                          {module.content.platforms.map((platform, i) => (
                            <div key={i} className="bg-card border border-border rounded-lg p-4">
                              <div className="flex items-center justify-between mb-3">
                                <h5 className="text-foreground font-semibold">{platform.name}</h5>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  platform.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-400' :
                                  'bg-yellow-500/20 text-yellow-400'
                                }`}>
                                  {platform.difficulty}
                                </span>
                              </div>
                              
                              <p className="text-muted-foreground text-sm mb-3">{platform.bestFor}</p>
                              
                              <div className="space-y-2 mb-3">
                                <div>
                                  <span className="text-green-400 text-xs font-medium">Pros:</span>
                                  <ul className="text-xs text-muted-foreground">
                                    {platform.pros.map((pro, j) => (
                                      <li key={j}>• {pro}</li>
                                    ))}
                                  </ul>
                                </div>
                                <div>
                                  <span className="text-orange-400 text-xs font-medium">Cons:</span>
                                  <ul className="text-xs text-muted-foreground">
                                    {platform.cons.map((con, j) => (
                                      <li key={j}>• {con}</li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                              
                              <div className="text-xs text-muted-foreground space-y-1">
                                <div><strong>Pricing:</strong> {platform.pricing}</div>
                                <div><strong>Setup:</strong> {platform.setupTime}</div>
                              </div>
                              
                              <div className="mt-3 p-2 bg-matrix-primary/10 rounded text-xs text-matrix-primary">
                                {platform.recommendation}
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-6">
                          <h4 className="text-blue-400 font-semibold mb-4">{module.content.decisionTree.title}</h4>
                          <div className="space-y-3">
                            {module.content.decisionTree.questions.map((q, i) => (
                              <div key={i} className="bg-muted/50 rounded p-3">
                                <div className="text-foreground font-medium mb-1">{q.question}</div>
                                <div className="text-blue-300 mb-1">{q.answer}</div>
                                <div className="text-muted-foreground text-sm">{q.explanation}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Module 5: First Project */}
                    {index === 4 && (
                      <div className="space-y-6">
                        <div className="bg-matrix-primary/10 border border-matrix-primary/20 rounded-lg p-4">
                          <p className="text-matrix-primary font-medium">{module.content.overview}</p>
                        </div>

                        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-6">
                          <h4 className="text-green-400 font-semibold mb-3">{module.content.project.title}</h4>
                          <div className="space-y-2">
                            <div><strong>Goal:</strong> {module.content.project.goal}</div>
                            <div><strong>What you'll build:</strong> {module.content.project.whatYoullBuild}</div>
                          </div>
                        </div>

                        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                          <h4 className="text-blue-400 font-semibold mb-3">{module.content.prerequisites.title}</h4>
                          <div className="grid grid-cols-2 gap-2">
                            {module.content.prerequisites.items.map((item, i) => (
                              <div key={i} className="flex items-center space-x-2">
                                <CheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0" />
                                <span className="text-blue-300 text-sm">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-6">
                          {module.content.steps.map((step, i) => (
                            <div key={i} className="bg-muted/50 rounded-lg p-6">
                              <div className="flex items-center space-x-3 mb-4">
                                <div className="w-8 h-8 bg-gradient-to-r from-matrix-primary to-matrix-secondary rounded-full flex items-center justify-center">
                                  <span className="text-primary-foreground font-bold text-sm">{step.step}</span>
                                </div>
                                <div>
                                  <h5 className="text-foreground font-semibold">{step.title}</h5>
                                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                    <Clock className="w-3 h-3" />
                                    <span>{step.time}</span>
                                  </div>
                                </div>
                              </div>
                              
                              <p className="text-muted-foreground mb-4">{step.description}</p>
                              
                              <div className="space-y-3">
                                <div>
                                  <h6 className="text-foreground font-medium mb-2">Instructions:</h6>
                                  <ol className="space-y-1">
                                    {step.instructions.map((instruction, j) => (
                                      <li key={j} className="flex items-start space-x-2">
                                        <span className="text-matrix-primary font-medium text-sm">{j + 1}.</span>
                                        <span className="text-muted-foreground text-sm">{instruction}</span>
                                      </li>
                                    ))}
                                  </ol>
                                </div>

                                {step.sampleData && (
                                  <div>
                                    <h6 className="text-foreground font-medium mb-2">Sample Data:</h6>
                                    <pre className="bg-card border border-border rounded p-3 text-xs text-muted-foreground overflow-x-auto">
                                      {step.sampleData}
                                    </pre>
                                  </div>
                                )}

                                {step.promptTemplate && (
                                  <div>
                                    <h6 className="text-foreground font-medium mb-2">Prompt Template:</h6>
                                    <pre className="bg-card border border-border rounded p-3 text-xs text-muted-foreground whitespace-pre-wrap">
                                      {step.promptTemplate}
                                    </pre>
                                  </div>
                                )}

                                {step.testQuestions && (
                                  <div>
                                    <h6 className="text-foreground font-medium mb-2">Test Questions:</h6>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                      {step.testQuestions.map((question, j) => (
                                        <div key={j} className="bg-matrix-primary/10 border border-matrix-primary/20 rounded p-2">
                                          <span className="text-matrix-primary text-sm">"{question}"</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {step.tips && (
                                  <div>
                                    <h6 className="text-green-400 font-medium mb-2">💡 Tips:</h6>
                                    <ul className="space-y-1">
                                      {step.tips.map((tip, j) => (
                                        <li key={j} className="flex items-start space-x-2">
                                          <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                                          <span className="text-green-300 text-sm">{tip}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}

                                {step.troubleshooting && (
                                  <div>
                                    <h6 className="text-orange-400 font-medium mb-2">🔧 Troubleshooting:</h6>
                                    <ul className="space-y-1">
                                      {step.troubleshooting.map((item, j) => (
                                        <li key={j} className="flex items-start space-x-2">
                                          <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                                          <span className="text-orange-300 text-sm">{item}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="bg-gradient-to-r from-green-500/20 to-teal-600/20 border border-green-500/30 rounded-lg p-6 text-center">
                          <h4 className="text-green-400 font-bold text-xl mb-2">{module.content.celebration.title}</h4>
                          <p className="text-green-300 mb-4">{module.content.celebration.message}</p>
                          <div>
                            <h5 className="text-foreground font-medium mb-2">Next Steps:</h5>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {module.content.celebration.nextSteps.map((step, i) => (
                                <div key={i} className="flex items-center space-x-2">
                                  <ArrowRight className="w-4 h-4 text-green-400 flex-shrink-0" />
                                  <span className="text-green-300 text-sm">{step}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Module 6: Use Cases */}
                    {index === 5 && (
                      <div className="space-y-6">
                        <div className="bg-matrix-primary/10 border border-matrix-primary/20 rounded-lg p-4">
                          <p className="text-matrix-primary font-medium">{module.content.overview}</p>
                        </div>

                        <div className="space-y-6">
                          {module.content.useCases.map((useCase, i) => (
                            <div key={i} className="bg-muted/50 rounded-lg p-6">
                              <h5 className="text-foreground font-semibold mb-3">{useCase.role}</h5>
                              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                <div className="space-y-3">
                                  <div>
                                    <span className="text-destructive font-medium">Challenge: </span>
                                    <span className="text-muted-foreground">{useCase.challenge}</span>
                                  </div>
                                  <div>
                                    <span className="text-matrix-primary font-medium">Solution: </span>
                                    <span className="text-muted-foreground">{useCase.solution}</span>
                                  </div>
                                  <div className="bg-green-500/10 border border-green-500/20 rounded p-3">
                                    <span className="text-green-400 font-medium">Results: </span>
                                    <span className="text-green-300">{useCase.results}</span>
                                  </div>
                                </div>
                                <div>
                                  <div className="bg-blue-500/10 border border-blue-500/20 rounded p-3 mb-3">
                                    <span className="text-blue-400 font-medium">Example: </span>
                                    <span className="text-blue-300 italic">"{useCase.example}"</span>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground font-medium">Tools used: </span>
                                    <div className="flex flex-wrap gap-1 mt-1">
                                      {useCase.tools.map((tool, j) => (
                                        <span key={j} className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs">
                                          {tool}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div>
                          <h4 className="text-foreground font-semibold mb-4">Industry Examples</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {module.content.industryExamples.map((example, i) => (
                              <div key={i} className="bg-card border border-border rounded p-4">
                                <h5 className="text-foreground font-medium mb-2">{example.industry}</h5>
                                <p className="text-muted-foreground text-sm mb-2">{example.useCase}</p>
                                <p className="text-green-400 text-sm">{example.benefit}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Module 7: Security */}
                    {index === 6 && (
                      <div className="space-y-6">
                        <div className="bg-matrix-primary/10 border border-matrix-primary/20 rounded-lg p-4">
                          <p className="text-matrix-primary font-medium">{module.content.overview}</p>
                        </div>

                        <div className="space-y-4">
                          {module.content.securityPrinciples.map((principle, i) => (
                            <div key={i} className="bg-muted/50 rounded-lg p-4">
                              <h5 className="text-foreground font-semibold mb-2">{principle.principle}</h5>
                              <p className="text-muted-foreground mb-3">{principle.explanation}</p>
                              <div className="bg-green-500/10 border border-green-500/20 rounded p-3">
                                <span className="text-green-400 font-medium">Example: </span>
                                <span className="text-green-300 text-sm">{principle.example}</span>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="space-y-4">
                          {module.content.bestPractices.map((category, i) => (
                            <div key={i} className="bg-card border border-border rounded-lg p-4">
                              <h5 className="text-foreground font-semibold mb-3">{category.category}</h5>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {category.practices.map((practice, j) => (
                                  <div key={j} className="flex items-start space-x-2">
                                    <CheckCircle className="w-4 h-4 text-matrix-primary mt-0.5 flex-shrink-0" />
                                    <span className="text-muted-foreground text-sm">{practice}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4">
                          <h4 className="text-destructive font-semibold mb-3">{module.content.redFlags.title}</h4>
                          <ul className="space-y-2">
                            {module.content.redFlags.situations.map((situation, i) => (
                              <li key={i} className="flex items-start space-x-2">
                                <div className="w-1.5 h-1.5 bg-destructive rounded-full mt-2 flex-shrink-0"></div>
                                <span className="text-destructive text-sm">{situation}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                          <h4 className="text-blue-400 font-semibold mb-3">Questions to Ask Any MCP Provider</h4>
                          <div className="space-y-2">
                            {module.content.questionsToAsk.map((question, i) => (
                              <div key={i} className="text-blue-300 text-sm">❓ {question}</div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Module 8: Next Steps */}
                    {index === 7 && (
                      <div className="space-y-6">
                        <div className="bg-matrix-primary/10 border border-matrix-primary/20 rounded-lg p-4">
                          <p className="text-matrix-primary font-medium">{module.content.overview}</p>
                        </div>

                        <div className="space-y-6">
                          {module.content.immediateNextSteps.map((step, i) => (
                            <div key={i} className="bg-muted/50 rounded-lg p-6">
                              <h5 className="text-foreground font-semibold mb-3">{step.title}</h5>
                              <p className="text-muted-foreground mb-4">{step.description}</p>
                              <div className="space-y-2">
                                {(step.actions || step.suggestions || step.benefits).map((item, j) => (
                                  <div key={j} className="flex items-start space-x-2">
                                    <ArrowRight className="w-4 h-4 text-matrix-primary mt-0.5 flex-shrink-0" />
                                    <span className="text-muted-foreground text-sm">{item}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>

                        <div>
                          <h4 className="text-foreground font-semibold mb-4">Advanced Concepts (For Later)</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {module.content.advancedConcepts.map((concept, i) => (
                              <div key={i} className="bg-card border border-border rounded p-4">
                                <h5 className="text-foreground font-medium mb-2">{concept.title}</h5>
                                <p className="text-muted-foreground text-sm mb-2">{concept.description}</p>
                                <div className="bg-blue-500/10 border border-blue-500/20 rounded p-2 mb-2">
                                  <span className="text-blue-400 text-xs">Example: </span>
                                  <span className="text-blue-300 text-xs">{concept.example}</span>
                                </div>
                                <div className="text-orange-400 text-xs">{concept.whenReady}</div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-6">
                          <h4 className="text-green-400 font-semibold mb-4">{module.content.learningPath.title}</h4>
                          <div className="space-y-4">
                            {module.content.learningPath.phases.map((phase, i) => (
                              <div key={i} className="bg-muted/50 rounded p-4">
                                <h5 className="text-foreground font-medium mb-2">{phase.phase}</h5>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <span className="text-green-400 font-medium text-sm">Goals:</span>
                                    <ul className="text-sm text-muted-foreground">
                                      {phase.goals.map((goal, j) => (
                                        <li key={j}>• {goal}</li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div>
                                    <span className="text-blue-400 font-medium text-sm">Resources:</span>
                                    <ul className="text-sm text-muted-foreground">
                                      {phase.resources.map((resource, j) => (
                                        <li key={j}>• {resource}</li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-foreground font-semibold mb-4">Continue Your Journey</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {module.content.resources.map((resource, i) => (
                              <Link
                                key={i}
                                to={resource.link}
                                className="bg-card border border-border rounded p-4 hover:bg-muted/50 transition-colors duration-200"
                              >
                                <h5 className="text-foreground font-medium mb-2">{resource.title}</h5>
                                <p className="text-muted-foreground text-sm mb-2">{resource.description}</p>
                                <div className="flex items-center space-x-1 text-matrix-primary">
                                  <span className="text-sm">Learn more</span>
                                  <ArrowRight className="w-3 h-3" />
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Course Completion */}
        {user && completedSteps.length === courseModules.length && (
          <div className="mt-12 bg-gradient-to-r from-green-500/20 to-teal-600/20 border border-green-500/30 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold text-foreground mb-4">🎉 Course Complete!</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Congratulations! You've completed the MCP Basics course. You now have the knowledge to build your own AI-powered solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/start-building"
                className="bg-gradient-to-r from-matrix-primary to-matrix-secondary hover:from-matrix-accent hover:to-matrix-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold transition-all duration-200"
              >
                Start Your First Project
              </Link>
              <Link
                to="/templates"
                className="border border-border text-foreground px-8 py-3 rounded-lg font-semibold hover:bg-muted transition-colors duration-200"
              >
                Browse Templates
              </Link>
            </div>
          </div>
        )}

        {/* Call to Action for Non-Completed */}
        {(!user || completedSteps.length < courseModules.length) && (
          <div className="mt-12 bg-gradient-to-r from-matrix-primary/20 to-matrix-secondary/20 border border-matrix-primary/30 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold text-foreground mb-4">Ready to Transform Your Work?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              This comprehensive course gives you everything you need to understand and implement MCP, even if you've never done anything technical before.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {!user ? (
                <button className="bg-gradient-to-r from-matrix-primary to-matrix-secondary hover:from-matrix-accent hover:to-matrix-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold transition-all duration-200">
                  Sign Up to Track Progress
                </button>
              ) : (
                <Link
                  to="/templates"
                  className="bg-gradient-to-r from-matrix-primary to-matrix-secondary hover:from-matrix-accent hover:to-matrix-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold transition-all duration-200"
                >
                  Try a Template
                </Link>
              )}
              <Link
                to="/join-community"
                className="border border-border text-foreground px-8 py-3 rounded-lg font-semibold hover:bg-muted transition-colors duration-200"
              >
                Join Community
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}