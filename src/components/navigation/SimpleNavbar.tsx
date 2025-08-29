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

  return null; // SimpleNavbar disabled - NewModernHome has its own navbar
}