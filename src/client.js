import Editor from "./editor";
import React from "react";
import { unstable_createRoot } from "react-dom";
import CodeSurferContainer from "./CodeSurferContainer";
import { readStateFromPath } from "./state-parser";

const req = require.context("prism-react-renderer/themes", false, /\.js$/);
const themes = req
  .keys()
  .map(filename => ({ ...req(filename), name: filename.slice(2, -3) }));

const root = unstable_createRoot(document.getElementById("root"), {
  hydrate: true
});

if (window.location.pathname.startsWith("/i/")) {
  const state = readStateFromPath(window.location.pathname);
  const theme = themes.find(theme => theme.name === state.themeName);
  const app = (
    <CodeSurferContainer
      code={state.code}
      showNumbers={state.showNumbers}
      lang={state.lang}
      theme={theme}
      key={theme.name}
      steps={state.steps}
      width={state.width}
      height={state.height}
    />
  );
  root.render(app);
} else {
  const state = readStateFromPath(window.location.pathname);
  const app = <Editor initialState={state} />;
  root.render(app);
}

if (module.hot) {
  module.hot.accept();
}
