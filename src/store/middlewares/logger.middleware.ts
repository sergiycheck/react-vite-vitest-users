import { Middleware } from 'redux';

export const loggerMiddleware: Middleware =
  (storeAPI) => (next) => (action) => {
    callFunctionOnConsole(console.group, action.type);
    callFunctionOnConsole(console.info, 'dispatching', action);
    const result = next(action);
    logm('next state', storeAPI.getState());
    callFunctionOnConsole(console.groupEnd);
    return result;
  };

export const callFunctionOnConsole = (
  toCall: (...args: unknown[]) => void,
  ...args: unknown[]
) => {
  if (import.meta.env.VITE_LOGGING === 'true') {
    toCall.call(console, ...args);
  }
};

export const logm = (...args: unknown[]) => {
  if (import.meta.env.VITE_LOGGING === 'true') {
    console.log(...args);
  }
};
