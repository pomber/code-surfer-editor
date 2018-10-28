import { useState, useEffect } from "react";
import {
  unstable_IdlePriority as IdlePriority,
  unstable_runWithPriority as runWithPriority,
  unstable_scheduleCallback as scheduleCallback,
  unstable_cancelCallback as cancelCallback
} from "scheduler";

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

export function useIdleEffect(effect, input) {
  return useEffect(() => {
    let cbNode;
    runWithPriority(IdlePriority, () => {
      cbNode = scheduleCallback(effect);
    });
    return () => cancelCallback(cbNode);
  }, input);
}
