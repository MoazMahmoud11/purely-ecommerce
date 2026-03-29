import { MdCheckCircle } from "react-icons/md";

export default function QualityCommitment() {
  return (
    <section className="px-10 lg:px-40 py-24 bg-dark text-white rounded-t-[4rem]">
      <div className="max-w-1200px mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl font-bold tracking-tight">
              Our Quality Commitment
            </h2>
            <p className="text-zinc-400 text-lg leading-relaxed">
              Quality is not just a metric for us; it's a promise. Every batch
              of our cleaning solution undergoes 48 hours of stability testing
              and microbial analysis before it ever reaches your home.
            </p>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MdCheckCircle className="text-primary text-2xl shrink-0" />
                <div>
                  <h5 className="font-bold text-lg">Third-Party Verified</h5>
                  <p className="text-zinc-500 text-sm">
                    Independently tested for efficacy against common household
                    pathogens.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MdCheckCircle className="text-primary text-2xl shrink-0" />
                <div>
                  <h5 className="font-bold text-lg">
                    Zero Synthetic Fragrance
                  </h5>
                  <p className="text-zinc-500 text-sm">
                    We only use therapeutic-grade essential oils for a natural,
                    clean scent profile.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MdCheckCircle className="text-primary text-2xl shrink-0" />
                <div>
                  <h5 className="font-bold text-lg">Skin Safe Certification</h5>
                  <p className="text-zinc-500 text-sm">
                    Dermatologically tested to be safe for sensitive skin and
                    allergy sufferers.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div
              className="aspect-4/5 bg-center bg-no-repeat bg-cover rounded-3xl"
              data-alt="A scientist testing clear liquids in a modern laboratory setting"
              style={{
                backgroundImage: 'url("/person.webp")',
              }}
            />
            <div className="absolute -bottom-8 -left-8 bg-primary p-8 rounded-3xl hidden xl:block">
              <p className="text-4xl font-black italic">100%</p>
              <p className="text-sm font-bold uppercase tracking-widest opacity-80">
                Toxic-Free Guarantee
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
