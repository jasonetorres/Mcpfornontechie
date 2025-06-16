import React from 'react';
import { Download, Play, FileText, Video, Code, Users, ArrowRight, ExternalLink } from 'lucide-react';

function TalkResources() {
  const downloadResources = [
    {
      title: 'Complete Slide Deck',
      description: 'Full presentation slides from "The Missing Link" talk',
      type: 'PDF',
      size: '12.4 MB',
      downloads: 1247,
      icon: FileText
    },
    {
      title: 'Speaker Notes & Script',
      description: 'Detailed talking points and presentation notes',
      type: 'PDF',
      size: '3.2 MB',
      downloads: 892,
      icon: FileText
    },
    {
      title: 'Demo Data Files',
      description: 'Sample community member data used in the live demo',
      type: 'CSV',
      size: '156 KB',
      downloads: 1456,
      icon: Code
    },
    {
      title: 'MCP Configuration Templates',
      description: 'Ready-to-use configuration files for the demo',
      type: 'JSON',
      size: '24 KB',
      downloads: 1123,
      icon: Code
    }
  ];

  const videoResources = [
    {
      title: 'Full Talk Recording',
      description: 'Complete recording of "The Missing Link" presentation',
      duration: '45 min',
      views: '12.4K',
      thumbnail: '🎥'
    },
    {
      title: 'Live Demo Walkthrough',
      description: 'Step-by-step breakdown of the live demonstration',
      duration: '15 min',
      views: '8.7K',
      thumbnail: '🖥️'
    },
    {
      title: 'Q&A Session',
      description: 'Audience questions and detailed answers',
      duration: '20 min',
      views: '5.2K',
      thumbnail: '❓'
    }
  ];

  const nextSteps = [
    {
      title: 'Choose Your Platform',
      description: 'Select the no-code platform that best fits your needs',
      action: 'Platform Comparison Guide',
      icon: '🛠️'
    },
    {
      title: 'Start with a Template',
      description: 'Use our pre-built templates to get up and running quickly',
      action: 'Browse Templates',
      icon: '📋'
    },
    {
      title: 'Join the Community',
      description: 'Connect with other non-developers building with MCP',
      action: 'Join Discord',
      icon: '👥'
    },
    {
      title: 'Get Hands-On Help',
      description: 'Attend our weekly office hours for personalized guidance',
      action: 'Register for Office Hours',
      icon: '🤝'
    }
  ];

  const additionalResources = [
    {
      title: 'MCP Fundamentals Course',
      description: 'Free 2-hour course covering all the basics',
      type: 'Course',
      url: '/learn'
    },
    {
      title: 'Platform Setup Guides',
      description: 'Step-by-step guides for Zapier, Power Platform, and more',
      type: 'Guides',
      url: '/guides'
    },
    {
      title: 'Success Stories',
      description: 'Real examples from community members',
      type: 'Case Studies',
      url: '/examples'
    },
    {
      title: 'Troubleshooting FAQ',
      description: 'Common issues and solutions',
      type: 'FAQ',
      url: '#'
    }
  ];

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">Talk Resources</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Everything from "The Missing Link: Unleashing AI's Full Potential for Non-Developers with MCP"
          </p>
        </div>

        {/* Download Resources */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8">Download Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {downloadResources.map((resource, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <resource.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2">{resource.title}</h3>
                    <p className="text-gray-300 mb-3">{resource.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-400 mb-4">
                      <span>{resource.type}</span>
                      <span>{resource.size}</span>
                      <span>{resource.downloads.toLocaleString()} downloads</span>
                    </div>
                    <button className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2">
                      <Download className="w-4 h-4" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Video Resources */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8">Video Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {videoResources.map((video, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-300">
                <div className="aspect-video bg-gradient-to-br from-blue-600/20 to-purple-600/20 flex items-center justify-center">
                  <div className="text-6xl">{video.thumbnail}</div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-2">{video.title}</h3>
                  <p className="text-gray-300 mb-4">{video.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                    <span>{video.duration}</span>
                    <span>{video.views} views</span>
                  </div>
                  <button className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2">
                    <Play className="w-4 h-4" />
                    <span>Watch</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Next Steps */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8">Your Next Steps</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {nextSteps.map((step, index) => (
              <div key={index} className="bg-gradient-to-r from-green-600/20 to-teal-600/20 border border-green-500/30 rounded-xl p-6">
                <div className="flex items-start space-x-4">
                  <div className="text-3xl">{step.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                    <p className="text-green-200 mb-4">{step.description}</p>
                    <button className="text-green-300 hover:text-green-200 transition-colors duration-200 flex items-center space-x-1">
                      <span>{step.action}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Resources */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8">Additional Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {additionalResources.map((resource, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">{resource.title}</h3>
                    <p className="text-gray-300 mb-2">{resource.description}</p>
                    <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs">
                      {resource.type}
                    </span>
                  </div>
                  <button className="text-blue-400 hover:text-blue-300 transition-colors duration-200">
                    <ExternalLink className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact & Support */}
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Questions About the Talk?</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Have questions about the presentation or need help getting started with MCP? We're here to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2">
              <Users className="w-5 h-5" />
              <span>Join Community</span>
            </button>
            <button className="border border-white/20 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors duration-200">
              Contact Speaker
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TalkResources;