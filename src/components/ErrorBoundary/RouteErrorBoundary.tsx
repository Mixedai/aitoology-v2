import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';

interface Props {
  children: ReactNode;
  routeName?: string;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class RouteErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(`Route Error in ${this.props.routeName || 'Unknown'}:`, error, errorInfo);
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
    });
    
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  handleGoBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = '/';
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[400px] flex items-center justify-center p-8">
          <div className="text-center space-y-6 max-w-md">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
              <AlertCircle className="w-8 h-8 text-orange-600" />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-gray-900">
                Unable to load this section
              </h2>
              <p className="text-gray-600">
                {this.props.routeName 
                  ? `The ${this.props.routeName} page encountered an error.`
                  : 'This page encountered an error while loading.'}
              </p>
            </div>

            {import.meta.env.DEV && this.state.error && (
              <div className="p-3 bg-red-50 rounded-lg text-left">
                <p className="text-sm text-red-800 font-mono">
                  {this.state.error.message}
                </p>
              </div>
            )}

            <div className="flex gap-3 justify-center">
              <Button
                onClick={this.handleGoBack}
                variant="outline"
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Go Back
              </Button>
              <Button onClick={this.handleReset}>
                Try Again
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}