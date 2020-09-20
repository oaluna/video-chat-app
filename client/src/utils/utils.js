import { useState } from "react";

export const useTimedState = (defaultValue, timeout) => {
  const [state, setState] = useState(defaultValue);
  const [timer, setTimer] = useState(false);
  return [state, (newState) => {
    setState(newState);
    if (timer) {
      clearTimeout(timer);
    }
    const timerInstance = setTimeout(() => {
      setState(false);
    }, timeout);
    setTimer(timerInstance);
  }];
};

export const get = (object, path, defaultValue) => {
  let res = object;
  let index = 0;
  while (res !== undefined && res !== null && index < path.length) {
    res = res[path[index]];
    index += 1;
  }
  return (res === undefined || res === null) ? defaultValue : res;
};

