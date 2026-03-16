'use client';

import { Component, type ReactNode, type ErrorInfo } from 'react';
import * as stylex from '@stylexjs/stylex';
import WuxiaIcon from '@/components/WuxiaIcons';
import { asyncStateStyles } from '@/components/shared/AsyncState.stylex';
import { useTranslation } from '@/lib/i18n/context';
import { uiStyles } from '@/components/shared/Ui.stylex';

interface ErrorFallbackProps {
  error: Error | null;
  onRetry: () => void;
}

function ErrorFallback({ error, onRetry }: ErrorFallbackProps) {
  const { t } = useTranslation();

  return (
    <div {...stylex.props(asyncStateStyles.section)}>
      <div {...stylex.props(asyncStateStyles.container)}>
        <div {...stylex.props(asyncStateStyles.centerStack)}>
          <div {...stylex.props(asyncStateStyles.iconWrap)}>
            <div {...stylex.props(asyncStateStyles.errorIconSurface)}>
              <WuxiaIcon name="alertTriangle" className="w-7 h-7 text-red-400" />
            </div>
          </div>
          <h3 {...stylex.props(asyncStateStyles.errorTitle)}>{t.errors.somethingWrong}</h3>
          <p {...stylex.props(asyncStateStyles.errorText)}>
            {error?.message || t.errors.unknown}
          </p>
          <button onClick={onRetry} {...stylex.props(uiStyles.buttonBase, uiStyles.buttonPrimary)}>
            <WuxiaIcon name="redo" className="inline-block w-5 h-5 mr-2 align-text-bottom" />
            {t.errors.tryAgain}
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
