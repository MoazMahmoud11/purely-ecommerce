// // threating with supabase just 

// import { data } from "autoprefixer";
// import { getCurrentUser } from "../services/authService";
// import { supabase } from "../services/supabaseClient";

// // get current cart or create it if not exist
// export async function getOrCreateCart() {
//     const {
//         data: { user },
//         error: userError,
//     } = await getCurrentUser();

//     if(userError || !user) {
//         throw new Error ('Not authenticated!');
//     }

//     // get cart of user with //*id 
//     const { data: cart, error} = await supabase.from('carts')
//     .select('*')
//     .eq('user_id', user.id)
//     .maybeSingle(data); // Returns { data: null, error: null } if no user exists
//     // .single(); // Return data as a single object instead of an array of objects.

//     if (error) {
//         throw error;
//     } 

//     // If no cart exists, create one
//     if(!cart){
//         const {data: newCart, insertError}  = supabase.from('carts')
//         .insert({ user_id: user.id })
//         .select()
//         .single();

//         if (insertError) throw insertError;
//         return newCart;
//     }

//     return cart;
// }

// export async function fetchCartItems(cartId){
//     const {data, error} = await supabase.from('cart_items')
//     .select(`
//         id,
//         quantity,
//         product_id,
//         products (id, name, price, image)
//         `)
//         .eq('cart_id', cartId);

//         if (error) throw error;
//         return data;

// }

// export async function syncCartItems(cartId, items){
//     const upserts = items.map( (item) => ({
//         cart_id: cartId,
//         product_id: item.product_id,
//         quantity: item.quantity, 

//     }));

//     const { error: upsertError } = await supabase
//     .from('cart_items')
//     .upsert(upserts, { onConflict: 'cart_id,product_id' }); // if the id's conflict[cartId:1, productId: 1] upsert it

//     if (upsertError) throw upsertError;
// }