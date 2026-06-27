import React from 'react';

interface State { hasError: boolean; message: string; }

export default class ErrorBoundary extends React.Component<
    { children: React.ReactNode },
    State
> {
    constructor(props: { children: React.ReactNode }) {
        super(props);
        this.state = { hasError: false, message: '' };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, message: error.message };
    }

    componentDidCatch(error: Error, info: React.ErrorInfo) {
        console.error('Canvas error boundary caught:', error, info);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="flex items-center justify-center h-full w-full bg-[#FAF7F2]">
                    <div className="text-center p-8 max-w-sm">
                        <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M12 3a9 9 0 110 18A9 9 0 0112 3z" />
                            </svg>
                        </div>
                        <p className="font-bold text-slate-800 text-base">Something went wrong</p>
                        <p className="text-sm text-slate-400 mt-1 mb-5">{this.state.message}</p>
                        <button
                            onClick={() => this.setState({ hasError: false, message: '' })}
                            className="px-5 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 active:scale-95 transition-all"
                        >
                            Retry
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
