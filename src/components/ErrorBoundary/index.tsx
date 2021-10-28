import React, { ErrorInfo, ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
    errorInfo?: ErrorInfo;
}

class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    public static getDerivedStateFromError(): State {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        this.setState({
            error: error,
            errorInfo,
        });
        console.error('Uncaught error:', error, errorInfo);
    }

    public render(): JSX.Element | ReactNode {
        if (this.state.hasError) {
            return (
                <div role="alert">
                    <h1>Something went wrong:</h1>
                    <details style={{ whiteSpace: 'pre-wrap' }}>
                        {this.state?.error?.toString()}
                        <br />
                        {this.state?.errorInfo?.componentStack}
                    </details>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
