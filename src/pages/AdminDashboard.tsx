import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  FileText, 
  Flag, 
  Settings, 
  BarChart, 
  Search, 
  Plus, 
  Filter, 
  Download, 
  Trash2, 
  Edit, 
  CheckCircle, 
  X, 
  AlertTriangle,
  Database,
  Shield,
  Clock,
  RefreshCw
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import AdminUserForm from '../components/AdminUserForm';
import AdminTemplateReview from '../components/AdminTemplateReview';
import AdminContentModeration from '../components/AdminContentModeration';
import { supabase } from '../lib/supabase';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { user, profile, addNotification } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [users, setUsers] = useState<any[]>([]);
  const [templates, setTemplates] = useState<any[]>([]);
  const [flaggedContent, setFlaggedContent] = useState<any[]>([]);
  const [siteSettings, setSiteSettings] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [userFilter, setUserFilter] = useState('all');
  const [templateFilter, setTemplateFilter] = useState('all');
  const [contentFilter, setContentFilter] = useState('all');
  const [showUserForm, setShowUserForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [showTemplateReview, setShowTemplateReview] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [showContentModeration, setShowContentModeration] = useState(false);
  const [selectedContent, setSelectedContent] = useState<any>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    pendingTemplates: 0,
    flaggedContent: 0,
    totalTemplates: 0,
    totalDownloads: 0,
    totalPosts: 0,
    totalComments: 0
  });

  // Check if user is admin
  useEffect(() => {
    if (!user || !profile) {
      navigate('/');
      return;
    }

    const isAdmin = profile.role?.toLowerCase().includes('admin');
    if (!isAdmin) {
      addNotification({
        id: 'admin-access-denied',
        message: 'You do not have permission to access the admin dashboard',
        type: 'error'
      });
      navigate('/');
    } else {
      fetchData();
    }
  }, [user, profile, navigate]);

  const fetchData = async () => {
    setLoading(true);
    setRefreshing(true);
    
    try {
      // Fetch users from localStorage (in a real app, this would be from Supabase)
      const mockUsers = [];
      
      // Get all mock users from localStorage
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('mock-user-')) {
          try {
            const userData = JSON.parse(localStorage.getItem(key) || '{}');
            mockUsers.push(userData);
          } catch (error) {
            console.error('Error parsing user data:', error);
          }
        }
      }
      
      // If no mock users found, create some sample users
      if (mockUsers.length === 0) {
        // Get the current user
        const currentUser = JSON.parse(localStorage.getItem('mock-user') || '{}');
        
        // Create sample users
        const sampleUsers = [
          {
            id: currentUser.id || 'user-1',
            email: currentUser.email || 'admin@example.com',
            full_name: profile?.full_name || 'Admin User',
            role: 'admin',
            company: profile?.company || 'MCP Academy',
            status: 'active',
            created_at: new Date().toISOString(),
            last_login: new Date().toISOString()
          },
          {
            id: 'user-2',
            email: 'user@example.com',
            full_name: 'Regular User',
            role: 'user',
            company: 'Example Inc',
            status: 'active',
            created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            last_login: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
          },
          {
            id: 'user-3',
            email: 'moderator@example.com',
            full_name: 'Content Moderator',
            role: 'moderator',
            company: 'MCP Academy',
            status: 'active',
            created_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
            last_login: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
          },
          {
            id: 'user-4',
            email: 'inactive@example.com',
            full_name: 'Inactive User',
            role: 'user',
            company: 'Old Company',
            status: 'inactive',
            created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
            last_login: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString()
          }
        ];
        
        // Store sample users in localStorage
        sampleUsers.forEach(user => {
          localStorage.setItem(`mock-user-${user.id}`, JSON.stringify(user));
        });
        
        setUsers(sampleUsers);
      } else {
        setUsers(mockUsers);
      }
      
      // Fetch templates
      const communityTemplates = JSON.parse(localStorage.getItem('community-templates') || '[]');
      
      // Fetch template submissions
      const allSubmissions = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('template-submissions-')) {
          try {
            const submissions = JSON.parse(localStorage.getItem(key) || '[]');
            allSubmissions.push(...submissions);
          } catch (error) {
            console.error('Error parsing template submissions:', error);
          }
        }
      }
      
      setTemplates([...communityTemplates, ...allSubmissions]);
      
      // Create sample flagged content if none exists
      const existingFlagged = JSON.parse(localStorage.getItem('flagged-content') || '[]');
      
      if (existingFlagged.length === 0) {
        const sampleFlaggedContent = [
          {
            id: 'content-1',
            type: 'post',
            title: 'Inappropriate Marketing Post',
            author: 'user@example.com',
            content: 'This post contains promotional content that violates our guidelines.',
            reportedBy: 'moderator@example.com',
            date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            status: 'flagged'
          },
          {
            id: 'content-2',
            type: 'comment',
            title: 'Offensive Comment',
            author: 'inactive@example.com',
            content: 'This comment contains language that may be offensive to other users.',
            reportedBy: 'user@example.com',
            date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            status: 'flagged'
          },
          {
            id: 'content-3',
            type: 'template',
            title: 'Potentially Harmful Template',
            author: 'user@example.com',
            content: 'This template contains instructions that could potentially cause security issues.',
            reportedBy: 'moderator@example.com',
            date: new Date().toISOString(),
            status: 'flagged'
          }
        ];
        
        localStorage.setItem('flagged-content', JSON.stringify(sampleFlaggedContent));
        setFlaggedContent(sampleFlaggedContent);
      } else {
        setFlaggedContent(existingFlagged);
      }
      
      // Fetch site settings
      const existingSettings = JSON.parse(localStorage.getItem('site-settings') || '{}');
      
      if (Object.keys(existingSettings).length === 0) {
        const defaultSettings = {
          siteName: 'MCP4 Everyone',
          allowRegistration: true,
          requireEmailVerification: false,
          autoApproveTemplates: false,
          moderationEnabled: true,
          featuredCategories: ['community', 'marketing', 'project'],
          maintenanceMode: false,
          analyticsEnabled: true,
          lastUpdated: new Date().toISOString()
        };
        
        localStorage.setItem('site-settings', JSON.stringify(defaultSettings));
        setSiteSettings(defaultSettings);
      } else {
        setSiteSettings(existingSettings);
      }
      
      // Calculate stats
      const activeUsers = users.filter(u => u.status === 'active').length;
      const pendingTemplates = allSubmissions.filter(t => t.status === 'pending').length;
      const flaggedContentCount = existingFlagged.length;
      
      // Get total downloads
      const totalDownloads = communityTemplates.reduce((sum, template) => sum + (template.downloads || 0), 0);
      
      // Get total posts and comments
      let totalPosts = 0;
      let totalComments = 0;
      
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('user-posts-')) {
          try {
            const posts = JSON.parse(localStorage.getItem(key) || '[]');
            totalPosts += posts.length;
          } catch (error) {
            console.error('Error parsing user posts:', error);
          }
        }
      }
      
      setStats({
        totalUsers: users.length,
        activeUsers,
        pendingTemplates,
        flaggedContent: flaggedContentCount,
        totalTemplates: communityTemplates.length,
        totalDownloads,
        totalPosts,
        totalComments
      });
      
    } catch (error) {
      console.error('Error fetching admin data:', error);
      addNotification({
        id: 'admin-data-error',
        message: 'Error fetching admin data',
        type: 'error'
      });
    } finally {
      setLoading(false);
      setTimeout(() => setRefreshing(false), 500);
    }
  };

  const handleCreateUser = () => {
    setSelectedUser(null);
    setShowUserForm(true);
  };

  const handleEditUser = (user: any) => {
    setSelectedUser(user);
    setShowUserForm(true);
  };

  const handleSaveUser = (userData: any) => {
    // In a real app, this would update the database
    // For demo purposes, we'll update localStorage
    
    try {
      // Update users state
      if (selectedUser) {
        // Editing existing user
        setUsers(users.map(u => u.id === userData.id ? userData : u));
      } else {
        // Creating new user
        setUsers([...users, userData]);
      }
      
      // Save to localStorage
      localStorage.setItem(`mock-user-${userData.id}`, JSON.stringify(userData));
      
      addNotification({
        id: `user-${selectedUser ? 'updated' : 'created'}-${Date.now()}`,
        message: `User ${selectedUser ? 'updated' : 'created'} successfully`,
        type: 'success'
      });
    } catch (error) {
      console.error('Error saving user:', error);
      addNotification({
        id: `user-error-${Date.now()}`,
        message: `Error ${selectedUser ? 'updating' : 'creating'} user`,
        type: 'error'
      });
    }
  };

  const handleDeleteUser = (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      try {
        // Remove from users state
        setUsers(users.filter(u => u.id !== userId));
        
        // Remove from localStorage
        localStorage.removeItem(`mock-user-${userId}`);
        
        addNotification({
          id: `user-deleted-${Date.now()}`,
          message: 'User deleted successfully',
          type: 'success'
        });
      } catch (error) {
        console.error('Error deleting user:', error);
        addNotification({
          id: `user-delete-error-${Date.now()}`,
          message: 'Error deleting user',
          type: 'error'
        });
      }
    }
  };

  const handleReviewTemplate = (template: any) => {
    setSelectedTemplate(template);
    setShowTemplateReview(true);
  };

  const handleApproveTemplate = (template: any) => {
    try {
      // Update template status
      const updatedTemplates = templates.map(t => 
        t.id === template.id ? { ...t, status: 'approved', reviewedAt: new Date().toISOString() } : t
      );
      setTemplates(updatedTemplates);
      
      // If it's a submission, update in localStorage
      if (template.submittedAt) {
        // Find the user ID from the submission key
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && key.startsWith('template-submissions-')) {
            try {
              const submissions = JSON.parse(localStorage.getItem(key) || '[]');
              const updatedSubmissions = submissions.map((sub: any) => 
                sub.id === template.id ? { ...sub, status: 'approved', reviewedAt: new Date().toISOString() } : sub
              );
              localStorage.setItem(key, JSON.stringify(updatedSubmissions));
            } catch (error) {
              console.error('Error updating template submissions:', error);
            }
          }
        }
      }
      
      // Add to community templates if not already there
      const communityTemplates = JSON.parse(localStorage.getItem('community-templates') || '[]');
      const existingTemplate = communityTemplates.find((t: any) => t.id === template.id);
      
      if (!existingTemplate) {
        // Create a new template from the submission
        const newTemplate = {
          id: template.id,
          title: template.templateTitle || template.title,
          description: template.description,
          category: (template.category || 'other').toLowerCase().replace(/\s+/g, '-'),
          platform: (template.platform || 'other').toLowerCase().replace(/\s+/g, '-'),
          difficulty: template.difficulty?.startsWith('Beginner') ? 'Beginner' : 
                     template.difficulty?.startsWith('Intermediate') ? 'Intermediate' : 'Advanced',
          rating: 5.0,
          downloads: 0,
          dataSource: template.dataSource || template.tools?.split(',')[0] || 'Custom Data Source',
          aiModel: template.aiModel || 'GPT-4',
          features: typeof template.features === 'string' ? template.features.split('\n').filter(Boolean) : template.features || [],
          setupTime: template.setupTime || '30 minutes',
          preview: template.preview || `// ${template.templateTitle || template.title} Configuration
{
  "name": "${template.templateTitle || template.title}",
  "description": "${template.description}",
  "author": "${template.name || template.author || 'Community Member'}",
  "category": "${template.category || 'other'}",
  "platform": "${template.platform || 'other'}"
}`,
          tags: template.tags || (template.category || 'other').toLowerCase().split(/\s+/).filter(Boolean),
          files: [
            {
              name: 'instructions.md',
              content: template.instructions || 'No instructions provided.'
            }
          ],
          author: template.name || template.author || 'Community Member',
          approvedAt: new Date().toISOString()
        };
        
        communityTemplates.push(newTemplate);
        localStorage.setItem('community-templates', JSON.stringify(communityTemplates));
      }
      
      addNotification({
        id: `template-approved-${Date.now()}`,
        message: 'Template approved successfully',
        type: 'success'
      });
    } catch (error) {
      console.error('Error approving template:', error);
      addNotification({
        id: `template-approve-error-${Date.now()}`,
        message: 'Error approving template',
        type: 'error'
      });
    }
  };

  const handleRejectTemplate = (template: any, reason: string) => {
    try {
      // Update template status
      const updatedTemplates = templates.map(t => 
        t.id === template.id ? { ...t, status: 'rejected', reviewedAt: new Date().toISOString(), rejectionReason: reason } : t
      );
      setTemplates(updatedTemplates);
      
      // If it's a submission, update in localStorage
      if (template.submittedAt) {
        // Find the user ID from the submission key
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && key.startsWith('template-submissions-')) {
            try {
              const submissions = JSON.parse(localStorage.getItem(key) || '[]');
              const updatedSubmissions = submissions.map((sub: any) => 
                sub.id === template.id ? { ...sub, status: 'rejected', reviewedAt: new Date().toISOString(), rejectionReason: reason } : sub
              );
              localStorage.setItem(key, JSON.stringify(updatedSubmissions));
            } catch (error) {
              console.error('Error updating template submissions:', error);
            }
          }
        }
      }
      
      addNotification({
        id: `template-rejected-${Date.now()}`,
        message: 'Template rejected successfully',
        type: 'success'
      });
    } catch (error) {
      console.error('Error rejecting template:', error);
      addNotification({
        id: `template-reject-error-${Date.now()}`,
        message: 'Error rejecting template',
        type: 'error'
      });
    }
  };

  const handleReviewContent = (content: any) => {
    setSelectedContent(content);
    setShowContentModeration(true);
  };

  const handleApproveContent = (content: any) => {
    try {
      // Update content status
      const updatedContent = flaggedContent.map(c => 
        c.id === content.id ? { ...c, status: 'approved', reviewedAt: new Date().toISOString() } : c
      );
      setFlaggedContent(updatedContent);
      
      // Update in localStorage
      localStorage.setItem('flagged-content', JSON.stringify(updatedContent));
      
      addNotification({
        id: `content-approved-${Date.now()}`,
        message: 'Content approved successfully',
        type: 'success'
      });
    } catch (error) {
      console.error('Error approving content:', error);
      addNotification({
        id: `content-approve-error-${Date.now()}`,
        message: 'Error approving content',
        type: 'error'
      });
    }
  };

  const handleRejectContent = (content: any, reason: string) => {
    try {
      // Update content status
      const updatedContent = flaggedContent.map(c => 
        c.id === content.id ? { ...c, status: 'rejected', reviewedAt: new Date().toISOString(), rejectionReason: reason } : c
      );
      setFlaggedContent(updatedContent);
      
      // Update in localStorage
      localStorage.setItem('flagged-content', JSON.stringify(updatedContent));
      
      addNotification({
        id: `content-rejected-${Date.now()}`,
        message: 'Content rejected successfully',
        type: 'success'
      });
    } catch (error) {
      console.error('Error rejecting content:', error);
      addNotification({
        id: `content-reject-error-${Date.now()}`,
        message: 'Error rejecting content',
        type: 'error'
      });
    }
  };

  const handleUpdateSettings = (newSettings: any) => {
    try {
      // Update settings
      const updatedSettings = { ...siteSettings, ...newSettings, lastUpdated: new Date().toISOString() };
      setSiteSettings(updatedSettings);
      
      // Save to localStorage
      localStorage.setItem('site-settings', JSON.stringify(updatedSettings));
      
      addNotification({
        id: `settings-updated-${Date.now()}`,
        message: 'Settings updated successfully',
        type: 'success'
      });
    } catch (error) {
      console.error('Error updating settings:', error);
      addNotification({
        id: `settings-update-error-${Date.now()}`,
        message: 'Error updating settings',
        type: 'error'
      });
    }
  };

  // Filter users based on search query and filter
  const filteredUsers = users.filter(user => {
    const matchesSearch = searchQuery === '' || 
      user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.company?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = userFilter === 'all' || user.status === userFilter;
    
    return matchesSearch && matchesFilter;
  });

  // Filter templates based on search query and filter
  const filteredTemplates = templates.filter(template => {
    const matchesSearch = searchQuery === '' || 
      (template.title || template.templateTitle)?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.platform?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = templateFilter === 'all' || template.status === templateFilter;
    
    return matchesSearch && matchesFilter;
  });

  // Filter flagged content based on search query and filter
  const filteredContent = flaggedContent.filter(content => {
    const matchesSearch = searchQuery === '' || 
      content.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      content.author?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      content.type?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = contentFilter === 'all' || content.status === contentFilter;
    
    return matchesSearch && matchesFilter;
  });

  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'approved':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'inactive':
      case 'rejected':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'pending':
      case 'flagged':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'suspended':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <button 
              onClick={fetchData}
              className={`p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors duration-200 ${refreshing ? 'animate-spin' : ''}`}
              disabled={refreshing}
            >
              <RefreshCw className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
          <p className="text-muted-foreground">Manage users, content, and site settings</p>
        </div>

        {/* Tabs */}
        <div className="flex overflow-x-auto mb-8 pb-2">
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2 ${
                activeTab === 'overview'
                  ? 'bg-matrix-primary text-primary-foreground'
                  : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <BarChart className="w-4 h-4" />
              <span>Overview</span>
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2 ${
                activeTab === 'users'
                  ? 'bg-matrix-primary text-primary-foreground'
                  : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>User Management</span>
            </button>
            <button
              onClick={() => setActiveTab('templates')}
              className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2 ${
                activeTab === 'templates'
                  ? 'bg-matrix-primary text-primary-foreground'
                  : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Template Approval</span>
              {stats.pendingTemplates > 0 && (
                <span className="ml-1 px-1.5 py-0.5 text-xs rounded-full bg-yellow-500 text-white">
                  {stats.pendingTemplates}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('moderation')}
              className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2 ${
                activeTab === 'moderation'
                  ? 'bg-matrix-primary text-primary-foreground'
                  : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <Flag className="w-4 h-4" />
              <span>Content Moderation</span>
              {stats.flaggedContent > 0 && (
                <span className="ml-1 px-1.5 py-0.5 text-xs rounded-full bg-red-500 text-white">
                  {stats.flaggedContent}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2 ${
                activeTab === 'settings'
                  ? 'bg-matrix-primary text-primary-foreground'
                  : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Site Settings</span>
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="glass p-12 rounded-xl flex items-center justify-center">
            <div className="loading-spinner mr-3"></div>
            <span className="text-muted-foreground">Loading admin data...</span>
          </div>
        )}

        {/* Overview Tab */}
        {!loading && activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="glass p-6 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-foreground font-medium">Total Users</h3>
                  <Users className="w-5 h-5 text-blue-400" />
                </div>
                <div className="text-3xl font-bold text-foreground">{stats.totalUsers}</div>
                <div className="text-muted-foreground text-sm mt-1">{stats.activeUsers} active users</div>
              </div>
              
              <div className="glass p-6 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-foreground font-medium">Templates</h3>
                  <FileText className="w-5 h-5 text-purple-400" />
                </div>
                <div className="text-3xl font-bold text-foreground">{stats.totalTemplates}</div>
                <div className="text-muted-foreground text-sm mt-1">{stats.totalDownloads} total downloads</div>
              </div>
              
              <div className="glass p-6 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-foreground font-medium">Community</h3>
                  <Users className="w-5 h-5 text-green-400" />
                </div>
                <div className="text-3xl font-bold text-foreground">{stats.totalPosts}</div>
                <div className="text-muted-foreground text-sm mt-1">{stats.totalComments} comments</div>
              </div>
              
              <div className="glass p-6 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-foreground font-medium">Pending Review</h3>
                  <Flag className="w-5 h-5 text-yellow-400" />
                </div>
                <div className="text-3xl font-bold text-foreground">{stats.pendingTemplates + stats.flaggedContent}</div>
                <div className="text-muted-foreground text-sm mt-1">{stats.pendingTemplates} templates, {stats.flaggedContent} content</div>
              </div>
            </div>
            
            {/* Database Status */}
            <div className="glass p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-foreground mb-4">Database Status</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Database className="w-5 h-5 text-blue-400" />
                    <div>
                      <div className="text-foreground font-medium">Profiles Table</div>
                      <div className="text-muted-foreground text-sm">{stats.totalUsers} records</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-green-400 text-sm">Healthy</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Database className="w-5 h-5 text-purple-400" />
                    <div>
                      <div className="text-foreground font-medium">Learning Progress Table</div>
                      <div className="text-muted-foreground text-sm">15 records</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-green-400 text-sm">Healthy</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Database className="w-5 h-5 text-yellow-400" />
                    <div>
                      <div className="text-foreground font-medium">Stripe Customers Table</div>
                      <div className="text-muted-foreground text-sm">2 records</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-green-400 text-sm">Healthy</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Database className="w-5 h-5 text-red-400" />
                    <div>
                      <div className="text-foreground font-medium">Stripe Subscriptions Table</div>
                      <div className="text-muted-foreground text-sm">2 records</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-green-400 text-sm">Healthy</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Database className="w-5 h-5 text-green-400" />
                    <div>
                      <div className="text-foreground font-medium">Stripe Orders Table</div>
                      <div className="text-muted-foreground text-sm">5 records</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-green-400 text-sm">Healthy</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 text-right">
                <button className="text-matrix-primary hover:text-matrix-secondary transition-colors duration-200 text-sm">
                  View Database Schema
                </button>
              </div>
            </div>
            
            {/* Recent Activity */}
            <div className="glass p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                    <Users className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-foreground font-medium">New user registered</div>
                    <div className="text-muted-foreground text-sm">user@example.com joined the platform</div>
                    <div className="text-muted-foreground text-xs mt-1">2 hours ago</div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
                  <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                    <FileText className="w-4 h-4 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-foreground font-medium">Template submitted</div>
                    <div className="text-muted-foreground text-sm">New template "Customer Segmentation Assistant" submitted</div>
                    <div className="text-muted-foreground text-xs mt-1">5 hours ago</div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
                  <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center">
                    <Flag className="w-4 h-4 text-red-400" />
                  </div>
                  <div>
                    <div className="text-foreground font-medium">Content flagged</div>
                    <div className="text-muted-foreground text-sm">A post was flagged for review by moderator@example.com</div>
                    <div className="text-muted-foreground text-xs mt-1">1 day ago</div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
                  <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  </div>
                  <div>
                    <div className="text-foreground font-medium">Template approved</div>
                    <div className="text-muted-foreground text-sm">"Project Status Reporter" template was approved</div>
                    <div className="text-muted-foreground text-xs mt-1">2 days ago</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* User Management Tab */}
        {!loading && activeTab === 'users' && (
          <div className="space-y-6">
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search users by name, email, role..."
                  className="w-full bg-input border border-border rounded-lg pl-10 pr-4 py-2 text-foreground"
                />
              </div>
              
              <div className="flex space-x-2">
                <select
                  value={userFilter}
                  onChange={(e) => setUserFilter(e.target.value)}
                  className="bg-input border border-border rounded-lg px-4 py-2 text-foreground"
                >
                  <option value="all">All Users</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="suspended">Suspended</option>
                </select>
                
                <button
                  onClick={handleCreateUser}
                  className="bg-gradient-to-r from-matrix-primary to-matrix-secondary hover:from-matrix-accent hover:to-matrix-primary text-primary-foreground px-4 py-2 rounded-lg flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
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
                      <th className="px-4 py-3 text-left text-foreground font-semibold">Name</th>
                      <th className="px-4 py-3 text-left text-foreground font-semibold">Email</th>
                      <th className="px-4 py-3 text-left text-foreground font-semibold">Role</th>
                      <th className="px-4 py-3 text-left text-foreground font-semibold">Company</th>
                      <th className="px-4 py-3 text-left text-foreground font-semibold">Status</th>
                      <th className="px-4 py-3 text-left text-foreground font-semibold">Created</th>
                      <th className="px-4 py-3 text-right text-foreground font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map((user) => (
                        <tr key={user.id} className="border-t border-border hover:bg-muted/30 transition-colors duration-200">
                          <td className="px-4 py-3 text-foreground">{user.full_name || 'N/A'}</td>
                          <td className="px-4 py-3 text-foreground">{user.email}</td>
                          <td className="px-4 py-3 text-foreground capitalize">{user.role || 'user'}</td>
                          <td className="px-4 py-3 text-foreground">{user.company || 'N/A'}</td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(user.status || 'active')}`}>
                              {user.status || 'active'}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-muted-foreground text-sm">{formatDate(user.created_at)}</td>
                          <td className="px-4 py-3 text-right">
                            <div className="flex items-center justify-end space-x-2">
                              <button
                                onClick={() => handleEditUser(user)}
                                className="p-1 text-muted-foreground hover:text-foreground transition-colors duration-200"
                                title="Edit User"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteUser(user.id)}
                                className="p-1 text-muted-foreground hover:text-destructive transition-colors duration-200"
                                title="Delete User"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">
                          No users found matching your criteria
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Export Users */}
            <div className="flex justify-end">
              <button className="flex items-center space-x-2 text-matrix-primary hover:text-matrix-secondary transition-colors duration-200">
                <Download className="w-4 h-4" />
                <span>Export Users</span>
              </button>
            </div>
          </div>
        )}

        {/* Template Approval Tab */}
        {!loading && activeTab === 'templates' && (
          <div className="space-y-6">
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search templates by title, description, category..."
                  className="w-full bg-input border border-border rounded-lg pl-10 pr-4 py-2 text-foreground"
                />
              </div>
              
              <div className="flex space-x-2">
                <select
                  value={templateFilter}
                  onChange={(e) => setTemplateFilter(e.target.value)}
                  className="bg-input border border-border rounded-lg px-4 py-2 text-foreground"
                >
                  <option value="all">All Templates</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>
            
            {/* Templates Table */}
            <div className="glass rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="px-4 py-3 text-left text-foreground font-semibold">Title</th>
                      <th className="px-4 py-3 text-left text-foreground font-semibold">Author</th>
                      <th className="px-4 py-3 text-left text-foreground font-semibold">Category</th>
                      <th className="px-4 py-3 text-left text-foreground font-semibold">Platform</th>
                      <th className="px-4 py-3 text-left text-foreground font-semibold">Status</th>
                      <th className="px-4 py-3 text-left text-foreground font-semibold">Submitted</th>
                      <th className="px-4 py-3 text-right text-foreground font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTemplates.length > 0 ? (
                      filteredTemplates.map((template) => (
                        <tr key={template.id} className="border-t border-border hover:bg-muted/30 transition-colors duration-200">
                          <td className="px-4 py-3 text-foreground">{template.title || template.templateTitle}</td>
                          <td className="px-4 py-3 text-foreground">{template.author || template.name || 'N/A'}</td>
                          <td className="px-4 py-3 text-foreground capitalize">{template.category || 'N/A'}</td>
                          <td className="px-4 py-3 text-foreground capitalize">{template.platform || 'N/A'}</td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(template.status || 'pending')}`}>
                              {template.status || 'pending'}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-muted-foreground text-sm">{formatDate(template.submittedAt || template.created_at)}</td>
                          <td className="px-4 py-3 text-right">
                            <div className="flex items-center justify-end space-x-2">
                              <button
                                onClick={() => handleReviewTemplate(template)}
                                className="p-1 text-muted-foreground hover:text-foreground transition-colors duration-200"
                                title="Review Template"
                              >
                                <FileText className="w-4 h-4" />
                              </button>
                              {template.status !== 'approved' && (
                                <button
                                  onClick={() => handleApproveTemplate(template)}
                                  className="p-1 text-muted-foreground hover:text-green-400 transition-colors duration-200"
                                  title="Approve Template"
                                >
                                  <CheckCircle className="w-4 h-4" />
                                </button>
                              )}
                              {template.status !== 'rejected' && (
                                <button
                                  onClick={() => {
                                    setSelectedTemplate(template);
                                    setShowTemplateReview(true);
                                  }}
                                  className="p-1 text-muted-foreground hover:text-red-400 transition-colors duration-200"
                                  title="Reject Template"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">
                          No templates found matching your criteria
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Content Moderation Tab */}
        {!loading && activeTab === 'moderation' && (
          <div className="space-y-6">
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search flagged content..."
                  className="w-full bg-input border border-border rounded-lg pl-10 pr-4 py-2 text-foreground"
                />
              </div>
              
              <div className="flex space-x-2">
                <select
                  value={contentFilter}
                  onChange={(e) => setContentFilter(e.target.value)}
                  className="bg-input border border-border rounded-lg px-4 py-2 text-foreground"
                >
                  <option value="all">All Content</option>
                  <option value="flagged">Flagged</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>
            
            {/* Flagged Content Table */}
            <div className="glass rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="px-4 py-3 text-left text-foreground font-semibold">Content</th>
                      <th className="px-4 py-3 text-left text-foreground font-semibold">Type</th>
                      <th className="px-4 py-3 text-left text-foreground font-semibold">Author</th>
                      <th className="px-4 py-3 text-left text-foreground font-semibold">Reported By</th>
                      <th className="px-4 py-3 text-left text-foreground font-semibold">Status</th>
                      <th className="px-4 py-3 text-left text-foreground font-semibold">Date</th>
                      <th className="px-4 py-3 text-right text-foreground font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredContent.length > 0 ? (
                      filteredContent.map((content) => (
                        <tr key={content.id} className="border-t border-border hover:bg-muted/30 transition-colors duration-200">
                          <td className="px-4 py-3 text-foreground">{content.title}</td>
                          <td className="px-4 py-3 text-foreground capitalize">{content.type}</td>
                          <td className="px-4 py-3 text-foreground">{content.author}</td>
                          <td className="px-4 py-3 text-foreground">{content.reportedBy}</td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(content.status)}`}>
                              {content.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-muted-foreground text-sm">{formatDate(content.date)}</td>
                          <td className="px-4 py-3 text-right">
                            <div className="flex items-center justify-end space-x-2">
                              <button
                                onClick={() => handleReviewContent(content)}
                                className="p-1 text-muted-foreground hover:text-foreground transition-colors duration-200"
                                title="Review Content"
                              >
                                <FileText className="w-4 h-4" />
                              </button>
                              {content.status === 'flagged' && (
                                <>
                                  <button
                                    onClick={() => handleApproveContent(content)}
                                    className="p-1 text-muted-foreground hover:text-green-400 transition-colors duration-200"
                                    title="Approve Content"
                                  >
                                    <CheckCircle className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => {
                                      setSelectedContent(content);
                                      setShowContentModeration(true);
                                    }}
                                    className="p-1 text-muted-foreground hover:text-red-400 transition-colors duration-200"
                                    title="Remove Content"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">
                          No flagged content found matching your criteria
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Site Settings Tab */}
        {!loading && activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="glass p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-foreground mb-4">General Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-foreground font-medium mb-1">Site Name</label>
                  <input
                    type="text"
                    value={siteSettings.siteName || 'MCP4 Everyone'}
                    onChange={(e) => handleUpdateSettings({ siteName: e.target.value })}
                    className="w-full bg-input border border-border rounded-lg px-4 py-2 text-foreground"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Users className="w-5 h-5 text-blue-400" />
                      <span className="text-foreground">Allow User Registration</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={siteSettings.allowRegistration !== false}
                        onChange={(e) => handleUpdateSettings({ allowRegistration: e.target.checked })}
                      />
                      <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-matrix-primary"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Shield className="w-5 h-5 text-purple-400" />
                      <span className="text-foreground">Require Email Verification</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={siteSettings.requireEmailVerification === true}
                        onChange={(e) => handleUpdateSettings({ requireEmailVerification: e.target.checked })}
                      />
                      <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-matrix-primary"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <FileText className="w-5 h-5 text-green-400" />
                      <span className="text-foreground">Auto-Approve Templates</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={siteSettings.autoApproveTemplates === true}
                        onChange={(e) => handleUpdateSettings({ autoApproveTemplates: e.target.checked })}
                      />
                      <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-matrix-primary"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Flag className="w-5 h-5 text-red-400" />
                      <span className="text-foreground">Content Moderation</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={siteSettings.moderationEnabled !== false}
                        onChange={(e) => handleUpdateSettings({ moderationEnabled: e.target.checked })}
                      />
                      <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-matrix-primary"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="glass p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-foreground mb-4">Featured Categories</h3>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {['community', 'marketing', 'project', 'sales', 'operations'].map((category) => (
                    <div 
                      key={category}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium cursor-pointer transition-all duration-200 ${
                        siteSettings.featuredCategories?.includes(category)
                          ? 'bg-matrix-primary text-primary-foreground'
                          : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
                      }`}
                      onClick={() => {
                        const currentFeatured = siteSettings.featuredCategories || [];
                        const newFeatured = currentFeatured.includes(category)
                          ? currentFeatured.filter((c: string) => c !== category)
                          : [...currentFeatured, category];
                        handleUpdateSettings({ featuredCategories: newFeatured });
                      }}
                    >
                      {category}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="glass p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-foreground mb-4">Maintenance Mode</h3>
              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div>
                  <div className="text-foreground font-medium">Enable Maintenance Mode</div>
                  <div className="text-muted-foreground text-sm">This will make the site inaccessible to all users except admins</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={siteSettings.maintenanceMode === true}
                    onChange={(e) => handleUpdateSettings({ maintenanceMode: e.target.checked })}
                  />
                  <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-matrix-primary"></div>
                </label>
              </div>
            </div>
            
            <div className="glass p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-foreground mb-4">Database Management</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div>
                    <div className="text-foreground font-medium">Database Backup</div>
                    <div className="text-muted-foreground text-sm">Last backup: {formatDate(new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())}</div>
                  </div>
                  <button className="px-4 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors duration-200">
                    Backup Now
                  </button>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div>
                    <div className="text-foreground font-medium">Run Migrations</div>
                    <div className="text-muted-foreground text-sm">Apply pending database migrations</div>
                  </div>
                  <button className="px-4 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors duration-200">
                    Run Migrations
                  </button>
                </div>
              </div>
            </div>
            
            <div className="glass p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-foreground mb-4">Analytics</h3>
              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg mb-4">
                <div>
                  <div className="text-foreground font-medium">Enable Analytics</div>
                  <div className="text-muted-foreground text-sm">Collect anonymous usage data to improve the platform</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={siteSettings.analyticsEnabled !== false}
                    onChange={(e) => handleUpdateSettings({ analyticsEnabled: e.target.checked })}
                  />
                  <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-matrix-primary"></div>
                </label>
              </div>
              
              <div className="text-right text-muted-foreground text-sm">
                Last updated: {formatDate(siteSettings.lastUpdated || new Date().toISOString())}
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* User Form Modal */}
      {showUserForm && (
        <AdminUserForm
          user={selectedUser}
          onClose={() => setShowUserForm(false)}
          onSave={handleSaveUser}
          isNew={!selectedUser}
        />
      )}
      
      {/* Template Review Modal */}
      {showTemplateReview && selectedTemplate && (
        <AdminTemplateReview
          template={selectedTemplate}
          onClose={() => setShowTemplateReview(false)}
          onApprove={handleApproveTemplate}
          onReject={handleRejectTemplate}
        />
      )}
      
      {/* Content Moderation Modal */}
      {showContentModeration && selectedContent && (
        <AdminContentModeration
          content={selectedContent}
          onClose={() => setShowContentModeration(false)}
          onApprove={handleApproveContent}
          onReject={handleRejectContent}
        />
      )}
    </div>
  );
}