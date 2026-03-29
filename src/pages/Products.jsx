import { useEffect, useMemo, useState } from "react";
import { BiSolidCartAdd } from "react-icons/bi";
import { HiStar, HiX } from "react-icons/hi";
import {
  HiChevronDown,
  HiOutlineAdjustmentsHorizontal,
  HiOutlineHeart,
} from "react-icons/hi2";
// import { LazyLoadImage } from "react-lazy-load-image-component";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import PriceRangeSlider from "../components/Products/PriceRangeSlider";
import LoadingSpinner from "../components/UI/LoadingSpinner.jsx";
import { addItemAsync } from "../store/slices/cartSlice.js";
import { filterActions } from "../store/slices/filterSlice";
import { currencyFormatter } from "../util/formatters";

// ─── Main Component ───────────────────────────────────────────────────────────
const Products = () => {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const dispatch = useDispatch();
  // const { productId } = useParams();

  const { selectedCategories, priceRange } = useSelector(
    (state) => state.filter,
  );

  const allProducts = useSelector((state) => state.products.items);
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);

  const products = useMemo(() => {
    return allProducts.filter((product) => {
      const inCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category);

      const inPrice =
        product.price >= priceRange[0] && product.price <= priceRange[1];

      return inCategory && inPrice;
    });
  }, [allProducts, selectedCategories, priceRange]);

  const categories = [
    "Washing Powder",
    "Hand Wash",
    "Disinfectant",
    "Surface Cleaner",
    "Dishwashing",
    "Soap",
  ];

  const handleCategoryChange = (category) => {
    dispatch(filterActions.toggleCategory(category));

    const isSelected = selectedCategories.includes(category);
    // Calculate if we will still have categories after this toggle
    const willHaveCategories = isSelected
      ? selectedCategories.length > 1
      : true;

    const params = new URLSearchParams(searchParams);
    if (willHaveCategories) {
      params.set("filter", "active");
      params.set("category", category);
    } else {
      params.delete("filter");
      params.delete("category");
    }
    setSearchParams(params);
  };

  const [searchParams, setSearchParams] = useSearchParams();

  // قراءة الفلتر من الرابط عند الدخول للصفحة أو عند الضغط على رابط من الفوتر
  useEffect(() => {
    const categoryParam = searchParams.get("category");

    // إذا كان هناك فلتر في الرابط وغير موجود في Redux، قم بإضافته
    if (categoryParam && !selectedCategories.includes(categoryParam)) {
      dispatch(filterActions.toggleCategory(categoryParam));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.get("category")]);

  const handleClearFilters = () => {
    dispatch(filterActions.clearFilters());
    setSearchParams({}); // مسح الفلاتر من الرابط أيضاً
  };

  const handlePriceChange = (newRange) => {
    dispatch(filterActions.setPriceRange(newRange));
  };

  if (loading) return <LoadingSpinner />;

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-red-500">Error: {error}</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-secondary dark:text-white">
      {/* Mobile Filter Button */}
      <button
        onClick={() => setIsMobileFilterOpen(true)}
        className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-teal-600 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 font-bold active:scale-95 transition-transform"
      >
        <HiOutlineAdjustmentsHorizontal className="text-white cursor-pointer" />
        Filters
      </button>

      {/* Mobile Filter Overlay */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-white dark:bg-secondary overflow-y-auto flex flex-col lg:hidden">
          {/* Header */}
          <div className="dark:bg-secondary p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <HiOutlineAdjustmentsHorizontal
                className="w-5 h-5 text-teal-600 cursor-pointer"
                strokeWidth={1.8}
              />
              Filters
            </h2>
            <button
              onClick={() => setIsMobileFilterOpen(false)}
              className="p-2"
            >
              <HiX className="w-6 h-6 text-gray-500 cursor-pointer" />
            </button>
          </div>

          {/* Mobile Filter Content */}
          <div className="p-8">
            {/* Category */}
            <div className="mb-10">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-5">
                Category
              </h3>
              <div className="space-y-1">
                {categories.map((category) => (
                  <label
                    key={category}
                    className="flex items-center gap-3 py-2 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                      className="h-5 w-5 rounded border-gray-300 text-teal-600 focus:ring-teal-600 accent-teal-600"
                    />
                    <span className="text-sm font-medium group-hover:text-teal-600 transition-colors">
                      {category}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <PriceRangeSlider
              value={priceRange}
              onChange={handlePriceChange}
              min={10}
              max={150}
            />
          </div>

          {/* Mobile Footer Buttons */}
          <div className="mt-auto p-6 border-t border-gray-100 flex gap-4 bg-white dark:bg-secondary sticky bottom-0">
            <button
              onClick={handleClearFilters}
              className="flex-1 py-4 bg-gray-100 font-bold rounded-xl hover:bg-gray-200 transition-colors dark:bg-secondary dark:hover:border-primary dark:hover:bg-cyan-900 cursor-pointer"
            >
              Clear All
            </button>
            <button
              onClick={() => setIsMobileFilterOpen(false)}
              className="flex-1 py-4 bg-teal-600 text-white font-bold rounded-xl hover:bg-teal-700 transition-colors cursor-pointer"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-72 shrink-0 mb-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 sticky top-28 dark:bg-dark dark:border-primary">
              <div className="flex items-center justify-between mb-8">
                <p className="text-lg font-bold flex items-center gap-2">
                  <HiOutlineAdjustmentsHorizontal className="w-6 h-6 text-teal-600 rotate-90 cursor-pointer" />
                  Filters
                </p>
              </div>

              {/* Category */}
              <div className="mb-10">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-5">
                  Category
                </p>
                <div className="space-y-1">
                  {categories.map((category) => (
                    <label
                      key={category}
                      className="flex items-center gap-3 py-2 cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => handleCategoryChange(category)}
                        className="h-5 w-5 rounded border-gray-300 text-teal-600 focus:ring-teal-600 accent-teal-600"
                      />
                      <span className="text-sm font-medium group-hover:text-teal-600 transition-colors">
                        {category}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <PriceRangeSlider
                value={priceRange}
                onChange={handlePriceChange}
                min={10}
                max={150}
              />

              <button
                onClick={handleClearFilters}
                className="cursor-pointer w-full py-3 bg-teal-600/10 text-teal-600 font-bold text-sm rounded-lg hover:bg-teal-600/20 transition-all flex items-center justify-center gap-2"
              >
                Clear All Filters
              </button>
            </div>
          </aside>

          {/* Products Section */}
          <section className="flex-1">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1 dark:text-white">
                  Purely Essentials
                </h3>
                <p className="text-sm text-gray-500 dark:text-secondary-text">
                  Showing {products.length} products
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium bg-white border dark:bg-dark border-gray-200 dark:border-primary px-4 py-2 rounded-lg cursor-pointer w-full sm:w-auto">
                <span>
                  Sort by: <span className="text-teal-600">Featured</span>
                </span>
                <HiChevronDown className="w-5 h-5 text-gray-400" />
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
              {products.map((product, index) => (
                <div
                  key={product.id}
                  className="group bg-white dark:bg-dark rounded-2xl overflow-hidden border border-gray-100 dark:border-primary shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative aspect-square bg-gray-50 overflow-hidden">
                    {product.badge && (
                      <div
                        className={`absolute top-4 left-4 z-10 ${product.badgeColor} text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded`}
                      >
                        {product.badge}
                      </div>
                    )}
                    <button className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors ">
                      <HiOutlineHeart className="w-5 h-5 text-gray-400 hover:text-red-500 transition-colors duration-200 cursor-pointer" />
                    </button>
                    <Link
                      to={`/products/${product.id}`}
                      className="block w-full h-full"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        fetchPriority={index < 6 ? "high" : "auto"}
                        loading={index < 6 ? "eager" : "lazy"}
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </Link>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-1 mb-2">
                      <HiStar className="w-4 h-4 text-yellow-400" />
                      <span className="text-xs font-bold text-gray-600 dark:text-secondary-text">
                        {product.rating} ({product.reviews} reviews)
                      </span>
                    </div>
                    <Link to={`/products/${product.id}`}>
                      <p className="text-lg font-bold mb-1 hover:text-teal-600 transition-colors">
                        {product.name}
                      </p>
                    </Link>
                    <p className="text-sm text-gray-400 mb-4 line-clamp-1 dark:text-secondary-text">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-xl font-black text-teal-600">
                          {currencyFormatter.format(product.price)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs text-gray-400 line-through">
                            {currencyFormatter.format(product.originalPrice)}
                          </span>
                        )}
                      </div>

                      <button
                        className="w-10 h-10 rounded-full bg-teal-600 text-white flex items-center justify-center hover:bg-gray-800 transition-all shadow-md active:scale-95 cursor-pointer"
                        onClick={() => dispatch(addItemAsync(product))}
                      >
                        <BiSolidCartAdd className="w-7 h-7" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            <div className="mt-16 flex justify-center mb-8">
              <button className="px-10 py-4 border-2 border-gray-300 text-gray-600 dark:text-secondary-text cursor-pointer font-bold rounded-xl hover:border-teal-600 hover:text-teal-600 transition-all">
                Load More Products
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Products;

// export async function loader(){
//   return await fetchProducts();
// }
