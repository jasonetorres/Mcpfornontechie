import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Book, Clock, Users, Star, ArrowRight, CheckCircle, Play, Download } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import GuideViewer from '../components/GuideViewer';

function Guides() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedGuide, setSelectedGuide] = useState<number | null>(null);
  const { user } = useAuth();
  const [completedGuides, setCompletedGuides] = useState<number[]>([]);

  // Load completed guides from localStorage
  useEffect(() => {
    if (user) {
      const completed = JSON.parse(localStorage.getItem(`completed-guides-${user.id}`) || '[]');
      setCompletedGuides(completed);
    } else {
      setCompletedGuides([]);
    }
  }, [user]);

  const categories = [
    { id: 'all', name: 'All Guides' },
    { id: 'getting-started', name: 'Getting Started' },
    { id: 'platforms', name: 'Platform Guides' },
    { id: 'use-cases', name: 'Use Cases' },
    { id: 'advanced', name: 'Advanced Topics' }
  ];

  const guides = [
    {
      id: 1,
      title: 'MCP Fundamentals: Your Complete Beginner\'s Guide',
      description: 'Everything you need to understand MCP and why it\'s the future of AI integration',
      category: 'getting-started',
      difficulty: 'Beginner',
      readTime: '30 min',
      rating: 4.9,
      readers: 2847,
      lastUpdated: '2 days ago',
      chapters: [
        'What is MCP and why does it matter?',
        'The USB-C analogy explained',
        'Real-world examples you can relate to',
        'Common misconceptions debunked',
        'Your first steps with MCP'
      ],
      author: 'Sarah Chen',
      authorRole: 'Community Manager',
      content: `# MCP Fundamentals: Your Complete Beginner's Guide

## What is MCP and why does it matter?

MCP stands for Model Context Protocol, an open standard created by Anthropic. Think of MCP as the "USB-C for AI" - a universal connector that lets AI agents access your external systems without coding.

### The Problem in Detail

Before MCP, connecting AI to your data sources was a significant challenge:

- **Generic Responses**: AI models like ChatGPT or Claude could only provide general information based on their training data. They couldn't access your specific spreadsheets, databases, or tools.

- **Custom Development Required**: Each integration between an AI model and a data source required custom code, often involving complex API development.

- **Technical Barriers**: This meant only developers could create these connections, leaving non-technical professionals unable to leverage AI with their own data.

- **Fragmented Ecosystem**: Different AI models had different ways of connecting to external tools, creating a fragmented landscape with no standardization.

- **Security Concerns**: Without a standardized protocol, security practices varied widely, creating potential vulnerabilities.

### The MCP Solution Explained

MCP solves these problems by creating a standardized way for AI models to communicate with external tools and data sources:

- **Universal Protocol**: MCP defines a common language that both AI models and external tools can understand.

- **Standardized Connections**: Instead of building custom integrations for each combination of AI model and data source, developers can build MCP-compatible servers that work with any MCP-enabled AI.

- **No-Code Access**: Non-developers can use platforms like Zapier, Airtable, or Microsoft Power Platform to connect their data to AI without writing code.

- **Secure by Design**: MCP includes built-in security features that ensure AI only accesses the data you explicitly allow it to.

- **Open Standard**: As an open standard, MCP can be implemented by any AI company or tool provider, ensuring broad compatibility.

## The USB-C Analogy Explained in Depth

The USB-C analogy is powerful because it helps visualize what MCP does. Let's break it down:

### Before USB-C (and before MCP)

Remember when every device needed a different cable?

- Phones used micro-USB
- Digital cameras had their own proprietary connectors
- Printers used USB-B
- External hard drives used yet another connector

This created a mess of cables and compatibility issues. Similarly, before MCP, each AI integration required custom development:

- ChatGPT needed one type of integration
- Claude needed another
- Each data source required its own custom connector
- Every combination of AI model and data source needed unique code

### After USB-C (and after MCP)

USB-C created a universal standard where one cable works with many devices:

- Your laptop, phone, tablet, and headphones all use the same connector
- You can plug any USB-C device into any USB-C port
- The standard supports multiple functions (power, data, video)
- It's backward compatible with adapters

Similarly, MCP creates a universal standard for AI connections:

- One MCP server can connect to any MCP-compatible AI model
- The same AI model can connect to any MCP-compatible data source
- The protocol handles various data types and operations
- It works with existing tools through platforms like Zapier

### Key Parallels

| USB-C | MCP |
|-------|-----|
| Universal connector for devices | Universal protocol for AI connections |
| Plug and play functionality | Connect and use immediately |
| Standardized interface | Standardized communication protocol |
| Works across device brands | Works across AI models and data sources |
| Reduced cable clutter | Reduced integration complexity |

## Real-World Examples with Detailed Use Cases

Let's explore some concrete examples of how MCP is being used in different industries:

### Community Management

**Scenario**: Sarah manages a community of 5,000+ members and was spending 4+ hours daily answering repetitive questions.

**Before MCP**: Sarah manually looked up member information in spreadsheets whenever someone asked about contribution stats, contact details, or member roles.

**With MCP**:
1. Sarah connected her Google Sheets member database to ChatGPT using Zapier's MCP implementation
2. She set up a Discord bot that forwards questions to this AI
3. The AI can now instantly answer questions like:
   - "Who are our top 10 contributors this month?"
   - "Find all members who joined in the last 30 days"
   - "List all marketing team members with their contact info"
   - "What's Sarah's role and when did she join?"

**Results**:
- Response time reduced from hours to seconds
- 95% reduction in manual lookups
- Members get instant answers 24/7
- Sarah now focuses on strategic community initiatives

### Marketing Campaign Management

**Scenario**: Mike's marketing team struggled to create personalized campaigns for their 10,000+ customers.

**Before MCP**: Generic email campaigns with 2% conversion rates. Personalization was manual and time-consuming.

**With MCP**:
1. Mike connected their CRM database to Claude AI via Airtable
2. The system automatically segments customers based on purchase history, engagement, and demographics
3. It generates personalized email content for each segment
4. The AI can answer questions like:
   - "Which customer segment has the highest growth potential?"
   - "Generate email copy for our enterprise healthcare customers"
   - "What products should we recommend to customers who purchased X?"
   - "Analyze our campaign performance across segments"

**Results**:
- 300% increase in email conversion rates
- $180K additional monthly revenue
- 85% reduction in campaign preparation time
- Truly personalized messaging at scale

### Project Management Automation

**Scenario**: Lisa managed 15+ concurrent projects and spent entire Fridays creating status reports.

**Before MCP**: Manual data collection from multiple tools, subjective status assessments, and time-consuming report creation.

**With MCP**:
1. Lisa connected her Notion project database to GPT-4
2. The system automatically analyzes project data, identifies risks, and generates comprehensive reports
3. It can answer questions like:
   - "Which projects are behind schedule and why?"
   - "Who has the highest workload this sprint?"
   - "Generate a status report for the marketing website project"
   - "What resources are at risk of being overallocated?"

**Results**:
- 5 hours saved weekly on reporting
- 90% improvement in project visibility
- 40% reduction in project delays
- Data-driven decision making

## Common Misconceptions Thoroughly Debunked

Let's address the most common misconceptions about MCP with detailed explanations:

### Misconception 1: "You need to be a developer to use MCP"

**Reality**: While developers create MCP servers, non-technical users can easily implement MCP connections using familiar no-code tools:

- **Zapier**: Connect spreadsheets, forms, and 5,000+ apps to AI with simple workflows
- **Microsoft Power Platform**: Use Power Automate to connect enterprise systems to AI
- **Airtable**: Connect your bases to AI for intelligent automation
- **Notion**: Use Notion AI with your databases for smarter workspaces

These platforms provide visual interfaces where you can set up MCP connections without writing a single line of code. If you can use a spreadsheet, you can use MCP.

### Misconception 2: "MCP is just another API"

**Reality**: MCP is fundamentally different from traditional APIs in several important ways:

- **Standardized Protocol**: Unlike APIs that vary widely between services, MCP defines a consistent way for AI to interact with any data source.

- **Universal Compatibility**: MCP works across different AI models and data sources, while APIs are typically specific to a single service.

- **Natural Language Interface**: MCP allows AI to interact with your data using natural language, not rigid API calls.

- **Contextual Understanding**: MCP enables AI to understand the context of your data, not just retrieve it.

- **Bidirectional Communication**: MCP facilitates two-way communication between AI and data sources, not just data retrieval.

Think of APIs as individual roads connecting specific locations, while MCP is an entire highway system connecting everything.

### Misconception 3: "It's not secure"

**Reality**: MCP was designed with security as a core principle:

- **Granular Permissions**: You control exactly what data the AI can access.

- **Data Sovereignty**: Your data stays in your systems; the AI comes to the data rather than your data going to the AI.

- **Audit Trails**: MCP implementations track what data was accessed and when.

- **Revocable Access**: You can instantly revoke AI access to your data at any time.

- **No Data Training**: Data accessed via MCP isn't used to train the AI models.

In many ways, MCP is more secure than traditional integrations because it follows a standardized security model rather than ad-hoc security implementations.

### Misconception 4: "It's too new to be reliable"

**Reality**: While MCP is relatively new as a named standard, the underlying concepts have been proven in production:

- **Built on Established Patterns**: MCP builds on well-established API and integration patterns.

- **Major Company Backing**: Companies like Anthropic, Google, and Microsoft are supporting MCP.

- **Growing Ecosystem**: Thousands of MCP servers are already available and being used in production.

- **Rapid Adoption**: Major platforms like Zapier, Airtable, and Microsoft Power Platform have already implemented MCP support.

## Your First Steps with MCP: A Detailed Roadmap

Ready to get started with MCP? Here's a comprehensive roadmap:

### Step 1: Choose Your Platform (1-2 days)

The right platform depends on your existing tools and technical comfort level:

- **Zapier**: Best for beginners and those who need to connect to many different apps
  - Pros: Very user-friendly, 5,000+ integrations, free tier available
  - Cons: Can get expensive with heavy usage, limited customization

- **Microsoft Power Platform**: Best for organizations using Microsoft products
  - Pros: Deep integration with Office 365, enterprise security, powerful capabilities
  - Cons: Steeper learning curve, requires Microsoft ecosystem

- **Airtable**: Best for data-heavy projects and visual organization
  - Pros: Excellent database capabilities, visual interface, good for teams
  - Cons: Limited automation compared to dedicated platforms

- **Notion**: Best for knowledge management and documentation
  - Pros: All-in-one workspace, great for documentation, built-in AI
  - Cons: Limited integration capabilities compared to others

**Recommendation for absolute beginners**: Start with Zapier + Google Sheets

### Step 2: Prepare Your Data Source (2-3 days)

Before connecting to AI, organize your data properly:

1. **Choose a Simple Dataset**: Start with something manageable like a customer list or product catalog.

2. **Structure Your Data Clearly**:
   - Use clear column headers (e.g., "Customer_Name" not "cust")
   - One piece of information per cell
   - Consistent formatting (e.g., dates, phone numbers)
   - No merged cells or complex formatting

3. **Clean Your Data**:
   - Remove duplicates
   - Fix inconsistencies
   - Fill in missing values or mark them consistently
   - Standardize text case and formatting

4. **Create Relationships** (if needed):
   - Use unique identifiers to connect related data
   - Consider how different datasets relate to each other

5. **Test Manual Queries**:
   - Before connecting to AI, make sure you can manually find the information you need

### Step 3: Set Up Your MCP Connection (1 day)

The exact steps vary by platform, but here's a general process:

#### For Zapier:

1. Create a Zapier account (free tier works for testing)
2. Create a new Zap
3. Choose "Webhooks by Zapier" as your trigger
4. Select "Catch Hook" as the event
5. Copy the webhook URL
6. Add "OpenAI" or "Claude AI" as your action
7. Connect your data source (e.g., Google Sheets)
8. Configure the AI prompt template
9. Test your Zap

#### For Airtable:

1. Set up your Airtable base with your data
2. Install the "AI Assistant" extension
3. Configure the extension to access your tables
4. Set up your prompt templates
5. Test queries against your data

### Step 4: Test and Iterate (1 week)

Testing is crucial for a successful MCP implementation:

1. **Start with Basic Queries**:
   - "List all [items] in the database"
   - "Find [specific item] by [attribute]"
   - "Count how many [items] have [attribute]"

2. **Progress to Complex Queries**:
   - "Summarize the data about [topic]"
   - "Find patterns in [dataset]"
   - "Compare [item A] and [item B]"

3. **Test Edge Cases**:
   - Queries about data that doesn't exist
   - Ambiguous queries that could have multiple interpretations
   - Very specific queries that require combining multiple data points

4. **Refine Your Setup**:
   - Adjust your data structure if needed
   - Modify your prompt templates
   - Add additional context or instructions

5. **Document What Works**:
   - Keep track of successful query patterns
   - Note any limitations you discover
   - Create a guide for others who might use your system

### Step 5: Expand and Scale (Ongoing)

Once you have a working MCP connection:

1. **Add More Data Sources**:
   - Connect additional spreadsheets or databases
   - Integrate with other business tools
   - Create connections between different data sets

2. **Automate Workflows**:
   - Set up scheduled reports
   - Create alerts based on data changes
   - Build automated decision processes

3. **Share with Your Team**:
   - Train colleagues on how to use the system
   - Create documentation and examples
   - Gather feedback and make improvements

4. **Join the Community**:
   - Share your success stories
   - Learn from others' implementations
   - Stay updated on new MCP features and capabilities

## Conclusion: The Future of Work with MCP

MCP represents a fundamental shift in how we interact with AI. By connecting AI to your specific data and tools, you transform it from a general-purpose assistant to a specialized partner that understands your business, your customers, and your challenges.

The most exciting aspect of MCP is that it puts this power in the hands of everyone—not just developers or technical specialists. If you can use a spreadsheet, you can use MCP to create AI solutions that would have required a team of engineers just a few years ago.

As you begin your MCP journey, remember that the community is here to help. Join our Discord, attend office hours, and share your experiences. Every new implementation teaches us all something valuable about the potential of this technology.

Ready to get started? Check out our [Beginner Path](/beginner-path) for step-by-step guidance!`
    },
    {
      id: 2,
      title: 'Zapier + MCP: Building Your First AI Connection',
      description: 'Step-by-step guide to connecting a Google Sheet to AI using Zapier',
      category: 'platforms',
      difficulty: 'Beginner',
      readTime: '25 min',
      rating: 4.8,
      readers: 1923,
      lastUpdated: '1 week ago',
      chapters: [
        'Setting up your Zapier account',
        'Preparing your Google Sheet',
        'Creating the MCP bridge',
        'Testing your AI connection',
        'Troubleshooting common issues'
      ],
      author: 'Mike Rodriguez',
      authorRole: 'Marketing Director',
      content: `# Zapier + MCP: Building Your First AI Connection

## Setting up your Zapier account

1. Go to [zapier.com](https://zapier.com) and create a free account
2. Verify your email address
3. Complete the onboarding flow
4. Connect your Google account

## Preparing your Google Sheet

Create a new Google Sheet with this structure:
- Column A: Name
- Column B: Role  
- Column C: Contributions
- Column D: Email
- Column E: Join Date

Add some sample data to test with.

## Creating the MCP bridge

1. In Zapier, click "Create Zap"
2. Choose "Webhooks by Zapier" as trigger
3. Select "Catch Hook"
4. Copy the webhook URL
5. Add "OpenAI (ChatGPT)" as action
6. Connect your Google Sheet as data source

## Testing your AI connection

Try these sample questions:
- "Who is our top contributor?"
- "Find all marketing team members"
- "What's Sarah's email address?"

## Troubleshooting common issues

- **Sheet not found**: Check sharing permissions
- **API errors**: Verify your OpenAI key
- **No responses**: Check webhook URL

Need help? Join our [community](/join-community) for support!`
    },
    {
      id: 3,
      title: 'Microsoft Power Platform for MCP: Enterprise Guide',
      description: 'Leverage Power Platform to build enterprise-grade MCP solutions',
      category: 'platforms',
      difficulty: 'Intermediate',
      readTime: '35 min',
      rating: 4.7,
      readers: 1456,
      lastUpdated: '3 days ago',
      chapters: [
        'Power Platform overview for non-developers',
        'Setting up your environment',
        'Connecting to enterprise data sources',
        'Building custom AI assistants',
        'Security and compliance considerations'
      ],
      author: 'Lisa Park',
      authorRole: 'Project Manager',
      content: `# Microsoft Power Platform for MCP: Enterprise Guide

## Power Platform Overview

Power Platform consists of:
- **Power Apps**: Build custom applications
- **Power Automate**: Automate workflows
- **Power BI**: Analyze data
- **Power Virtual Agents**: Create chatbots

## Setting up your environment

1. Sign in to [make.powerapps.com](https://make.powerapps.com)
2. Create a new environment
3. Enable required connectors
4. Set up security groups

## Connecting to enterprise data sources

Power Platform can connect to:
- SharePoint and OneDrive
- Dynamics 365
- SQL Server databases
- Salesforce
- SAP systems

## Building custom AI assistants

1. Create a new Power Virtual Agent
2. Configure topics and entities
3. Connect to your data sources
4. Add AI capabilities with Azure OpenAI
5. Test and deploy

## Security and compliance

- Role-based access control
- Data loss prevention policies
- Audit logging
- Compliance certifications

Ready to build enterprise solutions? Check our [Advanced Path](/advanced-path)!`
    },
    {
      id: 4,
      title: 'Community Management with MCP: A Complete Playbook',
      description: 'Transform your community management with AI-powered insights and automation',
      category: 'use-cases',
      difficulty: 'Beginner',
      readTime: '20 min',
      rating: 4.9,
      readers: 1789,
      lastUpdated: '5 days ago',
      chapters: [
        'Identifying community management pain points',
        'Connecting member databases to AI',
        'Automating common questions',
        'Generating engagement insights',
        'Measuring success and ROI'
      ],
      author: 'David Kim',
      authorRole: 'Community Lead',
      content: `# Community Management with MCP: A Complete Playbook

## Identifying Pain Points

Common community management challenges:
- Answering repetitive questions
- Finding member information quickly
- Tracking engagement and contributions
- Generating reports for stakeholders

## Connecting Member Databases

Set up your member data with these fields:
- Name and contact information
- Role and expertise
- Contribution history
- Engagement metrics
- Join date and activity

## Automating Common Questions

Use MCP to answer:
- "Who are our top contributors?"
- "Find experts in [topic]"
- "What's [member]'s contact info?"
- "Show me engagement stats"

## Generating Engagement Insights

AI can help you:
- Identify trending topics
- Spot declining engagement
- Suggest content ideas
- Recommend member connections

## Measuring Success and ROI

Track these metrics:
- Response time reduction
- Member satisfaction scores
- Time saved per week
- Community growth rate

Want to see this in action? Try our [Community Q&A template](/templates)!`
    },
    {
      id: 5,
      title: 'Marketing Automation with MCP: From Data to Campaigns',
      description: 'Create personalized marketing campaigns using customer data and AI',
      category: 'use-cases',
      difficulty: 'Intermediate',
      readTime: '30 min',
      rating: 4.6,
      readers: 1234,
      lastUpdated: '1 week ago',
      chapters: [
        'Customer data audit and preparation',
        'Segmentation strategies with AI',
        'Automated content generation',
        'Campaign personalization at scale',
        'Performance tracking and optimization'
      ],
      author: 'Emma Wilson',
      authorRole: 'Growth Manager',
      content: `# Marketing Automation with MCP: From Data to Campaigns

## Customer Data Audit

Start by organizing your customer data:
- Demographics and firmographics
- Behavioral data and interactions
- Purchase history and preferences
- Engagement metrics
- Support interactions

## Segmentation Strategies

Use AI to create segments based on:
- Customer lifetime value
- Engagement patterns
- Product usage
- Industry and company size
- Geographic location

## Automated Content Generation

AI can help create:
- Personalized email subject lines
- Dynamic email content
- Social media posts
- Blog post ideas
- Ad copy variations

## Campaign Personalization

Personalize based on:
- Customer segment
- Previous interactions
- Current lifecycle stage
- Preferred communication channels
- Time zone and timing preferences

## Performance Tracking

Monitor these KPIs:
- Open and click-through rates
- Conversion rates by segment
- Revenue attribution
- Customer acquisition cost
- Lifetime value impact

Ready to automate your marketing? Check out our [Customer Segmentation template](/templates)!`
    },
    {
      id: 6,
      title: 'Security Best Practices for MCP Implementations',
      description: 'Keep your data safe while building powerful AI connections',
      category: 'advanced',
      difficulty: 'Advanced',
      readTime: '40 min',
      rating: 4.8,
      readers: 892,
      lastUpdated: '4 days ago',
      chapters: [
        'Understanding MCP security model',
        'Data access controls and permissions',
        'Encryption and secure transmission',
        'Audit trails and monitoring',
        'Compliance considerations'
      ],
      author: 'Alex Thompson',
      authorRole: 'Security Consultant',
      content: `# Security Best Practices for MCP Implementations

## Understanding MCP Security Model

MCP security is built on:
- **Principle of least privilege**: Only grant necessary access
- **Data sovereignty**: You control your data
- **Transparent operations**: Full audit trail
- **Secure by default**: Encryption and authentication

## Data Access Controls

Implement these controls:
- Role-based access control (RBAC)
- Attribute-based access control (ABAC)
- Time-limited access tokens
- IP address restrictions
- Multi-factor authentication

## Encryption and Secure Transmission

Ensure data protection with:
- TLS 1.3 for data in transit
- AES-256 for data at rest
- End-to-end encryption for sensitive data
- Key rotation policies
- Certificate management

## Audit Trails and Monitoring

Track these activities:
- Data access requests
- AI query logs
- User authentication events
- Configuration changes
- Error and exception logs

## Compliance Considerations

Address these requirements:
- GDPR and data privacy
- SOC 2 compliance
- HIPAA for healthcare data
- PCI DSS for payment data
- Industry-specific regulations

Need help with enterprise security? Book [office hours](/office-hours) with our experts!`
    },
    {
      id: 7,
      title: 'Airtable + AI: Building Smart Databases',
      description: 'Turn your Airtable bases into intelligent, AI-powered systems',
      category: 'platforms',
      difficulty: 'Beginner',
      readTime: '22 min',
      rating: 4.7,
      readers: 1567,
      lastUpdated: '6 days ago',
      chapters: [
        'Airtable basics for MCP',
        'Structuring data for AI consumption',
        'Setting up AI integrations',
        'Creating smart automations',
        'Advanced formulas and functions'
      ],
      author: 'Rachel Green',
      authorRole: 'Operations Manager',
      content: `# Airtable + AI: Building Smart Databases

## Airtable Basics for MCP

Airtable combines:
- Spreadsheet simplicity
- Database power
- API connectivity
- Automation capabilities
- Collaboration features

## Structuring Data for AI

Design your base with:
- Clear field names and types
- Consistent data formats
- Linked records for relationships
- Calculated fields for insights
- Views for different perspectives

## Setting up AI Integrations

Connect Airtable to AI using:
- Zapier for simple automations
- Make.com for complex workflows
- Direct API calls for custom solutions
- Airtable's built-in automations
- Third-party AI services

## Creating Smart Automations

Build automations that:
- Analyze incoming data
- Generate insights and summaries
- Send intelligent notifications
- Update records based on AI analysis
- Create reports and dashboards

## Advanced Formulas and Functions

Use these Airtable features:
- Formula fields for calculations
- Lookup fields for data retrieval
- Rollup fields for aggregations
- Conditional formatting for visualization
- Scripting for custom logic

Want to see Airtable in action? Try our [Customer Segmentation template](/templates)!`
    },
    {
      id: 8,
      title: 'Project Management Revolution: MCP for PMs',
      description: 'Supercharge your project management with AI-powered insights and automation',
      category: 'use-cases',
      difficulty: 'Intermediate',
      readTime: '28 min',
      rating: 4.8,
      readers: 1345,
      lastUpdated: '2 days ago',
      chapters: [
        'PM challenges that MCP solves',
        'Connecting project management tools',
        'Automated status reporting',
        'Risk identification with AI',
        'Resource optimization strategies'
      ],
      author: 'Tom Wilson',
      authorRole: 'Senior PM',
      content: `# Project Management Revolution: MCP for PMs

## PM Challenges that MCP Solves

Common project management pain points:
- Manual status report creation
- Scattered project information
- Reactive risk management
- Resource allocation guesswork
- Stakeholder communication overhead

## Connecting Project Management Tools

Integrate these tools with AI:
- Asana, Jira, or Monday.com for tasks
- Slack or Teams for communication
- Google Drive or SharePoint for documents
- Calendars for scheduling
- Time tracking tools

## Automated Status Reporting

Generate reports that include:
- Project progress summaries
- Milestone achievements
- Risk assessments
- Resource utilization
- Next steps and blockers

## Risk Identification with AI

AI can help identify:
- Schedule risks from task dependencies
- Budget risks from spending patterns
- Resource risks from capacity issues
- Quality risks from testing metrics
- Stakeholder risks from communication gaps

## Resource Optimization Strategies

Optimize resources by:
- Analyzing team capacity and skills
- Predicting project timelines
- Identifying bottlenecks early
- Suggesting task reassignments
- Planning for future projects

Ready to revolutionize your PM workflow? Try our [Project Status Reporter template](/templates)!`
    }
  ];

  const filteredGuides = guides.filter(guide => 
    selectedCategory === 'all' || guide.category === selectedCategory
  );

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500/20 text-green-400';
      case 'Intermediate': return 'bg-yellow-500/20 text-yellow-400';
      case 'Advanced': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const openGuide = (guideId: number) => {
    setSelectedGuide(guideId);
  };

  const closeGuide = () => {
    setSelectedGuide(null);
  };

  const currentGuide = guides.find(g => g.id === selectedGuide);

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">No-Code MCP Guides</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Step-by-step tutorials to master MCP without writing a single line of code
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Featured Guide */}
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-xl p-8 mb-12">
          <div className="flex items-center space-x-2 mb-4">
            <Star className="w-5 h-5 text-yellow-400" />
            <span className="text-yellow-400 font-medium">Featured Guide</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">
                MCP Fundamentals: Your Complete Beginner's Guide
              </h2>
              <p className="text-blue-200 mb-6">
                Start your MCP journey with this comprehensive guide that explains everything in simple, non-technical terms. Perfect for complete beginners who want to understand the power of connecting AI to their data.
              </p>
              <div className="flex items-center space-x-6 mb-6">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-blue-400" />
                  <span className="text-blue-300">30 min read</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-green-400" />
                  <span className="text-green-300">2,847 readers</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span className="text-yellow-300">4.9/5</span>
                </div>
                {completedGuides.includes(1) && (
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-green-300">Completed</span>
                  </div>
                )}
              </div>
              <button 
                onClick={() => openGuide(1)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center space-x-2"
              >
                <Book className="w-5 h-5" />
                <span>Start Reading</span>
              </button>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-6">
              <h3 className="text-white font-semibold mb-4">What You'll Learn:</h3>
              <div className="space-y-3">
                {[
                  'What MCP is and why it matters for non-developers',
                  'The "USB-C for AI" analogy explained simply',
                  'Real-world examples you can immediately relate to',
                  'Common misconceptions and myths debunked',
                  'Your concrete next steps to get started'
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredGuides.map((guide) => (
            <div key={guide.id} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-300">
              {/* Header */}
              <div className="p-6 border-b border-white/10">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-semibold text-white leading-tight">{guide.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(guide.difficulty)} flex-shrink-0 ml-3`}>
                    {guide.difficulty}
                  </span>
                </div>
                
                <p className="text-gray-300 mb-4">{guide.description}</p>
                
                {/* Stats */}
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4 text-blue-400" />
                    <span className="text-blue-300">{guide.readTime}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className="text-yellow-300">{guide.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4 text-green-400" />
                    <span className="text-green-300">{guide.readers.toLocaleString()}</span>
                  </div>
                  {completedGuides.includes(guide.id) && (
                    <div className="flex items-center space-x-1">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-green-300">Completed</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Author */}
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">{guide.author.charAt(0)}</span>
                  </div>
                  <div>
                    <div className="text-white font-medium">{guide.author}</div>
                    <div className="text-gray-400 text-sm">{guide.authorRole}</div>
                  </div>
                </div>

                {/* Chapters */}
                <div className="mb-6">
                  <h4 className="text-white font-medium mb-3">What's Inside:</h4>
                  <div className="space-y-2">
                    {guide.chapters.slice(0, 3).map((chapter, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-300 text-sm">{chapter}</span>
                      </div>
                    ))}
                    {guide.chapters.length > 3 && (
                      <div className="text-gray-400 text-sm ml-3.5">
                        +{guide.chapters.length - 3} more chapters
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-3">
                  <button 
                    onClick={() => openGuide(guide.id)}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    <Book className="w-4 h-4" />
                    <span>Read Guide</span>
                  </button>
                  <button 
                    onClick={() => {
                      const blob = new Blob([guide.content], { type: 'text/markdown' });
                      const url = window.URL.createObjectURL(blob);
                      const link = document.createElement('a');
                      link.href = url;
                      link.download = `${guide.title.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}.md`;
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                      window.URL.revokeObjectURL(url);
                    }}
                    className="px-4 py-2 border border-white/20 text-white rounded-lg font-medium hover:bg-white/10 transition-colors duration-200 flex items-center space-x-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>PDF</span>
                  </button>
                </div>

                {/* Last Updated */}
                <div className="mt-4 text-xs text-gray-400">
                  Updated {guide.lastUpdated}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Guide Viewer Modal */}
        {selectedGuide !== null && currentGuide && (
          <GuideViewer guide={currentGuide} onClose={closeGuide} />
        )}

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-green-600/20 to-teal-600/20 border border-green-500/30 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Want to Contribute a Guide?</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Share your MCP knowledge with the community! We're always looking for new perspectives and use cases.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/submit-template"
              className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200"
            >
              Submit Your Guide
            </Link>
            <Link
              to="/join-community"
              className="border border-white/20 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors duration-200"
            >
              Guide Writing Tips
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Guides;