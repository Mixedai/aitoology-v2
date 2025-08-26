import { createRoot } from "react-dom/client";
import React from "react";
import "./index.css";

// Try to load the main App with error boundary
const App = React.lazy(() => import("./App.tsx"));

function ErrorFallback({ error }: { error: Error }) {
  return (
    <div className="min-h-screen bg-red-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Application Error</h1>
        <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
          {error.message}
        </pre>
        <details className="mt-4">
          <summary className="cursor-pointer text-blue-600 hover:underline">Stack Trace</summary>
          <pre className="bg-gray-100 p-4 rounded text-xs mt-2 overflow-auto">
            {error.stack}
          </pre>
        </details>
      </div>
    </div>
  );
}

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("App Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError && this.state.error) {
      return <ErrorFallback error={this.state.error} />;
    }

    return this.props.children;
  }
}

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
    <React.Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl">Loading...</div>
      </div>
    }>
      <App />
    </React.Suspense>
  </ErrorBoundary>
);