import React from "react";
import "./App.css";
import CodeSurferContainer from "./code-surfer-container";
import Color from "color";
import { InfoIcon, GitHubIcon, TwitterIcon, MediumIcon } from "./icons";
import CodeEditor from "./LazyCodeEditor";
import LanguagePicker from "./LanguagePicker";
import { encode } from "./state-parser";
import ShareButton from "./ShareButton";

const req = require.context("prism-react-renderer/themes", false, /\.js$/);
const themes = req
  .keys()
  .map(filename => ({ ...req(filename), name: filename.slice(2, -3) }));

function replace(state) {
  const url = new URL(window.location);
  url.pathname = encode(state);
  window.history.replaceState(null, null, url);
}

const RightOptions = ({ state, change }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      width: "100%",
      padding: "0 10px",
      height: "39.5px",
      boxSizing: "border-box"
    }}
  >
    <label>
      <input
        type="checkbox"
        checked={state.showNumbers}
        onChange={e => change({ showNumbers: e.target.checked })}
      />
      Line Numbers
    </label>
    <label>
      Width:
      <input
        type="number"
        style={{ width: "60px" }}
        value={state.width}
        step="10"
        onChange={e => change({ width: +e.target.value })}
      />
    </label>
    <label>
      <input
        type="checkbox"
        checked={!state.autoHeight}
        onChange={e => change({ autoHeight: !e.target.checked })}
      />
      Height:
      <input
        type="number"
        style={{ width: "60px" }}
        value={state.height}
        step="10"
        disabled={state.autoHeight}
        onChange={e => change({ height: +e.target.value })}
      />
    </label>
    <label>
      Theme:
      <select
        value={state.themeName}
        onChange={e => change({ themeName: e.target.value })}
      >
        {themes.map(theme => (
          <option value={theme.name} key={theme.name}>
            {theme.name}
          </option>
        ))}
      </select>
    </label>
    <ShareButton state={state} />
  </div>
);

class Editor extends React.Component {
  state = this.props.initialState;
  change = patch => {
    this.setState(
      prevState => {
        const newState = Object.assign({}, prevState, patch);
        if (newState.autoHeight) {
          const loc = newState.code.split("\n").length;
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
    const change = this.change;
    const theme = themes.find(theme => theme.name === this.state.themeName);
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
        <div
          style={{
            flex: 1,
            display: "flex",
            // display: "none",
            maxWidth: "625px",
            height: "100%",
            flexDirection: "column"
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <h2 style={{ flex: 1, margin: "6px" }}>Code</h2>
            <LanguagePicker
              value={this.state.lang}
              onChange={lang => change({ lang })}
            />
          </div>
          <div style={{ flex: 1, overflow: "auto" }}>
            <CodeEditor
              value={this.state.code}
              onChange={code => change({ code })}
            />
          </div>
          <div
            style={{
              height: "34px",
              display: "flex",
              alignItems: "center"
            }}
          >
            <h3 style={{ flex: 1, margin: "6px" }}>Steps</h3>
            <InfoIcon />
          </div>
          <div style={{ height: "160px", overflow: "auto" }}>
            <CodeEditor
              value={this.state.steps}
              onChange={steps => change({ steps })}
            />
          </div>
        </div>
        <div
          style={{
            flex: 1,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <RightOptions state={this.state} change={change} />
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "8px",
              width: "100%",
              boxSizing: "border-box",
              overflow: "auto"
            }}
          >
            <div
              style={{
                boxShadow: "rgba(0, 0, 0, 0.12) 0px 6px 5px 0px",
                zIndex: 10,
                maxHeight: this.state.height,
                height: "100%",
                width: "100%",
                maxWidth: this.state.width
              }}
            >
              <CodeSurferContainer
                code={this.state.code}
                showNumbers={this.state.showNumbers}
                lang={this.state.lang}
                theme={theme}
                key={theme.name}
                steps={this.state.steps}
              />
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              bottom: 5,
              right: 5,
              color: Color("rgba(233, 237, 237, 1)").fade(0.4)
            }}
          >
            <a
              href="https://github.com/pomber/code-surfer-studio"
              style={{ color: "unset" }}
            >
              <GitHubIcon
                title="CodeSurfer GitHub"
                style={{ padding: "4px", cursor: "pointer" }}
              />
            </a>
            <MediumIcon style={{ padding: "4px", cursor: "pointer" }} />

            <a href="https://twitter.com/pomber" style={{ color: "unset" }}>
              <TwitterIcon
                title="@pomber twitter"
                style={{ padding: "4px", cursor: "pointer" }}
              />
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Editor;
