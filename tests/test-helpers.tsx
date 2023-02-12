import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../src/store/store';

export const TestProvider = ({ children }: { children: JSX.Element }) => {
  return <Provider store={store}>{children}</Provider>;
};
