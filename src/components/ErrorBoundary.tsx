import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log to external service in production instead of console
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }
    this.setState({ errorInfo });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-8">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-red-100 dark:bg-red-900/30">
              <span className="material-symbols-outlined text-4xl text-red-600 dark:text-red-400">
                error
              </span>
            </div>
            
            <h2 className="text-2xl font-bold text-center text-slate-900 dark:text-white mb-3">
              Something went wrong
            </h2>
            
            <p className="text-sm text-center text-slate-600 dark:text-slate-400 mb-6">
              We're sorry, but something unexpected happened. Please try refreshing the page.
            </p>

            {this.state.error && (
              <div className="mb-6 p-4 bg-slate-100 dark:bg-slate-900 rounded-xl">
                <p className="text-xs font-mono text-red-600 dark:text-red-400 break-all">
                  {this.state.error.toString()}
                </p>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => window.location.reload()}
                className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all"
              >
                Refresh Page
              </button>
              <button
                onClick={this.handleReset}
                className="flex-1 py-3 px-4 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-900 dark:text-white rounded-xl font-medium transition-all"
              >
                Try Again
              </button>
            </div>

            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-500">
              <span className="material-symbols-outlined text-[16px]">
                info
              </span>
              <span>Error ID: {Date.now().toString(36)}</span>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}