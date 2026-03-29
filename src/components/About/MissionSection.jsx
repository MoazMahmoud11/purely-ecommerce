import { MdArrowForward } from "react-icons/md";

export default function MissionSection() {
  return (
    <section className="px-10 lg:px-40 py-20 bg-white dark:bg-dark">
      {/* Added @container here to support the @[800px] query in children */}
      <div className="@container max-w-1200px mx-auto">
        <div className="flex flex-col items-center mb-16 text-center">
          <h2 className="text-[#121616] dark:text-white text-3xl font-bold tracking-tight mb-4">
            Our Mission
          </h2>
          <div className="h-1 w-20 bg-primary rounded-full" />
        </div>
        <div className="grid grid-cols-1 @[800px]:grid-cols-2 gap-8">
          {/* Mission Card 1 */}
          <div className="group p-8 rounded-3xl bg-gray-50 dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 hover:border-primary/50 transition-all duration-300">
            <div
              className="w-full h-64 bg-center bg-no-repeat bg-cover rounded-2xl mb-6 overflow-hidden"
              data-alt="Detailed macro shot of fresh green botanical leaves"
              style={{
                backgroundImage:
                  'url("/rootAbout.webp")',
              }}
            />
            <h3 className="text-[#121616] dark:text-white text-2xl font-bold mb-4">
              Hygiene and Health
            </h3>
            <p className="text-[#6a817f] dark:text-zinc-400 text-base leading-relaxed mb-6">
              At the intersection of science and nature, we create products that
              ensure your home is a sanctuary for well-being. No compromises, no
              hidden toxins.
            </p>
            <button className="flex items-center gap-2 text-primary font-bold group-hover:gap-4 transition-all cursor-pointer">
              Learn More <MdArrowForward className="text-xl" />
            </button>
          </div>
          {/* Mission Card 2 */}
          <div className="group p-8 rounded-3xl bg-gray-50 dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 hover:border-primary/50 transition-all duration-300">
            <div
              className="w-full h-64 bg-center bg-no-repeat bg-cover rounded-2xl mb-6 overflow-hidden"
              data-alt="Clear water rippling with soft light reflections"
              style={{
                backgroundImage:
                  'url("/waves.webp")',
              }}
            />
            <h3 className="text-[#121616] dark:text-white text-2xl font-bold mb-4">
              Pure Sourcing
            </h3>
            <p className="text-[#6a817f] dark:text-zinc-400 text-base leading-relaxed mb-6">
              We source every ingredient with radical transparency. From
              plant-based surfactants to essential oil scents, every element is
              chosen for safety and efficacy.
            </p>
            <button className="flex items-center gap-2 text-primary font-bold group-hover:gap-4 transition-all cursor-pointer">
              Our Ingredients <MdArrowForward className="text-xl" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
