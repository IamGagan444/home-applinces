// import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import { InstaApis } from "./productApi";


// export const store = configureStore({
//   reducer: combineReducers({
//     [InstaApis.reducerPath]: InstaApis.reducer,
   
//   }),
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(InstaApis.middleware),
// });

import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { api } from './Api'
import cartReducer from './cartSlice'
import authReducer from './authSlice'
export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    cart: cartReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

