import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, Shield, FileText, Flag, Search, Filter, Plus, 
  Trash2, Edit, CheckCircle, X, MoreHorizontal, Download, 
  RefreshCw, Eye, Clock, ArrowUpDown, ChevronDown, ChevronUp
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import AdminUserForm from '../components/AdminUserForm';
import AdminTemplateReview from '../components/AdminTemplateReview';
import AdminContentModeration from '../components/AdminContentModeration';

export default function AdminDashboard() {
  const { user, profile, addNotification } = useAuth();
  const [activeTab, setActiveTab] = useState('users');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showUserForm, setShowUserForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [showTemplateReview, setShowTemplateReview] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [showContentModeration, setShowContentModeration] = useState(false);
  const [selectedContent, setSelectedContent] = useState<any>(null);
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [isLoading, setIsLoading] = useState(true);
  
  // Data states
  const [users, setUsers] = useState<any[]>([]);
  const [templates, setTemplates] = useState<any[]>([]);
  const [flaggedContent, setFlaggedContent] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    pendingTemplates: 0,
    flaggedContent: 0
  });

  // Check if user is admin
  const isAdmin = profile?.role?.toLowerCase().includes('admin');

  // Load data on component mount
  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);

  const loadData = async () => {
    setIsLoading(true);
    
    try {
      // Load users
      const mockUsers = [
        {
          id: 'user-1',
          full_name: 'Sarah Chen',
          email: 'sarah@example.com',
          role: 'admin',
          company: 'MCP Academy',
          status: 'active',
          created_at: '2024-01-15T10:30:00Z',
          last_login: '2024-03-10T14:22:00Z'
        },
        {
          id: 'user-2',
          full_name: 'Mike Rodriguez',
          email: 'mike@example.com',
          role: 'moderator',
          company: 'GrowthCo',
          status: 'active',
          created_at: '2024-01-20T08:15:00Z',
          last_login: '2024-03-09T11:45:00Z'
        },
        {
          id: 'user-3',
          full_name: 'Lisa Park',
          email: 'lisa@example.com',
          role: 'user',
          company: 'InnovateLab',
          status: 'active',
          created_at: '2024-02-05T16:20:00Z',
          last_login: '2024-03-08T09:30:00Z'
        }
      ];
      
      // Add the current user if not already in the list
      if (user && profile) {
        const currentUserExists = mockUsers.some(u => u.id === user.id || u.email === user.email);
        
        if (!currentUserExists) {
          mockUsers.push({
            id: user.id,
            full_name: profile.full_name || user.email?.split('@')[0] || 'User',
            email: user.email || '',
            role: profile.role || 'user',
            company: profile.company || '',
            status: 'active',
            created_at: profile.created_at || new Date().toISOString(),
            last_login: new Date().toISOString()
          });
        }
      }
      
      // Load real users from localStorage
      const allUsers = JSON.parse(localStorage.getItem('all-users') || '[]');
      const combinedUsers = [...mockUsers, ...allUsers];
      
      setUsers(combinedUsers);
      
      // Load templates
      const allTemplates = [];
      
      // Get community templates
      const communityTemplates = JSON.parse(localStorage.getItem('community-templates') || '[]');
      
      // Get template submissions from all users
      const userKeys = Object.keys(localStorage).filter(key => key.startsWith('template-submissions-'));
      for (const key of userKeys) {
        const userSubmissions = JSON.parse(localStorage.getItem(key) || '[]');
        allTemplates.push(...userSubmissions);
      }
      
      setTemplates([...allTemplates, ...communityTemplates]);
      
      // Load flagged content
      const mockFlaggedContent = [
        {
          id: 'content-1',
          title: 'Inappropriate Comment',
          type: 'comment',
          author: 'anonymous_user',
          content: 'This comment contains inappropriate language that violates our community guidelines.',
          date: '2024-03-08T14:30:00Z',
          reportedBy: 'Lisa Park',
          status: 'flagged'
        },
        {
          id: 'content-2',
          title: 'Spam Post',
          type: 'post',
          author: 'marketing_bot',
          content: 'This post appears to be spam promoting unrelated products.',
          date: '2024-03-09T10:15:00Z',
          reportedBy: 'Mike Rodriguez',
          status: 'flagged'
        },
        {
          id: 'content-3',
          title: 'Misleading Information',
          type: 'guide',
          author: 'tech_guru',
          content: 'This guide contains technically inaccurate information that could mislead users.',
          date: '2024-03-10T09:45:00Z',
          reportedBy: 'Sarah Chen',
          status: 'flagged'
        }
      ];
      
      setFlaggedContent(mockFlaggedContent);
      
      // Calculate stats
      setStats({
        totalUsers: combinedUsers.length,
        activeUsers: combinedUsers.filter(u => u.status === 'active').length,
        pendingTemplates: allTemplates.filter(t => t.status === 'pending').length,
        flaggedContent: mockFlaggedContent.length
      });
    } catch (error) {
      console.error('Error loading admin data:', error);
      addNotification({
        id: `admin-error-${Date.now()}`,
        message: 'Error loading admin data',
        type: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle user creation/update
  const handleSaveUser = (userData: any) => {
    const isNewUser = !users.some(u => u.id === userData.id);
    
    if (isNewUser) {
      // Add new user
      const newUser = {
        ...userData,
        created_at: new Date().toISOString(),
        last_login: null
      };
      
      setUsers([...users, newUser]);
      
      // Save to localStorage
      const allUsers = JSON.parse(localStorage.getItem('all-users') || '[]');
      allUsers.push(newUser);
      localStorage.setItem('all-users', JSON.stringify(allUsers));
      
      // Update stats
      setStats({
        ...stats,
        totalUsers: stats.totalUsers + 1,
        activeUsers: newUser.status === 'active' ? stats.activeUsers + 1 : stats.activeUsers
      });
    } else {
      // Update existing user
      const updatedUsers = users.map(u => 
        u.id === userData.id ? { ...u, ...userData } : u
      );
      
      setUsers(updatedUsers);
      
      // Save to localStorage
      const allUsers = JSON.parse(localStorage.getItem('all-users') || '[]');
      const updatedAllUsers = allUsers.map((u: any) => 
        u.id === userData.id ? { ...u, ...userData } : u
      );
      localStorage.setItem('all-users', JSON.stringify(updatedAllUsers));
      
      // Update stats if status changed
      const oldUser = users.find(u => u.id === userData.id);
      if (oldUser && oldUser.status !== userData.status) {
        setStats({
          ...stats,
          activeUsers: 
            oldUser.status !== 'active' && userData.status === 'active' ? stats.activeUsers + 1 :
            oldUser.status === 'active' && userData.status !== 'active' ? stats.activeUsers - 1 :
            stats.activeUsers
        });
      }
    }
  };

  // Handle user deletion
  const handleDeleteUser = (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      const userToDelete = users.find(u => u.id === userId);
      
      // Remove user
      const updatedUsers = users.filter(u => u.id !== userId);
      setUsers(updatedUsers);
      
      // Save to localStorage
      const allUsers = JSON.parse(localStorage.getItem('all-users') || '[]');
      const updatedAllUsers = allUsers.filter((u: any) => u.id !== userId);
      localStorage.setItem('all-users', JSON.stringify(updatedAllUsers));
      
      // Update stats
      setStats({
        ...stats,
        totalUsers: stats.totalUsers - 1,
        activeUsers: userToDelete?.status === 'active' ? stats.activeUsers - 1 : stats.activeUsers
      });
      
      addNotification({
        id: `user-deleted-${Date.now()}`,
        message: 'User deleted successfully',
        type: 'success'
      });
    }
  };

  // Handle template approval
  const handleApproveTemplate = (template: any) => {
    // Update template status
    const updatedTemplates = templates.map(t => 
      t.id === template.id ? { ...t, status: 'approved', reviewedAt: new Date().toISOString() } : t
    );
    
    setTemplates(updatedTemplates);
    
    // Save to localStorage
    if (template.id.startsWith('template-')) {
      // Find which user submitted this template
      const userKeys = Object.keys(localStorage).filter(key => key.startsWith('template-submissions-'));
      
      for (const key of userKeys) {
        const userSubmissions = JSON.parse(localStorage.getItem(key) || '[]');
        const submissionIndex = userSubmissions.findIndex((s: any) => s.id === template.id);
        
        if (submissionIndex >= 0) {
          // Update the submission
          userSubmissions[submissionIndex] = { 
            ...userSubmissions[submissionIndex], 
            status: 'approved', 
            reviewedAt: new Date().toISOString() 
          };
          
          localStorage.setItem(key, JSON.stringify(userSubmissions));
          
          // Add to community templates
          const communityTemplates = JSON.parse(localStorage.getItem('community-templates') || '[]');
          
          // Create a new template from the submission
          const submission = userSubmissions[submissionIndex];
          const newTemplate = {
            id: submission.id,
            title: submission.templateTitle,
            description: submission.description,
            category: submission.category.toLowerCase().replace(/\s+/g, '-'),
            platform: submission.platform.toLowerCase().replace(/\s+/g, '-'),
            difficulty: submission.difficulty.startsWith('Beginner') ? 'Beginner' : 
                      submission.difficulty.startsWith('Intermediate') ? 'Intermediate' : 'Advanced',
            rating: 5.0,
            downloads: 0,
            dataSource: submission.dataSource || 'Custom Data Source',
            aiModel: 'GPT-4',
            features: typeof submission.features === 'string' 
              ? submission.features.split('\n').filter(Boolean)
              : submission.features || [],
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
          
          // Check if it's already in the community templates
          const existingIndex = communityTemplates.findIndex((t: any) => t.id === newTemplate.id);
          
          if (existingIndex >= 0) {
            communityTemplates[existingIndex] = newTemplate;
          } else {
            communityTemplates.push(newTemplate);
          }
          
          localStorage.setItem('community-templates', JSON.stringify(communityTemplates));
          
          break;
        }
      }
    }
    
    // Update stats
    setStats({
      ...stats,
      pendingTemplates: stats.pendingTemplates - 1
    });
  };

  // Handle template rejection
  const handleRejectTemplate = (template: any, reason: string) => {
    // Update template status
    const updatedTemplates = templates.map(t => 
      t.id === template.id ? { 
        ...t, 
        status: 'rejected', 
        reviewedAt: new Date().toISOString(),
        rejectionReason: reason
      } : t
    );
    
    setTemplates(updatedTemplates);
    
    // Save to localStorage
    if (template.id.startsWith('template-')) {
      // Find which user submitted this template
      const userKeys = Object.keys(localStorage).filter(key => key.startsWith('template-submissions-'));
      
      for (const key of userKeys) {
        const userSubmissions = JSON.parse(localStorage.getItem(key) || '[]');
        const submissionIndex = userSubmissions.findIndex((s: any) => s.id === template.id);
        
        if (submissionIndex >= 0) {
          // Update the submission
          userSubmissions[submissionIndex] = { 
            ...userSubmissions[submissionIndex], 
            status: 'rejected', 
            reviewedAt: new Date().toISOString(),
            rejectionReason: reason
          };
          
          localStorage.setItem(key, JSON.stringify(userSubmissions));
          break;
        }
      }
    }
    
    // Update stats
    setStats({
      ...stats,
      pendingTemplates: stats.pendingTemplates - 1
    });
  };

  // Handle content approval
  const handleApproveContent = (content: any) => {
    // Update content status
    const updatedContent = flaggedContent.map(c => 
      c.id === content.id ? { ...c, status: 'approved' } : c
    );
    
    setFlaggedContent(updatedContent);
    
    // Update stats
    setStats({
      ...stats,
      flaggedContent: stats.flaggedContent - 1
    });
  };

  // Handle content rejection
  const handleRejectContent = (content: any, reason: string) => {
    // Update content status
    const updatedContent = flaggedContent.map(c => 
      c.id === content.id ? { ...c, status: 'rejected', rejectionReason: reason } : c
    );
    
    setFlaggedContent(updatedContent);
    
    // Update stats
    setStats({
      ...stats,
      flaggedContent: stats.flaggedContent - 1
    });
  };

  // Filter and sort users
  const filteredUsers = users.filter(user => {
    const matchesSearch = searchQuery === '' || 
      user.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.company?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  }).sort((a, b) => {
    // Sort by the selected field
    let aValue = a[sortField] || '';
    let bValue = b[sortField] || '';
    
    // Handle dates
    if (sortField === 'created_at' || sortField === 'last_login') {
      aValue = aValue ? new Date(aValue).getTime() : 0;
      bValue = bValue ? new Date(bValue).getTime() : 0;
    }
    
    // Sort direction
    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  // Filter templates
  const filteredTemplates = templates.filter(template => {
    const title = template.templateTitle || template.title || '';
    const description = template.description || '';
    const author = template.name || template.author || '';
    
    const matchesSearch = searchQuery === '' || 
      title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      author.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || template.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  // Filter flagged content
  const filteredContent = flaggedContent.filter(content => {
    const matchesSearch = searchQuery === '' || 
      content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      content.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      content.type.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || content.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  // Handle sort change
  const handleSort = (field: string) => {
    if (sortField === field) {
      // Toggle direction if same field
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // New field, default to ascending
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Format date
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Never';
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    } catch (error) {
      return 'Invalid date';
    }
  };

  // If not admin, show access denied
  if (!isAdmin) {
    return (
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="glass p-8 rounded-xl">
            <Shield className="w-16 h-16 text-destructive mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-foreground mb-4">Access Denied</h1>
            <p className="text-muted-foreground mb-6">
              You don't have permission to access the admin dashboard. Please contact an administrator if you believe this is an error.
            </p>
            <Link to="/" className="btn-primary">
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Manage users, review content, and monitor platform activity
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="glass p-4 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-muted-foreground text-sm">Total Users</div>
                <div className="text-2xl font-bold text-foreground">{stats.totalUsers}</div>
              </div>
              <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-400" />
              </div>
            </div>
          </div>
          
          <div className="glass p-4 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-muted-foreground text-sm">Active Users</div>
                <div className="text-2xl font-bold text-foreground">{stats.activeUsers}</div>
              </div>
              <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-400" />
              </div>
            </div>
          </div>
          
          <div className="glass p-4 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-muted-foreground text-sm">Pending Templates</div>
                <div className="text-2xl font-bold text-foreground">{stats.pendingTemplates}</div>
              </div>
              <div className="w-10 h-10 bg-yellow-500/20 rounded-full flex items-center justify-center">
                <FileText className="w-5 h-5 text-yellow-400" />
              </div>
            </div>
          </div>
          
          <div className="glass p-4 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-muted-foreground text-sm">Flagged Content</div>
                <div className="text-2xl font-bold text-foreground">{stats.flaggedContent}</div>
              </div>
              <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
                <Flag className="w-5 h-5 text-red-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-muted/30 p-1 rounded-lg mb-6 w-fit">
          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 rounded-md transition-all duration-200 ${
              activeTab === 'users' 
                ? 'bg-card text-foreground' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Users
          </button>
          <button
            onClick={() => setActiveTab('templates')}
            className={`px-4 py-2 rounded-md transition-all duration-200 ${
              activeTab === 'templates' 
                ? 'bg-card text-foreground' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Templates
          </button>
          <button
            onClick={() => setActiveTab('moderation')}
            className={`px-4 py-2 rounded-md transition-all duration-200 ${
              activeTab === 'moderation' 
                ? 'bg-card text-foreground' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Moderation
          </button>
        </div>

        {/* Search and Filters */}
        <div className="glass p-4 rounded-xl mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search ${activeTab}...`}
                className="w-full bg-input border border-border rounded-lg pl-10 pr-4 py-2 text-foreground"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-muted-foreground" />
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="bg-input border border-border rounded-lg px-4 py-2 text-foreground"
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="flagged">Flagged</option>
              </select>
            </div>
            
            {activeTab === 'users' && (
              <button
                onClick={() => {
                  setSelectedUser(null);
                  setShowUserForm(true);
                }}
                className="bg-gradient-to-r from-matrix-primary to-matrix-secondary hover:from-matrix-accent hover:to-matrix-primary text-primary-foreground px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add User</span>
              </button>
            )}
            
            <button
              onClick={loadData}
              className="bg-muted text-foreground hover:bg-muted/80 px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Content based on active tab */}
        {isLoading ? (
          <div className="glass p-8 rounded-xl text-center">
            <div className="loading-spinner mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading data...</p>
          </div>
        ) : activeTab === 'users' ? (
          <div className="glass rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/50 border-b border-border">
                    <th className="text-left p-4 text-foreground font-semibold">
                      <button 
                        onClick={() => handleSort('full_name')}
                        className="flex items-center space-x-1"
                      >
                        <span>Name</span>
                        {sortField === 'full_name' && (
                          sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                        )}
                      </button>
                    </th>
                    <th className="text-left p-4 text-foreground font-semibold">
                      <button 
                        onClick={() => handleSort('email')}
                        className="flex items-center space-x-1"
                      >
                        <span>Email</span>
                        {sortField === 'email' && (
                          sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                        )}
                      </button>
                    </th>
                    <th className="text-left p-4 text-foreground font-semibold">
                      <button 
                        onClick={() => handleSort('role')}
                        className="flex items-center space-x-1"
                      >
                        <span>Role</span>
                        {sortField === 'role' && (
                          sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                        )}
                      </button>
                    </th>
                    <th className="text-left p-4 text-foreground font-semibold">
                      <button 
                        onClick={() => handleSort('status')}
                        className="flex items-center space-x-1"
                      >
                        <span>Status</span>
                        {sortField === 'status' && (
                          sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                        )}
                      </button>
                    </th>
                    <th className="text-left p-4 text-foreground font-semibold">
                      <button 
                        onClick={() => handleSort('created_at')}
                        className="flex items-center space-x-1"
                      >
                        <span>Created</span>
                        {sortField === 'created_at' && (
                          sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                        )}
                      </button>
                    </th>
                    <th className="text-left p-4 text-foreground font-semibold">
                      <button 
                        onClick={() => handleSort('last_login')}
                        className="flex items-center space-x-1"
                      >
                        <span>Last Login</span>
                        {sortField === 'last_login' && (
                          sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                        )}
                      </button>
                    </th>
                    <th className="text-center p-4 text-foreground font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <tr key={user.id} className="border-b border-border hover:bg-muted/30 transition-colors duration-200">
                        <td className="p-4 text-foreground">{user.full_name}</td>
                        <td className="p-4 text-foreground">{user.email}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            user.role === 'admin' ? 'bg-red-500/20 text-red-400' :
                            user.role === 'moderator' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-blue-500/20 text-blue-400'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            user.status === 'active' ? 'bg-green-500/20 text-green-400' :
                            user.status === 'inactive' ? 'bg-gray-500/20 text-gray-400' :
                            'bg-red-500/20 text-red-400'
                          }`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="p-4 text-muted-foreground text-sm">{formatDate(user.created_at)}</td>
                        <td className="p-4 text-muted-foreground text-sm">{formatDate(user.last_login)}</td>
                        <td className="p-4">
                          <div className="flex items-center justify-center space-x-2">
                            <button
                              onClick={() => {
                                setSelectedUser(user);
                                setShowUserForm(true);
                              }}
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
                      <td colSpan={7} className="p-8 text-center text-muted-foreground">
                        No users found matching your filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : activeTab === 'templates' ? (
          <div className="glass rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/50 border-b border-border">
                    <th className="text-left p-4 text-foreground font-semibold">Title</th>
                    <th className="text-left p-4 text-foreground font-semibold">Author</th>
                    <th className="text-left p-4 text-foreground font-semibold">Category</th>
                    <th className="text-left p-4 text-foreground font-semibold">Platform</th>
                    <th className="text-left p-4 text-foreground font-semibold">Status</th>
                    <th className="text-left p-4 text-foreground font-semibold">Submitted</th>
                    <th className="text-center p-4 text-foreground font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTemplates.length > 0 ? (
                    filteredTemplates.map((template) => (
                      <tr key={template.id} className="border-b border-border hover:bg-muted/30 transition-colors duration-200">
                        <td className="p-4 text-foreground">{template.templateTitle || template.title}</td>
                        <td className="p-4 text-foreground">{template.name || template.author || 'Unknown'}</td>
                        <td className="p-4 text-foreground capitalize">{template.category}</td>
                        <td className="p-4 text-foreground capitalize">{template.platform}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            template.status === 'approved' ? 'bg-green-500/20 text-green-400' :
                            template.status === 'rejected' ? 'bg-red-500/20 text-red-400' :
                            'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {template.status || 'pending'}
                          </span>
                        </td>
                        <td className="p-4 text-muted-foreground text-sm">{formatDate(template.submittedAt || template.created_at)}</td>
                        <td className="p-4">
                          <div className="flex items-center justify-center space-x-2">
                            <button
                              onClick={() => {
                                setSelectedTemplate(template);
                                setShowTemplateReview(true);
                              }}
                              className="p-1 text-muted-foreground hover:text-foreground transition-colors duration-200"
                              title="Review Template"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            {template.status === 'pending' && (
                              <>
                                <button
                                  onClick={() => handleApproveTemplate(template)}
                                  className="p-1 text-muted-foreground hover:text-green-400 transition-colors duration-200"
                                  title="Approve Template"
                                >
                                  <CheckCircle className="w-4 h-4" />
                                </button>
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
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-muted-foreground">
                        No templates found matching your filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="glass rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/50 border-b border-border">
                    <th className="text-left p-4 text-foreground font-semibold">Content</th>
                    <th className="text-left p-4 text-foreground font-semibold">Type</th>
                    <th className="text-left p-4 text-foreground font-semibold">Author</th>
                    <th className="text-left p-4 text-foreground font-semibold">Reported By</th>
                    <th className="text-left p-4 text-foreground font-semibold">Status</th>
                    <th className="text-left p-4 text-foreground font-semibold">Date</th>
                    <th className="text-center p-4 text-foreground font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredContent.length > 0 ? (
                    filteredContent.map((content) => (
                      <tr key={content.id} className="border-b border-border hover:bg-muted/30 transition-colors duration-200">
                        <td className="p-4 text-foreground">{content.title}</td>
                        <td className="p-4 text-foreground capitalize">{content.type}</td>
                        <td className="p-4 text-foreground">{content.author}</td>
                        <td className="p-4 text-foreground">{content.reportedBy}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            content.status === 'approved' ? 'bg-green-500/20 text-green-400' :
                            content.status === 'rejected' ? 'bg-red-500/20 text-red-400' :
                            'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {content.status}
                          </span>
                        </td>
                        <td className="p-4 text-muted-foreground text-sm">{formatDate(content.date)}</td>
                        <td className="p-4">
                          <div className="flex items-center justify-center space-x-2">
                            <button
                              onClick={() => {
                                setSelectedContent(content);
                                setShowContentModeration(true);
                              }}
                              className="p-1 text-muted-foreground hover:text-foreground transition-colors duration-200"
                              title="Review Content"
                            >
                              <Eye className="w-4 h-4" />
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
                      <td colSpan={7} className="p-8 text-center text-muted-foreground">
                        No flagged content found matching your filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

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
    </div>
  );
}