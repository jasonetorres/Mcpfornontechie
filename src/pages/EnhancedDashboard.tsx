import React from 'react'
import PersonalizedDashboard from '../components/PersonalizedDashboard'
import CommunityFeed from '../components/CommunityFeed'
import SmartSearch from '../components/SmartSearch'
import { Search, Users, TrendingUp } from 'lucide-react'

export default function EnhancedDashboard() {
  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Your Learning Hub</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Your personalized dashboard with AI-powered recommendations, community updates, and smart search
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Dashboard */}
          <div className="lg:col-span-3">
            <PersonalizedDashboard />
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Smart Search */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Search className="w-5 h-5 text-matrix-primary" />
                <h3 className="text-lg font-bold text-white">Smart Search</h3>
              </div>
              <SmartSearch />
            </div>

            {/* Quick Stats */}
            <div className="bg-card/50 backdrop-blur-md border border-border rounded-xl p-6">
              <div className="flex items-center space-x-2 mb-4">
                <TrendingUp className="w-5 h-5 text-matrix-primary" />
                <h3 className="text-lg font-bold text-white">Community Stats</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Active learners today</span>
                  <span className="text-matrix-primary font-semibold">1,247</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Templates downloaded</span>
                  <span className="text-green-400 font-semibold">89</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Questions answered</span>
                  <span className="text-blue-400 font-semibold">156</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Success stories shared</span>
                  <span className="text-purple-400 font-semibold">23</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Community Feed Section */}
        <div className="mt-16">
          <div className="flex items-center space-x-2 mb-8">
            <Users className="w-6 h-6 text-matrix-primary" />
            <h2 className="text-2xl font-bold text-white">Community Feed</h2>
          </div>
          <CommunityFeed />
        </div>
      </div>
    </div>
  )
}