import React from "react";
import LanguagePicker from "./LanguagePicker";
import CodeEditor from "./LazyCodeEditor";
import { InfoIcon } from "./icons";

const LeftPanel = ({ config, change }) => (
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
      <LanguagePicker value={config.lang} onChange={lang => change({ lang })} />
    </div>
    <div style={{ flex: 1, overflow: "auto" }}>
      <CodeEditor
        value={config.code}
        onChange={code => {
          change({ code });
        }}
        mode={config.lang}
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
        value={config.steps}
        onChange={steps => change({ steps })}
        mode="javascript"
      />
    </div>
  </div>
);

export default LeftPanel;
