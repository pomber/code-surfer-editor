import App from "./app";
import React from "react";
import express from "express";
import { renderToString, renderToStaticMarkup } from "react-dom/server";
import inline from "glamor/inline";
import url from "url";
import printHtml from "./page-template";
import LZString from "lz-string";
import fetch from "node-fetch";
// import Editor from "./editor";
const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const getGist = async gistId => {
  const gistResponse = await fetch(`https://api.github.com/gists/${gistId}`);
  const gistData = await gistResponse.json();
  return gistData;
};

const guessHeight = code => Math.round(code.split("\n").length * 15.5 + 45);

const getOembed = async (req, res) => {
  const params = url.parse(req.url, true).query || { url: "" };
  console.log(params.url);
  const stateHash = params.url.split("/").pop();
  console.log(stateHash);

  const state = JSON.parse(
    LZString.decompressFromEncodedURIComponent(stateHash)
  );
  console.log(state);

  res
    .status(200)
    .set("Content-Type", "application/json")
    .send({
      version: "1.0",
      type: "rich",
      provider_name: "Code Surfer",
      provider_url: "https://code-surfer.now.sh/",
      title: "Code Surfer",
      width: state.width,
      height: state.height + 50,
      html: `<iframe src="${params.url}" height="${state.height + 50}" width="${
        state.width
      }" frameborder="0" scrolling="no"></iframe>`
    });
};

const getCodeSurfer = (req, res) => {
  // const stateHash = req.url.split("/").pop();
  // const code = Object.values(gist.files)[0].content;
  // const markup = inline(renderToStaticMarkup(<App code={code} showNumbers />));
  // const fullUrl = req.protocol + "://" + req.get("host") + "/i/" + stateHash;
  const protocolAndHost = req.protocol + "://" + req.get("host");
  const fullUrl = protocolAndHost + req.originalUrl;
  const html = printHtml(protocolAndHost, fullUrl, "", assets);
  res.status(200).send(html);
};

const getEditor = (req, res) => {
  // const markup = inline(renderToStaticMarkup(<Editor />));
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
  .get("/i/*", getCodeSurfer)
  .get("/*", getEditor);

export default server;
