import {
  MdCheckCircle,
  MdHome,
  MdLocalShipping,
  MdOutlineShoppingBag,
} from "react-icons/md";
import { Link, useLoaderData } from "react-router-dom";
import { currencyFormatter } from "../util/formatters.js";

const SuccessOrder = () => {
  const order = useLoaderData();

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-dark flex items-center justify-center p-4 py-12 overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2xl h-2xl bg-primary/20 -z-10 rounded-full blur-3xl opacity-50"></div>

      <div className="flex flex-col max-w-2xl w-full bg-white dark:bg-secondary/40 shadow-xl shadow-black/5 rounded-2xl border border-gray-100 dark:border-primary/10 p-8 md:p-12 relative z-10">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary">
            <MdCheckCircle className="text-6xl" />
          </div>
        </div>

        {/* Headline & Body */}
        <h1 className="text-slate-900 dark:text-white tracking-tight text-3xl md:text-4xl font-extrabold leading-tight text-center pb-3">
          Thank you for your order!
        </h1>
        <p className="text-slate-600 dark:text-secondary-text text-base font-normal leading-relaxed text-center max-w-md mx-auto mb-10">
          A confirmation email has been sent to your inbox. Your hygiene
          supplies are being prepared for shipment and will arrive shortly.
        </p>

        {/* Order Stats Grid */}
        <div className="flex flex-wrap gap-4 mb-10">
          <div className="flex min-w-xs flex-1 flex-col gap-1 rounded-xl p-5 border border-gray-100 dark:border-white/10 bg-gray-50/50 dark:bg-dark/50">
            <p className="text-slate-500 dark:text-secondary-text text-xs font-semibold uppercase tracking-wider">
              Order ID
            </p>
            <p className="text-primary tracking-tight text-xl font-bold leading-tight">
              #{order.id.toString().slice(0, 8).toUpperCase()}
            </p>
          </div>
          <div className="flex min-w-xs flex-1 flex-col gap-1 rounded-xl p-5 border border-gray-100 dark:border-white/10 bg-gray-50/50 dark:bg-dark/50">
            <p className="text-slate-500 dark:text-secondary-text text-xs font-semibold uppercase tracking-wider">
              Order Status
            </p>
            <p className="text-slate-900 dark:text-white tracking-tight text-xl font-bold leading-tight">
              {order.status || "Processing"}
            </p>
          </div>
        </div>

        {/* Order Summary */}
        <div className="mb-10">
          <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-tight mb-4 flex items-center gap-2">
            <MdOutlineShoppingBag className="text-primary text-xl" />
            Order Summary
          </h3>

          <div className="space-y-4">
            {order.order_items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 py-3 border-b border-gray-50 dark:border-white/10 last:border-0"
              >
                <div className="size-16 rounded-xl bg-gray-100 dark:bg-dark overflow-hidden shrink-0">
                  <img
                    className="w-full h-full object-cover"
                    alt={item.products.name}
                    src={item.products.image}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-slate-900 dark:text-white line-clamp-1">
                    {item.products.name}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-secondary-text">
                    {item.products.description?.length > 40
                      ? item.products.description.slice(0, 40) + "..."
                      : item.products.description}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-slate-900 dark:text-white">
                    x {item.quantity}
                  </p>
                  <p className="text-sm text-primary font-medium">
                    {currencyFormatter.format(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-100 dark:border-white/10">
            <div className="flex justify-between items-center">
              <span className="text-slate-600 dark:text-secondary-text font-medium">
                Order Total
              </span>
              <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
                {currencyFormatter.format(order.total_price)}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/"
            className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold py-4 px-6 rounded-xl text-center transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
          >
            <MdHome className="text-xl" />
            Back to Home
          </Link>
          <button className="flex-1 bg-white dark:bg-dark border-2 border-primary/20 hover:border-primary text-primary dark:text-primary font-bold py-4 px-6 rounded-xl text-center transition-all flex items-center justify-center gap-2 cursor-pointer">
            <MdLocalShipping className="text-xl" />
            Track Order
          </button>
        </div>

        {/* Support Footer */}
        <div className="mt-12 text-center border-t border-gray-100 dark:border-white/10 pt-8">
          <p className="text-sm text-slate-500 dark:text-secondary-text">
            Need help with your order?{" "}
            <span
              className="text-primary font-bold hover:underline"
            >
              Contact Support
            </span>{" "}
            or visit our{" "}
            <span  className="text-primary font-bold hover:underline">
              FAQ
            </span>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuccessOrder;
