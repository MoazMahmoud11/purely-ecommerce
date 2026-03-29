import { Link } from "react-router-dom";


export default function FinalCTA() {
  return (
    <section className="px-10 lg:px-40 py-24 text-center">
      <div className="max-w-800px mx-auto space-y-8">
        <h2 className="text-3xl font-bold">Ready to transform your home?</h2>
        <p className="text-[#6a817f] dark:text-zinc-400">
          Experience the difference of nature-powered Purely today. Free
          shipping on your first order over $50.
        </p>
        <Link
          to="/products"
          className="
            flex mx-auto items-center justify-center
            rounded-full h-14
            w-full lg:w-md md:w-md
            px-12
            bg-primary text-white text-base font-bold
            hover:scale-105 transition-all cursor-pointer
          "
        >
          Start Shopping
        </Link>
      </div>
    </section>
  );
}
