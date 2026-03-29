import { MdChevronRight } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

const CheckoutNav = () => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="flex items-center gap-2 mb-10 text-sm font-medium text-gray-500 dark:text-gray-400">
      <Link to="/cart" className="hover:text-teal-600 transition-colors">
        Cart
      </Link>

      <MdChevronRight className="text-lg" />

      <Link
        to="/checkout"
        className={`transition-colors ${path === "/checkout" ? "text-teal-600 font-bold dark:text-teal-500" : "hover:text-teal-600"}`}
      >
        Shipping & Payment
      </Link>

      <MdChevronRight className="text-lg" />

      <span
        className={
          path === "/checkout/confirmation"
            ? "text-teal-600 font-bold dark:text-teal-500"
            : ""
        }
      >
        Confirmation
      </span>
    </div>
  );
};

export default CheckoutNav;
