import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Download, Copy, Check, Star, Users, MessageSquare, Workflow, Database, Calendar, BarChart3, Filter, ExternalLink, FileDown, Code, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useAchievements } from '../hooks/useAchievements';

function Templates() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [copiedTemplate, setCopiedTemplate] = useState('');
  const [downloadingTemplate, setDownloadingTemplate] = useState('');
  const { user } = useAuth();
  const { markTemplateUsed } = useAchievements();

  const categories = [
    { id: 'all', name: 'All Templates', icon: Database },
    { id: 'community', name: 'Community Management', icon: Users },
    { id: 'marketing', name: 'Marketing & Growth', icon: MessageSquare },
    { id: 'project', name: 'Project Management', icon: Workflow },
    { id: 'sales', name: 'Sales & Business', icon: BarChart3 },
    { id: 'operations', name: 'Operations', icon: Calendar }
  ];

  const platforms = [
    { id: 'all', name: 'All Platforms' },
    { id: 'zapier', name: 'Zapier' },
    { id: 'power-platform', name: 'Microsoft Power Platform' },
    { id: 'airtable', name: 'Airtable' },
    { id: 'notion', name: 'Notion' },
    { id: 'bubble', name: 'Bubble' },
    { id: 'make', name: 'Make.com' }
  ];

  const templates = [
    {
      id: 1,
      title: 'Community Member Q&A Bot',
      description: 'Automatically answer questions about community members using spreadsheet data',
      category: 'community',
      platform: 'zapier',
      difficulty: 'Beginner',
      rating: 4.8,
      downloads: 1247,
      dataSource: 'Google Sheets',
      aiModel: 'ChatGPT',
      features: [
        'Member lookup by name or role',
        'Contribution statistics',
        'Contact information sharing',
        'Automated responses'
      ],
      setupTime: '30 minutes',
      preview: `// Sample MCP Configuration
{
  "name": "Community Helper",
  "dataSource": "community-members.csv",
  "queries": [
    "Who is our top contributor?",
    "Find marketing team members",
    "What's Sarah's email?"
  ]
}`,
      tags: ['community', 'q&a', 'automation'],
      files: [
        {
          name: 'community-members.csv',
          content: `Name,Role,Contributions,Email,Join_Date
Sarah Chen,Community Manager,45,sarah@example.com,2024-01-15
Mike Rodriguez,Developer,38,mike@example.com,2024-02-01
Lisa Park,Designer,42,lisa@example.com,2024-01-20
David Kim,Marketing,29,david@example.com,2024-02-10`
        },
        {
          name: 'zapier-config.json',
          content: `{
  "trigger": {
    "type": "webhook",
    "name": "Community Question"
  },
  "action": {
    "type": "google_sheets_lookup",
    "spreadsheet": "community-members",
    "ai_integration": {
      "model": "gpt-3.5-turbo",
      "prompt": "Answer questions about community members using the provided data"
    }
  }
}`
        },
        {
          name: 'setup-instructions.md',
          content: `# Community Q&A Bot Setup

## Prerequisites
- Google Sheets account
- Zapier account (free tier works)
- ChatGPT API access

## Step 1: Prepare Your Data
1. Create a new Google Sheet
2. Import the community-members.csv file
3. Make sure columns are: Name, Role, Contributions, Email, Join_Date

## Step 2: Set Up Zapier
1. Create a new Zap
2. Set trigger as "Webhooks by Zapier"
3. Choose "Catch Hook"
4. Copy the webhook URL

## Step 3: Configure AI Integration
1. Add "OpenAI (ChatGPT)" action
2. Use the provided prompt template
3. Connect your Google Sheet as data source

## Step 4: Test Your Bot
Try these sample questions:
- "Who is our top contributor?"
- "Find all marketing team members"
- "What's Sarah's email address?"

## Troubleshooting
- Ensure your Google Sheet is shared with Zapier
- Check API key permissions
- Verify webhook URL is correct`
        }
      ]
    },
    {
      id: 2,
      title: 'Customer Segmentation Assistant',
      description: 'Generate personalized marketing campaigns based on customer data',
      category: 'marketing',
      platform: 'airtable',
      difficulty: 'Intermediate',
      rating: 4.9,
      downloads: 892,
      dataSource: 'Airtable Base',
      aiModel: 'Claude',
      features: [
        'Automatic customer segmentation',
        'Personalized email generation',
        'Campaign performance tracking',
        'A/B testing suggestions'
      ],
      setupTime: '2 hours',
      preview: `// Customer Segmentation Logic
{
  "segments": {
    "enterprise": "revenue > 10000",
    "smb": "revenue < 10000 AND employees < 50",
    "startup": "founded_date > 2020"
  },
  "campaigns": {
    "enterprise": "focus_on_scale_and_security",
    "smb": "emphasize_cost_effectiveness"
  }
}`,
      tags: ['marketing', 'segmentation', 'personalization'],
      files: [
        {
          name: 'customer-data-template.csv',
          content: `Company,Industry,Revenue,Employees,Founded_Date,Contact_Email
Acme Corp,Technology,50000,25,2020-01-15,contact@acme.com
Beta Inc,Healthcare,150000,100,2018-05-20,hello@beta.com
Gamma LLC,Finance,25000,10,2022-03-10,info@gamma.com`
        },
        {
          name: 'airtable-base-config.json',
          content: `{
  "base_name": "Customer Segmentation",
  "tables": {
    "customers": {
      "fields": [
        {"name": "Company", "type": "singleLineText"},
        {"name": "Industry", "type": "singleSelect"},
        {"name": "Revenue", "type": "currency"},
        {"name": "Employees", "type": "number"},
        {"name": "Segment", "type": "formula"}
      ]
    }
  },
  "automations": {
    "segment_customers": {
      "trigger": "record_created",
      "action": "run_script"
    }
  }
}`
        }
      ]
    },
    {
      id: 3,
      title: 'Project Status Reporter',
      description: 'Generate automated project status reports from task management data',
      category: 'project',
      platform: 'notion',
      difficulty: 'Beginner',
      rating: 4.7,
      downloads: 1156,
      dataSource: 'Notion Database',
      aiModel: 'GPT-4',
      features: [
        'Weekly status reports',
        'Risk identification',
        'Resource allocation insights',
        'Timeline predictions'
      ],
      setupTime: '45 minutes',
      preview: `// Project Report Template
{
  "report_sections": [
    "project_overview",
    "completed_tasks",
    "upcoming_milestones",
    "risks_and_blockers"
  ],
  "metrics": ["completion_rate", "budget_usage", "team_velocity"]
}`,
      tags: ['project-management', 'reporting', 'automation'],
      files: [
        {
          name: 'notion-database-template.json',
          content: `{
  "database_name": "Project Tracker",
  "properties": {
    "Task": {"type": "title"},
    "Status": {"type": "select", "options": ["Not Started", "In Progress", "Completed", "Blocked"]},
    "Assignee": {"type": "person"},
    "Due Date": {"type": "date"},
    "Priority": {"type": "select", "options": ["Low", "Medium", "High", "Critical"]},
    "Project": {"type": "relation"}
  }
}`
        }
      ]
    },
    {
      id: 4,
      title: 'Sales Lead Scorer',
      description: 'Automatically score and prioritize sales leads based on historical data',
      category: 'sales',
      platform: 'power-platform',
      difficulty: 'Advanced',
      rating: 4.6,
      downloads: 634,
      dataSource: 'Dynamics 365',
      aiModel: 'Azure OpenAI',
      features: [
        'Lead scoring algorithm',
        'Conversion probability',
        'Next best action suggestions',
        'Pipeline forecasting'
      ],
      setupTime: '4 hours',
      preview: `// Lead Scoring Model
{
  "scoring_factors": {
    "company_size": 0.3,
    "industry_match": 0.25,
    "engagement_level": 0.2,
    "budget_authority": 0.25
  },
  "thresholds": {
    "hot": 80,
    "warm": 60,
    "cold": 40
  }
}`,
      tags: ['sales', 'lead-scoring', 'crm'],
      files: [
        {
          name: 'power-automate-flow.json',
          content: `{
  "definition": {
    "triggers": {
      "when_lead_created": {
        "type": "CommonDataServiceV2",
        "inputs": {
          "entityName": "leads"
        }
      }
    },
    "actions": {
      "score_lead": {
        "type": "Http",
        "inputs": {
          "method": "POST",
          "uri": "https://api.openai.com/v1/completions",
          "headers": {
            "Authorization": "Bearer @{parameters('openai_api_key')}"
          }
        }
      }
    }
  }
}`
        }
      ]
    },
    {
      id: 5,
      title: 'Content Recommendation Engine',
      description: 'Suggest relevant content to users based on their behavior and preferences',
      category: 'marketing',
      platform: 'bubble',
      difficulty: 'Intermediate',
      rating: 4.5,
      downloads: 723,
      dataSource: 'User Analytics',
      aiModel: 'OpenAI',
      features: [
        'Personalized content suggestions',
        'Engagement optimization',
        'Content performance analysis',
        'User journey mapping'
      ],
      setupTime: '3 hours',
      preview: `// Content Recommendation Logic
{
  "user_preferences": ["topic", "format", "difficulty"],
  "content_matching": {
    "similarity_threshold": 0.7,
    "recency_weight": 0.3,
    "popularity_weight": 0.2
  }
}`,
      tags: ['content', 'recommendations', 'personalization'],
      files: [
        {
          name: 'bubble-workflow.json',
          content: `{
  "workflow_name": "Content Recommendation",
  "trigger": "Page is loaded",
  "actions": [
    {
      "step": 1,
      "action": "Get user preferences",
      "data_source": "User table"
    },
    {
      "step": 2,
      "action": "Call API",
      "endpoint": "OpenAI recommendations"
    }
  ]
}`
        }
      ]
    },
    {
      id: 6,
      title: 'Employee Onboarding Assistant',
      description: 'Help new employees find information and complete onboarding tasks',
      category: 'operations',
      platform: 'power-platform',
      difficulty: 'Beginner',
      rating: 4.8,
      downloads: 945,
      dataSource: 'SharePoint',
      aiModel: 'Azure AI',
      features: [
        'Policy Q&A',
        'Process guidance',
        'Document recommendations',
        'Progress tracking'
      ],
      setupTime: '1 hour',
      preview: `// Onboarding Assistant Config
{
  "knowledge_base": "hr_documents",
  "common_questions": [
    "What are the vacation policies?",
    "How do I submit expenses?",
    "Who is my IT contact?"
  ]
}`,
      tags: ['hr', 'onboarding', 'knowledge-base'],
      files: [
        {
          name: 'sharepoint-setup.md',
          content: `# SharePoint Knowledge Base Setup

## Document Structure
- Policies/
  - Vacation Policy.pdf
  - Remote Work Policy.pdf
  - Expense Policy.pdf
- Processes/
  - Onboarding Checklist.pdf
  - IT Setup Guide.pdf
- Contacts/
  - Team Directory.xlsx
  - Emergency Contacts.pdf

## Power Platform Configuration
1. Create Power Virtual Agent
2. Connect to SharePoint document library
3. Configure AI to search documents
4. Set up common Q&A topics`
        }
      ]
    },
    {
      id: 7,
      title: 'Secure Enterprise MCP Bridge',
      description: 'Connect AI to enterprise systems with enhanced security and compliance',
      category: 'operations',
      platform: 'power-platform',
      difficulty: 'Advanced',
      rating: 4.7,
      downloads: 512,
      dataSource: 'Multiple Enterprise Systems',
      aiModel: 'Azure OpenAI',
      features: [
        'Role-based access control',
        'Audit logging',
        'Data encryption',
        'Compliance reporting'
      ],
      setupTime: '5 hours',
      preview: `// Enterprise Security Configuration
{
  "access_control": {
    "roles": ["viewer", "editor", "admin"],
    "permissions": {
      "viewer": ["read"],
      "editor": ["read", "write"],
      "admin": ["read", "write", "delete", "configure"]
    }
  },
  "audit": {
    "log_retention": "90 days",
    "events_to_log": ["access", "query", "modification"]
  }
}`,
      tags: ['security', 'enterprise', 'compliance'],
      files: [
        {
          name: 'security-setup.md',
          content: `# Enterprise Security Setup

## Security Configuration
1. Set up Azure AD integration
2. Configure role-based access control
3. Enable audit logging
4. Set up data encryption
5. Configure compliance reporting

## Compliance Features
- GDPR compliance tools
- HIPAA security features
- SOC 2 audit support
- PCI DSS compliance options`
        }
      ]
    }
  ];

  const filteredTemplates = templates.filter(template => {
    const categoryMatch = selectedCategory === 'all' || template.category === selectedCategory;
    const platformMatch = selectedPlatform === 'all' || template.platform === selectedPlatform;
    return categoryMatch && platformMatch;
  });

  const copyTemplate = (templateId: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedTemplate(templateId);
    setTimeout(() => setCopiedTemplate(''), 2000);
  };

  const downloadTemplate = async (template: any) => {
    setDownloadingTemplate(template.id.toString());
    
    try {
      // Track template usage for achievements
      if (user) {
        markTemplateUsed(template.id.toString());
        console.log(`Template ${template.id} downloaded by user ${user.id}`);
      }

      // Create a zip-like structure by downloading individual files
      if (template.files && template.files.length > 0) {
        // For demo purposes, we'll download the first file or create a combined file
        const mainFile = template.files[0];
        const blob = new Blob([mainFile.content], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${template.title.replace(/\s+/g, '-').toLowerCase()}-${mainFile.name}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

        // If there are multiple files, download them sequentially
        if (template.files.length > 1) {
          for (let i = 1; i < template.files.length; i++) {
            setTimeout(() => {
              const file = template.files[i];
              const blob = new Blob([file.content], { type: 'text/plain' });
              const url = window.URL.createObjectURL(blob);
              const link = document.createElement('a');
              link.href = url;
              link.download = `${template.title.replace(/\s+/g, '-').toLowerCase()}-${file.name}`;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              window.URL.revokeObjectURL(url);
            }, i * 500); // Stagger downloads by 500ms
          }
        }
      } else {
        // Fallback: download the preview code as a file
        const blob = new Blob([template.preview], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${template.title.replace(/\s+/g, '-').toLowerCase()}-config.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }

      // Update download count (in a real app, this would be sent to the server)
      console.log(`Template "${template.title}" downloaded. New download count: ${template.downloads + 1}`);
      
    } catch (error) {
      console.error('Error downloading template:', error);
      alert('Error downloading template. Please try again.');
    } finally {
      setDownloadingTemplate('');
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500/20 text-green-400';
      case 'Intermediate': return 'bg-yellow-500/20 text-yellow-400';
      case 'Advanced': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">MCP Template Library</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Ready-to-use templates to jumpstart your MCP projects. No coding required!
          </p>
          {user && (
            <div className="mt-4 text-green-300">
              ✅ Signed in - Template usage will be tracked for achievements!
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

          {/* Platform Filter */}
          <div className="flex flex-wrap gap-2">
            {platforms.map((platform) => (
              <button
                key={platform.id}
                onClick={() => setSelectedPlatform(platform.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  selectedPlatform === platform.id
                    ? 'bg-purple-600 text-white'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10'
                }`}
              >
                {platform.name}
              </button>
            ))}
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredTemplates.map((template) => (
            <div key={template.id} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-300">
              {/* Header */}
              <div className="p-6 border-b border-white/10">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-semibold text-white">{template.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(template.difficulty)}`}>
                    {template.difficulty}
                  </span>
                </div>
                
                <p className="text-gray-300 mb-4">{template.description}</p>
                
                {/* Stats */}
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className="text-yellow-400">{template.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Download className="w-4 h-4 text-green-400" />
                    <span className="text-green-400">{template.downloads.toLocaleString()}</span>
                  </div>
                  <div className="text-gray-400">
                    Setup: {template.setupTime}
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="p-6">
                {/* Tech Stack */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <span className="text-gray-400 text-sm">Platform:</span>
                    <div className="text-blue-300 font-medium capitalize">{template.platform.replace('-', ' ')}</div>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm">AI Model:</span>
                    <div className="text-purple-300 font-medium">{template.aiModel}</div>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm">Data Source:</span>
                    <div className="text-green-300 font-medium">{template.dataSource}</div>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm">Category:</span>
                    <div className="text-orange-300 font-medium capitalize">{template.category.replace('-', ' ')}</div>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-4">
                  <h4 className="text-white font-medium mb-2">Key Features:</h4>
                  <div className="grid grid-cols-2 gap-1">
                    {template.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {template.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-700/50 text-gray-300 rounded text-xs">
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Preview Code */}
                <div className="bg-slate-900/50 rounded-lg overflow-hidden mb-4">
                  <div className="flex items-center justify-between p-3 border-b border-white/10">
                    <span className="text-gray-300 text-sm font-medium">Configuration Preview</span>
                    <button
                      onClick={() => copyTemplate(template.id.toString(), template.preview)}
                      className="flex items-center space-x-1 text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {copiedTemplate === template.id.toString() ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                      <span className="text-xs">Copy</span>
                    </button>
                  </div>
                  <pre className="p-3 text-xs text-gray-300 overflow-x-auto">
                    <code>{template.preview}</code>
                  </pre>
                </div>

                {/* Template Files Info */}
                {template.files && template.files.length > 0 && (
                  <div className="mb-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <FileDown className="w-4 h-4 text-blue-400" />
                      <span className="text-blue-300 font-medium text-sm">Includes {template.files.length} files:</span>
                    </div>
                    <div className="space-y-1">
                      {template.files.map((file, index) => (
                        <div key={index} className="text-blue-200 text-xs">
                          • {file.name}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex space-x-3">
                  <button 
                    onClick={() => downloadTemplate(template)}
                    disabled={downloadingTemplate === template.id.toString()}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    {downloadingTemplate === template.id.toString() ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Downloading...</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4" />
                        <span>Download Template</span>
                      </>
                    )}
                  </button>
                  <Link
                    to="/demo"
                    className="flex-1 border border-white/20 text-white px-4 py-2 rounded-lg font-medium hover:bg-white/10 transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>View Demo</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">No templates found for the selected filters.</div>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedPlatform('all');
              }}
              className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Block Goose Template */}
        <div className="mt-12 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-xl p-8">
          <div className="flex items-center space-x-4 mb-6">
            <div className="text-4xl">🔒</div>
            <div>
              <h3 className="text-2xl font-bold text-white">Block Goose Enterprise Security</h3>
              <p className="text-blue-300">Secure MCP server for enterprise applications with enhanced security controls</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Enterprise-Grade Security</h4>
              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2"></div>
                  <span className="text-gray-300">Role-based access control with fine-grained permissions</span>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2"></div>
                  <span className="text-gray-300">End-to-end encryption for sensitive data</span>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2"></div>
                  <span className="text-gray-300">Comprehensive audit logging and compliance reporting</span>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2"></div>
                  <span className="text-gray-300">Data residency controls and sovereignty features</span>
                </div>
              </div>
              
              <div className="mt-6">
                <a 
                  href="https://github.com/block/goose" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 inline-flex items-center space-x-2"
                >
                  <span>View on GitHub</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
            
            <div className="bg-slate-900/50 rounded-lg p-6">
              <h4 className="text-white font-semibold mb-4">Perfect For:</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <Users className="w-4 h-4 text-blue-400" />
                  </div>
                  <span className="text-gray-300">Enterprise organizations with strict security requirements</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <Database className="w-4 h-4 text-green-400" />
                  </div>
                  <span className="text-gray-300">Companies handling sensitive customer or financial data</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <Code className="w-4 h-4 text-purple-400" />
                  </div>
                  <span className="text-gray-300">Organizations in regulated industries (healthcare, finance)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center">
                    <Shield className="w-4 h-4 text-red-400" />
                  </div>
                  <span className="text-gray-300">Teams requiring advanced compliance features</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Need a Custom Template?</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Don't see exactly what you need? Our community creates new templates regularly, or you can request a custom one.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/request-template"
              className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200"
            >
              Request Template
            </Link>
            <Link
              to="/submit-template"
              className="border border-white/20 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors duration-200"
            >
              Submit Your Template
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Templates;