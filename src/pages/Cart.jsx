import { useEffect } from "react";
import {
  MdAdd,
  MdArrowForward,
  MdLoyalty,
  MdOutlineDelete,
  MdRemove,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  addItemAsync,
  deleteItemAsync,
  fetchCart,
  removeItemAsync,
} from "../store/slices/cartSlice.js";
import { currencyFormatter } from "../util/formatters.js";
import LoadingSpinner from "../components/UI/LoadingSpinner.jsx";

export default function CartPage() {
  const dispatch = useDispatch();
  // Safe destructuring: defaults to empty object/array if state.cart is undefined
  const {
    items = [],
    loading,
    error,
  } = useSelector((state) => state.cart || {});

  // Re-added the fetchCart useEffect
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  // Loading State
  if (loading) {
    return (
      <LoadingSpinner />
    );
  }

  // Error State
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-red-500 font-bold">Error: {error}</p>
      </div>
    );
  }

  // Empty State
  if (!items || totalItems === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 px-4 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Your cart is empty
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          Looks like you haven't added anything yet.
        </p>
        <Link
          to="/products"
          className="px-8 py-3 bg-teal-600 text-white rounded-full font-bold hover:bg-teal-700 transition-all shadow-lg hover:shadow-xl"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  // Order Math calculations
  const subtotal = items.reduce(
    (total, item) => total + (item.products?.price || 0) * (item.quantity || 1),
    0,
  );
  const taxRate = 0.08; // 8% Tax example
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  // Main Cart List
  return (
    <div className="max-w-1280px mx-auto px-4 md:px-6 py-12">
      {/* Header */}
      <div className="mb-10">
        <h2 className="text-4xl font-black tracking-tight mb-2 text-gray-900 dark:text-white">
          Your Shopping Cart
        </h2>
        <p className="text-gray-500 dark:text-gray-400 font-medium">
          You have {totalItems} item{totalItems !== 1 ? "s" : ""} in your bag.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left Column: Items */}
        <div className="grow space-y-6">
          {items.map((item) => (
            <div
              key={item.product_id}
              className="flex items-center gap-6 bg-white dark:bg-zinc-900/40 p-6 rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-md transition-all duration-300"
            >
              {/* Product Image */}
              <div
                className="h-24 w-24 sm:h-32 sm:w-32 rounded-xl bg-gray-100 dark:bg-zinc-800 overflow-hidden shrink-0"
              >
                <img 
                  src={item.products?.image} 
                  alt={item.products?.name} 
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Product Details & Actions */}
              <div className="grow flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="text-lg font-bold leading-tight text-gray-900 dark:text-white">
                    {item.products?.name || "Unknown Product"}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                    {item.products?.category || "Essential Collection"}
                  </p>
                  <p className="text-teal-600 font-bold mt-2">
                    {currencyFormatter.format(item.products?.price || 0)}{" "}
                    <span className="text-xs text-gray-400 dark:text-gray-500 font-normal">
                      / unit
                    </span>
                  </p>
                </div>

                <div className="flex items-center gap-8">
                  {/* Quantity Controls */}
                  <div className="flex items-center border border-gray-200 dark:border-white/10 rounded-xl p-1 bg-gray-50 dark:bg-white/5">
                    <button
                      onClick={() => dispatch(removeItemAsync(item.product_id))}
                      className="h-8 w-8 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-white/10 rounded-lg text-gray-500 transition-colors cursor-pointer"
                    >
                      <MdRemove className="text-lg" />
                    </button>
                    <input
                      readOnly
                      className="w-10 text-center font-bold text-sm bg-transparent border-none focus:ring-0 outline-none text-gray-900 dark:text-white"
                      type="number"
                      value={item.quantity}
                    />
                    <button
                      onClick={() => dispatch(addItemAsync(item.products))}
                      className="h-8 w-8 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-white/10 rounded-lg text-teal-600 transition-colors cursor-pointer"
                    >
                      <MdAdd className="text-lg" />
                    </button>
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={() => dispatch(deleteItemAsync(item.product_id))}
                    className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                  >
                    <MdOutlineDelete size={24} />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Eco Reward Banner */}
          <div className="bg-teal-600/5 dark:bg-teal-600/10 border border-teal-600/10 dark:border-teal-600/20 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
            <div className="flex items-center gap-4">
              <MdLoyalty className="text-teal-600 text-3xl shrink-0" />
              <div>
                <p className="font-bold text-teal-600">Eco-Reward Member</p>
                <p className="text-sm text-teal-600/80">
                  You're $5.00 away from free carbon-neutral shipping!
                </p>
              </div>
            </div>
            <Link
              to="/products"
              className="text-sm font-bold text-teal-600 hover:underline transition-all whitespace-nowrap"
            >
              Continue Shopping
            </Link>
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:w-400px shrink-0">
          <div className="sticky top-28 bg-white dark:bg-zinc-900/40 border border-gray-100 dark:border-white/5 rounded-2xl p-8 shadow-2xl">
            <h2 className="text-3xl font-black mb-6 text-gray-900 dark:text-white">
              Order Summary
            </h2>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center text-gray-600 dark:text-gray-400">
                <span className="font-medium">Subtotal</span>
                <span className="font-bold text-gray-900 dark:text-white">
                  {currencyFormatter.format(subtotal)}
                </span>
              </div>
              <div className="flex justify-between items-center text-gray-600 dark:text-gray-400">
                <span className="font-medium">Shipping</span>
                <span className="font-bold text-teal-600">FREE</span>
              </div>
              <div className="flex justify-between items-center text-gray-600 dark:text-gray-400">
                <span className="font-medium">Tax</span>
                <span className="font-bold text-gray-900 dark:text-white">
                  {currencyFormatter.format(tax)}
                </span>
              </div>
              <div className="h-px bg-gray-100 dark:bg-white/10 w-full my-4" />
              <div className="flex justify-between items-center">
                <span className="text-lg font-black text-gray-900 dark:text-white">
                  Total
                </span>
                <span className="text-2xl font-black text-teal-600">
                  {currencyFormatter.format(total)}
                </span>
              </div>
            </div>

            <Link
              to="/checkout"
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-extrabold py-4 rounded-xl transition-all shadow-lg shadow-teal-600/20 flex items-center justify-center gap-2 group"
            >
              <span>Proceed to Checkout</span>
              <MdArrowForward className="text-xl group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
