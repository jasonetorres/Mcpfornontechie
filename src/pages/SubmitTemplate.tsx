import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Upload, CheckCircle, Star, Users, Gift, ArrowRight, Clock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

function SubmitTemplate() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    templateTitle: '',
    category: '',
    platform: '',
    description: '',
    useCase: '',
    difficulty: '',
    setupTime: '',
    features: '',
    tools: '',
    benefits: '',
    instructions: '',
    shareType: 'free'
  });

  const [submitted, setSubmitted] = useState(false);
  const [reviewProgress, setReviewProgress] = useState(0);
  const { user, profile, addNotification } = useAuth();

  // Pre-fill form with user data if available
  useEffect(() => {
    if (user && profile) {
      setFormData(prev => ({
        ...prev,
        name: profile.full_name || '',
        email: user.email || '',
      }));
    }
  }, [user, profile]);

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

  const difficultyLevels = [
    'Beginner (No technical experience needed)',
    'Intermediate (Some platform experience helpful)',
    'Advanced (Requires technical knowledge)'
  ];

  const setupTimes = [
    '15-30 minutes',
    '30-60 minutes',
    '1-2 hours',
    '2-4 hours',
    '4+ hours'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Store submission in localStorage for persistence
    if (user) {
      const submissions = JSON.parse(localStorage.getItem(`template-submissions-${user.id}`) || '[]');
      const newSubmission = {
        id: `template-${Date.now()}`,
        ...formData,
        submittedAt: new Date().toISOString(),
        status: 'pending',
        reviewedAt: null
      };
      
      submissions.push(newSubmission);
      localStorage.setItem(`template-submissions-${user.id}`, JSON.stringify(submissions));
      
      // Add notification
      addNotification({
        id: `template-submitted-${Date.now()}`,
        message: 'Template submitted successfully! Our team will review it shortly.',
        type: 'success',
        duration: 5000
      });
      
      // Start the simulated review process
      setSubmitted(true);
      simulateReviewProcess(newSubmission);
    } else {
      setSubmitted(true);
    }
  };

  // Simulate a review process with progress updates
  const simulateReviewProcess = (submission: any) => {
    const totalTime = 5000; // 5 seconds for the simulation
    const interval = 100; // Update every 100ms
    const steps = totalTime / interval;
    let currentStep = 0;
    
    const timer = setInterval(() => {
      currentStep++;
      const progress = Math.min(Math.round((currentStep / steps) * 100), 100);
      setReviewProgress(progress);
      
      if (currentStep >= steps) {
        clearInterval(timer);
        
        // Auto-approve the template after the review process
        approveTemplate(submission);
      }
    }, interval);
  };

  // Auto-approve the template and add it to the templates library
  const approveTemplate = (submission: any) => {
    if (!user) return;
    
    try {
      // Get existing templates from localStorage
      const allTemplates = JSON.parse(localStorage.getItem('community-templates') || '[]');
      
      // Create a new template from the submission
      const newTemplate = {
        id: submission.id,
        title: submission.templateTitle,
        description: submission.description,
        category: submission.category.toLowerCase().replace(/\s+/g, '-'),
        platform: submission.platform.toLowerCase().replace(/\s+/g, '-'),
        difficulty: submission.difficulty.startsWith('Beginner') ? 'Beginner' : 
                   submission.difficulty.startsWith('Intermediate') ? 'Intermediate' : 'Advanced',
        rating: 5.0, // Start with a perfect rating
        downloads: 0,
        dataSource: submission.tools.split(',')[0] || 'Custom Data Source',
        aiModel: 'GPT-4',
        features: submission.features.split('\n').filter(Boolean),
        setupTime: submission.setupTime,
        preview: `// ${submission.templateTitle} Configuration
{
  "name": "${submission.templateTitle}",
  "description": "${submission.description}",
  "author": "${submission.name}",
  "category": "${submission.category}",
  "platform": "${submission.platform}"
}`,
        tags: submission.category.toLowerCase().split(/\s+/).filter(Boolean),
        files: [
          {
            name: 'instructions.md',
            content: submission.instructions
          }
        ],
        author: submission.name,
        approvedAt: new Date().toISOString()
      };
      
      // Add to templates
      allTemplates.push(newTemplate);
      localStorage.setItem('community-templates', JSON.stringify(allTemplates));
      
      // Update the submission status
      const submissions = JSON.parse(localStorage.getItem(`template-submissions-${user.id}`) || '[]');
      const updatedSubmissions = submissions.map((sub: any) => 
        sub.id === submission.id ? { ...sub, status: 'approved', reviewedAt: new Date().toISOString() } : sub
      );
      localStorage.setItem(`template-submissions-${user.id}`, JSON.stringify(updatedSubmissions));
      
      // Notify user
      addNotification({
        id: `template-approved-${Date.now()}`,
        message: 'Your template has been approved and published to the library!',
        type: 'success',
        duration: 5000
      });
    } catch (error) {
      console.error('Error approving template:', error);
    }
  };

  const contributorBenefits = [
    {
      icon: Star,
      title: 'Recognition',
      description: 'Get featured as a template creator with your profile and story'
    },
    {
      icon: Users,
      title: 'Community Impact',
      description: 'Help thousands of non-developers succeed with your expertise'
    },
    {
      icon: Gift,
      title: 'Rewards',
      description: 'Earn credits, swag, and potential revenue sharing opportunities'
    }
  ];

  const featuredContributors = [
    {
      name: 'Sarah Chen',
      role: 'Community Manager',
      avatar: '👩‍💼',
      templates: 8,
      downloads: 2847,
      rating: 4.9
    },
    {
      name: 'Mike Rodriguez',
      role: 'Marketing Director',
      avatar: '👨‍💻',
      templates: 5,
      downloads: 1923,
      rating: 4.8
    },
    {
      name: 'Lisa Park',
      role: 'Project Manager',
      avatar: '👩‍🔬',
      templates: 6,
      downloads: 1456,
      rating: 4.9
    }
  ];

  if (submitted) {
    return (
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-12">
            {reviewProgress < 100 ? (
              <>
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Clock className="w-8 h-8 text-white animate-pulse" />
                </div>
                <h1 className="text-3xl font-bold text-white mb-4">Reviewing Your Template...</h1>
                <p className="text-xl text-gray-300 mb-8">
                  Our team is reviewing your submission for quality and completeness.
                </p>
                
                <div className="mb-8">
                  <div className="w-full bg-gray-700 rounded-full h-3 mb-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${reviewProgress}%` }}
                    ></div>
                  </div>
                  <div className="text-blue-300">{reviewProgress}% complete</div>
                </div>
                
                <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-6 mb-8">
                  <h3 className="text-lg font-semibold text-white mb-2">Review Process:</h3>
                  <div className="space-y-2 text-blue-200">
                    <div className={`flex items-center space-x-2 ${reviewProgress >= 25 ? 'text-green-300' : ''}`}>
                      <div>{reviewProgress >= 25 ? '✓' : '1.'}</div>
                      <div>Checking template structure and format</div>
                    </div>
                    <div className={`flex items-center space-x-2 ${reviewProgress >= 50 ? 'text-green-300' : ''}`}>
                      <div>{reviewProgress >= 50 ? '✓' : '2.'}</div>
                      <div>Validating technical requirements</div>
                    </div>
                    <div className={`flex items-center space-x-2 ${reviewProgress >= 75 ? 'text-green-300' : ''}`}>
                      <div>{reviewProgress >= 75 ? '✓' : '3.'}</div>
                      <div>Reviewing documentation quality</div>
                    </div>
                    <div className={`flex items-center space-x-2 ${reviewProgress >= 100 ? 'text-green-300' : ''}`}>
                      <div>{reviewProgress >= 100 ? '✓' : '4.'}</div>
                      <div>Preparing for publication</div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-white mb-4">Template Approved!</h1>
                <p className="text-xl text-gray-300 mb-8">
                  Your template has been reviewed and published to our library. Thank you for contributing!
                </p>
                
                <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-6 mb-8">
                  <h3 className="text-lg font-semibold text-white mb-2">What happens next?</h3>
                  <div className="space-y-2 text-green-200">
                    <div>✓ Your template is now live in our library</div>
                    <div>✓ Community members can download and use it</div>
                    <div>✓ You'll receive feedback and ratings</div>
                    <div>✓ Your profile will show your contribution</div>
                  </div>
                </div>
              </>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setSubmitted(false)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200"
              >
                Submit Another Template
              </button>
              <Link 
                to="/templates"
                className="border border-white/20 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors duration-200"
              >
                View Template Library
              </Link>
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
          <h1 className="text-4xl font-bold text-white mb-4">Submit Your MCP Template</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Share your successful MCP implementation with the community and help others succeed
          </p>
        </div>

        {/* Contributor Benefits */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Why Contribute?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contributorBenefits.map((benefit, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <benefit.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{benefit.title}</h3>
                <p className="text-gray-300 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Submission Form */}
          <div className="lg:col-span-2">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Template Submission Form</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-medium mb-2">Your Name *</label>
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

                {/* Template Details */}
                <div>
                  <label className="block text-white font-medium mb-2">Template Title *</label>
                  <input
                    type="text"
                    name="templateTitle"
                    value={formData.templateTitle}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-slate-800 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400"
                    placeholder="e.g., Community Member Q&A Assistant"
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
                    <label className="block text-white font-medium mb-2">Platform *</label>
                    <select
                      name="platform"
                      value={formData.platform}
                      onChange={handleInputChange}
                      required
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
                  <label className="block text-white font-medium mb-2">Description *</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full bg-slate-800 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400"
                    placeholder="Brief description of what your template does..."
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Use Case & Problem Solved *</label>
                  <textarea
                    name="useCase"
                    value={formData.useCase}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full bg-slate-800 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400"
                    placeholder="Describe the specific problem this template solves and who would benefit from it..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-medium mb-2">Difficulty Level *</label>
                    <select
                      name="difficulty"
                      value={formData.difficulty}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-slate-800 border border-white/20 rounded-lg px-4 py-2 text-white"
                    >
                      <option value="">Select difficulty</option>
                      {difficultyLevels.map((level) => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Setup Time *</label>
                    <select
                      name="setupTime"
                      value={formData.setupTime}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-slate-800 border border-white/20 rounded-lg px-4 py-2 text-white"
                    >
                      <option value="">Select setup time</option>
                      {setupTimes.map((time) => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Key Features *</label>
                  <textarea
                    name="features"
                    value={formData.features}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full bg-slate-800 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400"
                    placeholder="List the main features of your template (one per line)..."
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Tools & Technologies Used *</label>
                  <input
                    type="text"
                    name="tools"
                    value={formData.tools}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-slate-800 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400"
                    placeholder="e.g., Zapier, Google Sheets, ChatGPT, Discord"
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Benefits & Results *</label>
                  <textarea
                    name="benefits"
                    value={formData.benefits}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full bg-slate-800 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400"
                    placeholder="Describe the benefits and results users can expect..."
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Setup Instructions *</label>
                  <textarea
                    name="instructions"
                    value={formData.instructions}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full bg-slate-800 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400"
                    placeholder="Provide step-by-step instructions for setting up your template..."
                  />
                </div>

                {/* Sharing Type */}
                <div>
                  <label className="block text-white font-medium mb-2">Sharing Type *</label>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="shareType"
                        value="free"
                        checked={formData.shareType === 'free'}
                        onChange={handleInputChange}
                        className="text-blue-600"
                      />
                      <span className="text-white">Free - Share with the community for free</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="shareType"
                        value="premium"
                        checked={formData.shareType === 'premium'}
                        onChange={handleInputChange}
                        className="text-blue-600"
                      />
                      <span className="text-white">Premium - Sell through our marketplace (revenue sharing)</span>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <Upload className="w-5 h-5" />
                  <span>Submit Template</span>
                </button>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Guidelines */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Submission Guidelines</h3>
              <div className="space-y-3 text-sm text-gray-300">
                <div>• Template must be tested and working</div>
                <div>• Include clear, step-by-step instructions</div>
                <div>• Provide real-world use case examples</div>
                <div>• List all required tools and accounts</div>
                <div>• Include screenshots or videos if possible</div>
                <div>• Ensure template is beginner-friendly</div>
              </div>
            </div>

            {/* Featured Contributors */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Featured Contributors</h3>
              <div className="space-y-4">
                {featuredContributors.map((contributor, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="text-2xl">{contributor.avatar}</div>
                    <div className="flex-1">
                      <div className="text-white font-medium text-sm">{contributor.name}</div>
                      <div className="text-gray-400 text-xs">{contributor.role}</div>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-blue-300 text-xs">{contributor.templates} templates</span>
                        <span className="text-gray-400 text-xs">•</span>
                        <span className="text-green-300 text-xs">{contributor.downloads.toLocaleString()} downloads</span>
                        <span className="text-gray-400 text-xs">•</span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 text-yellow-400" />
                          <span className="text-yellow-400 text-xs">{contributor.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Support */}
            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-2">Need Help?</h3>
              <p className="text-blue-200 text-sm mb-4">
                Our team is here to help you create an amazing template submission.
              </p>
              <Link
                to="/office-hours"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <span>Get Submission Help</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubmitTemplate;