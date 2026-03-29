import CheckoutForm from "../components/Checkout/CheckoutForm";
import OrderSummary from "../components/Checkout/OrderSummary";

const Checkout = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative">
      {/* Left Column: Checkout Form */}
      <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-6">
        <section>
          <p className="text-4xl font-black tracking-normal mb-2 text-gray-900 dark:text-white">
            Checkout
          </p>
          <p className="text-gray-500 dark:text-gray-400">
            Complete your Purely and cleaning essentials order.
          </p>
        </section>
        <CheckoutForm />
      </div>

      {/* Right Column: Order Summary */}
      <div className="lg:col-span-5 xl:col-span-4 w-full h-full relative">
        <div className="sticky top-28">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
