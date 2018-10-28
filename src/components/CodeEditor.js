import React from "react";

import { UnControlled as CodeMirror } from "react-codemirror2";
import "codemirror/mode/javascript/javascript";

import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";

import { createResource } from "./cache";
import withAsyncInput from "../utils/withAsyncInput";

const options = {
  theme: "material",
  lineNumbers: true,
  mode: "javascript"
};

const modeLoader = createResource(async mode => {
  try {
    return await import(`codemirror/mode/${mode}/${mode}`);
  } catch (error) {
    console.error("Error loading CodeMirror mode", error);
    return await import(`codemirror/mode/javascript/javascript`);
  }
});

function CodeEditor(props) {
  const { value, onChange, mode } = props;
  modeLoader.read(mode);
  return (
    <CodeMirror
      detach
      options={{ ...options, mode }}
      value={value}
      onChange={(editor, data, newValue) => onChange(newValue)}
      key={mode}
    />
  );
}

export default withAsyncInput(CodeEditor);
