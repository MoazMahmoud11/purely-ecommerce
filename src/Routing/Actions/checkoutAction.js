import { redirect } from "react-router-dom";
import { getCurrentUser } from "../../services/authService.js";
import {
  clearCart,
  getCartItems,
  getUserCart,
} from "../../services/cartService.js";
import { supabase } from "../../services/supabaseClient.js";
import {
  hasMinLength,
  isEgyptianPhone,
  isNotEmpty,
} from "../../util/validation.js";

export async function checkoutAction({ request }) {
  const data = await request.formData();
  // 1- Form Data
  const formData = {
    fullName: data.get("fullName"),
    email: data.get("email"), // Added email to formData
    phoneNumber: data.get("phoneNumber"),
    address: {
      street: data.get("street"),
      city: data.get("city"),
      zipCode: data.get("zip"),
    },
  };

  const { street, city, zipCode } = formData.address;
  const addressString = `${street}, ${city}, ${zipCode}`;

  // 2- Validation
  const errors = {};

  if (!isNotEmpty(formData.fullName) || !hasMinLength(formData.fullName, 5)) {
    errors.fullName = "Please enter a valid full name (at least 5 characters).";
  }

  // if (!isNotEmpty(formData.email) || !isEmail(formData.email)) {
  //   errors.email = "Please enter a valid email address.";
  // }

  if (
    !isNotEmpty(formData.phoneNumber) ||
    !isEgyptianPhone(formData.phoneNumber)
  ) {
    errors.phoneNumber =
      "Please enter a valid Egyptian phone number (e.g., 010...).";
  }

  if (!isNotEmpty(formData.address.street)) {
    errors.street = "Street address is required.";
  }

  if (!isNotEmpty(formData.address.city)) {
    errors.city = "City is required.";
  }

  if (!isNotEmpty(formData.address.zipCode)) {
    errors.zip = "Zip code is required.";
  }

  // 3- display Errors
  if (Object.keys(errors).length > 0) {
    return { errors };
  }
  // 4- get User, Cart
  const user = await getCurrentUser();
  const cart = await getUserCart();
  const cartItems = await getCartItems(cart.id);

  // 5- Create Order
  const subtotal = cartItems.reduce((acc, item) => {
    return acc + (item.products?.price || 0) * (item.quantity || 1);
  }, 0);

  const taxRate = 0.08;
  const tax = subtotal * taxRate;
  const totalPrice = subtotal + tax;

  const { data: order } = await supabase
    .from("orders")
    .insert({
      user_id: user.id,
      total_price: totalPrice,
      address: addressString,
      phone: formData.phoneNumber,
    })
    .select()
    .single();

  //6- create Order_items
  const items = cartItems.map((item) => ({
    order_id: order.id,
    product_id: item.product_id,
    quantity: item.quantity,
    price: item.products.price,
  }));

  await supabase.from("order_items").insert(items);

  // 7- clear cartItems
  await clearCart(cart.id);

  return redirect(`/success?orderId=${order.id}`);
}
