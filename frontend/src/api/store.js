import { configureStore } from '@reduxjs/toolkit'
import { categoryApi } from './services/categoryApi'
import { productApi } from './services/productApi'
import { setupListeners } from '@reduxjs/toolkit/query'
import { userApi } from './services/userApi'
import reducers from './reducers'
import authReducer from './authReducer'
import { checkoutApi } from './services/checkoutApi'
import { orderApi } from './services/orderApi'
import {carouselApi} from './services/carouselApi'
import { bannerApi } from './services/bannerApi'

const store = configureStore({
  reducer: {
    [categoryApi.reducerPath] : categoryApi.reducer,
    [productApi.reducerPath] : productApi.reducer,
    [userApi.reducerPath] : userApi.reducer,
    [checkoutApi.reducerPath] : checkoutApi.reducer,
    [orderApi.reducerPath] : orderApi.reducer,
    [carouselApi.reducerPath] : carouselApi.reducer,
    [bannerApi.reducerPath] : bannerApi.reducer,
    stateStore: reducers.reducer,
    auth: authReducer.reducer
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware()
  .concat(categoryApi.middleware, 
    productApi.middleware, 
    userApi.middleware, 
    checkoutApi.middleware, 
    orderApi.middleware, 
    carouselApi.middleware,
    bannerApi.middleware),
        
})
setupListeners(store.dispatch);

export default store;