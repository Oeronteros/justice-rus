'use client';

import { Component, type ReactNode, type ErrorInfo } from 'react';
import WuxiaIcon from '@/components/WuxiaIcons';

interface ErrorFallbackProps {
  error: Error | null;
  onRetry: () => void;
}

function ErrorFallback({ error, onRetry }: ErrorFallbackProps) {
  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center py-12">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-red-900/30 rounded-full flex items-center justify-center">
              <WuxiaIcon name="alertTriangle" className="w-7 h-7 text-red-400" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-red-400 mb-2">Что-то пошло не так</h3>
          <p className="text-gray-400 mb-6 max-w-md mx-auto">
            {error?.message || 'Произошла непредвиденная ошибка'}
          </p>
          <button onClick={onRetry} className="btn-primary">
            <WuxiaIcon name="redo" className="inline-block w-5 h-5 mr-2 align-text-bottom" />
            Попробовать снова
          </button>
        </div>
      </div>
    </div>
  );
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <ErrorFallback 
          error={this.state.error} 
          onRetry={this.handleRetry} 
        />
      );
    }
    return this.props.children;
  }
}

export { ErrorFallback };
