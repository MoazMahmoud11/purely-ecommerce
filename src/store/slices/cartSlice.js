import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  deleteCartItem,
  getCartItems,
  getOrCreateCart,
  updateCartItem,
} from "../../services/cartService.js";

// Helper to save guest cart locally
const syncGuestCart = (items) => {
  localStorage.setItem("guestCart", JSON.stringify(items));
};

export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  const cart = await getOrCreateCart();

  // If it's a guest, load from local storage
  if (!cart) {
    const localCart = localStorage.getItem("guestCart");
    return localCart ? JSON.parse(localCart) : [];
  }

  // If it's a logged-in user, check for a guest cart to merge
  const guestCartJSON = localStorage.getItem("guestCart");
  if (guestCartJSON) {
    const guestCartItems = JSON.parse(guestCartJSON);
    if (guestCartItems.length > 0) {
      // Loop and save each item to the user's DB cart
      for (const item of guestCartItems) {
        await updateCartItem(item.product_id, item.quantity);
      }
    }
    // Clear the local storage after merging
    localStorage.removeItem("guestCart");
  }

  const items = await getCartItems(cart.id);

  return items;
});

const cartSlice = createSlice({
  name: "cart",

  initialState: {
    items: [],
    loading: false,
    error: null,
  },

  reducers: {
    // Add item or increment quantity if it already exists
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItemIndex = state.items.find(
        (item) => item.product_id === product.id,
      );
      if (existingItemIndex) {
        existingItemIndex.quantity += 1;
      } else {
        state.items.push({
          product_id: product.id,
          quantity: 1,
          products: product,
        });
      }
      state.synced = false; // flag to track supabase saved or not
      syncGuestCart(state.items);
    },

    removeItem: (state, action) => {
      const productId = action.payload;
      const existing = state.items.find(
        (item) => item.product_id === productId,
      );

      if (!existing) {
        return;
      }
      if (existing.quantity === 1) {
        state.items = state.items.filter(
          (item) => item.product_id !== productId,
        );
      } else {
        existing.quantity -= 1;
      }

      state.synced = false;
      syncGuestCart(state.items);
    },

    // Remove item from cart
    deleteItem: (state, action) => {
      const productId = action.payload;

      state.items = state.items.filter((item) => item.product_id !== productId);
      syncGuestCart(state.items);
    },

    clearCart(state) {
      state.items = [];
      state.synced = false;
      syncGuestCart(state.items);
    },
  },

  extraReducers: (builder) => {
    builder

      // FETCH CART
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })

      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addMatcher(
        isAnyOf(
          addItemAsync.rejected,
          removeItemAsync.rejected,
          deleteItemAsync.rejected,
        ),
        (state, action) => {
          // Only set an error if it's a real DB/network issue, not an expected guest auth error
          if (
            action.payload &&
            !String(action.payload).toLowerCase().includes("logged in")
          ) {
            state.error = action.payload;
          }
        },
      );
  },
});

export const { addToCart, removeItem, clearCart, deleteItem } =
  cartSlice.actions;

// --- Async Thunks (Using Optimistic Updates) ---

export const addItemAsync = createAsyncThunk(
  "cart/addItemAsync",
  async (product, { dispatch, getState, rejectWithValue }) => {
    dispatch(addToCart(product)); // 1. Instantly update UI
    const state = getState();
    const item = state.cart.items.find((i) => i.product_id === product.id);
    try {
      await updateCartItem(product.id, item.quantity); // 2. Push accurate DB update
    } catch (error) {
      return rejectWithValue(error.message);
    }
    return item;
  },
);

export const removeItemAsync = createAsyncThunk(
  "cart/removeItemAsync",
  async (productId, { dispatch, getState, rejectWithValue }) => {
    const state = getState();
    const item = state.cart.items.find((i) => i.product_id === productId);
    dispatch(removeItem(productId)); // 1. Instantly update UI
    try {
      if (item && item.quantity > 1) {
        await updateCartItem(productId, item.quantity - 1); // 2. Push accurate DB update
      } else {
        await deleteCartItem(productId);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const deleteItemAsync = createAsyncThunk(
  "cart/deleteItemAsync",
  async (productId, { dispatch, rejectWithValue }) => {
    dispatch(deleteItem(productId)); // 1. Instantly update UI
    try {
      await deleteCartItem(productId); // 2. Push accurate DB update
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export default cartSlice.reducer;
