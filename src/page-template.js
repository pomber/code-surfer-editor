export default (url, markup, assets) => `<!doctype html>
<html lang="">

<head>
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta charset="utf-8" />
  <title>Code Surfer</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link 
    href="https://code-surfer.now.sh/oembed?url=${encodeURIComponent(url)}" 
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
    assets.client.css
      ? `<link rel="stylesheet" href="${assets.client.css}">`
      : ""
  }
  ${
    process.env.NODE_ENV === "production"
      ? `<script src="${assets.client.js}" defer></script>`
      : `<script src="${assets.client.js}" defer crossorigin></script>`
  }
</head>

<body>
  <div id="root">${markup}</div>
</body>

</html>`;
