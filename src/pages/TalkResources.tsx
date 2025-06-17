import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Download, Play, FileText, Video, Code, Users, ArrowRight, ExternalLink } from 'lucide-react';

function TalkResources() {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
    setTimeout(() => window.scrollTo(0, 0), 100);
  };

  const downloadResources = [
    {
      title: 'MCP Learning Guide',
      description: 'Comprehensive guide to understanding and implementing MCP',
      type: 'PDF',
      size: '8.2 MB',
      downloads: 1247,
      icon: FileText
    },
    {
      title: 'Platform Setup Guides',
      description: 'Step-by-step setup instructions for popular platforms',
      type: 'PDF',
      size: '5.1 MB',
      downloads: 892,
      icon: FileText
    },
    {
      title: 'Sample Data Files',
      description: 'Example datasets for practicing MCP implementations',
      type: 'CSV',
      size: '156 KB',
      downloads: 1456,
      icon: Code
    },
    {
      title: 'Template Collection',
      description: 'Ready-to-use MCP configuration templates',
      type: 'JSON',
      size: '24 KB',
      downloads: 1123,
      icon: Code
    }
  ];

  const videoResources = [
    {
      title: 'MCP Fundamentals',
      description: 'Complete introduction to Model Context Protocol concepts',
      duration: '25 min',
      views: '12.4K',
      thumbnail: '🎥'
    },
    {
      title: 'Live Demo Walkthrough',
      description: 'Step-by-step breakdown of building your first MCP connection',
      duration: '15 min',
      views: '8.7K',
      thumbnail: '🖥️'
    },
    {
      title: 'Platform Comparison',
      description: 'Detailed comparison of no-code platforms for MCP',
      duration: '18 min',
      views: '5.2K',
      thumbnail: '⚖️'
    }
  ];

  const nextSteps = [
    {
      title: 'Choose Your Platform',
      description: 'Select the no-code platform that best fits your needs',
      action: 'Platform Comparison Guide',
      icon: '🛠️',
      path: '/platform-comparison'
    },
    {
      title: 'Start with a Template',
      description: 'Use our pre-built templates to get up and running quickly',
      action: 'Browse Templates',
      icon: '📋',
      path: '/templates'
    },
    {
      title: 'Join the Community',
      description: 'Connect with other non-developers building with MCP',
      action: 'Join Discord',
      icon: '👥',
      path: '/join-community'
    },
    {
      title: 'Get Expert Help',
      description: 'Attend our weekly office hours for personalized guidance',
      action: 'Register for Office Hours',
      icon: '🤝',
      path: '/office-hours'
    }
  ];

  const additionalResources = [
    {
      title: 'MCP Learning Paths',
      description: 'Structured courses covering all skill levels',
      type: 'Course',
      path: '/learn'
    },
    {
      title: 'Platform Setup Guides',
      description: 'Step-by-step guides for Zapier, Power Platform, and more',
      type: 'Guides',
      path: '/guides'
    },
    {
      title: 'Success Stories',
      description: 'Real examples from community members',
      type: 'Case Studies',
      path: '/success-stories'
    },
    {
      title: 'Troubleshooting FAQ',
      description: 'Common issues and solutions',
      type: 'FAQ',
      path: '/guides'
    }
  ];

  const handleDownload = (resourceTitle: string) => {
    // Simulate file download
    console.log(`Downloading: ${resourceTitle}`);
    
    // Create a mock download
    const element = document.createElement('a');
    const file = new Blob([`# ${resourceTitle}\n\nThis is a demo file for MCP Academy resources.\n\nThank you for using MCP Academy to learn the Model Context Protocol!`], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${resourceTitle.replace(/\s+/g, '-').toLowerCase()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleVideoPlay = (videoTitle: string) => {
    // Simulate video play - in production this would open a video player or redirect to video
    console.log(`Playing video: ${videoTitle}`);
    handleNavigation('/demo'); // Redirect to demo page as placeholder
  };

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">Learning Resources</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Everything you need to master MCP - guides, templates, videos, and community support
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
                    <button 
                      onClick={() => handleDownload(resource.title)}
                      className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2"
                    >
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
          <h2 className="text-2xl font-bold text-white mb-8">Video Tutorials</h2>
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
                  <button 
                    onClick={() => handleVideoPlay(video.title)}
                    className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2"
                  >
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
                    <button 
                      onClick={() => handleNavigation(step.path)}
                      className="text-green-300 hover:text-green-200 transition-colors duration-200 flex items-center space-x-1"
                    >
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
                  <button 
                    onClick={() => handleNavigation(resource.path)}
                    className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact & Support */}
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Need Additional Help?</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Our community and expert team are here to help you succeed with MCP.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => handleNavigation('/join-community')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <Users className="w-5 h-5" />
              <span>Join Community</span>
            </button>
            <button 
              onClick={() => handleNavigation('/office-hours')}
              className="border border-white/20 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors duration-200"
            >
              Schedule Office Hours
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TalkResources;