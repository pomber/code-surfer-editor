export function getProtocolAndHost(request) {
  const protocol = process.env.NOW ? "https" : request.protocol;
  return protocol + "://" + request.get("host");
}
