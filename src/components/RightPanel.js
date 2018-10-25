import React from "react";
import CodeSurferContainer from "./CodeSurferContainer";
import { InfoIcon, GitHubIcon, TwitterIcon, MediumIcon } from "./icons";
import ShareButton from "./ShareButton";
import Color from "color";

const req = require.context("prism-react-renderer/themes", false, /\.js$/);
const themes = req
  .keys()
  .map(filename => ({ ...req(filename), name: filename.slice(2, -3) }));

const RightOptions = ({ config, change }) => (
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
        checked={config.showNumbers}
        onChange={e => change({ showNumbers: e.target.checked })}
      />
      Line Numbers
    </label>
    <label>
      Width:
      <input
        type="number"
        style={{ width: "60px" }}
        value={config.width}
        step="10"
        onChange={e => change({ width: +e.target.value })}
      />
    </label>
    <label>
      <input
        type="checkbox"
        checked={!config.autoHeight}
        onChange={e => change({ autoHeight: !e.target.checked })}
      />
      Height:
      <input
        type="number"
        style={{ width: "60px" }}
        value={config.height}
        step="10"
        disabled={config.autoHeight}
        onChange={e => change({ height: +e.target.value })}
      />
    </label>
    <label>
      Theme:
      <select
        value={config.themeName}
        onChange={e => change({ themeName: e.target.value })}
      >
        {themes.map(theme => (
          <option value={theme.name} key={theme.name}>
            {theme.name}
          </option>
        ))}
      </select>
    </label>
    <ShareButton config={config} />
  </div>
);

const RightPanel = ({ config, change }) => {
  const theme = themes.find(theme => theme.name === config.themeName);
  return (
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
      <RightOptions config={config} change={change} />
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
            maxHeight: config.height,
            height: "100%",
            width: "100%",
            maxWidth: config.width
          }}
        >
          <CodeSurferContainer
            code={config.code}
            showNumbers={config.showNumbers}
            lang={config.lang}
            theme={theme}
            key={theme.name}
            steps={config.steps}
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
          href="https://github.com/pomber/code-surfer-editor"
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
  );
};

export default RightPanel;
