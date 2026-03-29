import {
  MdAdd,
  MdCheckCircle,
  MdCleaningServices,
  MdHealthAndSafety,
  MdOutlineShoppingCart,
  MdRemove,
  MdStar,
  MdStarHalf,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import ProductAccordion from "../components/ProductDetails/ProductAccordion.jsx";
import TrustBadges from "../components/ProductDetails/TrustBadges.jsx";
import LoadingSpinner from "../components/UI/LoadingSpinner.jsx";
import { addItemAsync, removeItemAsync } from "../store/slices/cartSlice.js";
import { currencyFormatter } from "../util/formatters.js";

export default function ProductDetails() {
  const { productId } = useParams();
  const dispatch = useDispatch();

  const { items, loading, error } = useSelector((state) => state.products);
  const cartItems = useSelector((state) => state.cart.items || []);

  // Find product from Redux store
  const product = items.find((p) => String(p.id) === String(productId));

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-dark">
        <p className="text-lg text-red-500 font-bold">Error: {error}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center dark:bg-dark dark:text-white">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <Link to="/products" className="text-primary hover:underline">
          Return to Shop
        </Link>
      </div>
    );
  }

  // Find product in cart to get the correct quantity
  const cartItem = cartItems.find(
    (item) =>
      String(item.product_id) === String(product.id) ||
      String(item.id) === String(product.id),
  );

  return (
    <div className="bg-white dark:bg-dark min-h-screen pt-8">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column - Product Image Gallery */}
          <div className="lg:col-span-7 bg-slate-50 dark:bg-secondary/30 rounded-3xl aspect-square flex items-center justify-center p-8 overflow-hidden relative">
            {product.badge && (
              <div
                className={`absolute top-6 left-6 z-10 ${product.badgeColor} text-white text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg`}
              >
                {product.badge}
              </div>
            )}
            <img
              src={product.image}
              alt={product.name}
              fetchPriority="high"
              loading="eager"
              decoding="async"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 rounded-3xl"
            />
          </div>

          {/* Right Column - Product Details */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex text-primary">
                <MdStar />
                <MdStar />
                <MdStar />
                <MdStar />
                <MdStarHalf />
              </div>
              <span className="text-xs font-bold text-slate-500 dark:text-secondary-text">
                ({product.reviews || 128} Reviews)
              </span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-4 tracking-tight">
              {product.name}
            </h1>

            <div className="flex items-baseline gap-4 mb-6">
              <span className="text-3xl font-bold text-primary">
                {currencyFormatter.format(product.price)}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-slate-400 dark:text-secondary-text line-through text-lg font-medium">
                    {currencyFormatter.format(product.originalPrice)}
                  </span>
                  <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-0.5 rounded uppercase">
                    Sale
                  </span>
                </>
              )}
            </div>

            <p className="text-slate-700 dark:text-white/70 text-base leading-relaxed mb-8">
              {product.full_description}
            </p>

            {/* Accordions */}
            <div className="space-y-4 mb-10">
              <ProductAccordion
                title="Usage Instructions"
                icon={MdCleaningServices}
                defaultOpen
              >
                <ol className="list-decimal pl-5 space-y-2">
                  <li>{product.usage}</li>
                </ol>
              </ProductAccordion>

              <ProductAccordion title="Safety Notes" icon={MdHealthAndSafety}>
                <p className="mb-2">{product.safety}</p>
                <p className="font-bold text-primary italic">
                  Non-toxic, biodegradable, and phosphate-free.
                </p>
              </ProductAccordion>
            </div>

            {/* Action Section */}
            <div className="mt-auto bg-white dark:bg-secondary/40 p-6 rounded-2xl border border-slate-100 dark:border-primary/20 shadow-xl shadow-primary/5">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2 text-sm font-bold text-emerald-600 dark:text-emerald-400">
                  <MdCheckCircle className="text-lg" />
                  <span>In Stock — Ready to ship</span>
                </div>
                <span className="text-xs text-slate-500 dark:text-secondary-text">
                  Delivery by Friday
                </span>
              </div>

              <div className="w-full">
                {!cartItem ? (
                  /* Add to Cart Button (Shows only if item is NOT in cart) */
                  <button
                    onClick={() => dispatch(addItemAsync(product))}
                    className="w-full bg-primary hover:bg-primary/90 text-white font-bold rounded-xl py-4 flex items-center justify-center gap-3 shadow-lg shadow-primary/25 active:scale-[0.98] transition-all cursor-pointer"
                  >
                    <MdOutlineShoppingCart className="text-xl" />
                    <span>Add to Cart</span>
                  </button>
                ) : (
                  /* Quantity Controls (Shows only if item IS in cart) */
                  <div className="flex items-center justify-between border-2 border-primary/20 bg-primary/5 dark:bg-primary/10 rounded-xl p-2">
                    <button
                      onClick={() => dispatch(removeItemAsync(product.id))}
                      className="p-3 bg-white dark:bg-dark rounded-lg hover:text-primary shadow-sm transition-colors cursor-pointer text-slate-600 dark:text-white"
                    >
                      <MdRemove size={22} />
                    </button>
                    <div className="flex flex-col items-center">
                      <span className="font-black text-xl text-primary dark:text-primary">
                        {cartItem.quantity}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        In Cart
                      </span>
                    </div>
                    <button
                      onClick={() => dispatch(addItemAsync(product))}
                      className="p-3 bg-white dark:bg-dark rounded-lg hover:text-primary shadow-sm transition-colors cursor-pointer text-slate-600 dark:text-white"
                    >
                      <MdAdd size={22} />
                    </button>
                  </div>
                )}
              </div>

              <p className="text-center text-[11px] uppercase tracking-wider text-slate-400 dark:text-secondary-text mt-5 font-bold">
                Free shipping on orders over $50 • 30-day money back guarantee
              </p>
            </div>
          </div>
        </div>

        {/* Trust Badges extracted component */}
        <TrustBadges />
      </div>
    </div>
  );
}
