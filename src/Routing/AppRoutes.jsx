import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { authAction } from "./Actions/authAction.js";

import AuthLayout from "../Layouts/AuthLayout.jsx";
import CheckoutLayout from "../Layouts/CheckoutLayout.jsx";
import ProductsLayout from "../Layouts/ProductsLayout";
import RootLayout from "../Layouts/Root";
import ErrorPage from "../pages/Error";
// import LoadingSpinner from "../components/UI/LoadingSpinner.jsx";

const HomePage = React.lazy(() => import("../pages/HomePage.jsx"));
const Products = React.lazy(() => import("../pages/Products.jsx"));
const AboutPage = React.lazy(() => import("../pages/About.jsx"));
const Features = React.lazy(() => import("../pages/Features.jsx"));
const CartPage = React.lazy(() => import("../pages/Cart.jsx"));
const ProductDetails = React.lazy(() => import("../pages/ProductDetails.jsx"));
const Checkout = React.lazy(() => import("../pages/Checkout.jsx"));
const SuccessOrder = React.lazy(() => import("../pages/SuccessOrder.jsx"));
const Authentication = React.lazy(() => import("../pages/Authentication.jsx"));
const AuthCallback = React.lazy(() => import("../pages/AuthCallback.jsx"));

import { getCurrentUser } from "../services/authService.js";
import store from "../store/index.js";
import { authActions } from "../store/slices/authSlice.js";
import { fetchCart } from "../store/slices/cartSlice.js";
import { checkoutAction } from "./Actions/checkoutAction.js";
import { requireAuth } from "./loaders/checkAuthLoader.js";
import { orderLoader } from "./loaders/orderLoader.js";
import { productsLoader } from "./loaders/productsLoader.js";
import Contact from "../pages/Contact.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    id: "root",
    loader: async (args) => {
      const [user] = await Promise.all([
        getCurrentUser(),
        productsLoader(store)(args),
      ]);

      store.dispatch(authActions.setUser(user));
      if (user) await store.dispatch(fetchCart());

      return { user };
    },

    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "products",
        element: <ProductsLayout />,
        children: [
          {
            index: true,
            element: <Products />,
          },
          { path: ":productId", element: <ProductDetails /> },
        ],
      },

      { path: "features", element: <Features /> },
      { path: "about", element: <AboutPage /> },
      { path: 'contact', element: <Contact />},
      { path: "cart", element: <CartPage />, loader: requireAuth }, // Apply requireAuth to cart
      {
        path: "checkout",
        element: <CheckoutLayout />,

        children: [
          { index: true, element: <Checkout />, action: checkoutAction },
        ],
      },
      { path: "success", element: <SuccessOrder />, loader: orderLoader },
    ],
  },

  {
    element: <AuthLayout />,
    path: "/auth",
    // The action for authentication is defined here
    children: [
      { index: true, element: <Authentication />, action: authAction },
      { path: "callback", element: <AuthCallback /> },
    ],
  },
]);
