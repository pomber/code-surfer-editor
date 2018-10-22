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
    ...this.props.initialState
  };

  change = patch => {
    this.setState(
      prevState => {
        // debugger;
        // let editorCode = undefined;
        // if (patch.code != null) {
        //   editorCode = patch.code;
        //   delete patch.code;
        //   // unstable_scheduleCallback(() =>
        //   //   this.setState(({ prevConfig }) => ({
        //   //     config: { ...prevConfig, code: editorCode }
        //   //   }))
        //   // );
        // }

        // console.log(patch);
        const newConfig = Object.assign({}, prevState, patch);
        if (newConfig.autoHeight) {
          const loc = newConfig.code.split("\n").length;
          const lineHeight = 15.5;
          const extraHeight = 35.5;
          patch.height = Math.ceil(loc * lineHeight + extraHeight);
        }

        return patch;
      },
      () => replace(this.state)
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
        <LeftPanel config={this.state} change={this.change} />
        <RightPanel config={this.state} change={this.change} />
      </div>
    );
  }
}

export default Editor;
