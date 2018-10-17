import Editor from "./editor";
import React from "react";
import { hydrate, unstable_createRoot } from "react-dom";
import LZString from "lz-string";
import CodeSurferContainer from "./code-surfer-container";

const req = require.context("prism-react-renderer/themes", false, /\.js$/);
const themes = req
  .keys()
  .map(filename => ({ ...req(filename), name: filename.slice(2, -3) }));

function read() {
  const hash = window.document.location.pathname.slice(3);
  if (!hash) {
    return null;
  }

  const decode = LZString.decompressFromEncodedURIComponent;

  try {
    return JSON.parse(decode(hash));
  } catch (_) {
    return null;
  }
}

const root = unstable_createRoot(document.getElementById("root"));

if (window.location.pathname.startsWith("/i/")) {
  const state = read();
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
  const app = <Editor />;
  root.render(app);
}

if (module.hot) {
  module.hot.accept();
}
