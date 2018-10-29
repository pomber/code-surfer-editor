import React, { useEffect, useRef, useState } from "react";

let codeMirrorPromise = null;
if (typeof navigator !== "undefined") {
  // Only for client-side
  codeMirrorPromise = import(/* webpackChunkName: "codemirror" */ "./codemirror.assets").then(
    cmModule => cmModule.default
  );
}

async function loadMode(mode) {
  try {
    await import(/* webpackChunkName: "codemirror-[request]" */ `codemirror/mode/${mode}/${mode}.js`);
    return mode;
  } catch (error) {
    console.error("Error loading CodeMirror mode", error);
    mode = "jsx";
    await import(/* webpackChunkName: "codemirror-[request]" */ `codemirror/mode/${mode}/${mode}`);
    return mode;
  }
}

const options = {
  theme: "material",
  lineNumbers: true
};

function CodeMirror({ value, onChange, mode }) {
  const textAreaRef = useRef();
  const [codeMirror, setCodeMirror] = useState();

  // onMount
  useEffect(() => {
    codeMirrorPromise.then(codemirror => {
      const newCodeMirror = codemirror.fromTextArea(textAreaRef.current, {
        ...options,
        mode
      });
      newCodeMirror.setValue(value);
      setCodeMirror(newCodeMirror);
    });
  }, []);

  // when the prop onChange changes
  useEffect(
    () => {
      if (!codeMirror) return;
      const handler = (cm, change) => {
        onChange(cm.getValue());
      };
      codeMirror.on("change", handler);
      return () => codeMirror.off("change", handler);
    },
    [onChange, codeMirror]
  );

  // when the prop mode changes
  useEffect(
    () => {
      //TODO cancel previous promise
      loadMode(mode).then(
        mode => codeMirror && codeMirror.setOption("mode", mode)
      );
    },
    [mode, codeMirror]
  );

  // TODO
  // when the prop value changes
  // useEffect(() => {}, [value]);

  return (
    <textarea
      ref={textAreaRef}
      value={"Loading..."}
      readOnly
      style={{
        height: "97%",
        width: "100%",
        boxSizing: "border-box",
        border: "0px",
        background: "#263238",
        color: "rgba(233, 237, 237, 0.5)",
        resize: "none"
      }}
    />
  );
}

export default CodeMirror;
