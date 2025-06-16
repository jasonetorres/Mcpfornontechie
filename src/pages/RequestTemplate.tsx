import React, { useState } from 'react';
import { Send, CheckCircle, Clock, Users, Zap, ArrowRight } from 'lucide-react';

function RequestTemplate() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    company: '',
    useCase: '',
    category: '',
    platform: '',
    dataSource: '',
    description: '',
    urgency: '',
    budget: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const categories = [
    'Community Management',
    'Marketing & Growth',
    'Project Management',
    'Sales & Business',
    'Operations',
    'Customer Support',
    'Content Creation',
    'Data Analysis',
    'Other'
  ];

  const platforms = [
    'Zapier',
    'Microsoft Power Platform',
    'Airtable',
    'Notion',
    'Make.com',
    'Bubble',
    'No preference',
    'Other'
  ];

  const urgencyLevels = [
    { value: 'low', label: 'Low - Nice to have (1-2 months)' },
    { value: 'medium', label: 'Medium - Would help a lot (2-4 weeks)' },
    { value: 'high', label: 'High - Urgent need (1-2 weeks)' },
    { value: 'critical', label: 'Critical - Blocking my work (ASAP)' }
  ];

  const budgetRanges = [
    'Free/Community template',
    '$50-100 (Basic custom template)',
    '$100-250 (Advanced template)',
    '$250-500 (Complex template)',
    '$500+ (Enterprise solution)',
    'Open to discussion'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Here you would typically send the data to your backend
    console.log('Template request submitted:', formData);
  };

  const requestStats = [
    { label: 'Templates Created', value: '127', icon: Zap },
    { label: 'Avg Response Time', value: '3 days', icon: Clock },
    { label: 'Success Rate', value: '94%', icon: CheckCircle },
    { label: 'Happy Customers', value: '89', icon: Users }
  ];

  const recentRequests = [
    {
      title: 'Event Registration Automation',
      category: 'Community Management',
      status: 'Completed',
      timeframe: '5 days'
    },
    {
      title: 'Lead Qualification Scorer',
      category: 'Sales & Business',
      status: 'In Progress',
      timeframe: '2 days remaining'
    },
    {
      title: 'Content Calendar Assistant',
      category: 'Marketing & Growth',
      status: 'Completed',
      timeframe: '3 days'
    },
    {
      title: 'Expense Report Analyzer',
      category: 'Operations',
      status: 'Planning',
      timeframe: '1 week'
    }
  ];

  if (submitted) {
    return (
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-12">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-4">Request Submitted Successfully!</h1>
            <p className="text-xl text-gray-300 mb-8">
              Thank you for your template request. Our team will review it and get back to you within 24-48 hours.
            </p>
            
            <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-white mb-2">What happens next?</h3>
              <div className="space-y-2 text-blue-200">
                <div>1. Our team reviews your request (within 24 hours)</div>
                <div>2. We'll send you a detailed proposal and timeline</div>
                <div>3. Upon approval, we start building your template</div>
                <div>4. You receive the completed template with documentation</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setSubmitted(false)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200"
              >
                Submit Another Request
              </button>
              <button className="border border-white/20 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors duration-200">
                Browse Existing Templates
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">Request a Custom Template</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Can't find the perfect template? Let our experts build one specifically for your use case.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {requestStats.map((stat, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-gray-300 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Request Form */}
          <div className="lg:col-span-2">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Template Request Form</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-medium mb-2">Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-slate-800 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-slate-800 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-medium mb-2">Role *</label>
                    <input
                      type="text"
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-slate-800 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400"
                      placeholder="e.g., Community Manager"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Company</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full bg-slate-800 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400"
                      placeholder="Your company name"
                    />
                  </div>
                </div>

                {/* Project Details */}
                <div>
                  <label className="block text-white font-medium mb-2">Use Case Title *</label>
                  <input
                    type="text"
                    name="useCase"
                    value={formData.useCase}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-slate-800 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400"
                    placeholder="e.g., Automated Customer Onboarding Assistant"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-medium mb-2">Category *</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-slate-800 border border-white/20 rounded-lg px-4 py-2 text-white"
                    >
                      <option value="">Select a category</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Preferred Platform</label>
                    <select
                      name="platform"
                      value={formData.platform}
                      onChange={handleInputChange}
                      className="w-full bg-slate-800 border border-white/20 rounded-lg px-4 py-2 text-white"
                    >
                      <option value="">Select a platform</option>
                      {platforms.map((platform) => (
                        <option key={platform} value={platform}>{platform}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Data Source *</label>
                  <input
                    type="text"
                    name="dataSource"
                    value={formData.dataSource}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-slate-800 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400"
                    placeholder="e.g., Google Sheets with customer data, Salesforce CRM, etc."
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Detailed Description *</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full bg-slate-800 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400"
                    placeholder="Describe your specific challenge, what you want the AI to do, and what success looks like..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-medium mb-2">Urgency *</label>
                    <select
                      name="urgency"
                      value={formData.urgency}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-slate-800 border border-white/20 rounded-lg px-4 py-2 text-white"
                    >
                      <option value="">Select urgency level</option>
                      {urgencyLevels.map((level) => (
                        <option key={level.value} value={level.value}>{level.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Budget Range</label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full bg-slate-800 border border-white/20 rounded-lg px-4 py-2 text-white"
                    >
                      <option value="">Select budget range</option>
                      {budgetRanges.map((range) => (
                        <option key={range} value={range}>{range}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <Send className="w-5 h-5" />
                  <span>Submit Template Request</span>
                </button>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Process */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Our Process</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-bold">1</span>
                  </div>
                  <div>
                    <div className="text-white font-medium">Review & Analysis</div>
                    <div className="text-gray-300 text-sm">We analyze your requirements and feasibility</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-bold">2</span>
                  </div>
                  <div>
                    <div className="text-white font-medium">Proposal & Timeline</div>
                    <div className="text-gray-300 text-sm">Detailed proposal with timeline and pricing</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-bold">3</span>
                  </div>
                  <div>
                    <div className="text-white font-medium">Development</div>
                    <div className="text-gray-300 text-sm">We build and test your custom template</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-bold">4</span>
                  </div>
                  <div>
                    <div className="text-white font-medium">Delivery & Support</div>
                    <div className="text-gray-300 text-sm">Template delivery with documentation and support</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Requests */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Recent Requests</h3>
              <div className="space-y-3">
                {recentRequests.map((request, index) => (
                  <div key={index} className="bg-slate-800/50 rounded-lg p-3">
                    <div className="text-white font-medium text-sm">{request.title}</div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-gray-400 text-xs">{request.category}</span>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded text-xs ${
                          request.status === 'Completed' ? 'bg-green-500/20 text-green-400' :
                          request.status === 'In Progress' ? 'bg-blue-500/20 text-blue-400' :
                          'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {request.status}
                        </span>
                        <span className="text-gray-400 text-xs">{request.timeframe}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RequestTemplate;