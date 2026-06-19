import { fetchProducts } from "../../store/slices/productsSlice";

export const productsLoader = (store) => async () => {
  const state = store.getState();

  if (state.products.items.length === 0) {
    // 🔥 Fire and forget. Let the UI handle the loading state.
    store.dispatch(fetchProducts());
  }

  return null;
};
