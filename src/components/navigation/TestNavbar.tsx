

export function TestNavbar() {
  const handleClick = (page: string) => {
    console.log('Button clicked:', page);
    alert(`You clicked: ${page}`);
    
    // Try to directly manipulate the URL for testing
    window.location.hash = `#${page}`;
  };

  return (
    <div className="fixed top-0 left-0 right-0 h-16 bg-green-600 text-white z-50 shadow-lg">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <button 
          onClick={() => handleClick('home')}
          className="text-xl font-bold hover:text-green-200"
        >
          TEST NAV
        </button>
        
        <div className="flex gap-4">
          <button 
            onClick={() => handleClick('tools')}
            className="px-4 py-2 bg-white text-green-600 rounded hover:bg-green-50"
          >
            Tools Page
          </button>
          <button 
            onClick={() => handleClick('news')}
            className="px-4 py-2 bg-white text-green-600 rounded hover:bg-green-50"
          >
            News Page
          </button>
        </div>
      </div>
    </div>
  );
}