import React from "react";

export default function withAsyncInput(Component) {
  return class extends React.Component {
    render() {
      return <Component {...this.props} />;
    }
  };
}
