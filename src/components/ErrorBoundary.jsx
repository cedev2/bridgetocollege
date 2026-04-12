import React from 'react';
import { AlertTriangle, RefreshCcw, Home } from 'lucide-react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("ErrorBoundary caught an error", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-center">
                    <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-10 border border-slate-100">
                        <div className="w-20 h-20 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <AlertTriangle className="w-10 h-10" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-3">Something went wrong</h2>
                        <p className="text-slate-500 mb-8 leading-relaxed">
                            An unexpected error occurred in this part of the application. Please try refreshing or returning home.
                        </p>
                        <div className="flex flex-col gap-3">
                            <button 
                                onClick={() => window.location.reload()} 
                                className="w-full py-4 bg-primary-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-primary-700 transition-all"
                            >
                                <RefreshCcw className="w-5 h-5" /> Refresh Page
                            </button>
                            <a 
                                href="/" 
                                className="w-full py-4 text-slate-600 font-bold hover:bg-slate-50 rounded-2xl transition-all"
                            >
                                Back to Home
                            </a>
                        </div>
                        {import.meta.env.DEV && (
                            <div className="mt-8 p-4 bg-slate-900 rounded-xl text-left overflow-auto max-h-40">
                                <code className="text-xs text-rose-400">{this.state.error?.toString()}</code>
                            </div>
                        )}
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
