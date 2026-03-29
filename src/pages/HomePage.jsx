import { useMemo } from "react";
import { FaArrowRight } from "react-icons/fa6";
import {
  MdOutlineEnergySavingsLeaf,
  MdOutlineRecycling,
  MdOutlineShoppingBag,
} from "react-icons/md";
import { RiSparkling2Line } from "react-icons/ri";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FeatureItem from "../components/FeatureItem";
import HeroSection from "../components/HeroSection.jsx";
import { addItemAsync } from "../store/slices/cartSlice.js";
import { currencyFormatter } from "../util/formatters.js";

export default function HomePage() {
  const dispatch = useDispatch();
  // instead of using the products and then slice it again
  const allProducts = useSelector((state) => state.products.items);
  const fourProducts = useMemo(() => allProducts.slice(0, 4), [allProducts]);

  return (
    <div className="bg-white text-black dark:bg-dark dark:text-white">
      <section className="max-w-6xl mx-auto px-6 py-12 md:py-10 grid md:grid-cols-2 gap-12 items-center">
        <HeroSection
          badge={"Eco-Conscious Living"}
          titleOne="Purity in,"
          titleTwo="Every Drop"
          description="Experience a new standard of Purely. Our plant-based formulas deliver professional-grade cleaning without harsh chemicals, keeping your home and planet safe."
          fButton="Shop Now"
          sButton={"View Collections"}
          imageProps={{
            src: "./HeroSectionImage.webp", // products[1]?.image ||
            alt: "Product image",
            fetchPriority: "high",
            loading: "eager",
          }}
        ></HeroSection>
      </section>

      {/* ✅ Features Section برا الـ Grid */}
      <section className="w-full bg-neutral-50 py-12 border-y border-slate-100 dark:bg-secondary/50 dark:text-white dark:border-secondary">
        <div className="w-full max-w-7xl mx-auto px-6">
          <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-8">
            {/* Plant-Based */}
            <div className="flex items-center gap-3 ">
              <div className="w-11 h-11 rounded-full bg-white dark:bg-stone-950 shadow-sm flex items-center justify-center shrink-0 ">
                <MdOutlineEnergySavingsLeaf color="rgb(51,153,145)" size={24} />
              </div>
              <div>
                <h4 className="font-semibold text-sm text-slate-900 dark:text-white ">
                  Plant-Based
                </h4>
                <p className="text-xs text-slate-500">No harsh chemicals</p>
              </div>
            </div>

            {/* Sustainable */}
            <div className="flex items-center gap-3 border-l-0 md:border-l border-slate-200 md:pl-8">
              <div className="w-10 h-10 rounded-full bg-white dark:bg-stone-950 shadow-sm flex items-center justify-center shrink-0">
                <MdOutlineRecycling color="rgb(51,153,145)" size={23} />
              </div>
              <div>
                <h4 className="font-semibold text-sm text-slate-900  dark:text-white ">
                  Sustainable
                </h4>
                <p className="text-xs text-slate-500">100% Recyclable</p>
              </div>
            </div>

            {/* Powerful Clean */}
            <div className="flex items-center gap-3 border-l-0 md:border-l border-slate-200 md:pl-8 col-span-2 md:col-span-1">
              <div className="w-10 h-10 rounded-full bg-white dark:bg-stone-950 shadow-sm flex items-center justify-center shrink-0">
                <RiSparkling2Line color="rgb(51,153,145)" size={23} />
              </div>
              <div>
                <h4 className="font-semibold text-sm text-slate-900  dark:text-white ">
                  Powerful Clean
                </h4>
                <p className="text-xs text-slate-500">Tough on stains</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section     */}
      <section className="py-24 bg-white dark:bg-dark ">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="flex items-end justify-between mb-12">
            <div className="space-y-2">
              <p className="text-primary font-bold tracking-widest text-xs uppercase">
                Curated Collection
              </p>
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
                Featured Products
              </h2>
            </div>

            <Link
              to="/products"
              className="hidden sm:flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all"
            >
              View All Collections
              <FaArrowRight size={18} />
            </Link>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {fourProducts.map((product) => (
              <div
                key={product.id}
                className="group relative bg-white border border-slate-100 dark:bg-secondary dark:border-secondary  rounded-2xl overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-1"
              >
                {/* Image */}
                <div className="aspect-square bg-slate-50 overflow-hidden">
                  <Link
                    to={`/products/${product.id}`}
                    className="block w-full h-full"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </Link>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-1">
                    <Link to={`/products/${product.id}`}>
                      <h5 className="font-bold text-slate-900 text-lg dark:text-white hover:text-primary transition-colors">
                        {product.name}
                      </h5>
                    </Link>
                    <span className="text-primary font-bold">
                      {currencyFormatter.format(product.price)}
                    </span>
                  </div>

                  <p className="text-sm text-slate-500 mb-6">
                    {product.description.length > 10
                      ? product.description.slice(0, 70) + "..."
                      : product.description}
                  </p>

                  <button
                    onClick={() => dispatch(addItemAsync(product))}
                    className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary transition-colors cursor-pointer"
                  >
                    <MdOutlineShoppingBag size={18} />
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile View All */}
          <div className="text-center mt-8 sm:hidden ">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-primary font-bold"
            >
              View All Collections
              <FaArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 bg-neutral-100 relative dark:bg-secondary dark:text-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center ">
          {/* Left Side - Images Grid */}
          <div className="order-2 md:order-1 relative ">
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-3/4 rounded-2xl overflow-hidden translate-y-8 bg-slate-200">
                {!fourProducts[0]?.image ? null : (
                  <img
                    src={fourProducts[0].image}
                    alt={fourProducts[0].name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              <div className="aspect-3/4 rounded-2xl overflow-hidden bg-slate-200">
                {!fourProducts[0]?.image ? null : (
                  <img
                    src={fourProducts[2].image}
                    alt={fourProducts[2].name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </div>

            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
          </div>

          {/* Right Side - Content */}
          <div className="order-1 md:order-2 space-y-8 ">
            <h2 className="text-4xl font-extrabold text-slate-900 leading-tight dark:text-white">
              Why the world is <br />
              switching to Purely
            </h2>

            <div className="space-y-6 dark:text-white">
              <FeatureItem
                title="Health First Design"
                description="Formulated without endocrine disruptors, VOCs, or synthetic fragrances."
              />
              <FeatureItem
                title="Circular Packaging"
                description="Every bottle is part of our closed-loop refill program. Return, reuse, repeat."
              />
              <FeatureItem
                title="Verified Efficacy"
                description="Lab-tested to kill 99.9% of bacteria using only citric and lactic acid."
              />
            </div>

            <button className="text-primary font-bold flex items-center gap-2 group hover:gap-3 transition-all">
              Read Our Transparency Report
              <FaArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-900 text-white overflow-hidden relative dark:bg-stone-950/10 ">
        {/* Content */}
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            Join the Clean Revolution
          </h2>

          {/* Description */}
          <p className="text-slate-400 mb-10 max-w-xl mx-auto text-lg">
            Subscribe to get 15% off your first order and stay updated on our
            latest eco-friendly innovations.
          </p>

          {/* Newsletter Form */}
          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto dark:text-secondary-text">
            <input
              className="flex-1 bg-white/10 border border-white/20 rounded-xl px-6 py-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              placeholder="Enter your email"
              type="email"
              required
            />
            <button
              type="submit"
              className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 group"
            >
              Subscribe
              <FaArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </form>

          {/* Privacy Note */}
          <p className="text-slate-500 text-sm mt-6 dark:text-secondary-text">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>

        {/* Background Decorations */}
        <div className="absolute -top-24 -left-24 size-64 bg-primary/10 rounded-full blur-3xl"></div>
        {/* <div className='absolute -bottom-24 -right-24 size-24 bg-slate-800 rounded-full blur-3xl opacity-50'></div> */}

        {/* Additional decoration */}
        <div className="absolute top-1/2 right-10 w-45 h-45 bg-primary/30 rounded-full blur-3xl  "></div>
      </section>
    </div>
  );
}
