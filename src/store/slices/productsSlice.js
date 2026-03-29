import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const { supabase } = await import("../../services/supabaseClient");



export const fetchProducts  = createAsyncThunk(
    'products/fetchProducts',
    async (_,{rejectWithValue}) => {
        try {
            const { data, error } = await supabase
                .from('products')
                .select('*');

        if (error) {
        return rejectWithValue(error.message);
        }

        return data;

        } catch (error) {
            console.log(error.message);
            return rejectWithValue(error.message || 'Failed to fetch products');
        }
    }
);

const initialState = { items: [], loading: false, error: null,} // 

const productsSlice = createSlice({
    name: 'products',
    initialState,

    // ↓ For YOUR OWN actions (sync)
    reducers: {
    clearProducts(state) { // * Uses When user Logout();
        state.items = []; 
    },
    },

    // ↓ For ASYNC actions (createAsyncThunk)
    extraReducers: (builder) => {
    builder
        .addCase(fetchProducts.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.items = action.payload;
        })
        .addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export default productsSlice.reducer;