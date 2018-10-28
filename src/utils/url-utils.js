export function getProtocolAndHost(request) {
  const protocol = process.env.NOW ? "https" : request.protocol;
  return protocol + "://" + request.get("host");
}

export function replacePath(pathname) {
  const url = new URL(window.location);
  url.pathname = pathname;
  window.history.replaceState(null, null, url);
}
