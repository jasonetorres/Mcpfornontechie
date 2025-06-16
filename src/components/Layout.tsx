import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Book, Play, Zap, Users, Usb } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Learn', href: '/learn', icon: Book },
    { name: 'Live Demo', href: '/demo', icon: Play },
    { name: 'Examples', href: '/examples', icon: Zap },
    { name: 'Resources', href: '/resources', icon: Users },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
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

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
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
    </div>
  );
}

export default Layout;