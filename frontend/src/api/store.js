import { configureStore } from '@reduxjs/toolkit'
import { categoryApi } from './services/categoryApi'
import { setupListeners } from '@reduxjs/toolkit/query'

export const store = configureStore({
  reducer: {
    [categoryApi.reducerPath] : categoryApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware()
  .concat(categoryApi.middleware)
        
})
setupListeners(store.dispatch);

export default store;