import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, FileText, CheckCircle, AlertTriangle, BarChart2, Settings, Shield, Search, Filter, ChevronDown, X, Edit, Trash2, Eye, Clock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

// Admin dashboard tabs
type AdminTab = 'overview' | 'users' | 'templates' | 'content' | 'settings';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [isAdmin, setIsAdmin] = useState(false);
  const { user, profile } = useAuth();
  const navigate = useNavigate();

  // Check if user is admin
  useEffect(() => {
    if (user && profile) {
      // In a real app, this would check a role field in the database
      // For demo purposes, we'll check if the user's role contains "admin"
      const isUserAdmin = profile.role?.toLowerCase().includes('admin') || false;
      setIsAdmin(isUserAdmin);
      
      // If not admin, redirect to home
      if (!isUserAdmin) {
        navigate('/');
      }
    } else {
      // If not logged in, redirect to home
      navigate('/');
    }
  }, [user, profile, navigate]);

  if (!isAdmin) {
    return (
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="glass p-8 rounded-xl">
            <Shield className="w-16 h-16 text-matrix-primary mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-foreground mb-4">Admin Access Required</h1>
            <p className="text-muted-foreground mb-6">
              You need administrator privileges to access this page.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Manage users, content, and site settings
          </p>
        </div>

        {/* Admin Navigation */}
        <div className="flex flex-wrap gap-2 mb-8">
          {[
            { id: 'overview', name: 'Overview', icon: BarChart2 },
            { id: 'users', name: 'User Management', icon: Users },
            { id: 'templates', name: 'Template Approval', icon: FileText },
            { id: 'content', name: 'Content Moderation', icon: AlertTriangle },
            { id: 'settings', name: 'Site Settings', icon: Settings }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as AdminTab)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-matrix-primary text-primary-foreground'
                  : 'glass text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.name}</span>
              <span className="sm:hidden">{tab.id === 'overview' ? 'Home' : <tab.icon className="w-4 h-4" />}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && <AdminOverview />}
        {activeTab === 'users' && <AdminUsers />}
        {activeTab === 'templates' && <AdminTemplates />}
        {activeTab === 'content' && <AdminContent />}
        {activeTab === 'settings' && <AdminSettings />}
      </div>
    </div>
  );
}

// Overview Tab
function AdminOverview() {
  const stats = [
    { name: 'Total Users', value: '2,847', change: '+12%', icon: Users, color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
    { name: 'Active Subscriptions', value: '156', change: '+5%', icon: CheckCircle, color: 'bg-green-500/20 text-green-400 border-green-500/30' },
    { name: 'Pending Templates', value: '23', change: '+8%', icon: FileText, color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
    { name: 'Flagged Content', value: '7', change: '-2%', icon: AlertTriangle, color: 'bg-red-500/20 text-red-400 border-red-500/30' }
  ];

  const recentActivity = [
    { action: 'New user registered', user: 'john.smith@example.com', time: '5 minutes ago' },
    { action: 'Template approved', user: 'admin@mcp4everyone.com', time: '1 hour ago' },
    { action: 'Content flagged', user: 'moderator@mcp4everyone.com', time: '2 hours ago' },
    { action: 'User role updated', user: 'admin@mcp4everyone.com', time: '3 hours ago' },
    { action: 'New subscription', user: 'sarah.jones@example.com', time: '5 hours ago' }
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="glass p-6 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className={`text-sm ${stat.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                  {stat.change} this week
                </div>
              </div>
            </div>
            <div className="text-muted-foreground">{stat.name}</div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="glass p-6 rounded-xl">
        <h2 className="text-xl font-semibold text-foreground mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-3 glass rounded-lg">
              <div>
                <div className="text-foreground font-medium">{activity.action}</div>
                <div className="text-muted-foreground text-sm">{activity.user}</div>
              </div>
              <div className="text-muted-foreground text-sm">{activity.time}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="glass p-6 rounded-xl">
        <h2 className="text-xl font-semibold text-foreground mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="p-4 glass rounded-lg hover:bg-muted/50 transition-all duration-200 text-left">
            <Users className="w-6 h-6 text-blue-400 mb-2" />
            <div className="font-medium text-foreground">Add New Admin</div>
            <div className="text-muted-foreground text-sm">Create admin account</div>
          </button>
          <button className="p-4 glass rounded-lg hover:bg-muted/50 transition-all duration-200 text-left">
            <FileText className="w-6 h-6 text-green-400 mb-2" />
            <div className="font-medium text-foreground">Review Templates</div>
            <div className="text-muted-foreground text-sm">Approve pending templates</div>
          </button>
          <button className="p-4 glass rounded-lg hover:bg-muted/50 transition-all duration-200 text-left">
            <AlertTriangle className="w-6 h-6 text-yellow-400 mb-2" />
            <div className="font-medium text-foreground">Moderate Content</div>
            <div className="text-muted-foreground text-sm">Review flagged content</div>
          </button>
          <button className="p-4 glass rounded-lg hover:bg-muted/50 transition-all duration-200 text-left">
            <Settings className="w-6 h-6 text-purple-400 mb-2" />
            <div className="font-medium text-foreground">Site Settings</div>
            <div className="text-muted-foreground text-sm">Configure site options</div>
          </button>
        </div>
      </div>
    </div>
  );
}

// User Management Tab
function AdminUsers() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  // Sample user data
  const users = [
    { id: 1, name: 'John Smith', email: 'john.smith@example.com', role: 'user', status: 'active', joined: '2025-01-15', lastLogin: '2025-03-10' },
    { id: 2, name: 'Sarah Chen', email: 'sarah.chen@example.com', role: 'admin', status: 'active', joined: '2024-11-20', lastLogin: '2025-03-12' },
    { id: 3, name: 'Mike Rodriguez', email: 'mike.r@example.com', role: 'moderator', status: 'active', joined: '2025-01-05', lastLogin: '2025-03-11' },
    { id: 4, name: 'Lisa Park', email: 'lisa.park@example.com', role: 'user', status: 'inactive', joined: '2025-02-10', lastLogin: '2025-02-28' },
    { id: 5, name: 'David Kim', email: 'david.kim@example.com', role: 'user', status: 'active', joined: '2025-02-15', lastLogin: '2025-03-09' },
    { id: 6, name: 'Emma Wilson', email: 'emma.w@example.com', role: 'moderator', status: 'active', joined: '2025-01-25', lastLogin: '2025-03-12' },
    { id: 7, name: 'Alex Thompson', email: 'alex.t@example.com', role: 'user', status: 'suspended', joined: '2025-01-10', lastLogin: '2025-02-20' }
  ];

  // Filter users based on search and filters
  const filteredUsers = users.filter(user => {
    const matchesSearch = searchQuery === '' || 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleEditUser = (user: any) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'moderator': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'inactive': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      case 'suspended': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="glass p-6 rounded-xl">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search users by name or email..."
                className="w-full bg-input border border-border rounded-lg pl-10 pr-4 py-2 text-foreground placeholder-muted-foreground"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Role Filter */}
          <div className="w-full md:w-48">
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full bg-input border border-border rounded-lg px-4 py-2 text-foreground"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="moderator">Moderator</option>
              <option value="user">User</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="w-full md:w-48">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full bg-input border border-border rounded-lg px-4 py-2 text-foreground"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>

          {/* Add User Button */}
          <button className="bg-gradient-to-r from-matrix-primary to-matrix-secondary hover:from-matrix-accent hover:to-matrix-primary text-primary-foreground px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2">
            <Users className="w-4 h-4" />
            <span>Add User</span>
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="glass rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/50">
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Joined</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Last Login</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-muted/30 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-foreground font-medium">{user.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-muted-foreground">{user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getRoleColor(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">
                    {new Date(user.joined).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">
                    {new Date(user.lastLogin).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button 
                        onClick={() => handleEditUser(user)}
                        className="p-1 text-muted-foreground hover:text-foreground"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-muted-foreground hover:text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing <span className="font-medium text-foreground">{filteredUsers.length}</span> of <span className="font-medium text-foreground">{users.length}</span> users
        </div>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1 glass rounded-md text-muted-foreground hover:text-foreground">
            Previous
          </button>
          <button className="px-3 py-1 glass rounded-md text-muted-foreground hover:text-foreground">
            Next
          </button>
        </div>
      </div>

      {/* User Edit Modal */}
      {showUserModal && selectedUser && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-xl max-w-md w-full p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">Edit User</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-foreground font-medium mb-1">Name</label>
                <input
                  type="text"
                  defaultValue={selectedUser.name}
                  className="w-full bg-input border border-border rounded-lg px-4 py-2 text-foreground"
                />
              </div>
              
              <div>
                <label className="block text-foreground font-medium mb-1">Email</label>
                <input
                  type="email"
                  defaultValue={selectedUser.email}
                  className="w-full bg-input border border-border rounded-lg px-4 py-2 text-foreground"
                />
              </div>
              
              <div>
                <label className="block text-foreground font-medium mb-1">Role</label>
                <select
                  defaultValue={selectedUser.role}
                  className="w-full bg-input border border-border rounded-lg px-4 py-2 text-foreground"
                >
                  <option value="user">User</option>
                  <option value="moderator">Moderator</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              
              <div>
                <label className="block text-foreground font-medium mb-1">Status</label>
                <select
                  defaultValue={selectedUser.status}
                  className="w-full bg-input border border-border rounded-lg px-4 py-2 text-foreground"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowUserModal(false)}
                className="px-4 py-2 border border-border rounded-lg text-muted-foreground hover:text-foreground"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowUserModal(false)}
                className="px-4 py-2 bg-gradient-to-r from-matrix-primary to-matrix-secondary hover:from-matrix-accent hover:to-matrix-primary text-primary-foreground rounded-lg"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Template Approval Tab
function AdminTemplates() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('pending');
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [templates, setTemplates] = useState<any[]>([]);

  // Load templates from localStorage
  useEffect(() => {
    // Get all user submissions from localStorage
    const allSubmissions: any[] = [];
    
    // Iterate through localStorage to find all template submissions
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('template-submissions-')) {
        const userSubmissions = JSON.parse(localStorage.getItem(key) || '[]');
        allSubmissions.push(...userSubmissions);
      }
    }
    
    // Get community templates
    const communityTemplates = JSON.parse(localStorage.getItem('community-templates') || '[]');
    
    // Combine all templates
    setTemplates([...allSubmissions, ...communityTemplates]);
  }, []);

  // Filter templates based on search and status
  const filteredTemplates = templates.filter(template => {
    const matchesSearch = searchQuery === '' || 
      (template.templateTitle || template.title).toLowerCase().includes(searchQuery.toLowerCase()) ||
      (template.description || '').toLowerCase().includes(searchQuery.toLowerCase());
    
    const status = template.status || (template.approvedAt ? 'approved' : 'pending');
    const matchesStatus = selectedStatus === 'all' || status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const handleViewTemplate = (template: any) => {
    setSelectedTemplate(template);
    setShowTemplateModal(true);
  };

  const handleApproveTemplate = (template: any) => {
    // In a real app, this would update the database
    console.log('Approving template:', template);
    
    // For demo purposes, we'll update localStorage
    if (template.id) {
      // Find the user ID from the template submissions key
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('template-submissions-')) {
          const userSubmissions = JSON.parse(localStorage.getItem(key) || '[]');
          const updatedSubmissions = userSubmissions.map((sub: any) => 
            sub.id === template.id ? { ...sub, status: 'approved', reviewedAt: new Date().toISOString() } : sub
          );
          
          if (updatedSubmissions.some((sub: any) => sub.id === template.id)) {
            localStorage.setItem(key, JSON.stringify(updatedSubmissions));
            
            // Also add to community templates if not already there
            const communityTemplates = JSON.parse(localStorage.getItem('community-templates') || '[]');
            if (!communityTemplates.some((t: any) => t.id === template.id)) {
              const newTemplate = {
                id: template.id,
                title: template.templateTitle,
                description: template.description,
                category: template.category.toLowerCase().replace(/\s+/g, '-'),
                platform: template.platform.toLowerCase().replace(/\s+/g, '-'),
                difficulty: template.difficulty.startsWith('Beginner') ? 'Beginner' : 
                           template.difficulty.startsWith('Intermediate') ? 'Intermediate' : 'Advanced',
                rating: 5.0,
                downloads: 0,
                dataSource: template.dataSource || 'Custom Data Source',
                aiModel: 'GPT-4',
                features: template.features.split('\n').filter(Boolean),
                setupTime: template.setupTime,
                preview: `// ${template.templateTitle} Configuration
{
  "name": "${template.templateTitle}",
  "description": "${template.description}",
  "author": "${template.name}",
  "category": "${template.category}",
  "platform": "${template.platform}"
}`,
                tags: template.category.toLowerCase().split(/\s+/).filter(Boolean),
                files: [
                  {
                    name: 'instructions.md',
                    content: template.instructions
                  }
                ],
                author: template.name,
                approvedAt: new Date().toISOString()
              };
              
              communityTemplates.push(newTemplate);
              localStorage.setItem('community-templates', JSON.stringify(communityTemplates));
            }
            
            // Update local state
            setTemplates(prev => prev.map(t => 
              t.id === template.id ? { ...t, status: 'approved', reviewedAt: new Date().toISOString() } : t
            ));
            
            break;
          }
        }
      }
    }
  };

  const handleRejectTemplate = (template: any) => {
    // In a real app, this would update the database
    console.log('Rejecting template:', template);
    
    // For demo purposes, we'll update localStorage
    if (template.id) {
      // Find the user ID from the template submissions key
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('template-submissions-')) {
          const userSubmissions = JSON.parse(localStorage.getItem(key) || '[]');
          const updatedSubmissions = userSubmissions.map((sub: any) => 
            sub.id === template.id ? { ...sub, status: 'rejected', reviewedAt: new Date().toISOString() } : sub
          );
          
          if (updatedSubmissions.some((sub: any) => sub.id === template.id)) {
            localStorage.setItem(key, JSON.stringify(updatedSubmissions));
            
            // Update local state
            setTemplates(prev => prev.map(t => 
              t.id === template.id ? { ...t, status: 'rejected', reviewedAt: new Date().toISOString() } : t
            ));
            
            break;
          }
        }
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="glass p-6 rounded-xl">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search templates..."
                className="w-full bg-input border border-border rounded-lg pl-10 pr-4 py-2 text-foreground placeholder-muted-foreground"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Status Filter */}
          <div className="w-full md:w-48">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full bg-input border border-border rounded-lg px-4 py-2 text-foreground"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Templates Table */}
      <div className="glass rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/50">
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Template</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Author</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Platform</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Submitted</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredTemplates.map((template, index) => {
                const title = template.templateTitle || template.title;
                const author = template.name || template.author || 'Unknown';
                const category = template.category || 'Unknown';
                const platform = template.platform || 'Unknown';
                const status = template.status || (template.approvedAt ? 'approved' : 'pending');
                const submittedAt = template.submittedAt || template.created_at || new Date().toISOString();
                
                return (
                  <tr key={index} className="hover:bg-muted/30 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-foreground font-medium">{title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-muted-foreground">{author}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-muted-foreground capitalize">{category}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-muted-foreground capitalize">{platform}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${
                        status === 'approved' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                        status === 'rejected' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                        'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                      }`}>
                        {status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">
                      {new Date(submittedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button 
                          onClick={() => handleViewTemplate(template)}
                          className="p-1 text-muted-foreground hover:text-foreground"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {status === 'pending' && (
                          <>
                            <button 
                              onClick={() => handleApproveTemplate(template)}
                              className="p-1 text-muted-foreground hover:text-green-400"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleRejectTemplate(template)}
                              className="p-1 text-muted-foreground hover:text-destructive"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Template View Modal */}
      {showTemplateModal && selectedTemplate && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">
                {selectedTemplate.templateTitle || selectedTemplate.title}
              </h2>
              <button
                onClick={() => setShowTemplateModal(false)}
                className="text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-foreground font-medium mb-1">Description</h3>
                  <p className="text-muted-foreground">{selectedTemplate.description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-foreground font-medium mb-1">Author</h3>
                    <p className="text-muted-foreground">{selectedTemplate.name || selectedTemplate.author || 'Unknown'}</p>
                  </div>
                  <div>
                    <h3 className="text-foreground font-medium mb-1">Email</h3>
                    <p className="text-muted-foreground">{selectedTemplate.email || 'Not provided'}</p>
                  </div>
                  <div>
                    <h3 className="text-foreground font-medium mb-1">Category</h3>
                    <p className="text-muted-foreground capitalize">{selectedTemplate.category}</p>
                  </div>
                  <div>
                    <h3 className="text-foreground font-medium mb-1">Platform</h3>
                    <p className="text-muted-foreground capitalize">{selectedTemplate.platform}</p>
                  </div>
                </div>
                
                {selectedTemplate.features && (
                  <div>
                    <h3 className="text-foreground font-medium mb-1">Features</h3>
                    <div className="glass p-3 rounded-lg">
                      {typeof selectedTemplate.features === 'string' ? (
                        <pre className="text-muted-foreground whitespace-pre-wrap text-sm">{selectedTemplate.features}</pre>
                      ) : (
                        <ul className="text-muted-foreground space-y-1">
                          {selectedTemplate.features.map((feature: string, index: number) => (
                            <li key={index} className="flex items-start space-x-2">
                              <div className="w-1.5 h-1.5 bg-matrix-primary rounded-full mt-2 flex-shrink-0"></div>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                )}
                
                {selectedTemplate.instructions && (
                  <div>
                    <h3 className="text-foreground font-medium mb-1">Setup Instructions</h3>
                    <div className="glass p-3 rounded-lg">
                      <pre className="text-muted-foreground whitespace-pre-wrap text-sm">{selectedTemplate.instructions}</pre>
                    </div>
                  </div>
                )}
                
                {selectedTemplate.preview && (
                  <div>
                    <h3 className="text-foreground font-medium mb-1">Preview Code</h3>
                    <div className="glass p-3 rounded-lg">
                      <pre className="text-muted-foreground whitespace-pre-wrap text-sm">{selectedTemplate.preview}</pre>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="p-6 border-t border-border flex justify-between">
              <button
                onClick={() => setShowTemplateModal(false)}
                className="px-4 py-2 border border-border rounded-lg text-muted-foreground hover:text-foreground"
              >
                Close
              </button>
              
              {(selectedTemplate.status === 'pending' || !selectedTemplate.status) && (
                <div className="flex space-x-3">
                  <button
                    onClick={() => {
                      handleRejectTemplate(selectedTemplate);
                      setShowTemplateModal(false);
                    }}
                    className="px-4 py-2 bg-destructive/20 text-destructive border border-destructive/30 rounded-lg hover:bg-destructive/30"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => {
                      handleApproveTemplate(selectedTemplate);
                      setShowTemplateModal(false);
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-matrix-primary to-matrix-secondary hover:from-matrix-accent hover:to-matrix-primary text-primary-foreground rounded-lg"
                  >
                    Approve
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Content Moderation Tab
function AdminContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('flagged');

  // Sample content data
  const contentItems = [
    { id: 1, title: 'Inappropriate comment', type: 'comment', status: 'flagged', author: 'user123', reportedBy: 'moderator1', date: '2025-03-10' },
    { id: 2, title: 'Spam post', type: 'post', status: 'flagged', author: 'spammer456', reportedBy: 'user789', date: '2025-03-11' },
    { id: 3, title: 'Offensive language', type: 'comment', status: 'flagged', author: 'anonymous', reportedBy: 'user456', date: '2025-03-12' },
    { id: 4, title: 'Misleading information', type: 'post', status: 'flagged', author: 'misinformer', reportedBy: 'moderator2', date: '2025-03-09' },
    { id: 5, title: 'Duplicate content', type: 'template', status: 'flagged', author: 'copycat', reportedBy: 'admin1', date: '2025-03-08' },
    { id: 6, title: 'Resolved issue', type: 'comment', status: 'resolved', author: 'user789', reportedBy: 'moderator1', date: '2025-03-07' },
    { id: 7, title: 'False report', type: 'post', status: 'dismissed', author: 'gooduser', reportedBy: 'mistaken', date: '2025-03-06' }
  ];

  // Filter content based on search and filters
  const filteredContent = contentItems.filter(item => {
    const matchesSearch = searchQuery === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.author.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = selectedType === 'all' || item.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'flagged': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'resolved': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'dismissed': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default: return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'comment': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'post': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'template': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="glass p-6 rounded-xl">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search flagged content..."
                className="w-full bg-input border border-border rounded-lg pl-10 pr-4 py-2 text-foreground placeholder-muted-foreground"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Type Filter */}
          <div className="w-full md:w-48">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full bg-input border border-border rounded-lg px-4 py-2 text-foreground"
            >
              <option value="all">All Types</option>
              <option value="comment">Comments</option>
              <option value="post">Posts</option>
              <option value="template">Templates</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="w-full md:w-48">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full bg-input border border-border rounded-lg px-4 py-2 text-foreground"
            >
              <option value="all">All Statuses</option>
              <option value="flagged">Flagged</option>
              <option value="resolved">Resolved</option>
              <option value="dismissed">Dismissed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Content Table */}
      <div className="glass rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/50">
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Content</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Author</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Reported By</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredContent.map((item) => (
                <tr key={item.id} className="hover:bg-muted/30 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-foreground font-medium">{item.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getTypeColor(item.type)}`}>
                      {item.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">
                    {item.author}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">
                    {item.reportedBy}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">
                    {new Date(item.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="p-1 text-muted-foreground hover:text-foreground">
                        <Eye className="w-4 h-4" />
                      </button>
                      {item.status === 'flagged' && (
                        <>
                          <button className="p-1 text-muted-foreground hover:text-green-400">
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-muted-foreground hover:text-destructive">
                            <X className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing <span className="font-medium text-foreground">{filteredContent.length}</span> of <span className="font-medium text-foreground">{contentItems.length}</span> items
        </div>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1 glass rounded-md text-muted-foreground hover:text-foreground">
            Previous
          </button>
          <button className="px-3 py-1 glass rounded-md text-muted-foreground hover:text-foreground">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

// Site Settings Tab
function AdminSettings() {
  const [generalSettings, setGeneralSettings] = useState({
    siteName: 'MCP4 Everyone',
    siteDescription: 'Learn Model Context Protocol with interactive tutorials, code examples, and hands-on projects.',
    contactEmail: 'admin@mcp4everyone.com',
    enableRegistration: true,
    requireEmailVerification: false,
    defaultUserRole: 'user'
  });

  const [featureFlags, setFeatureFlags] = useState({
    enableCommunity: true,
    enableTemplateSubmissions: true,
    enableAchievements: true,
    enableSubscriptions: true,
    enableOfficeHours: true
  });

  const handleGeneralSettingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    setGeneralSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleFeatureFlagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    
    setFeatureFlags(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  return (
    <div className="space-y-8">
      {/* General Settings */}
      <div className="glass p-6 rounded-xl">
        <h2 className="text-xl font-semibold text-foreground mb-4">General Settings</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-foreground font-medium mb-1">Site Name</label>
            <input
              type="text"
              name="siteName"
              value={generalSettings.siteName}
              onChange={handleGeneralSettingChange}
              className="w-full bg-input border border-border rounded-lg px-4 py-2 text-foreground"
            />
          </div>
          
          <div>
            <label className="block text-foreground font-medium mb-1">Site Description</label>
            <textarea
              name="siteDescription"
              value={generalSettings.siteDescription}
              onChange={handleGeneralSettingChange}
              rows={3}
              className="w-full bg-input border border-border rounded-lg px-4 py-2 text-foreground resize-none"
            />
          </div>
          
          <div>
            <label className="block text-foreground font-medium mb-1">Contact Email</label>
            <input
              type="email"
              name="contactEmail"
              value={generalSettings.contactEmail}
              onChange={handleGeneralSettingChange}
              className="w-full bg-input border border-border rounded-lg px-4 py-2 text-foreground"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-foreground font-medium mb-1">Default User Role</label>
              <select
                name="defaultUserRole"
                value={generalSettings.defaultUserRole}
                onChange={handleGeneralSettingChange}
                className="w-full bg-input border border-border rounded-lg px-4 py-2 text-foreground"
              >
                <option value="user">User</option>
                <option value="moderator">Moderator</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            
            <div className="flex flex-col justify-end">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="enableRegistration"
                  name="enableRegistration"
                  checked={generalSettings.enableRegistration}
                  onChange={handleGeneralSettingChange}
                  className="w-4 h-4 text-matrix-primary bg-input border border-border rounded focus:ring-matrix-primary"
                />
                <label htmlFor="enableRegistration" className="text-foreground">Enable User Registration</label>
              </div>
              
              <div className="flex items-center space-x-2 mt-2">
                <input
                  type="checkbox"
                  id="requireEmailVerification"
                  name="requireEmailVerification"
                  checked={generalSettings.requireEmailVerification}
                  onChange={handleGeneralSettingChange}
                  className="w-4 h-4 text-matrix-primary bg-input border border-border rounded focus:ring-matrix-primary"
                />
                <label htmlFor="requireEmailVerification" className="text-foreground">Require Email Verification</label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Flags */}
      <div className="glass p-6 rounded-xl">
        <h2 className="text-xl font-semibold text-foreground mb-4">Feature Flags</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center justify-between p-4 glass rounded-lg">
            <div>
              <div className="text-foreground font-medium">Community Features</div>
              <div className="text-muted-foreground text-sm">Enable community posts and discussions</div>
            </div>
            <div className="relative inline-flex items-center">
              <input
                type="checkbox"
                id="enableCommunity"
                name="enableCommunity"
                checked={featureFlags.enableCommunity}
                onChange={handleFeatureFlagChange}
                className="sr-only"
              />
              <div className={`w-11 h-6 rounded-full transition ${featureFlags.enableCommunity ? 'bg-matrix-primary' : 'bg-muted'}`}>
                <div className={`w-5 h-5 rounded-full bg-white transform transition ${featureFlags.enableCommunity ? 'translate-x-6' : 'translate-x-1'}`}></div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 glass rounded-lg">
            <div>
              <div className="text-foreground font-medium">Template Submissions</div>
              <div className="text-muted-foreground text-sm">Allow users to submit templates</div>
            </div>
            <div className="relative inline-flex items-center">
              <input
                type="checkbox"
                id="enableTemplateSubmissions"
                name="enableTemplateSubmissions"
                checked={featureFlags.enableTemplateSubmissions}
                onChange={handleFeatureFlagChange}
                className="sr-only"
              />
              <div className={`w-11 h-6 rounded-full transition ${featureFlags.enableTemplateSubmissions ? 'bg-matrix-primary' : 'bg-muted'}`}>
                <div className={`w-5 h-5 rounded-full bg-white transform transition ${featureFlags.enableTemplateSubmissions ? 'translate-x-6' : 'translate-x-1'}`}></div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 glass rounded-lg">
            <div>
              <div className="text-foreground font-medium">Achievements System</div>
              <div className="text-muted-foreground text-sm">Enable user achievements and badges</div>
            </div>
            <div className="relative inline-flex items-center">
              <input
                type="checkbox"
                id="enableAchievements"
                name="enableAchievements"
                checked={featureFlags.enableAchievements}
                onChange={handleFeatureFlagChange}
                className="sr-only"
              />
              <div className={`w-11 h-6 rounded-full transition ${featureFlags.enableAchievements ? 'bg-matrix-primary' : 'bg-muted'}`}>
                <div className={`w-5 h-5 rounded-full bg-white transform transition ${featureFlags.enableAchievements ? 'translate-x-6' : 'translate-x-1'}`}></div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 glass rounded-lg">
            <div>
              <div className="text-foreground font-medium">Subscription Features</div>
              <div className="text-muted-foreground text-sm">Enable premium subscriptions</div>
            </div>
            <div className="relative inline-flex items-center">
              <input
                type="checkbox"
                id="enableSubscriptions"
                name="enableSubscriptions"
                checked={featureFlags.enableSubscriptions}
                onChange={handleFeatureFlagChange}
                className="sr-only"
              />
              <div className={`w-11 h-6 rounded-full transition ${featureFlags.enableSubscriptions ? 'bg-matrix-primary' : 'bg-muted'}`}>
                <div className={`w-5 h-5 rounded-full bg-white transform transition ${featureFlags.enableSubscriptions ? 'translate-x-6' : 'translate-x-1'}`}></div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 glass rounded-lg">
            <div>
              <div className="text-foreground font-medium">Office Hours</div>
              <div className="text-muted-foreground text-sm">Enable office hours booking</div>
            </div>
            <div className="relative inline-flex items-center">
              <input
                type="checkbox"
                id="enableOfficeHours"
                name="enableOfficeHours"
                checked={featureFlags.enableOfficeHours}
                onChange={handleFeatureFlagChange}
                className="sr-only"
              />
              <div className={`w-11 h-6 rounded-full transition ${featureFlags.enableOfficeHours ? 'bg-matrix-primary' : 'bg-muted'}`}>
                <div className={`w-5 h-5 rounded-full bg-white transform transition ${featureFlags.enableOfficeHours ? 'translate-x-6' : 'translate-x-1'}`}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="bg-gradient-to-r from-matrix-primary to-matrix-secondary hover:from-matrix-accent hover:to-matrix-primary text-primary-foreground px-6 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2">
          <Settings className="w-4 h-4" />
          <span>Save Settings</span>
        </button>
      </div>
    </div>
  );
}