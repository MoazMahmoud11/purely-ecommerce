import { MdEco, MdPets, MdRecycling } from "react-icons/md";

export default function ValuesGrid() {
  return (
    <section className="px-10 lg:px-40 py-20">
      <div className="max-w-1200px mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <MdEco className="text-3xl" />
          </div>
          <h4 className="text-lg font-bold">100% Plant-Based</h4>
          <p className="text-sm text-[#6a817f] dark:text-zinc-400">
            Harnessing the natural power of plants to break down dirt and
            bacteria without harsh chemicals.
          </p>
        </div>
        <div className="flex flex-col items-center text-center gap-4">
          <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <MdPets className="text-3xl" />
          </div>
          <h4 className="text-lg font-bold">Cruelty-Free</h4>
          <p className="text-sm text-[#6a817f] dark:text-zinc-400">
            Certified vegan and never tested on animals. We believe in kindness
            for all living beings.
          </p>
        </div>
        <div className="flex flex-col items-center text-center gap-4">
          <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <MdRecycling className="text-3xl" />
          </div>
          <h4 className="text-lg font-bold">Infinite Recycling</h4>
          <p className="text-sm text-[#6a817f] dark:text-zinc-400">
            Our bottles are made from 100% post-consumer recycled materials and
            are fully recyclable.
          </p>
        </div>
      </div>
    </section>
  );
}
