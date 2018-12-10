import express from "express";
import { getOembed, getIframeTest } from "./oembed.server";
import { getEditor } from "./editor.server";
import { getFrame } from "./frame.server";
import { getGithubContent } from "./github.server";

const server = express();
server
  .disable("x-powered-by")
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .use(express.json())
  .post("/gh", getGithubContent)
  .get("/oembed", getOembed)
  .get("/ti/*", getIframeTest)
  .get("/i/*", getFrame)
  .get("/*", getEditor);

export default server;
