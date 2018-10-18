import {
  decompressFromEncodedURIComponent,
  compressToEncodedURIComponent
} from "lz-string";

function decode(hash) {
  return JSON.parse(decompressFromEncodedURIComponent(hash));
}

export function encode(state) {
  return compressToEncodedURIComponent(JSON.stringify(state));
}

export function readStateFromPath(pathname) {
  const hash = pathname.split("/").pop();
  return hash ? decode(hash) : defaultState;
}

const defaultCode = `const ENOUGH_TIME = 1; // milliseconds

let workQueue = [];
let nextUnitOfWork = null;

function schedule(task) {
  workQueue.push(task);
  requestIdleCallback(performWork);
}

function performWork(deadline) {
  if (!nextUnitOfWork) {
    nextUnitOfWork = workQueue.shift();
  }

  while (nextUnitOfWork && deadline.timeRemaining() > ENOUGH_TIME) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }

  if (nextUnitOfWork || workQueue.length > 0) {
    requestIdleCallback(performWork);
  }
}`;

const defaultSteps = `* > all
4[1:3, 6:9] > Tokens
9, 12 > lines
2:5 > range`;

const defaultState = {
  code: defaultCode,
  showNumbers: false,
  lang: "jsx",
  themeName: "vsDarkPlus",
  steps: defaultSteps,
  width: 700,
  height: 500
};
