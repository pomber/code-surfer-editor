import React from "react";
import { unstable_scheduleCallback, unstable_cancelCallback } from "scheduler";

export default function withAsyncInput(Component) {
  return class extends React.Component {
    state = {
      inputValue: this.props.value
    };

    constructor(props) {
      super(props);
      this.onInputChange = this.onInputChange.bind(this);
    }

    onInputChange(newValue) {
      const { onChange } = this.props;
      if (this.state.lastCallback) {
        unstable_cancelCallback(this.state.lastCallback);
      }
      const callback = unstable_scheduleCallback(() => {
        onChange(newValue);
      });
      this.setState({
        inputValue: newValue,
        lastCallback: callback
      });
    }

    render() {
      const { value, onChange, ...rest } = this.props;
      return (
        <Component
          {...rest}
          onChange={this.onInputChange}
          value={this.state.inputValue}
        />
      );
    }
  };
}
