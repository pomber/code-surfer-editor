import {
  createCache,
  createResource as createCacheResource
} from "react-cache";

let cache;
function initCache() {
  cache = createCache(initCache);
}

initCache();

export function createResource(suspender) {
  const resource = createCacheResource(suspender);
  return {
    read: key => resource.read(cache, key)
  };
}
