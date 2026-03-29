import { supabase } from "../../services/supabaseClient.js";

export const orderLoader = async ({ request }) => {
  const url = new URL(request.url);
  const orderId = url.searchParams.get("orderId");

  if (!orderId) {
    throw new Response("Order ID not provided", { status: 404 });
  }

  // Fetch order details with joined order_items and products
  const { data: order, error } = await supabase
    .from("orders")
    .select(
      `
      id,
      total_price,
      status,
      order_items (
        id,
        quantity,
        price,
        products (
          id,
          name,
          description,
          image
        )
      )
    `,
    )
    .eq("id", orderId)
    .single();

  if (error || !order) {
    throw new Response("Order not found", { status: 404 });
  }

  return order;
};