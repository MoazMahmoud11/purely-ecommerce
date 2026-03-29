import { configureStore } from "@reduxjs/toolkit";
import productsReducer from './slices/productsSlice.js'
import uiReducer from './slices/uiSlice.js';
import filterReducer from './slices/filterSlice.js'
import cartReducer from './slices/cartSlice.js'
import authReducer from './slices/authSlice.js';



const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    user: authReducer, // User / Auth state
    filter: filterReducer,
    ui: uiReducer,
  }
});

export default store;



// import { supabase } from "../services/supabaseClient.js";

// export async function getProducts() {
//   const { data, error } = await supabase
//     .from("products")
//     .select("id, name, price, image, stock, description, usage, safety");

//   if (error) {
//     console.error("Error fetching products:", error);
//     return [];
//   }
//   return data;
// }

// // اختبار
// await getProducts().then((products) => console.log(products));