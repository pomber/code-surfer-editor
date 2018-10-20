import React from "react";
import "./App.css";
import Color from "color";
import { encode } from "./state-parser";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";

function replace(state) {
  const url = new URL(window.location);
  url.pathname = encode(state);
  window.history.replaceState(null, null, url);
}

class Editor extends React.Component {
  state = {
    config: this.props.initialState
    // editorCode: this.props.initialState.code,
    // editorSteps: this.props.initialState.steps
  };

  change = patch => {
    this.setState(
      prevState => {
        const newConfig = Object.assign({}, prevState.config, patch);
        if (newConfig.autoHeight) {
          const loc = newConfig.code.split("\n").length;
          const lineHeight = 15.5;
          const extraHeight = 35.5;
          newConfig.height = Math.ceil(loc * lineHeight + extraHeight);
        }
        return { config: newConfig };
      },
      () => replace(this.state.config)
    );
  };

  render() {
    return (
      <div
        style={{
          display: "flex",
          height: "100%",
          background: `linear-gradient(${Color("#263238").fade(0.06)}, ${Color(
            "#263238"
          ).fade(0.02)})`,
          color: "rgba(233, 237, 237, 1)"
        }}
      >
        <LeftPanel config={this.state.config} change={this.change} />
        <RightPanel config={this.state.config} change={this.change} />
      </div>
    );
  }
}

export default Editor;
