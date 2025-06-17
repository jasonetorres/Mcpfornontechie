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
    // Community Management Examples (3)
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
      title: 'Event Registration Assistant',
      description: 'Automate event planning and attendee management',
      category: 'community',
      role: 'Event Coordinator',
      dataSource: 'Event management system',
      complexity: 'Intermediate',
      duration: '3-4 hours',
      tools: ['Airtable', 'Make.com', 'Claude API'],
      features: [
        'Automated registration processing',
        'Attendee communication',
        'Capacity management',
        'Follow-up sequences'
      ],
      tutorial: {
        steps: [
          {
            title: 'Set Up Event Database',
            content: 'Create an Airtable base for event management',
            code: `// Event data structure
{
  "event_id": "EVT001",
  "name": "MCP Workshop",
  "date": "2024-03-15",
  "capacity": 50,
  "registered": 23,
  "waitlist": 5
}`,
            action: 'Create your event database in Airtable'
          },
          {
            title: 'Configure Registration Flow',
            content: 'Set up automated registration processing',
            code: `// Registration automation
if (event.registered < event.capacity) {
  status = "confirmed";
  sendConfirmationEmail();
} else {
  status = "waitlisted";
  addToWaitlist();
}`,
            action: 'Build the registration logic in Make.com'
          },
          {
            title: 'Create AI Assistant',
            content: 'Build an AI assistant for event inquiries',
            code: `// AI prompt for event assistant
"You are an event assistant. Answer questions about:
- Event details and schedule
- Registration status
- Venue information
- Parking and directions"`,
            action: 'Test the AI assistant with sample questions'
          }
        ]
      },
      demoUrl: '#',
      tutorialUrl: '#',
      templateUrl: '#'
    },
    {
      id: 3,
      title: 'Member Onboarding Automation',
      description: 'Streamline new member welcome and orientation',
      category: 'community',
      role: 'Community Manager',
      dataSource: 'Member database',
      complexity: 'Beginner',
      duration: '2-3 hours',
      tools: ['Google Sheets', 'Zapier', 'Discord API'],
      features: [
        'Welcome message automation',
        'Role assignment',
        'Resource sharing',
        'Progress tracking'
      ],
      tutorial: {
        steps: [
          {
            title: 'Design Onboarding Flow',
            content: 'Map out the new member journey',
            code: `// Onboarding sequence
Day 0: Welcome message + community guidelines
Day 1: Introduction to key channels
Day 3: First project assignment
Day 7: Check-in and feedback request`,
            action: 'Plan your onboarding sequence'
          },
          {
            title: 'Set Up Automation',
            content: 'Create automated welcome sequences',
            code: `// Zapier trigger configuration
{
  "trigger": "new_member_join",
  "actions": [
    "send_welcome_dm",
    "assign_newcomer_role",
    "add_to_onboarding_channel"
  ]
}`,
            action: 'Configure the automation in Zapier'
          },
          {
            title: 'Track Progress',
            content: 'Monitor new member engagement',
            code: `// Progress tracking metrics
- Welcome message acknowledged
- First post in community
- Profile completed
- First project submitted`,
            action: 'Set up progress tracking dashboard'
          }
        ]
      },
      demoUrl: '#',
      tutorialUrl: '#',
      templateUrl: '#'
    },

    // Marketing & Growth Examples (3)
    {
      id: 4,
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
      id: 5,
      title: 'Social Media Content Scheduler',
      description: 'Automate social media posting with AI-generated content',
      category: 'marketing',
      role: 'Social Media Manager',
      dataSource: 'Content calendar',
      complexity: 'Intermediate',
      duration: '4-5 hours',
      tools: ['Notion', 'Buffer', 'GPT-4', 'Zapier'],
      features: [
        'AI content generation',
        'Multi-platform scheduling',
        'Hashtag optimization',
        'Performance tracking'
      ],
      tutorial: {
        steps: [
          {
            title: 'Create Content Calendar',
            content: 'Set up a Notion database for content planning',
            code: `// Content calendar structure
{
  "post_date": "2024-03-15",
  "platform": "LinkedIn",
  "topic": "MCP Tutorial",
  "target_audience": "Non-developers",
  "content_type": "Educational"
}`,
            action: 'Build your content calendar in Notion'
          },
          {
            title: 'Configure AI Content Generation',
            content: 'Set up automated content creation',
            code: `// AI content prompt
"Create a \${content_type} post about \${topic} for \${platform}.
Target audience: \${target_audience}
Tone: Professional but approachable
Include relevant hashtags and call-to-action"`,
            action: 'Test AI content generation'
          },
          {
            title: 'Automate Scheduling',
            content: 'Connect to Buffer for automated posting',
            code: `// Zapier automation flow
1. Notion database updated
2. Generate content with AI
3. Schedule post in Buffer
4. Update status in Notion`,
            action: 'Set up the complete automation flow'
          }
        ]
      },
      demoUrl: '#',
      tutorialUrl: '#',
      templateUrl: '#'
    },
    {
      id: 6,
      title: 'Lead Scoring & Nurturing System',
      description: 'Automatically score and nurture leads based on behavior',
      category: 'marketing',
      role: 'Growth Manager',
      dataSource: 'Website analytics & CRM',
      complexity: 'Advanced',
      duration: '1-2 days',
      tools: ['HubSpot', 'Google Analytics', 'Zapier', 'OpenAI'],
      features: [
        'Behavioral lead scoring',
        'Automated nurture sequences',
        'Personalized follow-ups',
        'Conversion optimization'
      ],
      tutorial: {
        steps: [
          {
            title: 'Set Up Lead Tracking',
            content: 'Configure behavioral tracking and scoring',
            code: `// Lead scoring matrix
{
  "email_open": 5,
  "link_click": 10,
  "page_visit": 15,
  "demo_request": 50,
  "pricing_page": 25
}`,
            action: 'Configure lead scoring in HubSpot'
          },
          {
            title: 'Create Nurture Sequences',
            content: 'Build automated email sequences based on score',
            code: `// Nurture logic
if (lead_score >= 75) {
  sequence = "high_intent_sales";
} else if (lead_score >= 50) {
  sequence = "medium_nurture";
} else {
  sequence = "educational_content";
}`,
            action: 'Set up nurture sequences in your email platform'
          },
          {
            title: 'Implement AI Personalization',
            content: 'Use AI to personalize follow-up messages',
            code: `// Personalization prompt
"Create a follow-up email for a lead who:
- Visited pricing page 3 times
- Downloaded whitepaper on \${topic}
- Works at \${company} in \${industry}
- Has lead score of \${score}"`,
            action: 'Test AI-powered personalization'
          }
        ]
      },
      demoUrl: '#',
      tutorialUrl: '#',
      templateUrl: '#'
    },

    // Project Management Examples (3)
    {
      id: 7,
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
    },
    {
      id: 8,
      title: 'Resource Allocation Optimizer',
      description: 'Optimize team assignments based on skills and availability',
      category: 'project',
      role: 'Resource Manager',
      dataSource: 'Team capacity & skills data',
      complexity: 'Advanced',
      duration: '1-2 days',
      tools: ['Airtable', 'Microsoft Project', 'Azure AI'],
      features: [
        'Skill-based matching',
        'Capacity optimization',
        'Workload balancing',
        'Performance predictions'
      ],
      tutorial: {
        steps: [
          {
            title: 'Map Team Skills & Capacity',
            content: 'Create comprehensive team database',
            code: `// Team member profile
{
  "name": "Alice Johnson",
  "skills": ["React", "Node.js", "UI/UX"],
  "skill_levels": [9, 7, 8],
  "current_capacity": 75,
  "availability": "2024-03-01 to 2024-04-30"
}`,
            action: 'Build team skills and capacity database'
          },
          {
            title: 'Configure Optimization Logic',
            content: 'Set up AI-powered resource matching',
            code: `// Optimization algorithm
function optimizeAssignment(project, team) {
  return team
    .filter(member => hasRequiredSkills(member, project))
    .sort((a, b) => calculateFitScore(b, project) - calculateFitScore(a, project))
    .slice(0, project.team_size);
}`,
            action: 'Implement resource optimization logic'
          },
          {
            title: 'Generate Recommendations',
            content: 'AI suggests optimal team compositions',
            code: `// AI recommendation prompt
"Given this project requiring \${skills} and team data, recommend:
1. Optimal team composition
2. Potential skill gaps
3. Training recommendations
4. Timeline feasibility"`,
            action: 'Test optimization with sample projects'
          }
        ]
      },
      demoUrl: '#',
      tutorialUrl: '#',
      templateUrl: '#'
    },
    {
      id: 9,
      title: 'Risk Assessment Dashboard',
      description: 'Automatically identify and track project risks',
      category: 'project',
      role: 'Project Manager',
      dataSource: 'Project tracking data',
      complexity: 'Intermediate',
      duration: '4-6 hours',
      tools: ['Jira', 'Power BI', 'Azure AI', 'Teams'],
      features: [
        'Automated risk detection',
        'Impact assessment',
        'Mitigation suggestions',
        'Stakeholder alerts'
      ],
      tutorial: {
        steps: [
          {
            title: 'Define Risk Indicators',
            content: 'Set up automated risk detection rules',
            code: `// Risk detection rules
{
  "schedule_risk": "completion_rate < 0.8 && days_remaining < 30",
  "budget_risk": "budget_used > 0.8 && completion < 0.7",
  "resource_risk": "team_availability < required_capacity",
  "quality_risk": "bug_rate > threshold"
}`,
            action: 'Configure risk detection in your project tool'
          },
          {
            title: 'Build Risk Dashboard',
            content: 'Create visual risk monitoring dashboard',
            code: `// Dashboard components
- Risk heat map by project
- Trend analysis charts
- Alert notifications
- Mitigation action tracker`,
            action: 'Build dashboard in Power BI'
          },
          {
            title: 'Implement AI Analysis',
            content: 'Use AI for risk impact assessment',
            code: `// Risk analysis prompt
"Analyze project risks and provide:
1. Risk severity ranking
2. Potential impact assessment
3. Recommended mitigation actions
4. Timeline for resolution"`,
            action: 'Set up AI-powered risk analysis'
          }
        ]
      },
      demoUrl: '#',
      tutorialUrl: '#',
      templateUrl: '#'
    },

    // Sales & Business Examples (2)
    {
      id: 10,
      title: 'Sales Lead Scorer',
      description: 'Automatically score and prioritize sales leads',
      category: 'sales',
      role: 'Sales Manager',
      dataSource: 'Sales pipeline',
      complexity: 'Advanced',
      duration: '3-5 days',
      tools: ['Salesforce', 'Zapier', 'Custom API'],
      features: [
        'Lead scoring automation',
        'Conversion probability',
        'Next best action suggestions',
        'Pipeline forecasting'
      ],
      tutorial: {
        steps: [
          {
            title: 'Define Scoring Criteria',
            content: 'Set up comprehensive lead scoring model',
            code: `// Lead scoring model
{
  "company_size": {
    "enterprise": 40,
    "mid_market": 25,
    "smb": 10
  },
  "budget_authority": {
    "decision_maker": 30,
    "influencer": 15,
    "user": 5
  },
  "engagement_level": {
    "demo_requested": 35,
    "pricing_viewed": 25,
    "content_downloaded": 15
  }
}`,
            action: 'Configure scoring model in Salesforce'
          },
          {
            title: 'Implement Automation',
            content: 'Set up automated scoring and routing',
            code: `// Scoring automation
if (total_score >= 80) {
  priority = "hot";
  assign_to = "senior_sales_rep";
} else if (total_score >= 60) {
  priority = "warm";
  assign_to = "sales_development_rep";
} else {
  priority = "cold";
  assign_to = "marketing_nurture";
}`,
            action: 'Build automation workflow'
          },
          {
            title: 'Generate AI Insights',
            content: 'Use AI for next best action recommendations',
            code: `// AI recommendation prompt
"Based on lead profile and behavior, recommend:
1. Best time to contact
2. Optimal communication channel
3. Key talking points
4. Probability of conversion"`,
            action: 'Test AI-powered recommendations'
          }
        ]
      },
      demoUrl: '#',
      tutorialUrl: '#',
      templateUrl: '#'
    },
    {
      id: 11,
      title: 'Customer Success Predictor',
      description: 'Predict customer churn and identify expansion opportunities',
      category: 'sales',
      role: 'Customer Success Manager',
      dataSource: 'Customer usage & support data',
      complexity: 'Advanced',
      duration: '2-3 days',
      tools: ['Mixpanel', 'Intercom', 'Python', 'Slack'],
      features: [
        'Churn risk prediction',
        'Expansion opportunity identification',
        'Health score calculation',
        'Automated interventions'
      ],
      tutorial: {
        steps: [
          {
            title: 'Collect Customer Data',
            content: 'Aggregate data from multiple sources',
            code: `// Customer health metrics
{
  "usage_frequency": "daily_active_users / total_users",
  "feature_adoption": "features_used / total_features",
  "support_tickets": "tickets_last_30_days",
  "payment_history": "on_time_payments / total_payments",
  "engagement_score": "calculated_composite_score"
}`,
            action: 'Set up data collection pipeline'
          },
          {
            title: 'Build Prediction Model',
            content: 'Create churn and expansion prediction logic',
            code: `// Prediction logic
if (usage_trend === "declining" && support_tickets > 5) {
  churn_risk = "high";
} else if (feature_adoption > 0.8 && usage_growing) {
  expansion_opportunity = "high";
} else {
  status = "stable";
}`,
            action: 'Implement prediction algorithms'
          },
          {
            title: 'Automate Interventions',
            content: 'Set up automated customer success actions',
            code: `// Intervention triggers
- High churn risk: Schedule executive check-in
- Low engagement: Send onboarding resources
- Expansion opportunity: Alert account manager
- Support issues: Escalate to success team`,
            action: 'Configure automated interventions'
          }
        ]
      },
      demoUrl: '#',
      tutorialUrl: '#',
      templateUrl: '#'
    },

    // Operations Examples (2)
    {
      id: 12,
      title: 'Employee Onboarding Assistant',
      description: 'Answer new hire questions using company docs',
      category: 'operations',
      role: 'People Operations',
      dataSource: 'HR documents',
      complexity: 'Beginner',
      duration: '4-6 hours',
      tools: ['SharePoint', 'Power Platform', 'Azure AI'],
      features: [
        'Answer policy questions',
        'Provide process guidance',
        'Share relevant documents',
        'Track onboarding progress'
      ],
      tutorial: {
        steps: [
          {
            title: 'Organize Knowledge Base',
            content: 'Structure HR documents for AI access',
            code: `// Document categories
{
  "policies": ["vacation", "remote_work", "expenses"],
  "processes": ["onboarding", "performance_review", "benefits"],
  "contacts": ["hr_team", "it_support", "facilities"],
  "forms": ["time_off", "expense_report", "equipment_request"]
}`,
            action: 'Organize documents in SharePoint'
          },
          {
            title: 'Configure AI Assistant',
            content: 'Set up AI to answer HR questions',
            code: `// AI assistant prompt
"You are an HR assistant. Answer questions about:
- Company policies and procedures
- Benefits and compensation
- Office locations and facilities
- IT setup and equipment
Always provide specific document references."`,
            action: 'Configure AI assistant in Power Platform'
          },
          {
            title: 'Track Onboarding Progress',
            content: 'Monitor new hire completion status',
            code: `// Onboarding checklist
- IT equipment received
- Benefits enrollment completed
- Manager introduction scheduled
- First week training completed
- 30-day check-in scheduled`,
            action: 'Set up progress tracking dashboard'
          }
        ]
      },
      demoUrl: '#',
      tutorialUrl: '#',
      templateUrl: '#'
    },
    {
      id: 13,
      title: 'Inventory Management Assistant',
      description: 'Monitor stock levels and predict reorder needs',
      category: 'operations',
      role: 'Operations Manager',
      dataSource: 'Inventory database',
      complexity: 'Intermediate',
      duration: '1-2 days',
      tools: ['Excel', 'Power BI', 'Azure AI'],
      features: [
        'Stock level monitoring',
        'Reorder predictions',
        'Supplier recommendations',
        'Cost optimization'
      ],
      tutorial: {
        steps: [
          {
            title: 'Set Up Inventory Tracking',
            content: 'Create comprehensive inventory database',
            code: `// Inventory item structure
{
  "sku": "ITEM001",
  "name": "Widget A",
  "current_stock": 150,
  "reorder_point": 50,
  "lead_time_days": 14,
  "monthly_usage": 75,
  "supplier": "Supplier XYZ"
}`,
            action: 'Build inventory tracking system'
          },
          {
            title: 'Implement Prediction Logic',
            content: 'Set up automated reorder predictions',
            code: `// Reorder prediction
predicted_stockout = current_stock / monthly_usage * 30;
if (predicted_stockout <= lead_time_days + safety_buffer) {
  trigger_reorder = true;
  recommended_quantity = calculate_optimal_order();
}`,
            action: 'Configure prediction algorithms'
          },
          {
            title: 'Create Monitoring Dashboard',
            content: 'Build real-time inventory dashboard',
            code: `// Dashboard components
- Stock level alerts
- Reorder recommendations
- Supplier performance metrics
- Cost analysis charts`,
            action: 'Build dashboard in Power BI'
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

        {/* Category Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 text-center">
            <Users className="w-6 h-6 text-blue-400 mx-auto mb-2" />
            <div className="text-lg font-bold text-white">3</div>
            <div className="text-gray-300 text-xs">Community</div>
          </div>
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 text-center">
            <MessageSquare className="w-6 h-6 text-green-400 mx-auto mb-2" />
            <div className="text-lg font-bold text-white">3</div>
            <div className="text-gray-300 text-xs">Marketing</div>
          </div>
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 text-center">
            <Workflow className="w-6 h-6 text-purple-400 mx-auto mb-2" />
            <div className="text-lg font-bold text-white">3</div>
            <div className="text-gray-300 text-xs">Project Mgmt</div>
          </div>
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 text-center">
            <BarChart3 className="w-6 h-6 text-orange-400 mx-auto mb-2" />
            <div className="text-lg font-bold text-white">2</div>
            <div className="text-gray-300 text-xs">Sales</div>
          </div>
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 text-center">
            <Calendar className="w-6 h-6 text-pink-400 mx-auto mb-2" />
            <div className="text-lg font-bold text-white">2</div>
            <div className="text-gray-300 text-xs">Operations</div>
          </div>
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