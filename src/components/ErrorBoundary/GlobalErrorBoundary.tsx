import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class GlobalErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo,
    });

    if (typeof window !== 'undefined' && window.localStorage) {
      const errorLog = {
        message: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        timestamp: new Date().toISOString(),
      };
      
      try {
        const existingLogs = JSON.parse(localStorage.getItem('errorLogs') || '[]');
        existingLogs.push(errorLog);
        if (existingLogs.length > 10) existingLogs.shift();
        localStorage.setItem('errorLogs', JSON.stringify(existingLogs));
      } catch (e) {
        console.error('Failed to save error log:', e);
      }
    }
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return <>{this.props.fallback}</>;
      }

      const isDevelopment = import.meta.env.DEV;

      return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
          <Card className="max-w-2xl w-full p-8 shadow-xl">
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center animate-pulse">
                <AlertTriangle className="w-10 h-10 text-red-600" />
              </div>
              
              <div className="space-y-2">
                <h1 className="text-3xl font-bold text-gray-900">
                  Oops! Something went wrong
                </h1>
                <p className="text-gray-600 max-w-md">
                  We encountered an unexpected error. Don't worry, your data is safe. 
                  You can try refreshing the page or return to the home page.
                </p>
              </div>

              {isDevelopment && this.state.error && (
                <div className="w-full mt-6 p-4 bg-gray-100 rounded-lg text-left">
                  <h3 className="font-semibold text-sm text-gray-700 mb-2">
                    Error Details (Development Mode)
                  </h3>
                  <pre className="text-xs text-red-600 overflow-auto max-h-48">
                    {this.state.error.message}
                    {'\n\n'}
                    {this.state.error.stack}
                  </pre>
                  {this.state.errorInfo && (
                    <details className="mt-4">
                      <summary className="text-sm text-gray-600 cursor-pointer hover:text-gray-800">
                        Component Stack
                      </summary>
                      <pre className="text-xs text-gray-600 overflow-auto max-h-48 mt-2">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    </details>
                  )}
                </div>
              )}

              <div className="flex gap-4 pt-4">
                <Button
                  onClick={this.handleReset}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Try Again
                </Button>
                <Button
                  onClick={this.handleGoHome}
                  className="flex items-center gap-2"
                >
                  <Home className="w-4 h-4" />
                  Go to Home
                </Button>
              </div>
            </div>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}