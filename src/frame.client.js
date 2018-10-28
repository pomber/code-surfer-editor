import React from "react";
import { createRoot } from "react-dom";
import CodeSurferContainer from "./components/CodeSurferContainer";
import { readStateFromPath } from "./utils/state-parser";

const req = require.context("prism-react-renderer/themes", false, /\.js$/);
const themes = req
  .keys()
  .map(filename => ({ ...req(filename), name: filename.slice(2, -3) }));

const root = createRoot(document.getElementById("root"), {
  hydrate: true
});

const state = readStateFromPath(window.location.pathname);
const theme = themes.find(theme => theme.name === state.themeName);
const app = (
  <CodeSurferContainer
    code={state.code}
    showNumbers={state.showNumbers}
    lang={state.lang}
    theme={theme}
    steps={state.steps}
    width={state.width}
    height={state.height}
  />
);
root.render(app);

if (module.hot) {
  module.hot.accept();
}
