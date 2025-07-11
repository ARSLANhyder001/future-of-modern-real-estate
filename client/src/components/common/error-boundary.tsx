import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error; resetError: () => void }>;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({ error, errorInfo });
    
    // Log to external service in production
    if (process.env.NODE_ENV === 'production') {
      // TODO: Send to error reporting service
      console.error('Production error:', { error, errorInfo });
    }
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return <this.props.fallback error={this.state.error!} resetError={this.resetError} />;
      }

      return <DefaultErrorFallback error={this.state.error!} resetError={this.resetError} />;
    }

    return this.props.children;
  }
}

function DefaultErrorFallback({ error, resetError }: { error: Error; resetError: () => void }) {
  const handleGoHome = () => {
    window.location.href = '/';
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy via-background to-card flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <Card className="glass-card border-neon-cyan/20">
          <CardHeader className="text-center">
            <motion.div
              className="mx-auto mb-4 w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <AlertTriangle className="w-8 h-8 text-red-400" />
            </motion.div>
            <CardTitle className="font-orbitron text-2xl text-red-400 mb-2">
              Oops! Something went wrong
            </CardTitle>
            <p className="text-gray-400">
              We encountered an unexpected error. Our team has been notified.
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {process.env.NODE_ENV === 'development' && (
              <div className="bg-red-950/20 border border-red-500/20 rounded-lg p-4">
                <h4 className="font-semibold text-red-400 mb-2">Error Details (Development)</h4>
                <pre className="text-xs text-red-300 overflow-auto max-h-32">
                  {error.message}
                </pre>
                {error.stack && (
                  <details className="mt-2">
                    <summary className="text-red-400 cursor-pointer text-sm">Stack Trace</summary>
                    <pre className="text-xs text-red-300 overflow-auto max-h-32 mt-2">
                      {error.stack}
                    </pre>
                  </details>
                )}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={resetError}
                className="bg-neon-cyan hover:bg-neon-cyan/80 text-navy font-semibold"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
              
              <Button
                onClick={handleGoBack}
                variant="outline"
                className="border-electric-violet text-electric-violet hover:bg-electric-violet/10"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
              </Button>
              
              <Button
                onClick={handleGoHome}
                variant="outline"
                className="border-light-mint text-light-mint hover:bg-light-mint/10"
              >
                <Home className="w-4 h-4 mr-2" />
                Go Home
              </Button>
            </div>

            <div className="text-center text-sm text-gray-500">
              <p>If this problem persists, please contact our support team.</p>
              <p className="mt-1">Error ID: {Date.now().toString(36)}</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

export default ErrorBoundary; 