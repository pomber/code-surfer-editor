import Editor from "./editor";
import React from "react";
import { hydrate } from "react-dom";

hydrate(<Editor />, document.getElementById("root"));

if (module.hot) {
  module.hot.accept();
}
