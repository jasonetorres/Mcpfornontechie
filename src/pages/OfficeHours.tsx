import React, { useState } from 'react';
import { Calendar, Clock, Users, Video, MessageSquare, CheckCircle, ArrowRight, Star } from 'lucide-react';

function OfficeHours() {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');

  const upcomingSlots = [
    {
      date: 'March 15, 2025',
      day: 'Friday',
      time: '2:00 PM EST',
      type: 'Group Session',
      topic: 'MCP Fundamentals Q&A',
      spots: 12,
      maxSpots: 20,
      host: 'Sarah Chen'
    },
    {
      date: 'March 18, 2025',
      day: 'Monday',
      time: '10:00 AM EST',
      type: '1:1 Session',
      topic: 'Platform Selection Help',
      spots: 1,
      maxSpots: 1,
      host: 'Mike Rodriguez'
    },
    {
      date: 'March 20, 2025',
      day: 'Wednesday',
      time: '4:00 PM EST',
      type: 'Group Session',
      topic: 'Zapier Deep Dive',
      spots: 8,
      maxSpots: 15,
      host: 'Lisa Park'
    },
    {
      date: 'March 22, 2025',
      day: 'Friday',
      time: '2:00 PM EST',
      type: 'Group Session',
      topic: 'Community Showcase',
      spots: 5,
      maxSpots: 25,
      host: 'David Kim'
    },
    {
      date: 'March 25, 2025',
      day: 'Monday',
      time: '11:00 AM EST',
      type: '1:1 Session',
      topic: 'Custom Implementation Help',
      spots: 1,
      maxSpots: 1,
      host: 'Emma Wilson'
    },
    {
      date: 'March 27, 2025',
      day: 'Wednesday',
      time: '3:00 PM EST',
      type: 'Group Session',
      topic: 'Power Platform Workshop',
      spots: 6,
      maxSpots: 12,
      host: 'Alex Thompson'
    }
  ];

  const topics = [
    {
      id: 'getting-started',
      name: 'Getting Started with MCP',
      description: 'Perfect for complete beginners',
      duration: '30 min',
      type: 'Group'
    },
    {
      id: 'platform-selection',
      name: 'Platform Selection Help',
      description: 'Choose the right tool for your needs',
      duration: '20 min',
      type: '1:1'
    },
    {
      id: 'technical-help',
      name: 'Technical Implementation',
      description: 'Get help with specific technical challenges',
      duration: '45 min',
      type: '1:1'
    },
    {
      id: 'project-review',
      name: 'Project Review & Feedback',
      description: 'Get expert feedback on your MCP project',
      duration: '30 min',
      type: '1:1'
    },
    {
      id: 'scaling-help',
      name: 'Scaling Your Solution',
      description: 'Take your MCP implementation to the next level',
      duration: '45 min',
      type: 'Group'
    },
    {
      id: 'team-training',
      name: 'Team Training Session',
      description: 'Train your team on MCP concepts',
      duration: '60 min',
      type: 'Custom'
    }
  ];

  const hosts = [
    {
      name: 'Sarah Chen',
      role: 'Community Manager & MCP Expert',
      avatar: '👩‍💼',
      specialties: ['Beginner guidance', 'Community building', 'Zapier'],
      rating: 4.9,
      sessions: 127
    },
    {
      name: 'Mike Rodriguez',
      role: 'Marketing Automation Specialist',
      avatar: '👨‍💻',
      specialties: ['Marketing automation', 'Airtable', 'Customer segmentation'],
      rating: 4.8,
      sessions: 89
    },
    {
      name: 'Lisa Park',
      role: 'Project Management Expert',
      avatar: '👩‍🔬',
      specialties: ['Project tracking', 'Notion', 'Team workflows'],
      rating: 4.9,
      sessions: 156
    },
    {
      name: 'David Kim',
      role: 'Enterprise Solutions Architect',
      avatar: '👨‍💼',
      specialties: ['Power Platform', 'Enterprise security', 'Scaling'],
      rating: 4.7,
      sessions: 203
    }
  ];

  const pastSessionTopics = [
    {
      title: 'Building Your First MCP Connection',
      attendees: 23,
      rating: 4.8,
      date: 'March 8, 2025'
    },
    {
      title: 'Zapier vs Power Platform Comparison',
      attendees: 18,
      rating: 4.9,
      date: 'March 6, 2025'
    },
    {
      title: 'Security Best Practices for MCP',
      attendees: 15,
      rating: 4.7,
      date: 'March 1, 2025'
    },
    {
      title: 'Advanced Airtable Integrations',
      attendees: 12,
      rating: 4.8,
      date: 'February 28, 2025'
    }
  ];

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">MCP Office Hours</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Get personalized help from MCP experts. Join group sessions or book 1:1 time.
          </p>
        </div>

        {/* Office Hours Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 text-center">
            <div className="text-2xl font-bold text-blue-400 mb-1">247</div>
            <div className="text-gray-300 text-sm">Sessions Completed</div>
          </div>
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 text-center">
            <div className="text-2xl font-bold text-green-400 mb-1">4.8</div>
            <div className="text-gray-300 text-sm">Average Rating</div>
          </div>
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 text-center">
            <div className="text-2xl font-bold text-purple-400 mb-1">89%</div>
            <div className="text-gray-300 text-sm">Success Rate</div>
          </div>
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 text-center">
            <div className="text-2xl font-bold text-orange-400 mb-1">24h</div>
            <div className="text-gray-300 text-sm">Avg Response Time</div>
          </div>
        </div>

        {/* Upcoming Sessions */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8">Upcoming Office Hours</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingSlots.map((slot, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    slot.type === '1:1 Session' ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'
                  }`}>
                    {slot.type}
                  </span>
                  <div className="flex items-center space-x-1 text-gray-400">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">{slot.spots}/{slot.maxSpots}</span>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-white mb-2">{slot.topic}</h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-blue-400" />
                    <span className="text-blue-300 text-sm">{slot.date} ({slot.day})</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-green-400" />
                    <span className="text-green-300 text-sm">{slot.time}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Video className="w-4 h-4 text-purple-400" />
                    <span className="text-purple-300 text-sm">Hosted by {slot.host}</span>
                  </div>
                </div>
                
                <button 
                  className={`w-full px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    slot.spots > 0 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
                      : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  }`}
                  disabled={slot.spots === 0}
                >
                  {slot.spots > 0 ? 'Register' : 'Full'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Book Custom Session */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8">Book a Custom Session</h2>
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Booking Form */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-6">Schedule Your Session</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-white font-medium mb-2">Select Topic</label>
                    <select 
                      value={selectedTopic}
                      onChange={(e) => setSelectedTopic(e.target.value)}
                      className="w-full bg-slate-800 border border-white/20 rounded-lg px-4 py-2 text-white"
                    >
                      <option value="">Choose a topic...</option>
                      {topics.map((topic) => (
                        <option key={topic.id} value={topic.id}>
                          {topic.name} ({topic.type}, {topic.duration})
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-white font-medium mb-2">Preferred Time</label>
                    <input 
                      type="datetime-local"
                      value={selectedTimeSlot}
                      onChange={(e) => setSelectedTimeSlot(e.target.value)}
                      className="w-full bg-slate-800 border border-white/20 rounded-lg px-4 py-2 text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white font-medium mb-2">Describe Your Challenge</label>
                    <textarea 
                      rows={4}
                      placeholder="Tell us about your specific MCP challenge or what you'd like to learn..."
                      className="w-full bg-slate-800 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400"
                    />
                  </div>
                  
                  <button className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2">
                    <Calendar className="w-5 h-5" />
                    <span>Request Session</span>
                  </button>
                </div>
              </div>

              {/* Available Topics */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-6">Available Topics</h3>
                <div className="space-y-4">
                  {topics.map((topic) => (
                    <div key={topic.id} className="bg-slate-800/50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-white font-medium">{topic.name}</h4>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded text-xs ${
                            topic.type === '1:1' ? 'bg-blue-500/20 text-blue-400' :
                            topic.type === 'Group' ? 'bg-green-500/20 text-green-400' :
                            'bg-purple-500/20 text-purple-400'
                          }`}>
                            {topic.type}
                          </span>
                          <span className="text-gray-400 text-xs">{topic.duration}</span>
                        </div>
                      </div>
                      <p className="text-gray-300 text-sm">{topic.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Expert Hosts */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8">Meet Your Expert Hosts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {hosts.map((host, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 text-center">
                <div className="text-4xl mb-3">{host.avatar}</div>
                <h3 className="text-lg font-semibold text-white mb-1">{host.name}</h3>
                <p className="text-blue-300 text-sm mb-3">{host.role}</p>
                
                <div className="flex items-center justify-center space-x-4 mb-3">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className="text-yellow-400 text-sm">{host.rating}</span>
                  </div>
                  <div className="text-gray-400 text-sm">{host.sessions} sessions</div>
                </div>
                
                <div className="space-y-1">
                  {host.specialties.map((specialty, specIndex) => (
                    <span key={specIndex} className="inline-block px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs mr-1">
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Past Sessions */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8">Recent Sessions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pastSessionTopics.map((session, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-white">{session.title}</h3>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className="text-yellow-400 text-sm">{session.rating}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <span>{session.attendees} attendees</span>
                  <span>{session.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Ready to Get Expert Help?</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Don't struggle alone. Our expert hosts are here to help you succeed with MCP. Book a session today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200">
              Book 1:1 Session
            </button>
            <button className="border border-white/20 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors duration-200">
              Join Group Session
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OfficeHours;