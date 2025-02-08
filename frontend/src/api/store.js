import { configureStore } from '@reduxjs/toolkit'
import { categoryApi } from './services/categoryApi'
import { productApi } from './services/productApi'
import { setupListeners } from '@reduxjs/toolkit/query'
import { userApi } from './services/userApi'
import reducers from './reducers'
import authReducer from './authReducer'

const store = configureStore({
  reducer: {
    [categoryApi.reducerPath] : categoryApi.reducer,
    [productApi.reducerPath] : productApi.reducer,
    [userApi.reducerPath] : userApi.reducer,
    stateStore: reducers.reducer,
    auth: authReducer.reducer
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(categoryApi.middleware, productApi.middleware, userApi.middleware),
        
})
setupListeners(store.dispatch);

export default store;