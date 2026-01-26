import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log to error reporting service in production
    if (import.meta.env.PROD) {
      // Could integrate with Sentry, LogRocket, etc.
      // For now, just suppress in production
    } else {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className='flex flex-col items-center justify-center min-h-[50vh] p-8'>
          <div className='text-center max-w-md'>
            <h2 className='text-2xl font-bold text-gray-800 mb-4'>Something went wrong</h2>
            <p className='text-gray-600 mb-6'>
              We&apos;re sorry, but something unexpected happened. Please try refreshing the page.
            </p>
            <div className='flex gap-4 justify-center'>
              <button
                onClick={() => window.location.reload()}
                className='px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
              >
                Refresh Page
              </button>
              <button
                onClick={this.handleReset}
                className='px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors'
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
