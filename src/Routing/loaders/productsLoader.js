import { fetchProducts } from "../../store/slices/productsSlice";

export const productsLoader = (store) => async () => {
    const state = store.getState();

    if (state.products.items.length === 0) {
        await store.dispatch(fetchProducts());
    }

    return null;
};