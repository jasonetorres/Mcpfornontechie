import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Download, Copy, Check, Star, Users, MessageSquare, Workflow, Database, Calendar, BarChart3, Filter, ExternalLink, FileDown, Code, Shield, Search, Tag, Clock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useAchievements } from '../hooks/useAchievements';

function Templates() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedTemplate, setCopiedTemplate] = useState('');
  const [downloadingTemplate, setDownloadingTemplate] = useState('');
  const { user } = useAuth();
  const { markTemplateUsed } = useAchievements();

  const categories = [
    { id: 'all', name: 'All Templates', icon: Database },
    { id: 'community', name: 'Community', icon: Users },
    { id: 'marketing', name: 'Marketing', icon: MessageSquare },
    { id: 'project', name: 'Project', icon: Workflow },
    { id: 'sales', name: 'Sales', icon: BarChart3 },
    { id: 'operations', name: 'Operations', icon: Calendar }
  ];

  const platforms = [
    { id: 'all', name: 'All Platforms' },
    { id: 'zapier', name: 'Zapier' },
    { id: 'power-platform', name: 'Power Platform' },
    { id: 'airtable', name: 'Airtable' },
    { id: 'notion', name: 'Notion' },
    { id: 'bubble', name: 'Bubble' },
    { id: 'make', name: 'Make.com' }
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
    },
    {
      name: 'AgentQL MCP Server',
      description: 'For data extraction capabilities',
      url: 'https://github.com/agentql/agentql-mcp'
    },
    {
      name: 'Google Keep MCP Server',
      description: 'For Google Keep notes management',
      url: 'https://github.com/keep-mcp/keep-mcp'
    }
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
      title: 'Twilio Customer Messaging',
      description: 'Send personalized messages to customers based on their data and behavior',
      category: 'marketing',
      platform: 'zapier',
      difficulty: 'Beginner',
      rating: 4.7,
      downloads: 856,
      dataSource: 'CRM Data',
      aiModel: 'Claude',
      features: [
        'Personalized SMS campaigns',
        'Automated follow-ups',
        'Engagement tracking',
        'Response analysis'
      ],
      setupTime: '1 hour',
      preview: `// Personalized Messaging Flow
{
  "trigger": "new_customer_event",
  "data_source": "customer_database",
  "message_template": "Hi {{customer.first_name}}, {{ai_generated_message}}",
  "follow_up": {
    "delay": "3 days",
    "condition": "no_response"
  }
}`,
      tags: ['messaging', 'customer-engagement', 'automation'],
      files: [
        {
          name: 'customer-message-templates.json',
          content: `{
  "welcome": "Welcome to our service! We're excited to have you join us.",
  "follow_up": "We noticed you haven't completed your profile yet. Need any help?",
  "re_engagement": "We miss you! Here's what you've been missing...",
  "special_offer": "As a valued customer, we have a special offer just for you!"
}`
        }
      ]
    },
    {
      id: 8,
      title: 'GitHub PR Reviewer',
      description: 'Automatically review and summarize pull requests for faster code reviews',
      category: 'operations',
      platform: 'make',
      difficulty: 'Intermediate',
      rating: 4.6,
      downloads: 712,
      dataSource: 'GitHub Repositories',
      aiModel: 'GPT-4',
      features: [
        'Code change summaries',
        'Potential issue detection',
        'Best practice suggestions',
        'Documentation checks'
      ],
      setupTime: '2 hours',
      preview: `// PR Review Configuration
{
  "repo_access": {
    "owner": "{{repo_owner}}",
    "repo": "{{repo_name}}",
    "branch": "{{branch_name}}"
  },
  "review_focus": [
    "code_quality",
    "security_issues",
    "performance_concerns",
    "documentation"
  ]
}`,
      tags: ['development', 'code-review', 'github'],
      files: [
        {
          name: 'review-template.md',
          content: `# PR Review Summary

## Overview
{{pr_summary}}

## Key Changes
{{key_changes}}

## Potential Issues
{{potential_issues}}

## Recommendations
{{recommendations}}

---
*This review was generated automatically using GitHub PR Reviewer*`
        }
      ]
    },
    {
      id: 9,
      title: 'AgentQL Web Data Extractor',
      description: 'Extract structured data from websites for analysis and automation',
      category: 'operations',
      platform: 'zapier',
      difficulty: 'Beginner',
      rating: 4.5,
      downloads: 678,
      dataSource: 'Web Pages',
      aiModel: 'Claude',
      features: [
        'Structured data extraction',
        'Regular monitoring',
        'Change detection',
        'Data transformation'
      ],
      setupTime: '30 minutes',
      preview: `// Web Data Extraction Config
{
  "url": "https://example.com/data-page",
  "extraction_targets": [
    {
      "name": "product_prices",
      "selector": "table.products tr",
      "fields": ["name", "price", "availability"]
    }
  ],
  "schedule": "daily"
}`,
      tags: ['web-scraping', 'data-extraction', 'monitoring'],
      files: [
        {
          name: 'extraction-schema.json',
          content: `{
  "schemas": [
    {
      "name": "product",
      "fields": [
        {"name": "name", "type": "string"},
        {"name": "price", "type": "number"},
        {"name": "currency", "type": "string"},
        {"name": "availability", "type": "boolean"},
        {"name": "description", "type": "string"},
        {"name": "image_url", "type": "string"}
      ]
    },
    {
      "name": "article",
      "fields": [
        {"name": "title", "type": "string"},
        {"name": "author", "type": "string"},
        {"name": "date", "type": "date"},
        {"name": "content", "type": "string"},
        {"name": "categories", "type": "array"}
      ]
    }
  ]
}`
        }
      ]
    },
    {
      id: 10,
      title: 'Google Keep Note Manager',
      description: 'Create, update, and organize Google Keep notes with AI assistance',
      category: 'operations',
      platform: 'make',
      difficulty: 'Beginner',
      rating: 4.4,
      downloads: 542,
      dataSource: 'Google Keep',
      aiModel: 'GPT-4',
      features: [
        'Note creation and organization',
        'Content summarization',
        'Task extraction',
        'Reminder management'
      ],
      setupTime: '45 minutes',
      preview: `// Google Keep Integration
{
  "actions": {
    "create_note": {
      "title": "{{generated_title}}",
      "content": "{{note_content}}",
      "labels": ["{{generated_labels}}"]
    },
    "find_notes": {
      "query": "{{search_term}}",
      "limit": 10
    }
  }
}`,
      tags: ['notes', 'productivity', 'organization'],
      files: [
        {
          name: 'note-templates.json',
          content: `{
  "meeting_notes": {
    "title": "Meeting: {{meeting_title}} - {{date}}",
    "content": "# {{meeting_title}}\\n\\n**Date:** {{date}}\\n**Attendees:** {{attendees}}\\n\\n## Agenda\\n{{agenda}}\\n\\n## Discussion\\n{{discussion}}\\n\\n## Action Items\\n{{action_items}}\\n\\n## Next Steps\\n{{next_steps}}"
  },
  "project_idea": {
    "title": "Project Idea: {{project_name}}",
    "content": "# {{project_name}}\\n\\n**Created:** {{date}}\\n\\n## Overview\\n{{overview}}\\n\\n## Goals\\n{{goals}}\\n\\n## Resources Needed\\n{{resources}}\\n\\n## Timeline\\n{{timeline}}"
  }
}`
        }
      ]
    }
  ];

  const filteredTemplates = templates.filter(template => {
    // Apply category and platform filters
    const categoryMatch = selectedCategory === 'all' || template.category === selectedCategory;
    const platformMatch = selectedPlatform === 'all' || template.platform === selectedPlatform;
    
    // Apply search filter if query exists
    const searchMatch = searchQuery === '' || 
      template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return categoryMatch && platformMatch && searchMatch;
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
        <div className="text-center mb-8">
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

        {/* Filters - Moved to top and improved */}
        <div className="glass p-6 rounded-xl mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white flex items-center">
              <Filter className="w-5 h-5 mr-2 text-matrix-primary" />
              Find Your Perfect Template
            </h2>
            <div className="text-sm text-gray-300">
              {filteredTemplates.length} templates available
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search templates by name, description, or tags..."
                className="w-full bg-slate-800 border border-white/20 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400"
              />
            </div>
          </div>
          
          {/* Filter Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Category Filter */}
            <div>
              <label className="block text-white font-medium mb-2">Category</label>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                      selectedCategory === category.id
                        ? 'bg-matrix-primary text-white'
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
            <div>
              <label className="block text-white font-medium mb-2">Platform</label>
              <div className="flex flex-wrap gap-2">
                {platforms.map((platform) => (
                  <button
                    key={platform.id}
                    onClick={() => setSelectedPlatform(platform.id)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
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
          </div>
        </div>

        {/* MCP Servers Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center">
            <Code className="w-5 h-5 mr-2 text-matrix-primary" />
            Available MCP Servers
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {mcpServers.map((server, index) => (
              <a
                key={index}
                href={server.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-3 hover:bg-white/10 transition-all duration-200"
              >
                <h3 className="text-sm font-medium text-white mb-1 truncate">{server.name}</h3>
                <p className="text-gray-400 text-xs truncate">{server.description}</p>
              </a>
            ))}
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <div key={template.id} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-300">
              {/* Header */}
              <div className="p-4 border-b border-white/10">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-white">{template.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(template.difficulty)}`}>
                    {template.difficulty}
                  </span>
                </div>
                
                <p className="text-gray-300 mb-3 text-sm">{template.description}</p>
                
                {/* Stats */}
                <div className="flex items-center space-x-3 text-xs">
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 text-yellow-400" />
                    <span className="text-yellow-400">{template.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Download className="w-3 h-3 text-green-400" />
                    <span className="text-green-400">{template.downloads.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3 text-blue-400" />
                    <span className="text-blue-400">{template.setupTime}</span>
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="p-4">
                {/* Tech Stack */}
                <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
                  <div className="flex items-center space-x-1">
                    <span className="text-gray-400">Platform:</span>
                    <span className="text-blue-300 capitalize">{template.platform.replace('-', ' ')}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-gray-400">AI Model:</span>
                    <span className="text-purple-300">{template.aiModel}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-gray-400">Data:</span>
                    <span className="text-green-300">{template.dataSource}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-gray-400">Category:</span>
                    <span className="text-orange-300 capitalize">{template.category}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-3">
                  <div className="text-xs text-gray-400 mb-1">Key Features:</div>
                  <div className="grid grid-cols-2 gap-1">
                    {template.features.slice(0, 4).map((feature, index) => (
                      <div key={index} className="flex items-center space-x-1 text-xs">
                        <div className="w-1 h-1 bg-matrix-primary rounded-full"></div>
                        <span className="text-gray-300 truncate">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {template.tags.map((tag, index) => (
                    <span key={index} className="px-1.5 py-0.5 bg-gray-700/50 text-gray-300 rounded text-xs">
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Preview Code - Collapsed by default */}
                <div className="bg-slate-900/50 rounded-lg overflow-hidden mb-3 text-xs">
                  <div className="flex items-center justify-between p-2 border-b border-white/10">
                    <span className="text-gray-300 text-xs">Preview</span>
                    <button
                      onClick={() => copyTemplate(template.id.toString(), template.preview)}
                      className="flex items-center space-x-1 text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {copiedTemplate === template.id.toString() ? (
                        <Check className="w-3 h-3" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                      <span className="text-xs">Copy</span>
                    </button>
                  </div>
                  <pre className="p-2 text-xs text-gray-300 overflow-x-auto max-h-20">
                    <code>{template.preview}</code>
                  </pre>
                </div>

                {/* Template Files Info */}
                {template.files && template.files.length > 0 && (
                  <div className="mb-3 p-2 bg-blue-500/10 border border-blue-500/20 rounded-lg text-xs">
                    <div className="flex items-center space-x-1 mb-1">
                      <FileDown className="w-3 h-3 text-blue-400" />
                      <span className="text-blue-300 font-medium">Includes {template.files.length} files</span>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex space-x-2">
                  <button 
                    onClick={() => downloadTemplate(template)}
                    disabled={downloadingTemplate === template.id.toString()}
                    className="flex-1 bg-gradient-to-r from-matrix-primary to-matrix-secondary hover:from-matrix-accent hover:to-matrix-primary disabled:opacity-50 disabled:cursor-not-allowed text-primary-foreground px-3 py-1.5 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-1 text-sm"
                  >
                    {downloadingTemplate === template.id.toString() ? (
                      <>
                        <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Downloading...</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-3 h-3" />
                        <span>Download</span>
                      </>
                    )}
                  </button>
                  <Link
                    to="/demo"
                    className="px-3 py-1.5 border border-white/20 text-white rounded-lg font-medium hover:bg-white/10 transition-colors duration-200 flex items-center justify-center space-x-1 text-sm"
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>Demo</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredTemplates.length === 0 && (
          <div className="text-center py-12 glass rounded-xl">
            <Database className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="heading-sm mb-2">No templates found</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery 
                ? `No results for "${searchQuery}". Try different search terms or filters.` 
                : 'No templates match your selected filters.'}
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedPlatform('all');
                setSearchQuery('');
              }}
              className="btn-primary"
            >
              Clear All Filters
            </button>
          </div>
        )}

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