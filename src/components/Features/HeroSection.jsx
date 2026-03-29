
const HeroSection = () => {
    return (
        <section className="text-center mb-16 lg:mb-24">
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest uppercase bg-primary/10 text-primary rounded-full">
                Why Choose Us
            </span>
            <h1 className="text-4xl lg:text-6xl font-extrabold mb-6 tracking-tight leading-tight text-gray-900 dark:text-white">
                Better for you. <br />
                <span className="text-primary">Kinder to the planet.</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400 font-medium">
                We believe that a clean home should never come at the cost of your health or the environment.
                Discover the standards that define our platform.
            </p>
        </section>
    );
};

export default HeroSection;