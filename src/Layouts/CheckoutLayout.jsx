import { Outlet } from "react-router-dom";
import CheckoutNav from "../components/Checkout/CheckoutNav.jsx";

const CheckoutLayout = () => {
  return (
    <div className="w-full pt-8 pb-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <CheckoutNav />
        <Outlet />
      </div>
    </div>
  );
};

export default CheckoutLayout;
