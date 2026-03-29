import { useState } from "react";
import { mailsRe } from "../../util/helpers";




function NewsletterForm() {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);
     const [error, setError] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

        if (!email.trim()) {
            setError("Email is required");
            setSubmitted(false);
            return;
        }

        if (!mailsRe.test(email)) {
            setError("Please enter a valid email address");
            setSubmitted(false);
            return;
        }

        // valid
        setError("");
        setSubmitted(true);
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4"
        >
        {submitted && !error ? (
            <p className="text-primary font-bold text-lg">🎉 You're in! Check your inbox.</p>
        ) : (
            <>
            <input
                type="email"
                required
                value={email}
                onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError("");
                }}
                
                placeholder="Enter your email"
                className="flex-1 bg-white/10 border border-white/20 rounded-xl px-6 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all md:px-2"
            />
            <button
                type="submit"
                className="bg-white text-[#121616] px-8 py-4 rounded-xl font-extrabold hover:bg-gray-100 transition-colors cursor-pointer"
            >
                Get Started
            </button>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            
            </>
        )}
        </form>
    );
}

export default NewsletterForm;