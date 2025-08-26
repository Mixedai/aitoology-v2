import React from 'react';

export function SimpleNavbar({ onNavigate }: { onNavigate?: any }) {
  const handleNavigation = (e: React.MouseEvent, target: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('🔴 SimpleNavbar: Button clicked!', target);
    console.log('🟡 SimpleNavbar: Navigation attempt to:', target);
    console.log('🔵 SimpleNavbar: Debug - onNavigate exists?', !!onNavigate);
    
    if (onNavigate) {
      console.log('🟢 SimpleNavbar: Calling onNavigate with:', 'navbar', target);
      try {
        onNavigate('navbar', target);
        console.log('✅ SimpleNavbar: onNavigate called successfully');
      } catch (error) {
        console.error('❌ SimpleNavbar: Error calling onNavigate:', error);
      }
    } else {
      console.log('❌ SimpleNavbar: onNavigate is not defined!');
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 h-16 bg-blue-600 text-white z-50 shadow-lg">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <div className="flex items-center gap-8">
          <button 
            type="button"
            onClick={(e) => handleNavigation(e, 'modern-home')}
            className="text-xl font-bold hover:text-blue-200 transition-colors cursor-pointer"
          >
            AI Toologist
          </button>
          <nav className="flex items-center gap-6">
            <button 
              type="button"
              onClick={(e) => handleNavigation(e, 'modern-home')}
              className="hover:text-blue-200 transition-colors cursor-pointer"
            >
              Home
            </button>
            <button 
              type="button"
              onClick={(e) => handleNavigation(e, 'explore-frame')}
              className="hover:text-blue-200 transition-colors cursor-pointer"
            >
              Tools
            </button>
            <button 
              type="button"
              onClick={(e) => handleNavigation(e, 'tutorials-frame')}
              className="hover:text-blue-200 transition-colors cursor-pointer"
            >
              Learning
            </button>
            <button 
              type="button"
              onClick={(e) => handleNavigation(e, 'news')}
              className="hover:text-blue-200 transition-colors cursor-pointer"
            >
              News
            </button>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            type="button"
            onClick={(e) => handleNavigation(e, 'sign-in')}
            className="px-4 py-2 bg-white text-blue-600 rounded-md hover:bg-blue-50 transition-colors cursor-pointer"
          >
            Sign In
          </button>
          <button 
            type="button"
            onClick={(e) => handleNavigation(e, 'auth')}
            className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition-colors cursor-pointer"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}