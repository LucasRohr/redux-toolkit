import { configureStore, Middleware } from '@reduxjs/toolkit';
import usuario from './reducers/usuario';
import createDebugger from 'redux-flipper';

const middlewares: Middleware[] = [];

if (__DEV__) {
  middlewares.push(createDebugger());
}

const store = configureStore({
  reducer: {
    usuario
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().prepend(...middlewares)
  ,
});

export type RootState = ReturnType<typeof store.getState>

export default store;