import url from "url";
import { readStateFromPath } from "./utils/state-parser";
import toIframe from "./utils/to-iframe";

export function getOembed(request, response) {
  const params = url.parse(request.url, true).query || { url: "" };
  const state = readStateFromPath(params.url);

  response
    .status(200)
    .set("Content-Type", "application/json")
    .send({
      version: "1.0",
      type: "rich",
      provider_name: "Code Surfer",
      provider_url: "https://code-surfer.now.sh/",
      title: "Code Surfer",
      width: state.width,
      height: state.height,
      html: toIframe({
        url: params.url,
        height: state.height,
        width: state.width
      })
    });
}

export function getIframeTest(request, response) {
  const state = readStateFromPath(request.originalUrl);
  const protocolAndHost = request.protocol + "://" + request.get("host");
  const fullUrl = (protocolAndHost + request.originalUrl).replace(
    "/ti/",
    "/i/"
  );

  response.status(200).send(`
  <html>
  <body>
    <div style="display: flex; align-items: center; justify-content: center; height: 100%">
    ${toIframe({
      url: fullUrl,
      height: state.height,
      width: state.width
    })}
    </div>
  </body>
  </html>
  `);
}
