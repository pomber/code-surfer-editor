import React from "react";
import { unstable_createRoot } from "react-dom";
import { readStateFromPath } from "./utils/state-parser";
import Editor from "./components/Editor";

const root = unstable_createRoot(document.getElementById("root"), {
  hydrate: true
});

const state = readStateFromPath(window.location.pathname);
const app = <Editor initialState={state} />;
root.render(app);

if (module.hot) {
  module.hot.accept();
}
