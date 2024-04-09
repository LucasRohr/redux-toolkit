import { Middleware, configureStore } from '@reduxjs/toolkit'
import { filtersReducer, travelReducer, userReducer } from './slices'
import createDebugger from 'redux-flipper'

const middlewares: Middleware[] = []

if (__DEV__) {
  middlewares.push(createDebugger())
}

const store = configureStore({
  reducer: {
    user: userReducer,
    travel: travelReducer,
    filters: filtersReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(...middlewares), // Apply default middlewares and add custom ones
})

export type RootState = ReturnType<typeof store.getState>

export default store
