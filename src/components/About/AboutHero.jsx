import { Link } from "react-router-dom";

export default function AboutHero() {
  return (
    <section className="px-10 lg:px-40 py-16">
      <div className="@container max-w-1200px mx-auto">
        <div className="flex flex-col gap-10 @[864px]:flex-row items-center">
          <div
            className="w-full @[864px]:w-1/2 aspect-square bg-center bg-no-repeat bg-cover rounded-3xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
            data-alt="A clean, minimalist bathroom with sunlight streaming through a window"
            style={{
              backgroundImage:
                'url("/AboutHerosection.webp")',
            }}
          />
          <div className="flex flex-col gap-8 @[864px]:w-1/2 @[864px]:pl-12">
            <div className="flex flex-col gap-4">
              <span className="text-primary font-bold tracking-widest text-xs uppercase">
                Our Story
              </span>
              <h1 className="text-[#121616] dark:text-white text-5xl font-black leading-tight tracking-[-0.033em] @[480px]:text-6xl">
                Elevating Home Hygiene
              </h1>
              <p className="text-[#6a817f] dark:text-zinc-400 text-lg font-normal leading-relaxed">
                Redefining the standard of clean with natural ingredients that
                protect your family and the planet. We believe that a healthy
                home is the foundation for a healthy life.
              </p>
            </div>
            <div className="flex gap-4">
              <Link to='/products' className="flex min-w-160px items-center justify-center rounded-full h-14 px-8 bg-primary text-white text-base font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 cursor-pointer">
                Explore Products
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
