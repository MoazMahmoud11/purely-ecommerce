import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";

const Contact = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-dark pt-16 pb-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
            Get in Touch with Purely
          </h1>
          <p className="text-lg text-slate-600 dark:text-secondary-text max-w-2xl mx-auto leading-relaxed">
            We'd love to hear from you. Whether you have a question about our
            eco-friendly products, your recent order, or anything else, our team
            is ready to answer all your questions.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Email Card */}
          <div className="bg-white dark:bg-secondary/40 p-8 rounded-3xl shadow-lg shadow-black/5 border border-slate-100 dark:border-white/10 flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300">
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
              <MdEmail className="text-3xl" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              Email Us
            </h3>
            <p className="text-sm text-slate-500 dark:text-secondary-text mb-6 flex-1">
              We're here to help and answer any questions you might have.
            </p>
            <a
              href="mailto:support@purely.com"
              className="text-primary font-bold hover:underline"
            >
              support@purely.com
            </a>
          </div>

          {/* Phone Card */}
          <div className="bg-white dark:bg-secondary/40 p-8 rounded-3xl shadow-lg shadow-black/5 border border-slate-100 dark:border-white/10 flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300">
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
              <MdPhone className="text-3xl" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              Call Us
            </h3>
            <p className="text-sm text-slate-500 dark:text-secondary-text mb-6 flex-1">
              Mon-Fri from 8am to 5pm. We're happy to assist you over the phone.
            </p>
            <a
              href="tel:+18001234567"
              className="text-primary font-bold hover:underline"
            >
              +201205701208
            </a>
          </div>

          {/* Location Card */}
          <div className="bg-white dark:bg-secondary/40 p-8 rounded-3xl shadow-lg shadow-black/5 border border-slate-100 dark:border-white/10 flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300">
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
              <MdLocationOn className="text-3xl" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              Visit Us
            </h3>
            <p className="text-sm text-slate-500 dark:text-secondary-text mb-6 flex-1">
              Come say hello at our eco-friendly headquarters.
            </p>
            <span className="text-primary font-bold">41 Mohamed Ali, Alex</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
