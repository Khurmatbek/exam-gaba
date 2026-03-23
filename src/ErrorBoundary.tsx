/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Props, State } from "./types/types";



export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_error: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.log("Error:", error);
    console.log("Error Info:", errorInfo);

    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong 😢</h1>;
    }

    return this.props.children;
  }
}
