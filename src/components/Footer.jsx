import { FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { LuLeaf } from "react-icons/lu";
import { Link } from "react-router-dom";

export default function Footer() {
  // bg-neutral-100 dark:bg-blend-darken dark:text-white


  return (
    <footer className="pt-16 pb-7 px-6 md:px-32 bg-neutral-100 dark:bg-secondary dark:text-white">
      {/* Main Footer Content */}
      <div className="flex flex-col md:flex-row justify-between gap-8 mb-8">
        {/* Brand Section */}
        <div className="max-w-xs ">
          <div className="flex items-center gap-2 mb-4">
            <LuLeaf color="rgb(51 153 145)" size={24} />
            <span className="text-xl font-semibold">Purely</span>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed dark:text-secondary-text">
            Curating the world's most effective and ethical home care solutions.
          </p>
        </div>

        {/* Shop Links */}
        <div>
          <h3 className="font-semibold mb-4">Shop</h3>
          <ul className="space-y-2 ">
            <li>
              <Link
                to="/products"
                className="text-gray-600 hover:text-primary transition-colors text-sm dark:text-secondary-text"
              >
                Cleaning Sets
              </Link>
            </li>
            <li>
              <Link
                to="/products?category=Washing Powder&filter=active"
                className="text-gray-600 hover:text-primary transition-colors text-sm dark:text-secondary-text"
              >
                Laundry Care
              </Link>
            </li>
            <li>
              <Link
                to="/products?category=Hand Wash&filter=active"
                className="text-gray-600 hover:text-primary transition-colors text-sm dark:text-secondary-text"
              >
                Personal Hygiene
              </Link>
            </li>
            <li>
              <Link
                to="/products?category=Soap&filter=active"
                className="text-gray-600 hover:text-primary transition-colors text-sm dark:text-secondary-text"
              >
                Refill Subscriptions
              </Link>
            </li>
          </ul>
        </div>

        {/* Support Links */}
        <div>
          <h3 className="font-semibold mb-4">Support</h3>
          <ul className="space-y-2">
            <li>
              <Link
                to="/contact"
                className="text-gray-600 hover:text-primary transition-colors text-sm dark:text-secondary-text"
              >
                Contact Us
              </Link>
            </li>
            <ul className="space-y-2">
                <li className="text-gray-600 hover:text-primary transition-colors text-sm dark:text-secondary-text">Coming Soon</li>
            </ul>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="font-semibold mb-4">Social</h3>
          <ul className="flex gap-4">
            <li>
              <a
                href="https://www.linkedin.com/in/moaz-mahmoud-086796242/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-70 transition-opacity"
              >
                <FaLinkedinIn color="rgb(51,153,145)" size={20} />
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/moaz_mahmoud_11?utm_source=qr&igsh=b3BqNG9uMXMyZXR0"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-70 transition-opacity"
              >
                <FaInstagram color="rgb(51,153,145)" size={20.5} />
              </a>
            </li>
            <li>
              <a
                href="https://github.com/MoazMahmoud11"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-70 transition-opacity"
              >
                <FaGithub color="rgb(51,153,145)" size={20} />
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-300 pt-6 flex  md:flex-row justify-center items-center gap-4">
        <span className="text-gray-600 text-sm dark:text-white ">
          &copy; 2026{" "}
          <span className="font-bold bg-linear-to-r from-emerald-600 via-[#0F572B] to-indigo-500 bg-clip-text text-transparent">
            Moaz Mahmoud
          </span>
        </span>
      </div>
    </footer>
  );
}
