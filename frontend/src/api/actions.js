import reducers from './reducers'
import authReducer from './authReducer'

export const { 
    setCategories, 
    setProducts, 
    setSelectedCategory,
    setPricePerItem,
    setQtyPerItem,
    setTotalPrice,
    setTotalQuantity,
    setCartItems,
    setPriceFilter,
    setViewedProducts,
setCartInspiredProducts,
setAllOrders,
setProductRecentlyBought } = reducers.actions
export const { setUser, setToken, logout } = authReducer.actions

