import React, { lazy, unstable_Suspense as Suspense } from "react";

//736kb

const CodeEditor = lazy(() => import("./CodeEditor"));

export default props => (
  <Suspense placeholder={<textarea value={props.value} />}>
    <CodeEditor {...props} />
  </Suspense>
);
