import React from "react";
import { renderToString, renderToStaticMarkup } from "react-dom/server";
import inline from "glamor/inline";
import { readStateFromPath } from "./utils/state-parser";
import { getProtocolAndHost } from "./utils/url-utils";
import CodeSurferContainer from "./components/CodeSurferContainer";
import * as html from "./html-parts";

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const req = require.context("prism-react-renderer/themes", false, /\.js$/);
const themes = req
  .keys()
  .map(filename => ({ ...req(filename), name: filename.slice(2, -3) }));

export function getFrame(request, response) {
  const state = readStateFromPath(request.originalUrl);
  const theme = themes.find(theme => theme.name === state.themeName);
  const markup = inline(
    renderToString(
      <CodeSurferContainer
        code={state.code}
        showNumbers={state.showNumbers}
        lang={state.lang}
        theme={theme}
        steps={state.steps}
        width={state.width}
        height={state.height}
      />
    )
  );
  const protocolAndHost = getProtocolAndHost(request);
  const fullUrl = protocolAndHost + request.originalUrl;

  const content = `
  <!doctype html>
  <html lang="">
  <head>
    ${html.headContent()}
    ${html.oembedLink(protocolAndHost, fullUrl)}
    ${html.style()}
    ${html.script(assets.frame.js)}
  </head>
  ${html.body(markup)}
  </html>
  `.trim();

  response.status(200).send(content);
}
