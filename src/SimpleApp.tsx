

export default function SimpleApp() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">AI Toologist</h1>
            <nav className="space-x-4">
              <button className="text-gray-700 hover:text-indigo-600">Home</button>
              <button className="text-gray-700 hover:text-indigo-600">Tools</button>
              <button className="text-gray-700 hover:text-indigo-600">Compare</button>
              <button className="text-gray-700 hover:text-indigo-600">News</button>
            </nav>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Discover AI Tools
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Your comprehensive platform for exploring and comparing AI tools
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-2">ChatGPT</h3>
              <p className="text-gray-600">Advanced conversational AI by OpenAI</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-2">Midjourney</h3>
              <p className="text-gray-600">AI-powered image generation</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-2">Claude</h3>
              <p className="text-gray-600">Helpful AI assistant by Anthropic</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}