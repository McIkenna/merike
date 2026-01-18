
import { setViewedProducts } from "../../../api/actions";


export const AddViewedProduct = (product, viewedProducts, dispatch) => {
    let viewed = [...viewedProducts];
    viewed = viewed.filter((p) => p._id !== product._id);
    const newlyViewed = [product, ...viewed];
    const updatedViewed = newlyViewed.slice(0, 10);
    dispatch(setViewedProducts(updatedViewed));
    localStorage.setItem("viewedProducts", JSON.stringify(updatedViewed));
  };