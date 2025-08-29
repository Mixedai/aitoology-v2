import { useEffect, useState } from 'react';

interface SecretAdminAccessProps {
  onNavigate: (screenId: string) => void;
  currentPath?: string;
}

// Customize your secret access methods here
const SECRET_PATTERNS = {
  // Method 1: Konami Code (↑↑↓↓←→←→BA)
  konami: ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'],
  
  // Method 2: Type secret word
  keyword: 'aitoologistadmin',
  
  // Method 3: URL hash patterns
  urlHashes: ['#admin-2024-secret', '#aitoologist-admin', '#secure-admin-portal'],
  
  // Method 4: Triple click on a specific corner (bottom-right)
  cornerClick: { x: 0.95, y: 0.95, clicks: 3, timeout: 1000 }
};

export function SecretAdminAccess({ onNavigate }: SecretAdminAccessProps) {
  const [konamiIndex, setKonamiIndex] = useState(0);
  const [keySequence, setKeySequence] = useState('');
  const [cornerClicks, setCornerClicks] = useState(0);
  
  useEffect(() => {
    let keyTimer: NodeJS.Timeout;
    let clickTimer: NodeJS.Timeout;

    // Method 1: Konami Code handler
    const handleKonamiKey = (e: KeyboardEvent) => {
      const key = e.key;
      const expectedKey = SECRET_PATTERNS.konami[konamiIndex];
      
      if (key === expectedKey) {
        const newIndex = konamiIndex + 1;
        setKonamiIndex(newIndex);
        
        if (newIndex === SECRET_PATTERNS.konami.length) {
          console.log('🎮 Konami code activated!');
          onNavigate('admin-login');
          setKonamiIndex(0);
        }
      } else if (SECRET_PATTERNS.konami.includes(key)) {
        setKonamiIndex(key === SECRET_PATTERNS.konami[0] ? 1 : 0);
      }
    };

    // Method 2: Secret keyword handler
    const handleKeyPress = (e: KeyboardEvent) => {
      const newSequence = keySequence + e.key.toLowerCase();
      setKeySequence(newSequence);
      
      // Reset after 3 seconds of no typing
      clearTimeout(keyTimer);
      keyTimer = setTimeout(() => {
        setKeySequence('');
      }, 3000);

      // Check for secret keyword
      if (newSequence.includes(SECRET_PATTERNS.keyword)) {
        console.log('🔐 Secret keyword activated!');
        onNavigate('admin-login');
        setKeySequence('');
      }
    };

    // Method 3: URL hash checker
    const checkUrlHash = () => {
      const hash = window.location.hash;
      if (SECRET_PATTERNS.urlHashes.includes(hash)) {
        console.log('🔗 Secret URL activated!');
        onNavigate('admin-login');
        // Clear the hash to hide the access point
        window.location.hash = '';
      }
    };

    // Method 4: Corner click handler
    const handleCornerClick = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      
      // Check if click is in bottom-right corner
      if (x >= SECRET_PATTERNS.cornerClick.x && y >= SECRET_PATTERNS.cornerClick.y) {
        const newClicks = cornerClicks + 1;
        setCornerClicks(newClicks);
        
        // Reset after timeout
        clearTimeout(clickTimer);
        clickTimer = setTimeout(() => {
          setCornerClicks(0);
        }, SECRET_PATTERNS.cornerClick.timeout);
        
        if (newClicks >= SECRET_PATTERNS.cornerClick.clicks) {
          console.log('🖱️ Corner clicks activated!');
          onNavigate('admin-login');
          setCornerClicks(0);
        }
      } else {
        setCornerClicks(0);
      }
    };

    // Attach event listeners
    window.addEventListener('keydown', handleKonamiKey);
    window.addEventListener('keypress', handleKeyPress);
    window.addEventListener('hashchange', checkUrlHash);
    window.addEventListener('click', handleCornerClick);
    
    // Check URL hash on mount
    checkUrlHash();

    return () => {
      window.removeEventListener('keydown', handleKonamiKey);
      window.removeEventListener('keypress', handleKeyPress);
      window.removeEventListener('hashchange', checkUrlHash);
      window.removeEventListener('click', handleCornerClick);
      clearTimeout(keyTimer);
      clearTimeout(clickTimer);
    };
  }, [onNavigate, konamiIndex, keySequence, cornerClicks]);

  // Visual indicator for corner clicks (optional - remove for complete stealth)
  return (
    <>
      {cornerClicks > 0 && (
        <div 
          className="fixed bottom-4 right-4 w-2 h-2 bg-purple-500 rounded-full opacity-20 pointer-events-none animate-ping"
          style={{ animationDuration: '0.5s' }}
        />
      )}
    </>
  );
}