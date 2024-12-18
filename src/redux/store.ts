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
import { ProductApis } from './productApi'
import cartReducer from './cartSlice'

export const store = configureStore({
  reducer: {
    [ProductApis.reducerPath]: ProductApis.reducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ProductApis.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

