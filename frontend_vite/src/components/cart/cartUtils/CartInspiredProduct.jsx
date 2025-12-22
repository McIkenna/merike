import { setCartInspiredProducts } from '../../../api/actions';

export const CartInspiredProduct = (product, cartInspiredProducts, dispatch) => {
    if (!product) return;

    let inspired = Array.isArray(cartInspiredProducts) ? [...cartInspiredProducts] : [];
    if ((!inspired || inspired.length === 0) && typeof window !== 'undefined') {
        try {
            const stored = JSON.parse(localStorage.getItem('cartInspiredProducts') || '[]');
            if (Array.isArray(stored)) inspired = stored;
        } catch {
            inspired = [];
        }
    }

    const entry = {
        _id: product._id,
        name: product.name,
        image: product.images?.[0]?.url || '',
        price: Number(product.price?.toFixed(2))
        //   addedAt: new Date().toISOString()
    };

    if (!inspired.some(i => i._id === entry._id)) {
        inspired.unshift(entry);
        dispatch(setCartInspiredProducts(inspired));
        localStorage.setItem('cartInspiredProducts', JSON.stringify(inspired));
    }
}
