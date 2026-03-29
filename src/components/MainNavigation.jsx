// import { Bubbles } from 'lucide-react';
import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import { LuShoppingCart } from "react-icons/lu";
import {
  MdOutlineDarkMode,
  MdOutlineLightMode,
  MdOutlineMenu,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logout } from "../services/authService.js";
import { uiActions } from "../store/slices/uiSlice.js";
import BubblesIcon from "./Bubbles/BubblesIcon.jsx";

const navLinkClass = ({ isActive }) =>
  `text-sm md:text-sm font-semibold transition-colors px-4 py-3 md:px-3 md:py-2 block rounded-lg ${
    isActive
      ? "text-[rgb(51,153,145)] bg-white/10 md:bg-transparent"
      : "text-white hover:text-[rgb(51,153,145)] hover:bg-white/5 md:hover:bg-transparent"
  }`;

export default function MainNavigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.ui.theme);
  const cartItemCount = useSelector((state) => state.cart.items.length);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  // toggle theme
  function HandleToggleTheme() {
    dispatch(uiActions.toggleTheme());
  }

  // Close menu when screen size changes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <header className="w-full bg-[#1A1A1A] px-4 md:px-6 lg:px-32 py-5 sticky top-0 z-50 shadow-lg ">
        <nav className="flex items-center justify-between">
          {/* LEFT: Logo */}
          <div className="flex items-center gap-2">
            <NavLink to="/" className="flex items-center gap-1.5">
              <BubblesIcon size={27} color="#339991" />
              <p className="text-white font-semibold text-xl">Purely</p>
            </NavLink>
          </div>

          {/* CENTER: Nav links - Desktop */}
          <ul className="hidden md:flex gap-3">
            <li>
              <NavLink to="/" end className={navLinkClass}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/products" className={navLinkClass}>
                Products
              </NavLink>
            </li>
            <li>
              <NavLink to="/features" className={navLinkClass}>
                Features
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={navLinkClass}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={navLinkClass}>
                Contact Us
              </NavLink>
            </li>
          </ul>

          {/* RIGHT: Cart + Avatar */}
          <div className="flex items-center gap-4 relative">
            {/* Theme Button */}
            <div className="hidden md:flex p-2 rounded-full hover:bg-neutral-800 transition-all items-center justify-center">
              <button
                onClick={HandleToggleTheme}
                aria-label={
                  theme === "dark"
                    ? "Switch to light mode"
                    : "Switch to dark mode"
                }
                className="cursor-pointer text-2xl "
              >
                {theme === "dark" ? (
                  <MdOutlineDarkMode className="text-white" />
                ) : (
                  <MdOutlineLightMode className="text-yellow-300" />
                )}
              </button>
            </div>

            {/* Cart */}
            <NavLink
              to="/cart"
              aria-label={`Cart, ${cartItemCount} items`}
              className="relative hover:opacity-70 transition-opacity"
            >
              <LuShoppingCart size={24} color="#ffffff" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2.5 -right-2 min-w-5 h-5 px-1 bg-primary text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-[#1A1A1A]">
                  {cartItemCount}
                </span>
              )}
            </NavLink>

            {/* 👤 Avatar */}
            {user ? (
              <div className="relative hidden md:block">
                <img
                  src={
                    user?.user_metadata?.avatar_url?.replace("/svg?", "/png?") ||
                    user?.user_metadata?.picture ||
                    user?.user_metadata?.avatar ||
                    `https://api.dicebear.com/9.x/initials/png?seed=${encodeURIComponent(
                      user?.user_metadata?.fullName || user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email || "User",
                    )}&backgroundColor=339991`
                }
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://api.dicebear.com/9.x/initials/png?seed=${encodeURIComponent(
                        user?.user_metadata?.fullName || 
                        user?.user_metadata?.full_name || 
                        user?.user_metadata?.name || 
                        user?.email || "User"
                        )}&backgroundColor=339991`;
                }}
                  alt="user avatar"
                  loading="lazy"
                  decoding="async"
                  className="w-9 h-9 rounded-full cursor-pointer border-2 border-cyan-400 transition-all duration-200 ease-in-out hover:scale-105 shadow-md shadow-yellow-400/30"
                  onClick={() => setOpen((prev) => !prev)}
                  aria-label="Open user menu"
                  aria-expanded={open}
                  role="button"
                  tabIndex={0}
                />

                {/* Dropdown */}
                {open && (
                  <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-white/10 rounded-xl shadow-lg p-4 z-50">
                    {/* User Info */}
                    <div className="mb-3">
                      <p className="font-bold text-sm text-gray-900 dark:text-white">
                        {user?.user_metadata?.fullName || user?.user_metadata?.full_name || user?.user_metadata?.name || "User"}
                      </p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>

                    <hr className="mb-3 border-gray-100 dark:border-white/10" />

                    {/* Links */}
                    <div className="flex flex-col gap-2">
                      <a  className="text-sm hover:text-primary transition block">
                        Profile
                      </a>

                      <a  className="text-sm hover:text-primary transition block">
                        Orders
                      </a>

                      <button
                        onClick={handleLogout}
                        className="text-sm text-red-500 hover:text-red-600 text-left cursor-pointer"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/auth?mode=login"
                className="hidden md:block text-sm font-bold text-white border-2 border-white/30 rounded-full px-5 py-2 hover:bg-white/10 hover:border-white/50 transition-all"
              >
                Login
              </Link>
            )}

            {/* Mobile Menu Toggle Button */}
            {/* ✅ Hamburger — ظاهر على الموبايل بس */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-full hover:bg-neutral-800 transition-all text-white cursor-pointer"
              aria-label="Open mobile menu"
            >
              <MdOutlineMenu size={28} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu - Slide from Right */}
      <>
        {/* Overlay */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden min-h-screen "
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div
          className={`fixed top-0 right-0 h-screen w-64 bg-[#1A1A1A] z-50 
                        transform transition-transform duration-300 ease-in-out md:hidden flex flex-col 
                        overflow-y-auto ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="p-6">
            {/* Top Header in Sidebar: Theme Toggle & Close Button */}
            <div className="flex items-center justify-between mb-8">
              <button
                onClick={HandleToggleTheme}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                {theme === "dark" ? (
                  <MdOutlineDarkMode size={24} />
                ) : (
                  <MdOutlineLightMode className="text-yellow-300" size={24} />
                )}
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <FiX size={28} />
              </button>
            </div>

            {/* Mobile User Profile / Login */}
            <div className="mb-6 border-b border-white/10 pb-6">
              {user ? (
                <div className="flex items-center gap-3">
                  <img
                    src={
                      user?.user_metadata?.avatar_url?.replace(
                        "/svg?",
                        "/png?",
                      ) ||
                      user?.user_metadata?.picture ||
                      user?.user_metadata?.avatar ||
                      `https://api.dicebear.com/9.x/initials/png?seed=${encodeURIComponent(
                        user?.user_metadata?.fullName || user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email || "User",
                      )}&backgroundColor=339991`
                    }
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://api.dicebear.com/9.x/initials/png?seed=${encodeURIComponent(
                        user?.user_metadata?.fullName || 
                        user?.user_metadata?.full_name || 
                        user?.user_metadata?.name || 
                        user?.email || "User"
                        )}&backgroundColor=339991`;
                    }}
                    alt="user avatar"
                    loading="lazy"
                    decoding="async"
                    className="w-12 h-12 rounded-full border-2 border-cyan-400 shrink-0"
                  />
                  <div className="flex flex-col overflow-hidden">
                    <p className="font-bold text-white text-sm truncate">
                      {user?.user_metadata?.fullName || user?.user_metadata?.full_name || user?.user_metadata?.name || "User"}
                    </p>
                    <p className="text-xs text-gray-400 truncate">
                      {user?.email}
                    </p>
                  </div>
                </div>
              ) : (
                <Link
                  to="/auth?mode=login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full text-center text-sm font-bold text-white border-2 border-white/30 rounded-full px-5 py-2 hover:bg-white/10 transition-all"
                >
                  Login
                </Link>
              )}
            </div>

            {/* Navigation Links */}
            <ul className="flex flex-col gap-2">
              <li>
                <NavLink
                  to="/"
                  end
                  className={navLinkClass}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/products"
                  className={navLinkClass}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/features"
                  className={navLinkClass}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Features
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={navLinkClass}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className={navLinkClass}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact Us
                </NavLink>
              </li>
              {/* Auth specific links if logged in */}
              {user && (
                <>
                  <div className="my-2 border-t border-white/10"></div>
                  <li>
                    <a
                      className="text-sm hover:text-primary transition p-4 block"
                      
                    >
                      Profile
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-sm hover:text-primary transition p-4 block"
                    >
                      Orders
                    </a>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="text-left text-sm md:text-sm font-semibold transition-colors px-4 py-3 w-full block rounded-lg text-red-400 hover:bg-white/5 cursor-pointer"
                    >
                      Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </>
    </>
  );
}
