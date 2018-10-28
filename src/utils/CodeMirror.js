import React, { useEffect, useRef } from "react";

import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/javascript/javascript";
import codemirror from "codemirror";

// import { unstable_createResource as createResource } from "react-cache";

async function loadMode(mode) {
  try {
    await import(`codemirror/mode/${mode}/${mode}`);
    return mode;
  } catch (error) {
    console.error("Error loading CodeMirror mode", error);
    await import(`codemirror/mode/javascript/javascript`);
    return "javascript";
  }
}

// const modeLoader = createResource(loadMode);

const options = {
  theme: "material",
  lineNumbers: true
};

function CodeMirror({ value, onChange, mode }) {
  const textAreaRef = useRef();
  const codeMirrorRef = useRef();

  // onMount
  useEffect(() => {
    codeMirrorRef.current = codemirror.fromTextArea(textAreaRef.current, {
      ...options,
      mode
    });
  }, []);

  // when the prop onChange changes
  useEffect(
    () => {
      if (!codeMirrorRef.current) return;
      const handler = (cm, change) => {
        onChange(cm.getValue());
      };
      codeMirrorRef.current.on("change", handler);
      return () => codeMirrorRef.current.off("change", handler);
    },
    [onChange, codeMirrorRef.current]
  );

  // when the prop mode changes
  useEffect(
    () => {
      //TODO cancel previous promise
      loadMode(mode).then(
        mode =>
          codeMirrorRef.current && codeMirrorRef.current.setOption("mode", mode)
      );
    },
    [mode, codeMirrorRef.current]
  );

  // TODO
  // when the prop value changes
  // useEffect(() => {}, [value]);

  return <textarea ref={textAreaRef} value={value} onChange={onChange} />;
}

export default CodeMirror;
