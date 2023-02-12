import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { loggerMiddleware } from './middlewares/logger.middleware';
import usersReducer from './reducers/users';
import { AnyAction, combineReducers } from 'redux';

const appReducer = combineReducers({
  users: usersReducer,
});

const rootReducer = (state: any, action: AnyAction) => {
  if (action.type === 'RESET_STATE') {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loggerMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
