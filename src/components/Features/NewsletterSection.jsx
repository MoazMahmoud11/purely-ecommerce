import NewsletterForm from "./NewsletterForm";

function NewsletterSection() {
  return (
    <section className="mt-32 p-10 lg:p-16 rounded-3xl bg-[#121616] text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full -mr-32 -mt-32 blur-3xl" />
      <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl lg:text-4xl font-extrabold mb-4">
            Join the clean revolution.
          </h2>
          <p className="text-gray-400 text-lg">
            Receive 15% off your first order and exclusive access to new product drops.
          </p>
        </div>
        <NewsletterForm />
      </div>
    </section>
  );
}

export default NewsletterSection;