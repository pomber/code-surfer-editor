export default (protocolAndHost, url, markup, assets) => `<!doctype html>
<html lang="">

<head>
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta charset="utf-8" />
  <title>Code Surfer Editor</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link 
    href="${protocolAndHost}/oembed?url=${encodeURIComponent(url)}" 
    rel="alternate"
    type="application/json+oembed" 
    title="Code Surfer oEmbed" />
  <style>
    html,
    body,
    #root {
      height: 100%;
      padding: 0;
      margin: 0;
    }
  </style>
  ${
    assets.frame.css ? `<link rel="stylesheet" href="${assets.frame.css}">` : ""
  }
  ${
    process.env.NODE_ENV === "production"
      ? `<script src="${assets.frame.js}" defer></script>`
      : `<script src="${assets.frame.js}" defer crossorigin></script>`
  }
</head>

<body>
  <div id="root">${markup}</div>
</body>

</html>`;
