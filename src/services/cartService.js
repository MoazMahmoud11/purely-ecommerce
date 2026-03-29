import { supabase } from "./supabaseClient.js";


// 1 get user cart
export const getUserCart = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data, error } = await supabase
    .from("carts")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle(); 

  if (error) throw error;

  return data;
};

// 2 by user id and auth.uId
export const getOrCreateCart = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  const user = session?.user;
  if (!user) throw new Error("You must be logged in");

  let { data: cart } = await supabase
    .from("carts")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!cart) {
    const { data, error } = await supabase
      .from("carts")
      .insert([{ user_id: user.id }])
      .select()
      .single();

    if (error) throw error;

    cart = data;
  }

  return cart;
};

// 3 copy of products items 
export const getCartItems = async (cartId) => {
  const { data, error } = await supabase
    .from("cart_items")
    .select(`
      *,
      products (*)
    `)
    .eq("cart_id", cartId);

  if (error) throw error;

  return data;
};

export async function updateCartItem(productId, quantity) {
  const cart = await getOrCreateCart();

  const { error } = await supabase
    .from("cart_items")
    .upsert({
      cart_id: cart.id,
      product_id: productId,
      quantity
    },
  {
    onConflict: "cart_id,product_id"
  })
    

  if (error) throw error;
}

// delete oneItem form cart with its quantity
export async function deleteCartItem(productId) {
  const { error } = await supabase
    .from("cart_items")
    .delete()
    .eq("product_id", productId);

  if (error) throw error;
}

// clear cartItems 
export async function clearCart(cartId) {
  const { error } = await supabase
    .from("cart_items")
    .delete()
    .eq("cart_id", cartId);

  if (error) throw error;
}