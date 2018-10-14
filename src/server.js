import App from "./app";
import React from "react";
import express from "express";
import { renderToString, renderToStaticMarkup } from "react-dom/server";
import inline from "glamor/inline";
import url from "url";
import printHtml from "./page-template";

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const getOembed = (req, res) => {
  res
    .status(200)
    .set("Content-Type", "application/json")
    .send({
      version: "1.0",
      type: "rich",
      provider_name: "Code Surfer",
      provider_url: "https://code-surfer.now.sh/",
      title: "Code Surfer",
      author_name: "",
      author_url: "",
      width: 480,
      height: 270,
      html:
        '<iframe src="https://code-surfer.now.sh/" height="270.0" width="480" frameborder="0" scrolling="no"></iframe>'
    });
};
const getCodeSurfer = (req, res) => {
  const markup = inline(renderToStaticMarkup(<App />));
  const fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
  const html = printHtml(fullUrl, markup);
  res.status(200).send(html);
};

const server = express();
server
  .disable("x-powered-by")
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get("/oembed", getOembed)
  .get("/", getCodeSurfer);

export default server;
