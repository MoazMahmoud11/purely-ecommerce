import { useState } from "react";
import {
  MdArrowForward,
  MdCalendarToday,
  MdEco,
  MdEmail,
  MdLock,
  MdLockReset,
  MdPerson,
  MdPets,
  MdVerified,
  MdVisibility,
} from "react-icons/md";
import {
  Form,
  Link,
  useActionData,
  useNavigation,
  useSearchParams,
} from "react-router-dom";
import { loginWithGoogle } from "../../services/authService.js";

import FormInput from "./FormInput";

const AuthForm = () => {
  const data = useActionData();
  const navigation = useNavigation();
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";
  const isSubmitting = navigation.state === "submitting";
  const [showPassword, setShowPassword] = useState(false);


  return (
    <div className="w-full max-w-md mx-auto">
      {/* Authentication Card */}
      <div className="bg-white dark:bg-secondary my-10 shadow-[0px_8px_32px_rgba(0,0,0,0.06)] dark:shadow-[0px_8px_32px_rgba(0,0,0,0.3)] rounded-xl overflow-hidden border border-zinc-100 dark:border-zinc-800">
        <div className="p-8 lg:p-10">
          {/* Card Header */}
          <div className="text-center mb-10">
            <p className="text-zinc-900 dark:text-zinc-100 text-3xl font-bold tracking-tight mb-2">
              {isLogin ? "Welcome Back" : "Create Account"}
            </p>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm">
              {isLogin
                ? "Sign in to access your hygiene essentials."
                : "Join us for a cleaner, greener home."}
            </p>
          </div>

          {/* Form */}
          <Form method="post" className="space-y-6" >
            {/* Errors */}
            {data && data.errors && (
              <ul className="text-red-500 text-sm list-disc pl-5">
                {Object.values(data.errors).map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            )}
            {data && data.message && (
              <p className="text-red-500 text-sm">{data.message}</p>
            )}

            {/* Full Name */}
            {!isLogin && (
                <FormInput
                    label="Full Name"
                    id="fullName"
                    name="fullName"
                    placeholder="John Doe"
                    required
                    icon={MdPerson}
                />
            )}

            {/* Email Field */}
            <FormInput
                label="Email Address"
                id="email"
                name="email"
                type="email"
                placeholder="john@example.com"
                required
                icon={MdEmail}
            />

            {/* Password Field */}
            <FormInput
                label="Password"
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                required
                icon={MdLock}
                extraLabel={
                isLogin && (
                  <a
                    className="text-primary text-xs font-bold hover:underline"
                    href="#"
                  >
                    Forgot password?
                  </a>
                )
              }
              endIcon={
                <button
                  className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-pointer"
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <MdVisibility className="text-[20px]" />
                </button>
              }
            />

            {/* Confirm Password */}
            {!isLogin && (
              <FormInput
                label="Confirm Password"
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
                required
                icon={MdLockReset}
              />
            )}

            {/* Birthday */}
            {!isLogin && (
              <FormInput
                label="Birthday"
                id="birthday"
                name="birthday"
                type="date"
                required
                icon={MdCalendarToday}
              />
            )}

            {/* Terms */}
            {!isLogin && (
              <div className="flex items-center gap-3">
                <input
                  className="w-5 h-5 rounded border-zinc-300 dark:border-zinc-700 text-primary focus:ring-primary bg-white dark:bg-zinc-800 accent-primary"
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                />
                <label
                  className="text-zinc-600 dark:text-zinc-400 text-sm cursor-pointer select-none"
                  htmlFor="terms"
                >
                  I agree to the Terms & Conditions
                </label>
              </div>
            )}

            {/* Remember Me */}
            {isLogin && (
              <div className="flex items-center gap-3">
                <input
                  className="w-5 h-5 rounded border-zinc-300 dark:border-zinc-700 text-primary focus:ring-primary bg-white dark:bg-zinc-800 accent-primary"
                  id="remember"
                  name="remember"
                  type="checkbox"
                />
                <label
                  className="text-zinc-600 dark:text-zinc-400 text-sm cursor-pointer select-none"
                  htmlFor="remember"
                >
                  Remember this device
                </label>
              </div>
            )}

            {/* Primary CTA */}
            <button
              className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-70"
              type="submit"
              disabled={isSubmitting}
            >
              <span>
                {isSubmitting
                  ? "Submitting..."
                  : isLogin
                    ? "Log In"
                    : "Sign Up"}
              </span>
              <MdArrowForward className="text-[18px] group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              type="button" 
              onClick={loginWithGoogle}
              className="flex items-center justify-center w-full gap-2 px-4 py-2 mt-4 font-bold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer"
            >
              <img 
                src="https://www.svgrepo.com/show/475656/google-color.svg" 
                alt="Google logo" 
                className="w-5 h-5" 
                loading="lazy"
                decoding="async"
              />
              {isLogin? 'Sign in with Google' : 'Continue with Google'}
            </button>
          </Form>
        </div>

        {/* Footer Link */}
        <div className="bg-zinc-50 dark:bg-zinc-800/50 p-6 border-t border-zinc-100 dark:border-zinc-800 text-center">
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <Link
              className="text-primary font-bold hover:underline ml-1"
              to={`?mode=${isLogin ? "signup" : "login"}`}
            >
              {isLogin ? "Register now" : "Log in"}
            </Link>
          </p>
        </div>
      </div>

      {/* Contextual Branding Hint */}
      <div className="my-8 flex items-center justify-center gap-8 opacity-40 grayscale group hover:grayscale-0 hover:opacity-100 transition-all duration-700">
        <div className="flex items-center gap-1">
          <MdVerified className="text-[16px] text-primary" />
          <span className="text-[10px] font-bold uppercase tracking-[2px] text-zinc-600 dark:text-zinc-400">
            Eco Certified
          </span>
        </div>
        <div className="flex items-center gap-1">
          <MdPets className="text-[16px] text-primary" />
          <span className="text-[10px] font-bold uppercase tracking-[2px] text-zinc-600 dark:text-zinc-400">
            Safe for Pets
          </span>
        </div>
        <div className="flex items-center gap-1">
          <MdEco className="text-[16px] text-primary" />
          <span className="text-[10px] font-bold uppercase tracking-[2px] text-zinc-600 dark:text-zinc-400">
            100% Organic
          </span>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
