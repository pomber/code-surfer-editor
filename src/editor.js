import React from "react";
import "./App.css";
import CodeSurferContainer from "./code-surfer-container";
import Color from "color";
import { InfoIcon, GitHubIcon, TwitterIcon, MediumIcon } from "./icons";
import CodeEditor from "./LazyCodeEditor";
import LanguagePicker from "./LanguagePicker";

const req = require.context("prism-react-renderer/themes", false, /\.js$/);
const themes = req
  .keys()
  .map(filename => ({ ...req(filename), name: filename.slice(2, -3) }));

function replace() {
  //TODO
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
      Height:
      <input
        type="number"
        style={{ width: "60px" }}
        value={state.height}
        step="10"
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
    <button>Share</button>
  </div>
);

class Editor extends React.Component {
  state = this.props.initialState;
  render() {
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
            maxWidth: "625px",
            height: "100%",
            display: "flex",
            flexDirection: "column"
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <h2 style={{ flex: 1, margin: "6px" }}>Code</h2>
            <LanguagePicker
              value={this.state.lang}
              onChange={lang => this.setState({ lang })}
            />
          </div>
          <div style={{ flex: 1, overflow: "auto" }}>
            <CodeEditor
              value={this.state.code}
              onChange={code =>
                this.setState({ code }, () => replace(this.state))
              }
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
              onChange={steps =>
                this.setState({ steps }, () => replace(this.state))
              }
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
          <RightOptions
            state={this.state}
            change={updater => this.setState(updater)}
          />
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "8px",
              width: "100%",
              boxSizing: "border-box"
            }}
          >
            <CodeSurferContainer
              code={this.state.code}
              showNumbers={this.state.showNumbers}
              lang={this.state.lang}
              theme={theme}
              key={theme.name}
              steps={this.state.steps}
              width={this.state.width}
              height={this.state.height}
            />
          </div>
          <div
            style={{
              position: "absolute",
              bottom: 5,
              right: 5,
              color: Color("rgba(233, 237, 237, 1)").fade(0.4)
            }}
          >
            <GitHubIcon
              title="CodeSurfer GitHub"
              style={{ padding: "4px", cursor: "pointer" }}
            />
            <MediumIcon style={{ padding: "4px", cursor: "pointer" }} />
            <TwitterIcon
              title="@pomber twitter"
              style={{ padding: "4px", cursor: "pointer" }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Editor;
