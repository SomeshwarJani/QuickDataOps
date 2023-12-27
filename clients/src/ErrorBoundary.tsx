import React, { ErrorInfo, ReactNode } from "react";
import { toast } from "react-toastify";
import { MESSAGES } from "./messages";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <p>
          {toast.error(MESSAGES.initialErrorMsg, {
            position: toast.POSITION.TOP_RIGHT,
          })}
        </p>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
