import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Book, Play, Zap, Users, Usb, LogIn, CheckCircle, Sun, Moon, CreditCard, Loader2, Code, Bell } from 'lucide-react';
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
  const [isDarkMode, setIsDarkMode] = useState(true);
  const location = useLocation();
  const { user, profile, loading: authLoading, notifications, removeNotification } = useAuth();
  const { getSubscriptionPlan, isActive } = useSubscription();

  const navItems = [
    { name: 'Learn', href: '/learn', icon: Book },
    { name: 'Demo', href: '/demo', icon: Play },
    { name: 'Examples', href: '/examples', icon: Zap },
    { name: 'Resources', href: '/resources', icon: Users },
    { name: 'Sandbox', href: '/sandbox', icon: Code },
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

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Handle auth modal close with success notification for new signups
  const handleAuthModalClose = (wasSuccessfulSignup?: boolean) => {
    setIsAuthModalOpen(false);
  };

  const currentPlan = user ? getSubscriptionPlan() : null;
  const hasActiveSub = user ? isActive() : false;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      {/* Success Notification */}
      {notifications && notifications.length > 0 && (
        <div className="fixed top-4 right-4 z-50 space-y-2 max-w-md">
          {notifications.map((notification) => (
            <div 
              key={notification.id} 
              className={`notification-${notification.type} animate-slide-in-right flex items-center justify-between p-4 rounded-lg shadow-lg`}
            >
              <div className="flex items-center space-x-3">
                {notification.type === 'success' && <CheckCircle className="w-5 h-5 text-matrix-secondary flex-shrink-0" />}
                {notification.type === 'error' && <X className="w-5 h-5 text-destructive flex-shrink-0" />}
                {notification.type === 'warning' && <Bell className="w-5 h-5 text-yellow-400 flex-shrink-0" />}
                {notification.type === 'info' && <Bell className="w-5 h-5 text-blue-400 flex-shrink-0" />}
                <p className={`font-medium ${
                  notification.type === 'success' ? 'text-matrix-primary' : 
                  notification.type === 'error' ? 'text-destructive' :
                  notification.type === 'warning' ? 'text-yellow-400' : 'text-blue-400'
                }`}>
                  {notification.message}
                </p>
              </div>
              <button
                onClick={() => removeNotification(notification.id)}
                className="text-muted-foreground hover:text-foreground transition-colors duration-200 ml-2"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Loading Overlay for Auth */}
      {authLoading && (
        <div className="fixed top-20 right-4 z-50">
          <div className="glass p-4 shadow-lg">
            <div className="flex items-center space-x-3">
              <Loader2 className="w-5 h-5 text-matrix-primary animate-spin flex-shrink-0" />
              <p className="text-foreground font-medium">Loading your account...</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
        <div className="container-responsive">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-matrix-primary to-matrix-secondary rounded-lg flex items-center justify-center">
                <Usb className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground ml-2">MCP4 Everyone</span>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-colors duration-200 ${
                    isCurrentPathActive(item.href)
                      ? 'text-matrix-primary bg-matrix-primary/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              ))}
              <Link
                to="/pricing"
                className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-colors duration-200 ${
                  isCurrentPathActive('/pricing')
                    ? 'text-matrix-primary bg-matrix-primary/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span>Pricing</span>
              </Link>
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors duration-200"
                aria-label="Toggle theme"
              >
                {isDarkMode ? (
                  <Sun className="w-4 h-4 text-muted-foreground" />
                ) : (
                  <Moon className="w-4 h-4 text-muted-foreground" />
                )}
              </button>

              {/* Notifications - Only show when logged in */}
              {user && notifications.length > 0 && (
                <button className="p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors duration-200 relative">
                  <Bell className="w-4 h-4 text-muted-foreground" />
                  <span className="absolute top-0 right-0 w-2 h-2 bg-matrix-primary rounded-full"></span>
                </button>
              )}

              {/* User Section */}
              {user ? (
                <div className="flex items-center space-x-3">
                  {/* Plan Status - Desktop Only */}
                  <div className="hidden lg:flex items-center space-x-2 text-matrix-primary text-sm">
                    <div className="status-online"></div>
                    <span>
                      {currentPlan && hasActiveSub ? `${currentPlan}` : 'Free'}
                    </span>
                  </div>
                  <UserMenu />
                </div>
              ) : (
                <div className="hidden md:flex items-center space-x-2">
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
                    className="btn-primary py-2 px-4"
                  >
                    {authLoading ? 'Loading...' : 'Sign Up'}
                  </button>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden text-foreground p-2 rounded-lg hover:bg-muted/50"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden glass border-t border-border">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* Mobile User Status */}
              <div className="px-3 py-2 border-b border-border mb-2">
                {user ? (
                  <div className="flex items-center space-x-2 text-matrix-primary">
                    <div className="status-online"></div>
                    <span className="text-sm">
                      {profile?.full_name || user.email} 
                      {currentPlan && hasActiveSub && ` (${currentPlan})`}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <div className="status-offline"></div>
                    <span className="text-sm">{authLoading ? 'Loading...' : 'Not signed in'}</span>
                  </div>
                )}
              </div>

              {/* Mobile Navigation Links */}
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors duration-200 ${
                    isCurrentPathActive(item.href)
                      ? 'text-matrix-primary bg-matrix-primary/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              ))}
              
              <Link
                to="/pricing"
                className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors duration-200 ${
                  isCurrentPathActive('/pricing')
                    ? 'text-matrix-primary bg-matrix-primary/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <CreditCard className="w-4 h-4" />
                <span>Pricing</span>
              </Link>
              
              {/* Mobile Auth Actions */}
              {!user && (
                <div className="border-t border-border pt-2 mt-2 space-y-1">
                  <button
                    onClick={() => {
                      openAuthModal('signin');
                      setIsMenuOpen(false);
                    }}
                    disabled={authLoading}
                    className="flex items-center space-x-2 px-3 py-2 w-full text-left rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors duration-200 disabled:opacity-50"
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
                    className="flex items-center space-x-2 px-3 py-2 w-full text-left rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors duration-200 disabled:opacity-50"
                  >
                    <Users className="w-4 h-4" />
                    <span>{authLoading ? 'Loading...' : 'Sign Up'}</span>
                  </button>
                </div>
              )}

              {/* Mobile User Menu Links */}
              {user && (
                <div className="border-t border-border pt-2 mt-2 space-y-1">
                  <Link
                    to="/profile"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center space-x-2 px-3 py-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors duration-200"
                  >
                    <Users className="w-4 h-4" />
                    <span>Profile</span>
                  </Link>
                  <Link
                    to="/dashboard"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center space-x-2 px-3 py-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors duration-200"
                  >
                    <Book className="w-4 h-4" />
                    <span>Dashboard</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="pt-16">
        {children}
      </main>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="container-responsive">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <Link to="/" className="flex items-center mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-matrix-primary to-matrix-secondary rounded-lg flex items-center justify-center">
                <Usb className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground ml-2">MCP4 Everyone</span>
            </Link>
            
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-muted-foreground">
              <Link to="/templates" className="hover:text-foreground transition-colors duration-200">Templates</Link>
              <Link to="/community" className="hover:text-foreground transition-colors duration-200">Community</Link>
              <Link to="/guides" className="hover:text-foreground transition-colors duration-200">Guides</Link>
              <Link to="/pricing" className="hover:text-foreground transition-colors duration-200">Pricing</Link>
              <Link to="/success-stories" className="hover:text-foreground transition-colors duration-200">Success Stories</Link>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-border text-center">
            <p className="text-muted-foreground">
              © 2025 MCP4 Everyone. Empowering everyone to build with AI.
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