import { configureStore } from '@reduxjs/toolkit'
import { categoryApi } from './services/categoryApi'
import { productApi } from './services/productApi'
import { setupListeners } from '@reduxjs/toolkit/query'
import { userApi } from './services/userApi'
import reducers from './reducers'
import authReducer from './authReducer'
import { checkoutApi } from './services/checkoutApi'

const store = configureStore({
  reducer: {
    [categoryApi.reducerPath] : categoryApi.reducer,
    [productApi.reducerPath] : productApi.reducer,
    [userApi.reducerPath] : userApi.reducer,
    [checkoutApi.reducerPath] : checkoutApi.reducer,
    stateStore: reducers.reducer,
    auth: authReducer.reducer
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware()
  .concat(categoryApi.middleware, productApi.middleware, userApi.middleware, checkoutApi.middleware),
        
})
setupListeners(store.dispatch);

export default store;