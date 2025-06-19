import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, CheckCircle, X, ArrowRight, ExternalLink } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface TemplateSubmission {
  id: string;
  templateTitle: string;
  category: string;
  platform: string;
  description: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  reviewedAt: string | null;
}

export default function TemplateSubmissionsList() {
  const { user } = useAuth();
  const [submissions, setSubmissions] = useState<TemplateSubmission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadSubmissions();
    }
  }, [user]);

  const loadSubmissions = () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const savedSubmissions = localStorage.getItem(`template-submissions-${user.id}`);
      if (savedSubmissions) {
        const parsedSubmissions = JSON.parse(savedSubmissions);
        setSubmissions(parsedSubmissions);
      } else {
        setSubmissions([]);
      }
    } catch (error) {
      console.error('Error loading template submissions:', error);
      setSubmissions([]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'rejected': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      case 'rejected': return <X className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="glass p-6 rounded-xl">
        <div className="flex justify-center items-center py-8">
          <div className="loading-spinner mr-2"></div>
          <span className="text-muted-foreground">Loading your submissions...</span>
        </div>
      </div>
    );
  }

  if (submissions.length === 0) {
    return (
      <div className="glass p-6 rounded-xl text-center">
        <h3 className="text-lg font-semibold text-foreground mb-4">No Template Submissions Yet</h3>
        <p className="text-muted-foreground mb-6">
          You haven't submitted any templates yet. Share your expertise with the community!
        </p>
        <Link to="/submit-template" className="btn-primary">
          Submit Your First Template
        </Link>
      </div>
    );
  }

  return (
    <div className="glass p-6 rounded-xl">
      <h3 className="text-lg font-semibold text-foreground mb-4">Your Template Submissions</h3>
      
      <div className="space-y-4">
        {submissions.map((submission) => (
          <div key={submission.id} className="glass bg-muted/20 p-4 rounded-lg">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-medium text-foreground">{submission.templateTitle}</h4>
                <p className="text-muted-foreground text-sm">{submission.description}</p>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium border flex items-center space-x-1 ${getStatusColor(submission.status)}`}>
                {getStatusIcon(submission.status)}
                <span className="capitalize">{submission.status}</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="badge-secondary capitalize">{submission.category}</span>
              <span className="badge-secondary capitalize">{submission.platform}</span>
            </div>
            
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div>Submitted: {formatDate(submission.submittedAt)}</div>
              {submission.reviewedAt && (
                <div>Reviewed: {formatDate(submission.reviewedAt)}</div>
              )}
            </div>
            
            {submission.status === 'approved' && (
              <div className="mt-3 pt-3 border-t border-border">
                <Link 
                  to="/templates" 
                  className="text-matrix-primary hover:text-matrix-secondary transition-colors duration-200 flex items-center space-x-1 text-sm"
                >
                  <span>View in Template Library</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-6 text-center">
        <Link to="/submit-template" className="btn-primary">
          Submit Another Template
        </Link>
      </div>
    </div>
  );
}