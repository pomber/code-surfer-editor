import React from "react";

import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/mode/javascript/javascript";

import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";

const options = {
  theme: "material",
  lineNumbers: true,
  mode: "javascript"
};

class CodeEditor extends React.Component {
  render() {
    const { value, onChange } = this.props;
    return (
      <CodeMirror
        options={options}
        value={value}
        onBeforeChange={(editor, data, newValue) => onChange(newValue)}
      />
    );
  }
}

export default CodeEditor;
