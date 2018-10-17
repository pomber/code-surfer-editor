import App from "./app";
import React from "react";
import express from "express";
import { renderToString, renderToStaticMarkup } from "react-dom/server";
import inline from "glamor/inline";
import url from "url";
import printHtml from "./page-template";
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
  const gistId = params.url.split("/").pop();
  const gist = await getGist(gistId);
  console.log(params);
  console.log(gistId);
  console.log(gist);

  const code = Object.values(gist.files)[0].content;
  const height = guessHeight(code);
  res
    .status(200)
    .set("Content-Type", "application/json")
    .send({
      version: "1.0",
      type: "rich",
      provider_name: "Code Surfer",
      provider_url: "https://code-surfer.now.sh/",
      title: "Code Surfer",
      author_name: gist.owner.login,
      author_url: gist.owner.html_url,
      width: 700,
      height,
      html: `<iframe src="${
        params.url
      }" height="${height}" width="700" frameborder="0" scrolling="no"></iframe>`
    });
};

const getCodeSurfer = async (req, res) => {
  const gistId = req.url.split("/").pop();
  const gist = await getGist(gistId);
  const code = Object.values(gist.files)[0].content;
  const markup = inline(renderToStaticMarkup(<App code={code} showNumbers />));
  const fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
  const html = printHtml(fullUrl, markup);
  res.status(200).send(html);
};

const getEditor = (req, res) => {
  // const markup = inline(renderToStaticMarkup(<Editor />));
  const fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
  const html = printHtml(fullUrl, "", assets);
  res.status(200).send(html);
};

const server = express();
server
  .disable("x-powered-by")
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get("/oembed", getOembed)
  .get("/g/*", getCodeSurfer)
  .get("/", getEditor);

export default server;
