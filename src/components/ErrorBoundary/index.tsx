import React from "react";

class ErrorBoundary extends React.Component<any, { hasError: boolean, error?, errorInfo? }> {
    constructor(props) {
        super(props);
        this.state = {hasError: false};
    }

    static getDerivedStateFromError() {
        return {hasError: true};
    }

    componentDidCatch(error, info) {
        this.setState({
            error: error,
            errorInfo: info
        })
    }

    render() {
        if (this.state.hasError) {
            return <div role="alert">
                <h1>Something went wrong:</h1>
                <details style={{whiteSpace: 'pre-wrap'}}>
                    {this.state?.error?.toString()}
                    <br/>
                    {this.state?.errorInfo?.componentStack}
                </details>
            </div>
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
