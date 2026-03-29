// src/api/products.js
import { supabase } from "./supabaseClient";

export async function getProducts() {
  const { data, error } = await supabase.from("products").select(`
      id,
      name,
      price,
      image,
      stock,
      description,
      usage,
      safety,
      full_description,
      category,
      brand,
      rating
    `);

  if (error) {
    console.error("Error fetching products:", error);
    return [];
  }
  return data;
}
