import React from "react";

type Props = {
  children: React.ReactNode;
};

class ErrorBoundary extends React.Component<Props> {
  state = { hasError: false };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("❌ Uncaught error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h1>⚠️ 에러가 발생했습니다. 나중에 다시 시도해주세요.</h1>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;