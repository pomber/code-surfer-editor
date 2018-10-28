import { useState } from "react";

export function useToggle(defaultState = false) {
  const [state, setState] = useState(defaultState);
  const toggle = () => setState(previous => !previous);
  return [state, toggle];
}

export function useBoundedCounter({ defaultValue, minValue, maxValue }) {
  const [counter, setCounter] = useState(defaultValue);
  const inc = () =>
    setCounter(prev => (prev >= maxValue ? maxValue : prev + 1));
  const dec = () =>
    setCounter(prev => (prev <= minValue ? minValue : prev - 1));
  return [counter, dec, inc];
}
