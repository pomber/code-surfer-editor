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

const modeLoader = createResource(mode =>
  import(`codemirror/mode/${mode}/${mode}`)
);

class CodeEditor extends React.Component {
  render() {
    const { value, onChange, mode } = this.props;
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
}

export default withAsyncInput(CodeEditor);