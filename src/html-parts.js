export function headContent() {
  return `
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta charset="utf-8" />
  <title>Code Surfer Editor</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  `.trim();
}

export function oembedLink(protocolAndHost, url) {
  return `
  <link 
      href="${protocolAndHost}/oembed?url=${encodeURIComponent(url)}" 
      rel="alternate"
      type="application/json+oembed" 
      title="Code Surfer oEmbed" />
  `.trim();
}

export function body(markup) {
  return `
  <body>
    <div id="root">${markup}</div>
  </body>
  `.trim();
}

//TODO move hardcoded styles to glamor or something
export function style() {
  return `
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
    .react-codemirror2,
    .CodeMirror {
      height: 100% !important;
    }
  </style>
  `.trim();
}

export function script(src) {
  return process.env.NODE_ENV === "production"
    ? `<script src="${src}" defer></script>`
    : `<script src="${src}" defer crossorigin></script>`;
}
