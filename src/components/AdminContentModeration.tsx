import React, { useState } from 'react';
import { X, CheckCircle, AlertTriangle, MessageSquare, User, Flag, Clock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface AdminContentModerationProps {
  content: any;
  onClose: () => void;
  onApprove: (content: any) => void;
  onReject: (content: any, reason: string) => void;
}

export default function AdminContentModeration({ content, onClose, onApprove, onReject }: AdminContentModerationProps) {
  const { addNotification } = useAuth();
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectForm, setShowRejectForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleApprove = async () => {
    setLoading(true);
    
    try {
      // In a real app, this would send data to the server
      // For demo purposes, we'll just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onApprove(content);
      
      addNotification({
        id: `content-approved-${Date.now()}`,
        message: 'Content approved successfully',
        type: 'success'
      });
      
      onClose();
    } catch (error) {
      console.error('Error approving content:', error);
      
      addNotification({
        id: `content-error-${Date.now()}`,
        message: 'Error approving content',
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async () => {
    if (!rejectReason.trim()) {
      addNotification({
        id: `content-error-${Date.now()}`,
        message: 'Please provide a reason for rejection',
        type: 'error'
      });
      return;
    }
    
    setLoading(true);
    
    try {
      // In a real app, this would send data to the server
      // For demo purposes, we'll just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onReject(content, rejectReason);
      
      addNotification({
        id: `content-rejected-${Date.now()}`,
        message: 'Content rejected successfully',
        type: 'success'
      });
      
      onClose();
    } catch (error) {
      console.error('Error rejecting content:', error);
      
      addNotification({
        id: `content-error-${Date.now()}`,
        message: 'Error rejecting content',
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">
            Content Moderation: {content.title}
          </h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Content Info */}
            <div className="glass p-4 rounded-xl">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-muted-foreground text-sm">Type</div>
                  <div className="text-foreground font-medium capitalize">{content.type}</div>
                </div>
                <div>
                  <div className="text-muted-foreground text-sm">Status</div>
                  <div className="text-foreground font-medium capitalize">{content.status}</div>
                </div>
                <div>
                  <div className="text-muted-foreground text-sm">Author</div>
                  <div className="text-foreground font-medium">{content.author}</div>
                </div>
                <div>
                  <div className="text-muted-foreground text-sm">Reported By</div>
                  <div className="text-foreground font-medium">{content.reportedBy}</div>
                </div>
                <div>
                  <div className="text-muted-foreground text-sm">Date</div>
                  <div className="text-foreground font-medium">{new Date(content.date).toLocaleDateString()}</div>
                </div>
              </div>
            </div>
            
            {/* Content Preview */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Content Preview</h3>
              <div className="glass p-4 rounded-xl">
                <div className="flex items-start space-x-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-matrix-primary to-matrix-secondary rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <div className="text-foreground font-medium">{content.author}</div>
                    <div className="text-muted-foreground text-sm">{new Date(content.date).toLocaleDateString()}</div>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  {content.content || 'This is a placeholder for the content that was flagged. In a real application, this would show the actual content that needs moderation.'}
                </p>
              </div>
            </div>
            
            {/* Report Details */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Report Details</h3>
              <div className="glass p-4 rounded-xl">
                <div className="flex items-start space-x-3 mb-3">
                  <Flag className="w-5 h-5 text-red-400 mt-0.5" />
                  <div>
                    <div className="text-foreground font-medium">Reported by {content.reportedBy}</div>
                    <div className="text-muted-foreground text-sm">{new Date(content.date).toLocaleDateString()}</div>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  This content was flagged for review because it may violate our community guidelines. Please review and take appropriate action.
                </p>
              </div>
            </div>
            
            {/* Moderation Guidelines */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Moderation Guidelines</h3>
              <div className="glass p-4 rounded-xl space-y-3">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5" />
                  <div>
                    <div className="text-foreground font-medium">Review Content Carefully</div>
                    <div className="text-muted-foreground text-sm">Ensure the content doesn't violate our community guidelines</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MessageSquare className="w-5 h-5 text-blue-400 mt-0.5" />
                  <div>
                    <div className="text-foreground font-medium">Consider Context</div>
                    <div className="text-muted-foreground text-sm">Take into account the full context of the discussion</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-purple-400 mt-0.5" />
                  <div>
                    <div className="text-foreground font-medium">Act Promptly</div>
                    <div className="text-muted-foreground text-sm">Resolve moderation issues within 24 hours</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Rejection Form */}
            {showRejectForm && (
              <div className="glass p-4 rounded-xl border border-destructive/30 bg-destructive/10 animate-fade-in">
                <h3 className="text-lg font-semibold text-foreground mb-2">Rejection Reason</h3>
                <div className="mb-4">
                  <textarea
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    placeholder="Please provide a reason for rejection..."
                    rows={4}
                    className="w-full bg-input border border-border rounded-lg px-4 py-2 text-foreground resize-none"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowRejectForm(false)}
                    className="px-4 py-2 border border-border rounded-lg text-muted-foreground hover:text-foreground"
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleReject}
                    className="px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-destructive-foreground/30 border-t-destructive-foreground rounded-full animate-spin"></div>
                        <span>Rejecting...</span>
                      </div>
                    ) : (
                      <span>Confirm Rejection</span>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="p-6 border-t border-border flex justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-border rounded-lg text-muted-foreground hover:text-foreground"
            disabled={loading}
          >
            Close
          </button>
          
          {content.status === 'flagged' && (
            <div className="flex space-x-3">
              {!showRejectForm && (
                <button
                  onClick={() => setShowRejectForm(true)}
                  className="px-4 py-2 flex items-center space-x-2 bg-destructive/20 text-destructive border border-destructive/30 rounded-lg hover:bg-destructive/30"
                  disabled={loading}
                >
                  <AlertTriangle className="w-4 h-4" />
                  <span>Remove Content</span>
                </button>
              )}
              
              <button
                onClick={handleApprove}
                className="px-4 py-2 flex items-center space-x-2 bg-gradient-to-r from-matrix-primary to-matrix-secondary hover:from-matrix-accent hover:to-matrix-primary text-primary-foreground rounded-lg"
                disabled={loading || showRejectForm}
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                    <span>Approving...</span>
                  </div>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    <span>Approve Content</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}