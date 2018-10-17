import LZString from "lz-string";
import React from "react";
import "./App.css";
import CodeSurferContainer from "./code-surfer-container";
import { Prism } from "prism-react-renderer";
import Color from "color";
// import CodeMirror from "react-codemirror";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/mode/javascript/javascript";

import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";

let options = {
  theme: "material",
  lineNumbers: true,
  mode: "javascript"
};

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

function hash(state) {
  return LZString.compressToEncodedURIComponent(JSON.stringify(state));
}

function read() {
  const hash = window.document.location.hash.slice(1);
  if (!hash) {
    return null;
  }

  // backwards support for old json encoded URIComponent
  const decode =
    hash.indexOf("%7B%22") !== -1
      ? decodeURIComponent
      : LZString.decompressFromEncodedURIComponent;

  try {
    return JSON.parse(decode(hash));
  } catch (_) {
    return null;
  }
}

function replace(state) {
  const hash = LZString.compressToEncodedURIComponent(JSON.stringify(state));
  if (
    typeof URL === "function" &&
    typeof window.history === "object" &&
    typeof window.history.replaceState === "function"
  ) {
    const url = new URL(window.location);
    url.hash = hash;
    window.history.replaceState(null, null, url);
  } else {
    window.location.hash = hash;
  }
}

const defaultCode = `const ENOUGH_TIME = 1; // milliseconds

let workQueue = [];
let nextUnitOfWork = null;

function schedule(task) {
  workQueue.push(task);
  requestIdleCallback(performWork);
}

function performWork(deadline) {
  if (!nextUnitOfWork) {
    nextUnitOfWork = workQueue.shift();
  }

  while (nextUnitOfWork && deadline.timeRemaining() > ENOUGH_TIME) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }

  if (nextUnitOfWork || workQueue.length > 0) {
    requestIdleCallback(performWork);
  }
}`;

const defaultSteps = `* > all
4[1:3, 6:9] > Tokens
9, 12 > lines
2:5 > range`;

class Editor extends React.Component {
  state = read() || {
    code: defaultCode,
    showNumbers: false,
    lang: "jsx",
    themeName: "vsDarkPlus",
    steps: defaultSteps,
    width: 700,
    height: 500
  };
  render() {
    console.log(this.state);
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
            <CodeMirror
              value={this.state.code}
              onBeforeChange={(editor, data, code) =>
                this.setState({ code }, () => replace(this.state))
              }
              options={options}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <h3 style={{ flex: 1, margin: "6px" }}>Steps</h3>
            <InfoIcon />
          </div>
          <div style={{ height: "160px", overflow: "auto" }}>
            <CodeMirror
              options={{ ...options, lineNumbers: true }}
              value={this.state.steps}
              onBeforeChange={(editor, data, steps) =>
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
          <div style={{ flex: 1 }} />
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
          <div style={{ flex: 1 }} />
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
