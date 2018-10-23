import React from "react";
import { renderToString, renderToStaticMarkup } from "react-dom/server";
import inline from "glamor/inline";
import { readStateFromPath } from "./state-parser";
// import CodeSurferContainer from './CodeSurferContainer'

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

export function getFrame(request, response) {
  const protocolAndHost = request.protocol + "://" + request.get("host");
  const fullUrl = protocolAndHost + request.originalUrl;
  response.status(200).send(`<!doctype html>
  <html lang="">
  
  <head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta charset="utf-8" />
    <title>Code Surfer Editor</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link 
      href="${protocolAndHost}/oembed?url=${encodeURIComponent(fullUrl)}" 
      rel="alternate"
      type="application/json+oembed" 
      title="Code Surfer oEmbed" />
    <style>
      body {
        margin: 0;
        padding: 0;
        font-family: sans-serif;
      }
      html,
      body,
      #root {
        height: 100%;
        padding: 0;
        margin: 0;
      }
    </style>
    ${
      assets.frame.css
        ? `<link rel="stylesheet" href="${assets.frame.css}">`
        : ""
    }
    ${
      process.env.NODE_ENV === "production"
        ? `<script src="${assets.frame.js}" defer></script>`
        : `<script src="${assets.frame.js}" defer crossorigin></script>`
    }
  </head>
  
  <body>
    <div id="root">${""}</div>
  </body>
  
  </html>`);
}
