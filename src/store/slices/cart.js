// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { fetchCartItems, getOrCreateCart, syncCartItems } from "../../api/cartApi";

// export const fetchCart = createAsyncThunk(
//     'cart/fetchCart',
//     async (_, {rejectWithValue}) => {
//         try {
//             const cart = await getOrCreateCart();
//             const items = await fetchCartItems(cart.id);

//         return { cartId: cart.id, items };
//         } catch (err) {
//         return rejectWithValue(err.message || 'Failed to fetch cart');
//         }
//     }
// );

// export const syncCartToSupabase = createAsyncThunk(
//     'cart/syncCartToSupabase',
//     async (_, {getState, rejectWithValue}) => {
//         try {
//             const { cart } = getState();
//         await syncCartItems(cart.cartId, cart.items);
//             return true;
//         } catch (err) {
//         return rejectWithValue(err.message || 'Can not insert of update your cart!');
//         }
//     }
// );

// const initialState = { cartId: null,items: [], loading: false, error: null, synced: true} 

// const cartSlice = createSlice({
//     name: 'cart',
//     initialState: initialState,
//     reducers: {
//         // Add item or increment quantity if it already exists
//         addItem: (state, action) => {
//             const product = action.payload;
//             const existingItemIndex = state.items.find(
//                 item => item.product_id === product.id
//             );
//             if(existingItemIndex) {
//                 existingItemIndex.quantity += 1;
//             } else {
//                 state.items.push({ product_id: product.id,
//                     quantity: 1,
//                     products: product,
//                 });
//             }
//             state.synced = false; // flag to track supabase saved or not
//         },

//         removeItem: (state, action) => {
//             const productId = action.payload;
//             const existing = state.items.find( item => item.product_id === productId);

//             if(!existing){
//                 return
//             }
//             if( existing.quantity === 1){
//                 state.items = state.items.filter( item => item.product_id !== productId);
//             }else {
//                 existing.quantity -= 1;
//             }

//             state.synced = false;
//         },

//         clearCart(state) {
//             state.items = [];
//             state.synced = false;
//         },

        
//     },


//     extraReducers: (builder) => {
//         builder
//     },
    
// });

// export default cartSlice.reducer;