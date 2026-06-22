import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
};

const favoriteSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        toggleFavorite: (state, action) => {
            const product = action.payload;

            const exists = state.items.some(
                (item) => item.product_id === product.id
              );
              
              if (exists) {
                state.items = state.items.filter(
                  (item) => item.product_id !== product.id
                );
              } else {
                state.items.push({
                  product_id: product.id,
                  products: product
                });
              }
        },
    },
});


export const { toggleFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;