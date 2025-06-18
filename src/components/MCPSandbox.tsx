import React, { useState } from 'react'
import { Play, RotateCcw, CheckCircle, AlertCircle, Code, Database, MessageSquare, Settings, Maximize2, Minimize2 } from 'lucide-react'

interface SandboxConfig {
  dataSource: string
  aiModel: string
  query: string
  expectedOutput: string
}

const presetConfigs: SandboxConfig[] = [
  {
    dataSource: 'community-members.csv',
    aiModel: 'ChatGPT',
    query: 'Who are our top 3 contributors?',
    expectedOutput: 'Based on the community data:\n1. Sarah Chen - 45 contributions\n2. Lisa Park - 42 contributions\n3. Mike Rodriguez - 38 contributions'
  },
  {
    dataSource: 'customer-data.csv', 
    aiModel: 'Claude',
    query: 'Which customers are in the enterprise segment?',
    expectedOutput: 'Enterprise customers (revenue > $50K):\n- Acme Corp: $75,000\n- Beta Industries: $120,000\n- Gamma Solutions: $95,000'
  },
  {
    dataSource: 'project-tasks.csv',
    aiModel: 'GPT-4',
    query: 'What projects are behind schedule?',
    expectedOutput: 'Projects behind schedule:\n- Website Redesign: 3 days overdue\n- Mobile App: 1 week overdue\nRecommendation: Reallocate resources to critical path items.'
  }
]

export default function MCPSandbox() {
  const [selectedConfig, setSelectedConfig] = useState(0)
  const [customQuery, setCustomQuery] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  const [output, setOutput] = useState('')
  const [showOutput, setShowOutput] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<'disconnected' | 'connecting' | 'connected'>('disconnected')
  const [isExpanded, setIsExpanded] = useState(false)

  const currentConfig = presetConfigs[selectedConfig]

  const handleConnect = async () => {
    setConnectionStatus('connecting')
    // Simulate connection delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    setConnectionStatus('connected')
  }

  const handleRunQuery = async () => {
    if (connectionStatus !== 'connected') {
      await handleConnect()
    }

    setIsRunning(true)
    setShowOutput(false)
    
    // Simulate query processing
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    const query = customQuery || currentConfig.query
    let simulatedOutput = currentConfig.expectedOutput
    
    // Customize output based on query
    if (customQuery.toLowerCase().includes('email')) {
      simulatedOutput = 'Email addresses found:\n- sarah@example.com\n- mike@example.com\n- lisa@example.com'
    } else if (customQuery.toLowerCase().includes('marketing')) {
      simulatedOutput = 'Marketing team members:\n- David Kim (Marketing Director)\n- Jennifer Liu (Content Manager)\n- Alex Chen (Growth Analyst)'
    }
    
    setOutput(simulatedOutput)
    setShowOutput(true)
    setIsRunning(false)
  }

  const handleReset = () => {
    setOutput('')
    setShowOutput(false)
    setCustomQuery('')
    setConnectionStatus('disconnected')
  }

  return (
    <div className={`glass rounded-xl overflow-hidden transition-all duration-300 ${
      isExpanded ? 'fixed inset-4 z-50 max-h-[calc(100vh-2rem)]' : 'relative'
    }`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-matrix-primary/20 to-matrix-secondary/20 border-b border-border p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Code className="w-5 h-5 sm:w-6 sm:h-6 text-matrix-primary" />
            <h3 className="heading-sm">MCP Sandbox</h3>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${
                connectionStatus === 'connected' ? 'status-online' :
                connectionStatus === 'connecting' ? 'status-warning' :
                'status-offline'
              }`}></div>
              <span className="text-xs sm:text-sm text-muted-foreground capitalize">{connectionStatus}</span>
            </div>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 hover:bg-muted rounded-lg transition-colors duration-200"
              aria-label={isExpanded ? 'Minimize sandbox' : 'Expand sandbox'}
            >
              {isExpanded ? (
                <Minimize2 className="w-4 h-4 text-muted-foreground" />
              ) : (
                <Maximize2 className="w-4 h-4 text-muted-foreground" />
              )}
            </button>
          </div>
        </div>
        <p className="text-muted-foreground mt-2 text-sm sm:text-base">
          Practice MCP queries in a safe environment with sample data
        </p>
      </div>

      <div className={`p-4 sm:p-6 ${isExpanded ? 'h-full overflow-y-auto' : ''}`}>
        {/* Configuration */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="form-label">Data Source</label>
            <div className="flex items-center space-x-2 bg-muted/50 rounded-lg p-3">
              <Database className="w-4 h-4 text-matrix-primary flex-shrink-0" />
              <span className="text-foreground text-sm sm:text-base truncate">{currentConfig.dataSource}</span>
            </div>
          </div>
          
          <div>
            <label className="form-label">AI Model</label>
            <div className="flex items-center space-x-2 bg-muted/50 rounded-lg p-3">
              <MessageSquare className="w-4 h-4 text-matrix-secondary flex-shrink-0" />
              <span className="text-foreground text-sm sm:text-base truncate">{currentConfig.aiModel}</span>
            </div>
          </div>
          
          <div className="sm:col-span-2 lg:col-span-1">
            <label className="form-label">Preset</label>
            <select
              value={selectedConfig}
              onChange={(e) => setSelectedConfig(Number(e.target.value))}
              className="form-input text-sm sm:text-base"
            >
              <option value={0}>Community Management</option>
              <option value={1}>Customer Segmentation</option>
              <option value={2}>Project Tracking</option>
            </select>
          </div>
        </div>

        {/* Query Input */}
        <div className="mb-6">
          <label className="form-label">Your Query</label>
          <div className="relative">
            <textarea
              value={customQuery}
              onChange={(e) => setCustomQuery(e.target.value)}
              placeholder={currentConfig.query}
              className="form-input resize-none text-sm sm:text-base"
              rows={isExpanded ? 4 : 3}
              maxLength={500}
            />
            <div className="absolute bottom-3 right-3 text-xs text-muted-foreground">
              {customQuery.length}/500
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <button
            onClick={handleRunQuery}
            disabled={isRunning}
            className="btn-primary flex-1 sm:flex-none"
          >
            {isRunning ? (
              <>
                <div className="loading-spinner mr-2"></div>
                <span>Running Query...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                <span>Run Query</span>
              </>
            )}
          </button>
          
          <button
            onClick={handleReset}
            className="btn-secondary flex-1 sm:flex-none"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            <span>Reset</span>
          </button>
        </div>

        {/* Output */}
        {showOutput && (
          <div className="glass rounded-lg overflow-hidden mb-6">
            <div className="bg-muted border-b border-border px-4 py-3 flex items-center justify-between">
              <span className="text-foreground font-medium">AI Response</span>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-green-400 text-sm">Success</span>
              </div>
            </div>
            <div className="p-4">
              <pre className="text-foreground whitespace-pre-wrap text-sm leading-relaxed overflow-x-auto">
                {output}
              </pre>
            </div>
          </div>
        )}

        {/* Tips */}
        <div className="bg-matrix-primary/10 border border-matrix-primary/20 rounded-lg p-4">
          <div className="flex items-start space-x-2">
            <AlertCircle className="w-5 h-5 text-matrix-primary mt-0.5 flex-shrink-0" />
            <div>
              <div className="text-matrix-primary font-medium mb-1">Sandbox Tips:</div>
              <ul className="text-matrix-secondary text-sm space-y-1">
                <li>• Try different query styles to see how AI responds</li>
                <li>• Experiment with specific vs. general questions</li>
                <li>• Notice how the AI uses your data to provide context</li>
                <li>• This is a safe environment - nothing affects real data</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}