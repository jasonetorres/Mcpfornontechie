import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, Play, CheckCircle, ArrowRight, ArrowLeft, Download, Lightbulb, Code, Shield, Database, MessageSquare, Zap } from 'lucide-react'
import ProgressTracker from '../components/ProgressTracker'
import InteractiveQuiz from '../components/InteractiveQuiz'
import MCPSandbox from '../components/MCPSandbox'
import { useAuth } from '../contexts/AuthContext'

interface CourseModule {
  id: number
  title: string
  description: string
  duration: string
  content: React.ReactNode
  quiz?: {
    id: string
    question: string
    options: string[]
    correctAnswer: number
    explanation: string
    hint?: string
  }[]
  hasSandbox?: boolean
  videoUrl?: string
  downloadableResources?: {
    name: string
    description: string
    url: string
  }[]
}

export default function MCPBasicsCourse() {
  const [currentModule, setCurrentModule] = useState(1)
  const [completedModules, setCompletedModules] = useState<number[]>([])
  const [showQuiz, setShowQuiz] = useState(false)
  const [showSandbox, setShowSandbox] = useState(false)
  const { user } = useAuth()

  const modules: CourseModule[] = [
    {
      id: 1,
      title: 'Introduction to MCP',
      description: 'Understanding the Model Context Protocol and why it matters',
      duration: '20 min',
      content: (
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-foreground">What is MCP?</h3>
          <p className="text-muted-foreground">
            MCP (Model Context Protocol) is an open standard created by Anthropic that allows AI models to connect to external data sources and tools. Think of it as the "USB-C for AI" - a universal connector that standardizes how AI interacts with your data.
          </p>
          
          <div className="bg-matrix-primary/10 border border-matrix-primary/20 rounded-lg p-4">
            <h4 className="text-matrix-primary font-semibold mb-2">The USB-C Analogy</h4>
            <p className="text-matrix-secondary">
              Just like USB-C allows any device to connect to any other compatible device, MCP allows any AI model to connect to any data source or tool using a standardized protocol. This eliminates the need for custom integrations for each combination of AI model and data source.
            </p>
          </div>
          
          <h3 className="text-xl font-bold text-foreground">Why MCP Matters</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-muted/50 rounded-lg p-4">
              <h4 className="text-foreground font-semibold mb-2">The Problem</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>• AI without context gives generic answers</li>
                <li>• Each integration required custom development</li>
                <li>• No standard way to connect AI to your systems</li>
                <li>• Technical barriers for non-developers</li>
              </ul>
            </div>
            <div className="bg-muted/50 rounded-lg p-4">
              <h4 className="text-foreground font-semibold mb-2">The Solution</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Standardized connections to any data source</li>
                <li>• No coding required for basic implementations</li>
                <li>• Secure and controlled data access</li>
                <li>• Context-aware AI responses</li>
              </ul>
            </div>
          </div>
          
          <h3 className="text-xl font-bold text-foreground">Real-World Impact</h3>
          <p className="text-muted-foreground">
            With MCP, AI can now answer questions about YOUR specific data, not just general knowledge. This transforms AI from a generic tool into a powerful assistant that understands your business context.
          </p>
          
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <h4 className="text-blue-400 font-semibold mb-2">Example Transformation</h4>
            <div className="space-y-3">
              <div>
                <div className="text-red-400 font-medium">Without MCP:</div>
                <div className="bg-red-500/10 p-3 rounded text-red-300">
                  "Who are our top contributors this month?"<br />
                  "I don't have access to your specific contributor data. Generally, top contributors are those who..."
                </div>
              </div>
              <div>
                <div className="text-green-400 font-medium">With MCP:</div>
                <div className="bg-green-500/10 p-3 rounded text-green-300">
                  "Who are our top contributors this month?"<br />
                  "Based on your community data, your top contributors are:<br />
                  1. Sarah Chen - 45 contributions<br />
                  2. Lisa Park - 42 contributions<br />
                  3. Mike Rodriguez - 38 contributions"
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      quiz: [
        {
          id: 'q1-1',
          question: 'What is MCP best described as?',
          options: [
            'A new AI model from Anthropic',
            'A universal connector for AI to access external data',
            'A programming language for AI',
            'A database management system'
          ],
          correctAnswer: 1,
          explanation: 'MCP (Model Context Protocol) is best described as a universal connector that standardizes how AI models connect to external data sources and tools - similar to how USB-C standardizes device connections.'
        },
        {
          id: 'q1-2',
          question: 'What problem does MCP solve?',
          options: [
            'It makes AI models faster',
            'It reduces the cost of AI implementation',
            'It eliminates the need for custom integrations between AI and data sources',
            'It replaces human workers with AI'
          ],
          correctAnswer: 2,
          explanation: 'MCP solves the problem of needing custom integrations for each combination of AI model and data source by providing a standardized protocol for these connections.'
        }
      ]
    },
    {
      id: 2,
      title: 'MCP Architecture',
      description: 'Understanding how MCP works under the hood',
      duration: '25 min',
      content: (
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-foreground">MCP Architecture Overview</h3>
          <p className="text-muted-foreground">
            MCP creates a bridge between AI models and external data sources or tools. Let's break down how this works:
          </p>
          
          <div className="bg-muted/50 rounded-lg p-6">
            <h4 className="text-foreground font-semibold mb-4">Key Components</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-card/50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <MessageSquare className="w-5 h-5 text-blue-400" />
                  <span className="font-medium text-foreground">AI Model</span>
                </div>
                <p className="text-muted-foreground text-sm">
                  The AI system (like ChatGPT or Claude) that processes user queries and generates responses.
                </p>
              </div>
              <div className="bg-card/50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Code className="w-5 h-5 text-purple-400" />
                  <span className="font-medium text-foreground">MCP Server</span>
                </div>
                <p className="text-muted-foreground text-sm">
                  The connector that translates between the AI model and your data source using standardized protocols.
                </p>
              </div>
              <div className="bg-card/50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Database className="w-5 h-5 text-green-400" />
                  <span className="font-medium text-foreground">Data Source</span>
                </div>
                <p className="text-muted-foreground text-sm">
                  Your information (spreadsheets, databases, APIs) that the AI needs to access.
                </p>
              </div>
            </div>
          </div>
          
          <h3 className="text-xl font-bold text-foreground">How Data Flows in MCP</h3>
          <div className="bg-gradient-to-r from-matrix-primary/10 to-matrix-secondary/10 border border-matrix-primary/20 rounded-lg p-6">
            <ol className="space-y-4">
              <li className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-matrix-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm flex-shrink-0">1</div>
                <div>
                  <div className="font-medium text-foreground">User asks a question</div>
                  <p className="text-muted-foreground text-sm">
                    "Who are our top contributors this month?"
                  </p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-matrix-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm flex-shrink-0">2</div>
                <div>
                  <div className="font-medium text-foreground">AI recognizes data need</div>
                  <p className="text-muted-foreground text-sm">
                    The AI model determines it needs external data to answer accurately
                  </p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-matrix-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm flex-shrink-0">3</div>
                <div>
                  <div className="font-medium text-foreground">MCP server receives request</div>
                  <p className="text-muted-foreground text-sm">
                    The server translates the AI's request into a format your data source understands
                  </p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-matrix-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm flex-shrink-0">4</div>
                <div>
                  <div className="font-medium text-foreground">Data source provides information</div>
                  <p className="text-muted-foreground text-sm">
                    Your spreadsheet or database returns the requested data
                  </p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-matrix-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm flex-shrink-0">5</div>
                <div>
                  <div className="font-medium text-foreground">MCP server returns data to AI</div>
                  <p className="text-muted-foreground text-sm">
                    The server formats the data for the AI model
                  </p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-matrix-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm flex-shrink-0">6</div>
                <div>
                  <div className="font-medium text-foreground">AI generates context-aware response</div>
                  <p className="text-muted-foreground text-sm">
                    The AI uses your specific data to provide an accurate, personalized answer
                  </p>
                </div>
              </li>
            </ol>
          </div>
          
          <h3 className="text-xl font-bold text-foreground">Security Considerations</h3>
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-green-400 mt-1" />
              <div>
                <h4 className="text-foreground font-semibold mb-2">Your Data Stays Secure</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• You control exactly what data the AI can access</li>
                  <li>• Data stays in your systems, not the AI company's</li>
                  <li>• Full audit trail of what data was accessed</li>
                  <li>• Revoke access at any time</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ),
      quiz: [
        {
          id: 'q2-1',
          question: 'What are the three main components in the MCP architecture?',
          options: [
            'Database, Server, Client',
            'AI Model, MCP Server, Data Source',
            'Frontend, Backend, Database',
            'User, AI, Database'
          ],
          correctAnswer: 1,
          explanation: 'The MCP architecture consists of three main components: the AI Model (like ChatGPT or Claude), the MCP Server (the connector/translator), and your Data Source (spreadsheets, databases, etc.).'
        },
        {
          id: 'q2-2',
          question: 'How does MCP handle data security?',
          options: [
            'By storing all data in encrypted cloud storage',
            'By requiring developer credentials for all operations',
            'By keeping data in your systems and providing controlled access',
            'By anonymizing all data before processing'
          ],
          correctAnswer: 2,
          explanation: 'MCP handles security by keeping your data in your systems (not transferring it to the AI company) and providing controlled access with audit trails and revocable permissions.'
        }
      ],
      hasSandbox: true
    },
    {
      id: 3,
      title: 'Choosing Your Platform',
      description: 'Selecting the right no-code platform for your MCP implementation',
      duration: '30 min',
      content: (
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-foreground">No-Code Platforms for MCP</h3>
          <p className="text-muted-foreground">
            You don't need to be a developer to use MCP! Several no-code platforms make it easy to connect your data to AI. Let's explore the most popular options:
          </p>
          
          <div className="space-y-6">
            <div className="bg-card/50 border border-border rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="text-3xl">⚡</div>
                <div>
                  <h4 className="text-foreground font-semibold">Zapier</h4>
                  <p className="text-muted-foreground text-sm">The most beginner-friendly automation platform</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="text-foreground font-medium mb-2">Pros:</h5>
                  <ul className="space-y-1 text-muted-foreground text-sm">
                    <li>• Extremely user-friendly interface</li>
                    <li>• Huge library of pre-built integrations</li>
                    <li>• Excellent documentation and tutorials</li>
                    <li>• No coding required</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-foreground font-medium mb-2">Best For:</h5>
                  <ul className="space-y-1 text-muted-foreground text-sm">
                    <li>• Complete beginners</li>
                    <li>• Simple automations</li>
                    <li>• Quick prototyping</li>
                    <li>• Google Sheets integration</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-card/50 border border-border rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="text-3xl">🔷</div>
                <div>
                  <h4 className="text-foreground font-semibold">Microsoft Power Platform</h4>
                  <p className="text-muted-foreground text-sm">Enterprise-grade low-code platform with deep Office integration</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="text-foreground font-medium mb-2">Pros:</h5>
                  <ul className="space-y-1 text-muted-foreground text-sm">
                    <li>• Deep integration with Microsoft ecosystem</li>
                    <li>• Enterprise security and compliance</li>
                    <li>• Powerful AI capabilities with Azure</li>
                    <li>• Scalable for large organizations</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-foreground font-medium mb-2">Best For:</h5>
                  <ul className="space-y-1 text-muted-foreground text-sm">
                    <li>• Enterprise organizations</li>
                    <li>• Microsoft Office users</li>
                    <li>• Complex business processes</li>
                    <li>• Teams needing governance</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-card/50 border border-border rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="text-3xl">📊</div>
                <div>
                  <h4 className="text-foreground font-semibold">Airtable</h4>
                  <p className="text-muted-foreground text-sm">Spreadsheet-database hybrid with powerful automation features</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="text-foreground font-medium mb-2">Pros:</h5>
                  <ul className="space-y-1 text-muted-foreground text-sm">
                    <li>• Familiar spreadsheet interface</li>
                    <li>• Powerful database capabilities</li>
                    <li>• Great for data organization</li>
                    <li>• Strong API and integration options</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-foreground font-medium mb-2">Best For:</h5>
                  <ul className="space-y-1 text-muted-foreground text-sm">
                    <li>• Data-heavy projects</li>
                    <li>• Content management</li>
                    <li>• Project tracking</li>
                    <li>• Teams familiar with spreadsheets</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <h3 className="text-xl font-bold text-foreground">How to Choose the Right Platform</h3>
          <div className="bg-matrix-primary/10 border border-matrix-primary/20 rounded-lg p-6">
            <div className="space-y-4">
              <div>
                <h4 className="text-matrix-primary font-semibold mb-2">Consider Your Experience Level</h4>
                <p className="text-muted-foreground">
                  If you're completely new to automation, start with Zapier. If you're comfortable with more complex tools, consider Power Platform or Make.com.
                </p>
              </div>
              <div>
                <h4 className="text-matrix-primary font-semibold mb-2">Evaluate Your Data Sources</h4>
                <p className="text-muted-foreground">
                  Choose a platform that integrates well with your existing data. For example, if you use Microsoft products, Power Platform offers seamless integration.
                </p>
              </div>
              <div>
                <h4 className="text-matrix-primary font-semibold mb-2">Think About Scale</h4>
                <p className="text-muted-foreground">
                  Consider how your solution might grow. Some platforms are better for simple personal projects, while others excel at enterprise-scale implementations.
                </p>
              </div>
              <div>
                <h4 className="text-matrix-primary font-semibold mb-2">Budget Considerations</h4>
                <p className="text-muted-foreground">
                  All platforms have free tiers, but pricing varies significantly for premium features. Consider your long-term needs when choosing.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Lightbulb className="w-5 h-5 text-blue-400" />
              <span className="text-blue-400 font-medium">Pro Tip</span>
            </div>
            <p className="text-blue-300">
              Start with a simple platform like Zapier for your first MCP project, even if you eventually plan to use something more advanced. This lets you learn the concepts without getting overwhelmed by platform complexity.
            </p>
          </div>
        </div>
      ),
      quiz: [
        {
          id: 'q3-1',
          question: 'Which platform is best for complete beginners with no automation experience?',
          options: [
            'Microsoft Power Platform',
            'Zapier',
            'Make.com (formerly Integromat)',
            'Bubble'
          ],
          correctAnswer: 1,
          explanation: 'Zapier is the most beginner-friendly platform with an intuitive interface, excellent documentation, and a focus on simplicity that makes it perfect for those new to automation.'
        },
        {
          id: 'q3-2',
          question: 'What should you consider FIRST when choosing an MCP platform?',
          options: [
            'The number of available integrations',
            'The pricing structure',
            'Your experience level and existing data sources',
            'The platform\'s market share'
          ],
          correctAnswer: 2,
          explanation: 'Your experience level and existing data sources should be the primary considerations when choosing a platform, as this ensures you select a tool that matches your skills and integrates well with your current systems.'
        }
      ]
    },
    {
      id: 4,
      title: 'Setting Up Your First Connection',
      description: 'Step-by-step guide to connecting your data to AI',
      duration: '45 min',
      content: (
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-foreground">Your First MCP Connection</h3>
          <p className="text-muted-foreground">
            In this module, we'll walk through creating a simple but powerful MCP connection using Zapier and Google Sheets. This is perfect for beginners and requires no coding.
          </p>
          
          <div className="bg-gradient-to-r from-matrix-primary/10 to-matrix-secondary/10 border border-matrix-primary/20 rounded-lg p-6">
            <h4 className="text-matrix-primary font-semibold mb-4">What We'll Build</h4>
            <p className="text-matrix-secondary mb-4">
              A community member lookup system that allows AI to answer questions about your community members using data from a Google Sheet.
            </p>
            <div className="bg-muted/50 rounded-lg p-4">
              <h5 className="text-foreground font-medium mb-2">Example Questions It Will Answer:</h5>
              <ul className="space-y-2 text-muted-foreground">
                <li>• "Who are our top contributors this month?"</li>
                <li>• "Find all members in the marketing team"</li>
                <li>• "What's Sarah's email address?"</li>
                <li>• "When did Mike join our community?"</li>
              </ul>
            </div>
          </div>
          
          <h3 className="text-xl font-bold text-foreground">Step 1: Prepare Your Data</h3>
          <div className="bg-card/50 border border-border rounded-lg p-6">
            <p className="text-muted-foreground mb-4">
              First, we need to create a Google Sheet with our community member data. Here's how to structure it:
            </p>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-border">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="px-4 py-2 border-b border-r border-border text-foreground">Name</th>
                    <th className="px-4 py-2 border-b border-r border-border text-foreground">Role</th>
                    <th className="px-4 py-2 border-b border-r border-border text-foreground">Contributions</th>
                    <th className="px-4 py-2 border-b border-r border-border text-foreground">Email</th>
                    <th className="px-4 py-2 border-b border-border text-foreground">Join Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-2 border-b border-r border-border text-muted-foreground">Sarah Chen</td>
                    <td className="px-4 py-2 border-b border-r border-border text-muted-foreground">Community Manager</td>
                    <td className="px-4 py-2 border-b border-r border-border text-muted-foreground">45</td>
                    <td className="px-4 py-2 border-b border-r border-border text-muted-foreground">sarah@example.com</td>
                    <td className="px-4 py-2 border-b border-border text-muted-foreground">2024-01-15</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border-b border-r border-border text-muted-foreground">Mike Rodriguez</td>
                    <td className="px-4 py-2 border-b border-r border-border text-muted-foreground">Developer</td>
                    <td className="px-4 py-2 border-b border-r border-border text-muted-foreground">38</td>
                    <td className="px-4 py-2 border-b border-r border-border text-muted-foreground">mike@example.com</td>
                    <td className="px-4 py-2 border-b border-border text-muted-foreground">2024-02-01</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border-r border-border text-muted-foreground">Lisa Park</td>
                    <td className="px-4 py-2 border-r border-border text-muted-foreground">Designer</td>
                    <td className="px-4 py-2 border-r border-border text-muted-foreground">42</td>
                    <td className="px-4 py-2 border-r border-border text-muted-foreground">lisa@example.com</td>
                    <td className="px-4 py-2 border-border text-muted-foreground">2024-01-20</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4 text-muted-foreground text-sm">
              <strong>Important:</strong> Make sure your column headers are clear and descriptive. This helps the AI understand your data structure.
            </div>
          </div>
          
          <h3 className="text-xl font-bold text-foreground">Step 2: Set Up Zapier</h3>
          <div className="space-y-4">
            <div className="bg-muted/50 rounded-lg p-4">
              <h4 className="text-foreground font-medium mb-2">1. Create a Zapier Account</h4>
              <p className="text-muted-foreground text-sm">
                Go to <a href="https://zapier.com" target="_blank" rel="noopener noreferrer" className="text-matrix-primary hover:text-matrix-secondary">zapier.com</a> and sign up for a free account if you don't already have one.
              </p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4">
              <h4 className="text-foreground font-medium mb-2">2. Create a New Zap</h4>
              <p className="text-muted-foreground text-sm">
                Click "Create Zap" and choose "Webhooks by Zapier" as your trigger.
              </p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4">
              <h4 className="text-foreground font-medium mb-2">3. Select "Catch Hook" as the Event</h4>
              <p className="text-muted-foreground text-sm">
                This will generate a unique webhook URL that will receive queries from your AI.
              </p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4">
              <h4 className="text-foreground font-medium mb-2">4. Add Google Sheets as an Action</h4>
              <p className="text-muted-foreground text-sm">
                Choose "Find Spreadsheet Row" as the action and connect your Google account.
              </p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4">
              <h4 className="text-foreground font-medium mb-2">5. Configure the Spreadsheet Connection</h4>
              <p className="text-muted-foreground text-sm">
                Select your community members spreadsheet and set up the lookup parameters.
              </p>
            </div>
          </div>
          
          <h3 className="text-xl font-bold text-foreground">Step 3: Connect to AI</h3>
          <div className="space-y-4">
            <div className="bg-muted/50 rounded-lg p-4">
              <h4 className="text-foreground font-medium mb-2">1. Add OpenAI (ChatGPT) as the Final Action</h4>
              <p className="text-muted-foreground text-sm">
                Search for "OpenAI" in the Zapier actions and select it.
              </p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4">
              <h4 className="text-foreground font-medium mb-2">2. Configure the AI Prompt</h4>
              <p className="text-muted-foreground text-sm">
                Set up a prompt that instructs the AI how to use the data from your Google Sheet.
              </p>
              <div className="bg-matrix-primary/10 border border-matrix-primary/20 rounded-lg p-3 mt-2">
                <p className="text-matrix-primary text-sm">
                  Example prompt: "Use the following community member data to answer the user's question. Format your response in a clear, helpful way."
                </p>
              </div>
            </div>
            <div className="bg-muted/50 rounded-lg p-4">
              <h4 className="text-foreground font-medium mb-2">3. Test Your Connection</h4>
              <p className="text-muted-foreground text-sm">
                Run a test with a sample question like "Who are our top contributors?" to verify everything works.
              </p>
            </div>
          </div>
          
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-green-400 font-medium">Success!</span>
            </div>
            <p className="text-green-300">
              Congratulations! You've created your first MCP connection. Your AI can now answer specific questions about your community members using real data from your Google Sheet.
            </p>
          </div>
        </div>
      ),
      quiz: [
        {
          id: 'q4-1',
          question: 'What is the first step in setting up an MCP connection?',
          options: [
            'Configure the AI model',
            'Set up the webhook in Zapier',
            'Prepare and structure your data',
            'Write the integration code'
          ],
          correctAnswer: 2,
          explanation: 'The first step is always to prepare and structure your data properly. Well-organized data with clear column headers helps the AI understand and use your information effectively.'
        },
        {
          id: 'q4-2',
          question: 'In the Zapier setup, what trigger should you use for a basic MCP connection?',
          options: [
            'Schedule',
            'Webhooks by Zapier (Catch Hook)',
            'Google Sheets',
            'Email'
          ],
          correctAnswer: 1,
          explanation: 'For a basic MCP connection in Zapier, you should use "Webhooks by Zapier" with the "Catch Hook" event as your trigger. This creates an endpoint that can receive queries from your AI.'
        }
      ],
      hasSandbox: true,
      downloadableResources: [
        {
          name: 'Community Members Template',
          description: 'Ready-to-use Google Sheet template with sample data',
          url: '#'
        },
        {
          name: 'Zapier Setup Guide',
          description: 'Detailed PDF with screenshots of each step',
          url: '#'
        }
      ]
    },
    {
      id: 5,
      title: 'Testing and Optimization',
      description: 'Refining your MCP implementation for better results',
      duration: '35 min',
      content: (
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-foreground">Testing Your MCP Connection</h3>
          <p className="text-muted-foreground">
            Once you've set up your MCP connection, it's important to test it thoroughly to ensure it works as expected and provides valuable responses.
          </p>
          
          <div className="bg-card/50 border border-border rounded-lg p-6">
            <h4 className="text-foreground font-semibold mb-4">Testing Strategy</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">1</div>
                <div>
                  <div className="font-medium text-foreground">Start with Simple Queries</div>
                  <p className="text-muted-foreground text-sm">
                    Begin with straightforward questions that have clear answers in your data:
                  </p>
                  <ul className="mt-2 space-y-1 text-muted-foreground text-sm">
                    <li>• "Who has the most contributions?"</li>
                    <li>• "What is Sarah's email address?"</li>
                    <li>• "How many members are in the marketing team?"</li>
                  </ul>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">2</div>
                <div>
                  <div className="font-medium text-foreground">Test Different Question Formats</div>
                  <p className="text-muted-foreground text-sm">
                    Try asking the same question in different ways to test robustness:
                  </p>
                  <ul className="mt-2 space-y-1 text-muted-foreground text-sm">
                    <li>• "Who are our top contributors?"</li>
                    <li>• "Show me the members with the most contributions"</li>
                    <li>• "Rank our members by contribution count"</li>
                  </ul>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">3</div>
                <div>
                  <div className="font-medium text-foreground">Try Complex Queries</div>
                  <p className="text-muted-foreground text-sm">
                    Progress to more complex questions that require analysis:
                  </p>
                  <ul className="mt-2 space-y-1 text-muted-foreground text-sm">
                    <li>• "Who joined in January and has more than 40 contributions?"</li>
                    <li>• "Compare the contribution levels between designers and developers"</li>
                    <li>• "Who should we feature in our next community spotlight?"</li>
                  </ul>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">4</div>
                <div>
                  <div className="font-medium text-foreground">Test Edge Cases</div>
                  <p className="text-muted-foreground text-sm">
                    Try questions that might challenge the system:
                  </p>
                  <ul className="mt-2 space-y-1 text-muted-foreground text-sm">
                    <li>• Questions about data that doesn't exist</li>
                    <li>• Ambiguous questions with multiple interpretations</li>
                    <li>• Questions requiring inference beyond the raw data</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <h3 className="text-xl font-bold text-foreground">Optimizing Your MCP Connection</h3>
          <div className="space-y-4">
            <div className="bg-matrix-primary/10 border border-matrix-primary/20 rounded-lg p-4">
              <h4 className="text-matrix-primary font-semibold mb-2">Improving Data Structure</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Use clear, consistent column headers</li>
                <li>• Add calculated columns for common queries</li>
                <li>• Ensure data is clean and formatted consistently</li>
                <li>• Consider adding metadata columns for better context</li>
              </ul>
            </div>
            
            <div className="bg-matrix-primary/10 border border-matrix-primary/20 rounded-lg p-4">
              <h4 className="text-matrix-primary font-semibold mb-2">Refining AI Prompts</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Be specific about how the AI should use the data</li>
                <li>• Include formatting instructions for consistent responses</li>
                <li>• Provide examples of good responses</li>
                <li>• Add context about the data's purpose and limitations</li>
              </ul>
            </div>
            
            <div className="bg-matrix-primary/10 border border-matrix-primary/20 rounded-lg p-4">
              <h4 className="text-matrix-primary font-semibold mb-2">Handling Edge Cases</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Add instructions for handling missing data</li>
                <li>• Create fallback responses for unanswerable questions</li>
                <li>• Implement confidence scores for uncertain answers</li>
                <li>• Consider adding a feedback mechanism</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Lightbulb className="w-5 h-5 text-blue-400" />
              <span className="text-blue-400 font-medium">Pro Tip</span>
            </div>
            <p className="text-blue-300">
              Keep a log of questions that didn't work well and their improved versions. This "prompt library" becomes invaluable as you build more MCP connections.
            </p>
          </div>
          
          <h3 className="text-xl font-bold text-foreground">Measuring Success</h3>
          <div className="bg-muted/50 rounded-lg p-4">
            <p className="text-muted-foreground mb-4">
              How do you know if your MCP implementation is successful? Here are some key metrics to track:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-card/50 p-3 rounded-lg">
                <h4 className="text-foreground font-medium mb-2">Accuracy</h4>
                <p className="text-muted-foreground text-sm">
                  Are the AI's responses factually correct based on your data?
                </p>
              </div>
              <div className="bg-card/50 p-3 rounded-lg">
                <h4 className="text-foreground font-medium mb-2">Relevance</h4>
                <p className="text-muted-foreground text-sm">
                  Do the responses directly address the questions asked?
                </p>
              </div>
              <div className="bg-card/50 p-3 rounded-lg">
                <h4 className="text-foreground font-medium mb-2">Completeness</h4>
                <p className="text-muted-foreground text-sm">
                  Do responses include all relevant information from your data?
                </p>
              </div>
              <div className="bg-card/50 p-3 rounded-lg">
                <h4 className="text-foreground font-medium mb-2">Time Saved</h4>
                <p className="text-muted-foreground text-sm">
                  How much time does this save compared to manual lookups?
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
      quiz: [
        {
          id: 'q5-1',
          question: 'What is the recommended first step when testing an MCP connection?',
          options: [
            'Try complex queries immediately',
            'Start with simple queries that have clear answers',
            'Test edge cases first',
            'Skip testing and go straight to production'
          ],
          correctAnswer: 1,
          explanation: 'It\'s best to start testing with simple, straightforward queries that have clear answers in your data. This establishes a baseline of functionality before moving to more complex scenarios.'
        },
        {
          id: 'q5-2',
          question: 'Which of these is NOT a recommended way to optimize your MCP connection?',
          options: [
            'Use clear, consistent column headers',
            'Add calculated columns for common queries',
            'Limit the AI to only answering simple questions',
            'Implement confidence scores for uncertain answers'
          ],
          correctAnswer: 2,
          explanation: 'Limiting the AI to only answering simple questions is not recommended. Instead, you should provide guidance on how to handle complex questions and edge cases, which allows the AI to be more useful across a wider range of scenarios.'
        }
      ],
      hasSandbox: true
    },
    {
      id: 6,
      title: 'Security and Privacy',
      description: 'Best practices for secure MCP implementations',
      duration: '30 min',
      content: (
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-foreground">Security Fundamentals for MCP</h3>
          <p className="text-muted-foreground">
            Security is a critical consideration when connecting AI to your data. Let's explore the key principles and best practices for keeping your MCP implementations secure.
          </p>
          
          <div className="bg-card/50 border border-border rounded-lg p-6">
            <h4 className="text-foreground font-semibold mb-4">Key Security Principles</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-3">
                  <Shield className="w-5 h-5 text-green-400" />
                  <h5 className="text-foreground font-medium">Principle of Least Privilege</h5>
                </div>
                <p className="text-muted-foreground text-sm">
                  Only grant access to the specific data needed for the task. For example, if your AI only needs to read customer names and purchase history, don't give it access to payment details or addresses.
                </p>
              </div>
              
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-3">
                  <Shield className="w-5 h-5 text-blue-400" />
                  <h5 className="text-foreground font-medium">Data Sovereignty</h5>
                </div>
                <p className="text-muted-foreground text-sm">
                  Your data stays in your systems and under your control. MCP doesn't require uploading your data to the AI provider's servers.
                </p>
              </div>
              
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-3">
                  <Shield className="w-5 h-5 text-purple-400" />
                  <h5 className="text-foreground font-medium">Transparent Operations</h5>
                </div>
                <p className="text-muted-foreground text-sm">
                  All data access should be logged and auditable. You should always know what data was accessed, when, and for what purpose.
                </p>
              </div>
              
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-3">
                  <Shield className="w-5 h-5 text-red-400" />
                  <h5 className="text-foreground font-medium">Revocable Access</h5>
                </div>
                <p className="text-muted-foreground text-sm">
                  You should be able to immediately revoke AI access to your data at any time if needed.
                </p>
              </div>
            </div>
          </div>
          
          <h3 className="text-xl font-bold text-foreground">Practical Security Measures</h3>
          <div className="space-y-4">
            <div className="bg-matrix-primary/10 border border-matrix-primary/20 rounded-lg p-4">
              <h4 className="text-matrix-primary font-semibold mb-2">Data Preparation</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Remove sensitive information before connecting to AI</li>
                <li>• Use anonymized or pseudonymized data when possible</li>
                <li>• Create views or filtered datasets that only include necessary fields</li>
                <li>• Consider creating a separate "AI-safe" copy of your data</li>
              </ul>
            </div>
            
            <div className="bg-matrix-primary/10 border border-matrix-primary/20 rounded-lg p-4">
              <h4 className="text-matrix-primary font-semibold mb-2">Access Controls</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Use read-only access when possible</li>
                <li>• Implement time-limited access tokens</li>
                <li>• Restrict access to specific sheets, tables, or data ranges</li>
                <li>• Regularly review and update access permissions</li>
              </ul>
            </div>
            
            <div className="bg-matrix-primary/10 border border-matrix-primary/20 rounded-lg p-4">
              <h4 className="text-matrix-primary font-semibold mb-2">Monitoring and Logging</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Keep logs of all AI queries and data access</li>
                <li>• Set up alerts for unusual access patterns</li>
                <li>• Regularly review logs for security issues</li>
                <li>• Document all MCP connections and their purposes</li>
              </ul>
            </div>
          </div>
          
          <h3 className="text-xl font-bold text-foreground">Privacy Considerations</h3>
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-6">
            <div className="space-y-4">
              <div>
                <h4 className="text-blue-400 font-semibold mb-2">Personal Data Handling</h4>
                <p className="text-muted-foreground">
                  Be especially careful when connecting AI to data containing personal information. Consider:
                </p>
                <ul className="mt-2 space-y-1 text-muted-foreground text-sm">
                  <li>• Does this connection comply with privacy regulations like GDPR or CCPA?</li>
                  <li>• Do you have proper consent to use this data with AI?</li>
                  <li>• Can you achieve your goals with anonymized data instead?</li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-blue-400 font-semibold mb-2">Transparency with Users</h4>
                <p className="text-muted-foreground">
                  Be open with your users about how their data is being used:
                </p>
                <ul className="mt-2 space-y-1 text-muted-foreground text-sm">
                  <li>• Update privacy policies to reflect AI data usage</li>
                  <li>• Consider providing opt-out options</li>
                  <li>• Explain the benefits of AI-powered features</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Shield className="w-5 h-5 text-red-400" />
              <span className="text-red-400 font-medium">Important Security Warning</span>
            </div>
            <p className="text-red-300">
              Always start with non-sensitive data for your first MCP implementations. As you gain experience and confidence in your security measures, you can gradually work with more sensitive information.
            </p>
          </div>
        </div>
      ),
      quiz: [
        {
          id: 'q6-1',
          question: 'What is the "Principle of Least Privilege" in MCP security?',
          options: [
            'Only allowing senior team members to access the data',
            'Only granting access to the specific data needed for the task',
            'Using the simplest possible connection method',
            'Limiting AI usage to business hours only'
          ],
          correctAnswer: 1,
          explanation: 'The Principle of Least Privilege means only granting access to the specific data needed for the task, rather than providing broader access than necessary. This minimizes potential security risks.'
        },
        {
          id: 'q6-2',
          question: 'Which of these is the BEST approach when handling personal data with MCP?',
          options: [
            'Always use the full dataset to ensure accuracy',
            'Only connect to personal data during business hours',
            'Consider if you can achieve your goals with anonymized data instead',
            'Store a backup of all data accessed by AI'
          ],
          correctAnswer: 2,
          explanation: 'When handling personal data, the best approach is to consider if you can achieve your goals with anonymized data instead. This maintains privacy while still allowing the AI to provide valuable insights.'
        }
      ]
    },
    {
      id: 7,
      title: 'Advanced MCP Patterns',
      description: 'Taking your MCP implementations to the next level',
      duration: '40 min',
      content: (
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-foreground">Beyond the Basics</h3>
          <p className="text-muted-foreground">
            Now that you understand the fundamentals of MCP, let's explore more advanced patterns and techniques to create even more powerful AI-powered solutions.
          </p>
          
          <div className="bg-card/50 border border-border rounded-lg p-6">
            <h4 className="text-foreground font-semibold mb-4">Multi-Source Connections</h4>
            <p className="text-muted-foreground mb-4">
              One of the most powerful advanced patterns is connecting AI to multiple data sources simultaneously. This allows the AI to synthesize information across different systems.
            </p>
            <div className="bg-muted/50 rounded-lg p-4">
              <h5 className="text-foreground font-medium mb-2">Example: Customer Support Assistant</h5>
              <p className="text-muted-foreground text-sm mb-3">
                Connect AI to both your customer database AND your product knowledge base to create a support assistant that can:
              </p>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li>• Look up customer information and purchase history</li>
                <li>• Find relevant product documentation</li>
                <li>• Combine both to provide personalized support</li>
              </ul>
            </div>
            <div className="mt-4">
              <h5 className="text-foreground font-medium mb-2">Implementation Approach:</h5>
              <ol className="space-y-2 text-muted-foreground">
                <li>1. Set up separate connections for each data source</li>
                <li>2. Create a "router" that directs queries to the appropriate source</li>
                <li>3. Implement a consolidation step that combines results</li>
                <li>4. Add context in your prompts about how to use multiple sources</li>
              </ol>
            </div>
          </div>
          
          <div className="bg-card/50 border border-border rounded-lg p-6">
            <h4 className="text-foreground font-semibold mb-4">Bi-Directional Workflows</h4>
            <p className="text-muted-foreground mb-4">
              Most basic MCP implementations are read-only, but advanced patterns can include writing data back to your systems.
            </p>
            <div className="bg-muted/50 rounded-lg p-4">
              <h5 className="text-foreground font-medium mb-2">Example: Project Management Assistant</h5>
              <p className="text-muted-foreground text-sm mb-3">
                Create an assistant that can both read project data AND create new tasks or update statuses:
              </p>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li>• "Show me all overdue tasks" (read operation)</li>
                <li>• "Create a new task for Sarah to review the design" (write operation)</li>
                <li>• "Mark the homepage redesign as completed" (update operation)</li>
              </ul>
            </div>
            <div className="mt-4">
              <h5 className="text-foreground font-medium mb-2">Implementation Approach:</h5>
              <ol className="space-y-2 text-muted-foreground">
                <li>1. Set up separate workflows for read and write operations</li>
                <li>2. Implement strict validation for write operations</li>
                <li>3. Add confirmation steps for critical changes</li>
                <li>4. Maintain detailed logs of all write operations</li>
              </ol>
            </div>
          </div>
          
          <div className="bg-card/50 border border-border rounded-lg p-6">
            <h4 className="text-foreground font-semibold mb-4">Contextual Memory</h4>
            <p className="text-muted-foreground mb-4">
              Advanced MCP implementations can maintain context across multiple interactions, creating a more natural conversation flow.
            </p>
            <div className="bg-muted/50 rounded-lg p-4">
              <h5 className="text-foreground font-medium mb-2">Example: Sales Assistant with Memory</h5>
              <p className="text-muted-foreground text-sm mb-3">
                Create a sales assistant that remembers previous questions and builds context:
              </p>
              <div className="space-y-2 text-muted-foreground text-sm">
                <div className="bg-blue-500/10 p-2 rounded">
                  <strong>User:</strong> "Show me our top customers in the healthcare sector"
                </div>
                <div className="bg-green-500/10 p-2 rounded">
                  <strong>AI:</strong> "Your top healthcare customers are: Memorial Hospital ($120K), City Medical Group ($95K), and Wellness Partners ($82K)."
                </div>
                <div className="bg-blue-500/10 p-2 rounded">
                  <strong>User:</strong> "What products are they using?"
                </div>
                <div className="bg-green-500/10 p-2 rounded">
                  <strong>AI:</strong> "Memorial Hospital: Enterprise Suite, Analytics Pro<br />City Medical Group: Standard Plan, Mobile Add-on<br />Wellness Partners: Standard Plan, API Access"
                </div>
              </div>
            </div>
            <div className="mt-4">
              <h5 className="text-foreground font-medium mb-2">Implementation Approach:</h5>
              <ol className="space-y-2 text-muted-foreground">
                <li>1. Store conversation history in a temporary database</li>
                <li>2. Include relevant history in each new query</li>
                <li>3. Implement context management to prevent overloading</li>
                <li>4. Add clear instructions about using context in your prompts</li>
              </ol>
            </div>
          </div>
          
          <div className="bg-matrix-primary/10 border border-matrix-primary/20 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Zap className="w-5 h-5 text-matrix-primary" />
              <span className="text-matrix-primary font-medium">Advanced Tip</span>
            </div>
            <p className="text-matrix-secondary">
              These advanced patterns often require more complex platform setups. As you progress, consider exploring platforms like Make.com (formerly Integromat) or Microsoft Power Platform, which offer more flexibility for advanced workflows.
            </p>
          </div>
        </div>
      ),
      quiz: [
        {
          id: 'q7-1',
          question: 'What is a key benefit of multi-source MCP connections?',
          options: [
            'They are easier to set up than single-source connections',
            'They allow AI to synthesize information across different systems',
            'They are always more secure than single-source connections',
            'They eliminate the need for data preparation'
          ],
          correctAnswer: 1,
          explanation: 'The key benefit of multi-source MCP connections is that they allow AI to synthesize information across different systems, providing more comprehensive and valuable insights than would be possible with a single data source.'
        },
        {
          id: 'q7-2',
          question: 'When implementing bi-directional workflows that allow AI to write data, what is most important?',
          options: [
            'Making the process as fast as possible',
            'Allowing unlimited write access',
            'Implementing strict validation and logging',
            'Using the most expensive platform available'
          ],
          correctAnswer: 2,
          explanation: 'When implementing bi-directional workflows that allow AI to write data, the most important consideration is implementing strict validation and logging. This ensures data integrity and provides an audit trail of all changes.'
        }
      ],
      hasSandbox: true
    },
    {
      id: 8,
      title: 'Real-World Case Studies',
      description: 'Learning from successful MCP implementations',
      duration: '35 min',
      content: (
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-foreground">Learning from Success</h3>
          <p className="text-muted-foreground">
            In this final module, we'll examine real-world case studies of successful MCP implementations by non-developers. These examples will inspire you and provide practical insights for your own projects.
          </p>
          
          <div className="bg-card/50 border border-border rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="text-3xl">👩‍💼</div>
              <div>
                <h4 className="text-foreground font-semibold">Community Management Revolution</h4>
                <p className="text-muted-foreground text-sm">Sarah Chen, Community Manager at TechCorp</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h5 className="text-foreground font-medium mb-2">The Challenge</h5>
                <p className="text-muted-foreground">
                  Sarah managed a community of 5,000+ members and spent 4+ hours daily answering repetitive questions about member information, contribution stats, and contact details.
                </p>
              </div>
              
              <div>
                <h5 className="text-foreground font-medium mb-2">The Solution</h5>
                <p className="text-muted-foreground">
                  Sarah built an MCP connection between her member spreadsheet and ChatGPT using Zapier. The AI can now instantly answer questions about any member.
                </p>
              </div>
              
              <div>
                <h5 className="text-foreground font-medium mb-2">Implementation Details</h5>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  <li>• <strong>Platform:</strong> Zapier + Google Sheets + ChatGPT</li>
                  <li>• <strong>Setup time:</strong> 2 weeks (part-time)</li>
                  <li>• <strong>Technical background:</strong> No coding experience, comfortable with spreadsheets</li>
                </ul>
              </div>
              
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                <h5 className="text-green-400 font-medium mb-2">Results</h5>
                <ul className="space-y-1 text-green-300 text-sm">
                  <li>• 95% reduction in response time (4 hours → 15 minutes)</li>
                  <li>• 3.75 hours saved daily for strategic work</li>
                  <li>• 89% increase in member satisfaction scores</li>
                  <li>• Freed up time to launch 3 new community initiatives</li>
                </ul>
              </div>
              
              <div>
                <h5 className="text-foreground font-medium mb-2">Key Takeaway</h5>
                <p className="text-matrix-primary">
                  "MCP transformed my role from reactive support to strategic community building. I now spend my time on initiatives that actually grow our community."
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-card/50 border border-border rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="text-3xl">👨‍💻</div>
              <div>
                <h4 className="text-foreground font-semibold">Marketing Campaign Personalization</h4>
                <p className="text-muted-foreground text-sm">Mike Rodriguez, Marketing Director at GrowthCo</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h5 className="text-foreground font-medium mb-2">The Challenge</h5>
                <p className="text-muted-foreground">
                  Creating personalized marketing campaigns for 10,000+ customers was impossible with Mike's small team. Generic campaigns had 2% conversion rates.
                </p>
              </div>
              
              <div>
                <h5 className="text-foreground font-medium mb-2">The Solution</h5>
                <p className="text-muted-foreground">
                  Mike connected his CRM to Claude AI via Airtable. The system automatically segments customers and generates personalized email content based on their behavior and preferences.
                </p>
              </div>
              
              <div>
                <h5 className="text-foreground font-medium mb-2">Implementation Details</h5>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  <li>• <strong>Platform:</strong> Airtable + Claude AI + Mailchimp</li>
                  <li>• <strong>Setup time:</strong> 3 weeks</li>
                  <li>• <strong>Technical background:</strong> Some experience with marketing automation tools</li>
                </ul>
              </div>
              
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                <h5 className="text-green-400 font-medium mb-2">Results</h5>
                <ul className="space-y-1 text-green-300 text-sm">
                  <li>• 300% increase in email conversion rates (2% → 6%)</li>
                  <li>• $180K additional monthly revenue</li>
                  <li>• 2 hours saved daily on campaign creation</li>
                  <li>• 85% reduction in campaign preparation time</li>
                </ul>
              </div>
              
              <div>
                <h5 className="text-foreground font-medium mb-2">Key Takeaway</h5>
                <p className="text-matrix-primary">
                  "We went from sending generic blasts to delivering personalized experiences at scale. Our customers notice the difference, and our revenue shows it."
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-card/50 border border-border rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="text-3xl">👩‍🔬</div>
              <div>
                <h4 className="text-foreground font-semibold">Project Status Automation</h4>
                <p className="text-muted-foreground text-sm">Lisa Park, Project Manager at InnovateLab</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h5 className="text-foreground font-medium mb-2">The Challenge</h5>
                <p className="text-muted-foreground">
                  Managing 15+ concurrent projects meant spending entire Fridays creating status reports. Teams were always asking for updates.
                </p>
              </div>
              
              <div>
                <h5 className="text-foreground font-medium mb-2">The Solution</h5>
                <p className="text-muted-foreground">
                  Lisa built an MCP bridge between Notion project databases and GPT-4. The AI generates comprehensive status reports, identifies risks, and suggests optimizations.
                </p>
              </div>
              
              <div>
                <h5 className="text-foreground font-medium mb-2">Implementation Details</h5>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  <li>• <strong>Platform:</strong> Notion + GPT-4 + Slack</li>
                  <li>• <strong>Setup time:</strong> 1 week</li>
                  <li>• <strong>Technical background:</strong> Experienced with project management tools</li>
                </ul>
              </div>
              
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                <h5 className="text-green-400 font-medium mb-2">Results</h5>
                <ul className="space-y-1 text-green-300 text-sm">
                  <li>• 5 hours saved weekly on status reporting</li>
                  <li>• 90% improvement in project visibility</li>
                  <li>• 40% reduction in project delays</li>
                  <li>• 95% team satisfaction with new reporting</li>
                </ul>
              </div>
              
              <div>
                <h5 className="text-foreground font-medium mb-2">Key Takeaway</h5>
                <p className="text-matrix-primary">
                  "I transformed from a status report generator to a strategic project leader. The AI handles the busy work so I can focus on solving real problems."
                </p>
              </div>
            </div>
          </div>
          
          <h3 className="text-xl font-bold text-foreground">Common Success Patterns</h3>
          <div className="bg-matrix-primary/10 border border-matrix-primary/20 rounded-lg p-6">
            <p className="text-muted-foreground mb-4">
              Analyzing these case studies reveals common patterns that contributed to their success:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-matrix-primary font-semibold mb-2">Start Small, Then Expand</h4>
                <p className="text-muted-foreground text-sm">
                  All successful implementations started with a focused, well-defined problem rather than trying to solve everything at once.
                </p>
              </div>
              <div>
                <h4 className="text-matrix-primary font-semibold mb-2">Prioritize Data Quality</h4>
                <p className="text-muted-foreground text-sm">
                  Successful projects invested time in cleaning and structuring their data before connecting it to AI.
                </p>
              </div>
              <div>
                <h4 className="text-matrix-primary font-semibold mb-2">Iterate Based on Feedback</h4>
                <p className="text-muted-foreground text-sm">
                  They continuously improved their implementations based on real usage and feedback.
                </p>
              </div>
              <div>
                <h4 className="text-matrix-primary font-semibold mb-2">Measure Concrete Results</h4>
                <p className="text-muted-foreground text-sm">
                  Successful projects tracked specific metrics to demonstrate value and justify further investment.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Lightbulb className="w-5 h-5 text-blue-400" />
              <span className="text-blue-400 font-medium">Final Insight</span>
            </div>
            <p className="text-blue-300">
              The most successful MCP implementations aren't just about technology—they're about solving real business problems. Focus on the outcomes you want to achieve, not just the technical implementation.
            </p>
          </div>
          
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-6 text-center">
            <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-3" />
            <h3 className="text-xl font-bold text-foreground mb-2">Congratulations!</h3>
            <p className="text-muted-foreground mb-4">
              You've completed the MCP Basics course! You now have the knowledge and skills to build your own MCP connections and transform how you work with AI.
            </p>
            <p className="text-green-300 mb-6">
              Remember, the best way to learn is by doing. Start with a simple project, and don't hesitate to reach out to our community for help along the way.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/templates"
                className="bg-gradient-to-r from-matrix-primary to-matrix-secondary hover:from-matrix-accent hover:to-matrix-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold transition-all duration-200"
              >
                Browse Templates
              </Link>
              <Link
                to="/sandbox"
                className="border border-border text-foreground px-8 py-3 rounded-lg font-semibold hover:bg-muted transition-colors duration-200"
              >
                Practice in Sandbox
              </Link>
            </div>
          </div>
        </div>
      ),
      quiz: [
        {
          id: 'q8-1',
          question: 'What was the key result of Sarah\'s community management MCP implementation?',
          options: [
            'Increased community size by 200%',
            '95% reduction in response time for member queries',
            'Eliminated the need for community managers',
            'Reduced server costs by 50%'
          ],
          correctAnswer: 1,
          explanation: 'Sarah\'s MCP implementation resulted in a 95% reduction in response time for member queries (from 4 hours to 15 minutes), which freed up her time for strategic community building initiatives.'
        },
        {
          id: 'q8-2',
          question: 'What common pattern was identified across successful MCP implementations?',
          options: [
            'They all used the same platform',
            'They all required significant coding',
            'They all started small with a focused problem',
            'They all took at least 6 months to implement'
          ],
          correctAnswer: 2,
          explanation: 'A common pattern across successful MCP implementations is that they started small with a focused, well-defined problem rather than trying to solve everything at once. This approach allowed for quicker wins and iterative improvement.'
        }
      ],
      downloadableResources: [
        {
          name: 'MCP Implementation Checklist',
          description: 'Step-by-step guide for your own projects',
          url: '#'
        },
        {
          name: 'Case Study Collection',
          description: 'Detailed breakdowns of successful implementations',
          url: '#'
        },
        {
          name: 'MCP Security Guide',
          description: 'Comprehensive security best practices',
          url: '#'
        }
      ]
    }
  ]

  const handleCompleteModule = (moduleId: number) => {
    if (!completedModules.includes(moduleId)) {
      setCompletedModules([...completedModules, moduleId])
    }
    
    // Move to next module if available
    if (moduleId < modules.length) {
      setCurrentModule(moduleId + 1)
    }
    
    setShowQuiz(false)
    setShowSandbox(false)
  }

  const handleQuizComplete = (score: number) => {
    console.log(`Quiz completed with score: ${score}`)
    // If score is passing (e.g., 70% or higher), mark module as completed
    const currentQuiz = modules[currentModule - 1].quiz
    if (currentQuiz && score / currentQuiz.length >= 0.7) {
      handleCompleteModule(currentModule)
    }
  }

  const currentModuleData = modules[currentModule - 1]

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">MCP Basics: Complete Course</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Master the Model Context Protocol with this comprehensive, step-by-step course designed for non-developers
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress Tracker */}
            <ProgressTracker 
              currentModule={currentModule}
              totalModules={modules.length}
              completedModules={completedModules}
              timeSpent="2h 15m"
              streak={3}
            />

            {/* Module Navigation */}
            <div className="bg-card/50 backdrop-blur-md border border-border rounded-xl overflow-hidden">
              <div className="p-4 border-b border-border">
                <h3 className="text-lg font-bold text-foreground">Course Modules</h3>
              </div>
              <div className="p-2">
                {modules.map((module) => (
                  <button
                    key={module.id}
                    onClick={() => setCurrentModule(module.id)}
                    className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                      currentModule === module.id
                        ? 'bg-matrix-primary/20 text-matrix-primary'
                        : completedModules.includes(module.id)
                        ? 'bg-green-500/10 text-green-400 hover:bg-green-500/20'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        completedModules.includes(module.id)
                          ? 'bg-green-500 text-white'
                          : currentModule === module.id
                          ? 'bg-matrix-primary text-white'
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {completedModules.includes(module.id) ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          module.id
                        )}
                      </div>
                      <div>
                        <div className={`font-medium ${
                          currentModule === module.id
                            ? 'text-matrix-primary'
                            : completedModules.includes(module.id)
                            ? 'text-green-400'
                            : 'text-foreground'
                        }`}>
                          {module.title}
                        </div>
                        <div className="text-xs text-muted-foreground">{module.duration}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Resources */}
            {currentModuleData.downloadableResources && (
              <div className="bg-card/50 backdrop-blur-md border border-border rounded-xl p-4">
                <h3 className="text-lg font-bold text-foreground mb-4">Downloadable Resources</h3>
                <div className="space-y-3">
                  {currentModuleData.downloadableResources.map((resource, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors duration-200">
                      <Download className="w-5 h-5 text-matrix-primary" />
                      <div>
                        <div className="font-medium text-foreground">{resource.name}</div>
                        <div className="text-muted-foreground text-xs">{resource.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Module Header */}
            <div className="bg-gradient-to-r from-matrix-primary/20 to-matrix-secondary/20 border border-matrix-primary/30 rounded-xl p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-white">Module {currentModuleData.id}: {currentModuleData.title}</h2>
                <div className="flex items-center space-x-1 text-matrix-secondary">
                  <Clock className="w-4 h-4" />
                  <span>{currentModuleData.duration}</span>
                </div>
              </div>
              <p className="text-matrix-secondary">{currentModuleData.description}</p>
            </div>

            {/* Content Display */}
            {!showQuiz && !showSandbox && (
              <div className="bg-card/50 backdrop-blur-md border border-border rounded-xl p-8 mb-8">
                {currentModuleData.content}
              </div>
            )}

            {/* Quiz Display */}
            {showQuiz && currentModuleData.quiz && (
              <div className="mb-8">
                <InteractiveQuiz 
                  questions={currentModuleData.quiz}
                  title={`Module ${currentModuleData.id} Quiz`}
                  onComplete={handleQuizComplete}
                />
              </div>
            )}

            {/* Sandbox Display */}
            {showSandbox && currentModuleData.hasSandbox && (
              <div className="mb-8">
                <MCPSandbox />
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 justify-between">
              <div className="flex flex-wrap gap-4">
                {currentModule > 1 && (
                  <button
                    onClick={() => {
                      setCurrentModule(currentModule - 1)
                      setShowQuiz(false)
                      setShowSandbox(false)
                    }}
                    className="flex items-center space-x-2 px-6 py-3 border border-border text-foreground rounded-lg hover:bg-muted transition-colors duration-200"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Previous Module</span>
                  </button>
                )}
                
                {currentModuleData.quiz && (
                  <button
                    onClick={() => {
                      setShowQuiz(!showQuiz)
                      setShowSandbox(false)
                    }}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors duration-200 ${
                      showQuiz
                        ? 'bg-blue-500/20 border border-blue-500/30 text-blue-400'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    <Lightbulb className="w-4 h-4" />
                    <span>{showQuiz ? 'Hide Quiz' : 'Take Quiz'}</span>
                  </button>
                )}
                
                {currentModuleData.hasSandbox && (
                  <button
                    onClick={() => {
                      setShowSandbox(!showSandbox)
                      setShowQuiz(false)
                    }}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors duration-200 ${
                      showSandbox
                        ? 'bg-purple-500/20 border border-purple-500/30 text-purple-400'
                        : 'bg-purple-600 hover:bg-purple-700 text-white'
                    }`}
                  >
                    <Code className="w-4 h-4" />
                    <span>{showSandbox ? 'Hide Sandbox' : 'Try in Sandbox'}</span>
                  </button>
                )}
                
                {currentModuleData.videoUrl && (
                  <button className="flex items-center space-x-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200">
                    <Play className="w-4 h-4" />
                    <span>Watch Video</span>
                  </button>
                )}
              </div>
              
              <div>
                {currentModule < modules.length ? (
                  <button
                    onClick={() => handleCompleteModule(currentModule)}
                    className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-matrix-primary to-matrix-secondary hover:from-matrix-accent hover:to-matrix-primary text-primary-foreground rounded-lg transition-all duration-200"
                  >
                    <span>Complete & Continue</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => handleCompleteModule(currentModule)}
                    className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white rounded-lg transition-all duration-200"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Complete Course</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="mt-16 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Ready to Apply Your Knowledge?</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Now that you understand MCP fundamentals, it's time to start building your own solutions. Explore our templates, join the community, and share your success!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/templates"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200"
            >
              Browse Templates
            </Link>
            <Link
              to="/sandbox"
              className="border border-white/20 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors duration-200"
            >
              Practice in Sandbox
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}