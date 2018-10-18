import React from "react";
import "./App.css";
import CodeSurferContainer from "./code-surfer-container";
import { Prism } from "prism-react-renderer";
import Color from "color";

import CodeEditor from "./LazyCodeEditor";

const req = require.context("prism-react-renderer/themes", false, /\.js$/);
const themes = req
  .keys()
  .map(filename => ({ ...req(filename), name: filename.slice(2, -3) }));

const languages = Object.keys(Prism.languages).filter(
  key => typeof Prism.languages[key] !== "function"
);

const InfoIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 1792 1792"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
  >
    <path d="M1152 1376v-160q0-14-9-23t-23-9h-96v-512q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v160q0 14 9 23t23 9h96v320h-96q-14 0-23 9t-9 23v160q0 14 9 23t23 9h448q14 0 23-9t9-23zm-128-896v-160q0-14-9-23t-23-9h-192q-14 0-23 9t-9 23v160q0 14 9 23t23 9h192q14 0 23-9t9-23zm640 416q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z" />
  </svg>
);

function replace() {
  //TODO
}

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
            <label>
              <select
                value={this.state.lang}
                onChange={e =>
                  this.setState({ lang: e.target.value }, () =>
                    replace(this.state)
                  )
                }
              >
                {languages.map(language => (
                  <option value={language} key={language}>
                    {language}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div style={{ flex: 1, overflow: "auto" }}>
            <CodeEditor
              value={this.state.code}
              onChange={code =>
                this.setState({ code }, () => replace(this.state))
              }
            />
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
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
          {/* <div style={{ flex: 1 }} /> */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              width: "100%",
              padding: "10px",
              boxSizing: "border-box"
            }}
          >
            <label>
              Show Numbers:
              <input
                type="checkbox"
                checked={this.state.showNumbers}
                onChange={e =>
                  this.setState({ showNumbers: e.target.checked }, () =>
                    replace(this.state)
                  )
                }
              />
            </label>
            <label>
              Width:
              <input
                type="number"
                value={this.state.width}
                onChange={e =>
                  this.setState({ width: +e.target.value }, () =>
                    replace(this.state)
                  )
                }
              />
            </label>
            <label>
              Height:
              <input
                type="number"
                value={this.state.height}
                onChange={e =>
                  this.setState({ height: +e.target.value }, () =>
                    replace(this.state)
                  )
                }
              />
            </label>
            <label>
              Theme:
              <select
                value={this.state.themeName}
                onChange={e =>
                  this.setState({ themeName: e.target.value }, () =>
                    replace(this.state)
                  )
                }
              >
                {themes.map(theme => (
                  <option value={theme.name} key={theme.name}>
                    {theme.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </div>
    );
  }
}

export default Editor;
