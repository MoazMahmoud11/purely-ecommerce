import { fetchFeaturedProducts } from "../../store/slices/productsSlice";

export const featuredProductsLoader = (store) => async () => {
  const state = store.getState();

  if (state.products.featured.length > 0) return null;

  // 🔥 DO NOT 'await' this dispatch.
  // This allows the Home Page to render immediately and show your skeleton loaders!
  store.dispatch(fetchFeaturedProducts());
  return null;
};
