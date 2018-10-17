import Editor from "./editor";
import React from "react";
import { hydrate } from "react-dom";
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

if (window.location.pathname.startsWith("/i/")) {
  const state = read();
  console.log(state);
  const theme = themes.find(theme => theme.name === state.themeName);
  hydrate(
    <CodeSurferContainer
      code={state.code}
      showNumbers={state.showNumbers}
      lang={state.lang}
      theme={theme}
      key={theme.name}
      steps={state.steps}
      width={state.width}
      height={state.height}
    />,
    document.getElementById("root")
  );
} else {
  hydrate(<Editor />, document.getElementById("root"));
}

if (module.hot) {
  module.hot.accept();
}
