import { MdArrowForward } from "react-icons/md";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { useNavigation } from "react-router-dom";
import { currencyFormatter } from "../../util/formatters.js";

const OrderSummary = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  // 1. Get Cart Items from Redux
  const cartItems = useSelector((state) => state.cart.items || []);

  // 2. Calculate Totals
  const totalItems = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartItems]);
  
  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + (item.products?.price || 0) * (item.quantity || 1), 0);
  }, [cartItems]);

  const taxRate = 0.08; // 8% Tax
  const taxes = useMemo(() => subtotal * taxRate, [subtotal]);
  const total = useMemo(() => subtotal + taxes, [subtotal, taxes]);

  return (
    <div className="w-full shrink-0 bg-white dark:bg-zinc-900/40 border border-gray-100 dark:border-white/5 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col gap-6">
      <h2 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white mb-2">
        Order Summary
      </h2>

      {/* List of Cart Items */}
      <div className="flex flex-col gap-y-4">
        {cartItems.map((item) => (
          <div key={item.product_id} className="flex items-center gap-4">
            {/* Product Image */}
            <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 border border-gray-100 dark:border-white/10">
              <img
                src={item.products.image}
                alt={item.products.name}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Product Details */}
            <div className="flex-1 flex flex-col">
              <p className="font-bold text-gray-900 dark:text-white line-clamp-1">
                {item.products.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
                {item.products.description?.length > 40
                  ? item.products.description.slice(0, 40) + "..."
                  : item.products.description}
              </p>
            </div>

            {/* Quantity and Price */}
            <div className="text-right">
              <p className="font-bold text-gray-900 dark:text-white">
                {item.quantity} x{" "}
                {currencyFormatter.format(item.products.price)}
              </p>
              <p className="text-sm text-primary font-medium">
                {currencyFormatter.format(item.quantity * item.products.price)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <hr className="border-gray-100 dark:border-white/10" />

      {/* Subtotal, Shipping, Taxes, Total */}
      <div className="space-y-4">
        <div className="flex justify-between items-center text-gray-600 dark:text-gray-400">
          <span className="font-medium">Subtotal ({totalItems} Items)</span>
          <span className="font-bold text-gray-900 dark:text-white">
            {currencyFormatter.format(subtotal)}
          </span>
        </div>
        <div className="flex justify-between items-center text-gray-600 dark:text-gray-400">
          <span className="font-medium">Shipping</span>
          <span className="font-bold text-teal-600">FREE</span>
        </div>
        <div className="flex justify-between items-center text-gray-600 dark:text-gray-400">
          <span className="font-medium">Taxes</span>
          <span className="font-bold text-gray-900 dark:text-white">
            {currencyFormatter.format(taxes)}
          </span>
        </div>
      </div>

      <hr className="border-gray-100 dark:border-white/10" />

      <div className="flex justify-between items-center">
        <span className="text-lg font-black text-gray-900 dark:text-white">
          Total
        </span>
        <span className="text-2xl font-black text-teal-600">
          {currencyFormatter.format(total)}
        </span>
      </div>

      <button
        className={`w-full mt-4 bg-teal-600 text-white font-extrabold py-4 rounded-2xl transition-all shadow-lg shadow-teal-600/20 flex items-center justify-center gap-2 group ${isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:bg-teal-700 cursor-pointer"}`}
        type="submit"
        form="checkout-form"
        disabled={isSubmitting}
      >
        <span>{isSubmitting ? "Submitting..." : "Complete Purchase"}</span>
        {!isSubmitting && (
          <MdArrowForward className="text-xl group-hover:translate-x-1 transition-transform" />
        )}
      </button>
    </div>
  );
};

export default OrderSummary;