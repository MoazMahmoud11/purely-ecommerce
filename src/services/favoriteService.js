import { supabase } from "./supabaseClient.js";

export const getCurrentUser = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return session?.user ?? null;
};

export const getFavorites = async () => {
  const user = await getCurrentUser();

  if (!user) throw new Error("You must be logged in");

  const { data, error } = await supabase
    .from("favorites")
    .select(
      `
        *,
        products(*)
      `,
    )
    .eq("user_id", user.id);

  if (error) throw error;

  return data;
};

export const addFavorite = async (productId) => {
  const user = await getCurrentUser();

  if (!user) throw new Error("You must be logged in");

  const { error } = await supabase.from("favorites").insert({
    user_id: user.id,
    product_id: productId,
  });

  if (error) throw error;
};

export const removeFavorite = async (productId) => {
  const user = await getCurrentUser();

  if (!user) throw new Error("You must be logged in");

  const { error } = await supabase
    .from("favorites")
    .delete()
    .eq("user_id", user.id)
    .eq("product_id", productId);

  if (error) throw error;
};
