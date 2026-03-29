import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

function ProductsNav() {
  const location = useLocation();
  const pathParts = location.pathname.split("/").filter(Boolean);

  // Check if we are deeper than exactly "/products"
  const isProductDetails = pathParts.length > 1 && pathParts[0] === "products";
  const productId = isProductDetails ? pathParts[1] : null;

  // Fetch product from Redux
  const product = useSelector((state) =>
    productId
      ? state.products.items.find((p) => String(p.id) === String(productId))
      : null,
  );

  return (
    <nav className="px-7 pt-6 pb-5 max-w-7xl mx-auto text-sm dark:bg-secondary">
      <ul className="flex items-center space-x-2 text-gray-700 text-sm tracking-tighter dark:bg-secondary">
        <li>
          <Link
            to="/"
            className="hover:text-teal-600 transition-colors text-gray-500 dark:text-white"
          >
            Home
          </Link>
          <span className="ml-2 text-gray-300">/</span>
        </li>

        {!isProductDetails ? (
          <li className="font-semibold text-gray-800 dark:text-white">
            Products
          </li>
        ) : (
          <>
            <li>
              <Link
                to="/products"
                className="hover:text-teal-600 transition-colors text-gray-500 dark:text-white"
              >
                Products
              </Link>
              <span className="ml-2 text-gray-300">/</span>
            </li>
            {product && (
              <li className="font-semibold text-gray-800 dark:text-white truncate max-w-200px sm:max-w-md">
                {product.name}
              </li>
            )}
          </>
        )}
      </ul>
    </nav>
  );
}

export default ProductsNav;
