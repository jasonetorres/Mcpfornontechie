import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Book, Play, Zap, Users, Usb, LogIn, CheckCircle, Sun, Moon, CreditCard, Loader2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useSubscription } from '../hooks/useSubscription';
import UserMenu from './UserMenu';
import AuthModal from './AuthModal';

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const location = useLocation();
  const { user, profile, loading: authLoading } = useAuth();
  const { getSubscriptionPlan, isActive } = useSubscription();

  const navItems = [
    { name: 'Learn', href: '/learn', icon: Book },
    { name: 'Demo', href: '/demo', icon: Play },
    { name: 'Examples', href: '/examples', icon: Zap },
    { name: 'Resources', href: '/resources', icon: Users },
  ];

  const isCurrentPathActive = (path: string) => location.pathname === path;

  const openAuthModal = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  // Initialize dark mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Show notification when user signs in
  useEffect(() => {
    if (user && profile && !authLoading) {
      setNotificationMessage(`Welcome back, ${profile.full_name || profile.email}!`);
      setShowNotification(true);
      
      // Hide notification after 4 seconds
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [user, profile, authLoading]);

  // Handle auth modal close with success notification for new signups
  const handleAuthModalClose = (wasSuccessfulSignup?: boolean) => {
    setIsAuthModalOpen(false);
    
    if (wasSuccessfulSignup) {
      setNotificationMessage('Account created successfully! Welcome to MCP Academy!');
      setShowNotification(true);
      
      setTimeout(() => {
        setShowNotification(false);
      }, 4000);
    }
  };

  const currentPlan = user ? getSubscriptionPlan() : null;
  const hasActiveSub = user ? isActive() : false;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      {/* Success Notification */}
      {showNotification && (
        <div className="fixed top-20 right-4 z-50 animate-in slide-in-from-right duration-300">
          <div className="bg-matrix-primary/90 backdrop-blur-md border border-matrix-primary/30 rounded-lg p-4 shadow-lg max-w-sm">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-matrix-secondary flex-shrink-0" />
              <p className="text-primary-foreground font-medium">{notificationMessage}</p>
              <button
                onClick={() => setShowNotification(false)}
                className="text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loading Overlay for Auth */}
      {authLoading && (
        <div className="fixed top-20 right-4 z-50">
          <div className="bg-card/90 backdrop-blur-md border border-border rounded-lg p-4 shadow-lg">
            <div className="flex items-center space-x-3">
              <Loader2 className="w-5 h-5 text-matrix-primary animate-spin flex-shrink-0" />
              <p className="text-foreground font-medium">Loading your account...</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/20 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-matrix-primary to-matrix-secondary rounded-lg flex items-center justify-center">
                <Usb className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">MCP Academy</span>
              <span className="hidden sm:inline text-sm text-matrix-primary bg-matrix-primary/20 px-2 py-1 rounded-full">For Non-Developers</span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-1 transition-colors duration-200 ${
                    isCurrentPathActive(item.href)
                      ? 'text-matrix-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              ))}
              <Link
                to="/pricing"
                className={`flex items-center space-x-1 transition-colors duration-200 ${
                  isCurrentPathActive('/pricing')
                    ? 'text-matrix-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span>Pricing</span>
              </Link>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-3">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-muted hover:bg-accent transition-colors duration-200"
              >
                {isDarkMode ? (
                  <Sun className="w-4 h-4 text-muted-foreground" />
                ) : (
                  <Moon className="w-4 h-4 text-muted-foreground" />
                )}
              </button>

              {/* User Section */}
              {user ? (
                <div className="flex items-center space-x-3">
                  {/* Plan Status - Desktop Only */}
                  <div className="hidden lg:flex items-center space-x-2 text-matrix-primary text-sm bg-matrix-primary/10 px-3 py-1 rounded-full border border-matrix-primary/20">
                    <div className="w-2 h-2 bg-matrix-primary rounded-full animate-pulse"></div>
                    <span>
                      {currentPlan && hasActiveSub ? `${currentPlan}` : 'Free'}
                    </span>
                  </div>
                  <UserMenu />
                </div>
              ) : (
                <div className="hidden md:flex items-center space-x-3">
                  <button
                    onClick={() => openAuthModal('signin')}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center space-x-1 px-3 py-2 rounded-lg hover:bg-muted"
                    disabled={authLoading}
                  >
                    {authLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <LogIn className="w-4 h-4" />
                    )}
                    <span>{authLoading ? 'Loading...' : 'Sign In'}</span>
                  </button>
                  <button
                    onClick={() => openAuthModal('signup')}
                    disabled={authLoading}
                    className="bg-gradient-to-r from-matrix-primary to-matrix-secondary hover:from-matrix-accent hover:to-matrix-primary text-primary-foreground px-4 py-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {authLoading ? 'Loading...' : 'Sign Up'}
                  </button>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden text-foreground"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-background/40 backdrop-blur-md border-t border-border">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* Mobile User Status */}
              <div className="px-3 py-2 border-b border-border mb-2">
                {user ? (
                  <div className="flex items-center space-x-2 text-matrix-primary">
                    <div className="w-2 h-2 bg-matrix-primary rounded-full animate-pulse"></div>
                    <span className="text-sm">
                      {profile?.full_name || user.email} 
                      {currentPlan && hasActiveSub && ` (${currentPlan})`}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
                    <span className="text-sm">{authLoading ? 'Loading...' : 'Not signed in'}</span>
                  </div>
                )}
              </div>

              {/* Mobile Navigation Links */}
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 transition-colors duration-200 ${
                    isCurrentPathActive(item.href)
                      ? 'text-matrix-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              ))}
              
              <Link
                to="/pricing"
                className={`flex items-center space-x-2 px-3 py-2 transition-colors duration-200 ${
                  isCurrentPathActive('/pricing')
                    ? 'text-matrix-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <CreditCard className="w-4 h-4" />
                <span>Pricing</span>
              </Link>
              
              {/* Mobile Auth Actions */}
              {!user && (
                <div className="border-t border-border pt-2 mt-2">
                  <button
                    onClick={() => {
                      openAuthModal('signin');
                      setIsMenuOpen(false);
                    }}
                    disabled={authLoading}
                    className="flex items-center space-x-2 px-3 py-2 text-muted-foreground hover:text-foreground transition-colors duration-200 w-full disabled:opacity-50"
                  >
                    {authLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogIn className="w-4 h-4" />}
                    <span>{authLoading ? 'Loading...' : 'Sign In'}</span>
                  </button>
                  <button
                    onClick={() => {
                      openAuthModal('signup');
                      setIsMenuOpen(false);
                    }}
                    disabled={authLoading}
                    className="flex items-center space-x-2 px-3 py-2 text-muted-foreground hover:text-foreground transition-colors duration-200 w-full disabled:opacity-50"
                  >
                    <Users className="w-4 h-4" />
                    <span>{authLoading ? 'Loading...' : 'Sign Up'}</span>
                  </button>
                </div>
              )}

              {/* Mobile User Menu Links */}
              {user && (
                <div className="border-t border-border pt-2 mt-2">
                  <Link
                    to="/profile"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center space-x-2 px-3 py-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    <Users className="w-4 h-4" />
                    <span>Profile</span>
                  </Link>
                  <Link
                    to="/dashboard"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center space-x-2 px-3 py-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    <Book className="w-4 h-4" />
                    <span>Dashboard</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="pt-16">
        {children}
      </main>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <Link to="/" className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-matrix-primary to-matrix-secondary rounded-lg flex items-center justify-center">
                <Usb className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">MCP Academy</span>
              <span className="text-sm text-matrix-primary">For Non-Developers</span>
            </Link>
            
            <div className="flex space-x-6 text-muted-foreground">
              <Link to="/templates" className="hover:text-foreground transition-colors duration-200">Templates</Link>
              <Link to="/community" className="hover:text-foreground transition-colors duration-200">Community</Link>
              <Link to="/guides" className="hover:text-foreground transition-colors duration-200">Guides</Link>
              <Link to="/pricing" className="hover:text-foreground transition-colors duration-200">Pricing</Link>
              <Link to="/success-stories" className="hover:text-foreground transition-colors duration-200">Success Stories</Link>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-border text-center">
            <p className="text-muted-foreground">
              © 2025 MCP Academy. Empowering non-developers to build with AI.
            </p>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={handleAuthModalClose}
        defaultMode={authMode}
      />
    </div>
  );
}

export default Layout;