import express from "express";
import { getOembed, getIframeTest } from "./oembed.server";
import { getEditor } from "./editor.server";
import { getFrame } from "./frame.server";

const server = express();
server
  .disable("x-powered-by")
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get("/oembed", getOembed)
  .get("/ti/*", getIframeTest)
  .get("/i/*", getFrame)
  .get("/*", getEditor);

export default server;
