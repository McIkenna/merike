import { configureStore } from '@reduxjs/toolkit'
import { categoryApi } from './services/categoryApi'
import { productApi } from './services/productApi'
import { setupListeners } from '@reduxjs/toolkit/query'
import { userApi } from './services/userApi'

export const store = configureStore({
  reducer: {
    [categoryApi.reducerPath] : categoryApi.reducer,
    [productApi.reducerPath] : productApi.reducer,
    [userApi.reducerPath] : userApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(categoryApi.middleware, productApi.middleware, userApi.middleware),
        
})
setupListeners(store.dispatch);

export default store;