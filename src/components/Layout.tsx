import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Book, Play, Zap, Users, Usb, LogIn, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
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
  const location = useLocation();
  const { user, profile, loading } = useAuth();

  const navItems = [
    { name: 'Learn', href: '/learn', icon: Book },
    { name: 'Live Demo', href: '/demo', icon: Play },
    { name: 'Examples', href: '/examples', icon: Zap },
    { name: 'Resources', href: '/resources', icon: Users },
  ];

  const isActive = (path: string) => location.pathname === path;

  const openAuthModal = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  // Show notification when user signs in
  useEffect(() => {
    if (user && profile && !loading) {
      setNotificationMessage(`Welcome back, ${profile.full_name || profile.email}!`);
      setShowNotification(true);
      
      // Hide notification after 4 seconds
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [user, profile, loading]);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Success Notification */}
      {showNotification && (
        <div className="fixed top-20 right-4 z-50 animate-in slide-in-from-right duration-300">
          <div className="bg-green-600/90 backdrop-blur-md border border-green-500/30 rounded-lg p-4 shadow-lg max-w-sm">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-200 flex-shrink-0" />
              <p className="text-green-100 font-medium">{notificationMessage}</p>
              <button
                onClick={() => setShowNotification(false)}
                className="text-green-200 hover:text-white transition-colors duration-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Usb className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">MCP Academy</span>
              <span className="text-sm text-blue-300 bg-blue-500/20 px-2 py-1 rounded-full">For Non-Developers</span>
            </Link>
            
            <div className="hidden md:block">
              <div className="flex items-center space-x-8">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-1 transition-colors duration-200 ${
                      isActive(item.href)
                        ? 'text-blue-400'
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {!loading && (
                user ? (
                  <UserMenu />
                ) : (
                  <div className="hidden md:flex items-center space-x-3">
                    <button
                      onClick={() => openAuthModal('signin')}
                      className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center space-x-1"
                    >
                      <LogIn className="w-4 h-4" />
                      <span>Sign In</span>
                    </button>
                    <button
                      onClick={() => openAuthModal('signup')}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200"
                    >
                      Sign Up
                    </button>
                  </div>
                )
              )}

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden text-white"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/40 backdrop-blur-md border-t border-white/10">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 transition-colors duration-200 ${
                    isActive(item.href)
                      ? 'text-blue-400'
                      : 'text-gray-300 hover:text-white'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              ))}
              
              {!loading && !user && (
                <div className="border-t border-white/10 pt-2 mt-2">
                  <button
                    onClick={() => {
                      openAuthModal('signin');
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 px-3 py-2 text-gray-300 hover:text-white transition-colors duration-200 w-full"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Sign In</span>
                  </button>
                  <button
                    onClick={() => {
                      openAuthModal('signup');
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 px-3 py-2 text-gray-300 hover:text-white transition-colors duration-200 w-full"
                  >
                    <Users className="w-4 h-4" />
                    <span>Sign Up</span>
                  </button>
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
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <Link to="/" className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Usb className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">MCP Academy</span>
              <span className="text-sm text-blue-300">For Non-Developers</span>
            </Link>
            
            <div className="flex space-x-6 text-gray-300">
              <Link to="/talk-resources" className="hover:text-white transition-colors duration-200">Talk Resources</Link>
              <Link to="/templates" className="hover:text-white transition-colors duration-200">Templates</Link>
              <Link to="/community" className="hover:text-white transition-colors duration-200">Community</Link>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-white/10 text-center">
            <p className="text-gray-400">
              © 2025 MCP Academy. Empowering non-developers to build with AI. 
              <span className="text-blue-400 ml-2">Supporting "The Missing Link" talk</span>
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