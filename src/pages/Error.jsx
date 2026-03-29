import { MdArrowBack, MdWarningAmber } from "react-icons/md";
import { Link, useRouteError } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";

export default function ErrorPage() {
  const error = useRouteError();

  let title = "An error occurred!";
  let message = "Something went wrong while trying to load this page.";

  if (error?.status === 500) {
    message = error.data?.message || message;
  }

  if (error?.status === 404) {
    title = "Page Not Found";
    message = "The resource or page you are looking for does not exist.";
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-dark transition-colors duration-300">
      <MainNavigation />

      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-white dark:bg-secondary/40 p-8 md:p-12 rounded-3xl shadow-xl shadow-black/5 border border-slate-100 dark:border-white/10 max-w-lg w-full flex flex-col items-center relative overflow-hidden">
          <div className="w-24 h-24 bg-red-50 dark:bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mb-6">
            <MdWarningAmber className="text-5xl" />
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
            {title}
          </h1>
          <p className="text-slate-500 dark:text-secondary-text text-lg mb-8 leading-relaxed">
            {message}
          </p>
          <Link
            to="/"
            className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg shadow-primary/20 active:scale-95 w-full sm:w-auto"
          >
            <MdArrowBack className="text-xl" />
            Back to Home
          </Link>
        </div>
      </main>
    </div>
  );
}
