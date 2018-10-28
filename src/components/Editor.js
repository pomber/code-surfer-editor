import React from "react";
import Color from "color";
import { encode } from "../utils/state-parser";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";
import { useEditorState } from "./editor-state";
import { useReplaceUrlPath } from "../utils/hooks";

function Editor({ initialState }) {
  const [config, change] = useEditorState(initialState);
  useReplaceUrlPath(encode(config));
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
      <LeftPanel config={config} change={change} />
      <RightPanel config={config} change={change} />
    </div>
  );
}

export default Editor;
