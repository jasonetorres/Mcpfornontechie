import React, { useState } from 'react';
import { X, User, Mail, Briefcase, Building, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface AdminUserFormProps {
  user?: any;
  onClose: () => void;
  onSave: (userData: any) => void;
  isNew?: boolean;
}

export default function AdminUserForm({ user, onClose, onSave, isNew = false }: AdminUserFormProps) {
  const { addNotification } = useAuth();
  const [formData, setFormData] = useState({
    id: user?.id || `user-${Date.now()}`,
    full_name: user?.full_name || user?.name || '',
    email: user?.email || '',
    role: user?.role || 'user',
    company: user?.company || '',
    status: user?.status || 'active'
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // In a real app, this would send data to the server
      // For demo purposes, we'll just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onSave(formData);
      
      addNotification({
        id: `user-${isNew ? 'created' : 'updated'}-${Date.now()}`,
        message: `User ${isNew ? 'created' : 'updated'} successfully`,
        type: 'success'
      });
      
      onClose();
    } catch (error) {
      console.error('Error saving user:', error);
      
      addNotification({
        id: `user-error-${Date.now()}`,
        message: `Error ${isNew ? 'creating' : 'updating'} user`,
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-foreground">
            {isNew ? 'Create New User' : 'Edit User'}
          </h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-foreground font-medium mb-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleInputChange}
                required
                className="w-full bg-input border border-border rounded-lg pl-10 pr-4 py-2 text-foreground"
                placeholder="Full name"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-foreground font-medium mb-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full bg-input border border-border rounded-lg pl-10 pr-4 py-2 text-foreground"
                placeholder="Email address"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-foreground font-medium mb-1">Role</label>
            <div className="relative">
              <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                required
                className="w-full bg-input border border-border rounded-lg pl-10 pr-4 py-2 text-foreground appearance-none"
              >
                <option value="user">User</option>
                <option value="moderator">Moderator</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-foreground font-medium mb-1">Company</label>
            <div className="relative">
              <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                className="w-full bg-input border border-border rounded-lg pl-10 pr-4 py-2 text-foreground"
                placeholder="Company (optional)"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-foreground font-medium mb-1">Status</label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                required
                className="w-full bg-input border border-border rounded-lg pl-10 pr-4 py-2 text-foreground appearance-none"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-border rounded-lg text-muted-foreground hover:text-foreground"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-matrix-primary to-matrix-secondary hover:from-matrix-accent hover:to-matrix-primary text-primary-foreground rounded-lg"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                  <span>Saving...</span>
                </div>
              ) : (
                <span>{isNew ? 'Create User' : 'Save Changes'}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}