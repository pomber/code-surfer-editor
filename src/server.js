import React from "react";
import express from "express";
import { renderToString, renderToStaticMarkup } from "react-dom/server";
import inline from "glamor/inline";
import printHtml from "./page-template";
import { readStateFromPath } from "./state-parser";

import { getOembed, getIframeTest } from "./server-oembed";
import { getEditor } from "./server-editor";

// import CodeSurferContainer from './CodeSurferContainer'

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const getCodeSurfer = (req, res) => {
  const state = readStateFromPath(req.originalUrl);
  // const markup = inline(
  //   renderToString(<CodeSurferContainer initialState={state} />)
  // );
  // const stateHash = req.url.split("/").pop();
  // const code = Object.values(gist.files)[0].content;
  // const markup = inline(renderToStaticMarkup(<App code={code} showNumbers />));
  // const fullUrl = req.protocol + "://" + req.get("host") + "/i/" + stateHash;
  const protocolAndHost = req.protocol + "://" + req.get("host");
  const fullUrl = protocolAndHost + req.originalUrl;
  const html = printHtml(protocolAndHost, fullUrl, "", assets);
  res.status(200).send(html);
};

const server = express();
server
  .disable("x-powered-by")
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get("/oembed", getOembed)
  .get("/ti/*", getIframeTest)
  .get("/i/*", getCodeSurfer)
  .get("/*", getEditor);

export default server;
