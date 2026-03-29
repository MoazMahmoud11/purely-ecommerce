import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/UI/LoadingSpinner.jsx";
import { supabase } from "../services/supabaseClient.js";
import store from "../store/index.js";
import { authActions } from "../store/slices/authSlice.js";
import { fetchCart } from "../store/slices/cartSlice.js";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const processSession = async () => {
      // By the time this component loads, Supabase has processed the URL hash.
      // We can directly get the session.
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (session) {
        // If a session is established, update Redux and navigate home.
        store.dispatch(authActions.setUser(session.user));
        await store.dispatch(fetchCart());
        navigate("/", { replace: true });
      } else {
        // If for some reason no session was established, redirect to login.
        console.error("OAuth callback error:", error);
        navigate("/auth?mode=login", { replace: true });
      }
    };

    processSession();
  }, [navigate]);

  return <LoadingSpinner />;
}
