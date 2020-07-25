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

