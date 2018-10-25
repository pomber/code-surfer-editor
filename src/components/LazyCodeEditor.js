import React, { lazy, unstable_Suspense as Suspense } from "react";

const CodeEditor = lazy(() => import("./CodeEditor"));
const Fallback = props => (
  <textarea
    style={{
      height: "97%",
      width: "100%",
      boxSizing: "border-box",
      border: "0px",
      background: "#263238",
      color: "rgba(233, 237, 237, 1)",
      resize: "none"
    }}
    value={props.value}
    onChange={e => props.change(e.target.value)}
  />
);

export default props => (
  <Suspense fallback={<Fallback {...props} />}>
    <CodeEditor {...props} />
  </Suspense>
);
