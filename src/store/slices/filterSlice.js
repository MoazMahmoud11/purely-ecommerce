import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedCategories: [],
  priceRange: [0, 150],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setPriceRange(state, action) {
      state.priceRange = action.payload;
    },
    toggleCategory(state, action) {
      const cat = action.payload;
      if (state.selectedCategories.includes(cat)) {
        state.selectedCategories = state.selectedCategories.filter(
          (c) => c !== cat,
        );
      } else {
        state.selectedCategories.push(cat);
      }
    },
    clearFilters(state) {
      state.selectedCategories = [];
      state.priceRange = [0, 150];
    },
  },
});

export const filterActions = filterSlice.actions;
export default filterSlice.reducer;
