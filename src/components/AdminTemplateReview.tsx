import React, { useState } from 'react';
import { X, CheckCircle, AlertTriangle, Download, Copy, Check } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface AdminTemplateReviewProps {
  template: any;
  onClose: () => void;
  onApprove: (template: any) => void;
  onReject: (template: any, reason: string) => void;
}

export default function AdminTemplateReview({ template, onClose, onApprove, onReject }: AdminTemplateReviewProps) {
  const { addNotification } = useAuth();
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectForm, setShowRejectForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copiedContent, setCopiedContent] = useState('');

  const handleApprove = async () => {
    setLoading(true);
    
    try {
      // In a real app, this would send data to the server
      // For demo purposes, we'll just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onApprove(template);
      
      addNotification({
        id: `template-approved-${Date.now()}`,
        message: 'Template approved successfully',
        type: 'success'
      });
      
      onClose();
    } catch (error) {
      console.error('Error approving template:', error);
      
      addNotification({
        id: `template-error-${Date.now()}`,
        message: 'Error approving template',
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async () => {
    if (!rejectReason.trim()) {
      addNotification({
        id: `template-error-${Date.now()}`,
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
      
      onReject(template, rejectReason);
      
      addNotification({
        id: `template-rejected-${Date.now()}`,
        message: 'Template rejected successfully',
        type: 'success'
      });
      
      onClose();
    } catch (error) {
      console.error('Error rejecting template:', error);
      
      addNotification({
        id: `template-error-${Date.now()}`,
        message: 'Error rejecting template',
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (content: string, id: string) => {
    navigator.clipboard.writeText(content);
    setCopiedContent(id);
    setTimeout(() => setCopiedContent(''), 2000);
  };

  const title = template.templateTitle || template.title;
  const description = template.description || '';
  const author = template.name || template.author || 'Unknown';
  const email = template.email || 'Not provided';
  const category = template.category || 'Unknown';
  const platform = template.platform || 'Unknown';
  const features = template.features || [];
  const instructions = template.instructions || '';
  const preview = template.preview || '';

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">
            Template Review: {title}
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
            {/* Template Info */}
            <div className="glass p-4 rounded-xl">
              <h3 className="text-lg font-semibold text-foreground mb-3">Template Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-muted-foreground text-sm">Title</div>
                  <div className="text-foreground font-medium">{title}</div>
                </div>
                <div>
                  <div className="text-muted-foreground text-sm">Author</div>
                  <div className="text-foreground font-medium">{author}</div>
                </div>
                <div>
                  <div className="text-muted-foreground text-sm">Email</div>
                  <div className="text-foreground font-medium">{email}</div>
                </div>
                <div>
                  <div className="text-muted-foreground text-sm">Category</div>
                  <div className="text-foreground font-medium capitalize">{category}</div>
                </div>
                <div>
                  <div className="text-muted-foreground text-sm">Platform</div>
                  <div className="text-foreground font-medium capitalize">{platform}</div>
                </div>
                <div>
                  <div className="text-muted-foreground text-sm">Status</div>
                  <div className="text-foreground font-medium capitalize">{template.status || 'Pending'}</div>
                </div>
              </div>
            </div>
            
            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Description</h3>
              <div className="glass p-4 rounded-xl">
                <p className="text-muted-foreground">{description}</p>
              </div>
            </div>
            
            {/* Features */}
            {features && (
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Features</h3>
                <div className="glass p-4 rounded-xl">
                  {typeof features === 'string' ? (
                    <pre className="text-muted-foreground whitespace-pre-wrap">{features}</pre>
                  ) : (
                    <ul className="space-y-2">
                      {features.map((feature: string, index: number) => (
                        <li key={index} className="flex items-start space-x-2 text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-matrix-primary rounded-full mt-2 flex-shrink-0"></div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            )}
            
            {/* Instructions */}
            {instructions && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-foreground">Setup Instructions</h3>
                  <button
                    onClick={() => copyToClipboard(instructions, 'instructions')}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center space-x-1"
                  >
                    {copiedContent === 'instructions' ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                    <span className="text-sm">{copiedContent === 'instructions' ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
                <div className="glass p-4 rounded-xl">
                  <pre className="text-muted-foreground whitespace-pre-wrap text-sm">{instructions}</pre>
                </div>
              </div>
            )}
            
            {/* Preview Code */}
            {preview && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-foreground">Preview Code</h3>
                  <button
                    onClick={() => copyToClipboard(preview, 'preview')}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center space-x-1"
                  >
                    {copiedContent === 'preview' ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                    <span className="text-sm">{copiedContent === 'preview' ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
                <div className="glass p-4 rounded-xl">
                  <pre className="text-muted-foreground whitespace-pre-wrap text-sm">{preview}</pre>
                </div>
              </div>
            )}
            
            {/* Review Checklist */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Review Checklist</h3>
              <div className="glass p-4 rounded-xl space-y-3">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                  <div>
                    <div className="text-foreground font-medium">Content Quality</div>
                    <div className="text-muted-foreground text-sm">Ensure the template is well-documented and provides clear instructions</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                  <div>
                    <div className="text-foreground font-medium">Technical Accuracy</div>
                    <div className="text-muted-foreground text-sm">Verify that the template follows best practices and is technically sound</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                  <div>
                    <div className="text-foreground font-medium">Appropriate Categorization</div>
                    <div className="text-muted-foreground text-sm">Check that the template is correctly categorized</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                  <div>
                    <div className="text-foreground font-medium">No Harmful Content</div>
                    <div className="text-muted-foreground text-sm">Ensure the template doesn't contain harmful, offensive, or inappropriate content</div>
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
          
          {template.status !== 'approved' && template.status !== 'rejected' && (
            <div className="flex space-x-3">
              {!showRejectForm && (
                <button
                  onClick={() => setShowRejectForm(true)}
                  className="px-4 py-2 flex items-center space-x-2 bg-destructive/20 text-destructive border border-destructive/30 rounded-lg hover:bg-destructive/30"
                  disabled={loading}
                >
                  <AlertTriangle className="w-4 h-4" />
                  <span>Reject</span>
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
                    <span>Approve Template</span>
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