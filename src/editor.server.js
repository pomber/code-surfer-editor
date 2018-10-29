import React from "react";
import { renderToString } from "react-dom/server";
import inline from "glamor/inline";
import { readStateFromPath } from "./utils/state-parser";
import { getProtocolAndHost } from "./utils/url-utils";
import Editor from "./components/Editor";
import * as html from "./html-parts";

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

console.log(process.env.RAZZLE_ASSETS_MANIFEST);

export function getEditor(request, response) {
  const state = readStateFromPath(request.originalUrl);
  //TODO put styles in head
  const markup = inline(renderToString(<Editor initialState={state} />));
  const protocolAndHost = getProtocolAndHost(request);
  const fullUrl = protocolAndHost + request.originalUrl;

  const content = `
  <!doctype html>
  <html lang="">
  <head>
    ${html.headContent()}
    ${html.script(assets.editor.js)}
    ${html.oembedLink(protocolAndHost, fullUrl)}
    ${html.style()}
  </head>
  <body>
  ${html.body(markup)}
  </body>
  </html>
  `.trim();

  response.status(200).send(content);
}
