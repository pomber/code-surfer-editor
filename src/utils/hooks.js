import { useState } from "react";

export function useToggle(defaultState = false) {
  const [state, setState] = useState(defaultState);
  const toggle = () => setState(previous => !previous);
  return [state, toggle];
}
