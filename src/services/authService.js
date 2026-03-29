import { data } from "react-router-dom";
import store from "../store";
import { authActions } from "../store/slices/authSlice";
import { clearCart } from "../store/slices/cartSlice";
import { supabase } from "./supabaseClient";

export async function signup(email, password, profile = {}) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: profile,
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function login(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }
  store.dispatch(authActions.setUser(data.user));

  return data;
}

export async function loginWithGoogle() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`, // ✅
    },
  });

  if ((data, error)) {
    throw new Error(error.message);
  }
  store.dispatch(authActions.setUser(data.user));

  return data;
  // Note: We DO NOT dispatch to Redux or return data here because OAuth causes a full page redirect.
  // When Google redirects the user back to your site, the root loader in AppRoutes.jsx
  // will automatically catch the new session and dispatch the user to Redux for you!
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
  store.dispatch(authActions.clearUser()); // ✅
  store.dispatch(clearCart()); // ✅ Clear the cart so guests don't see the previous user's items
}

export async function getCurrentUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) return user;

  const {
    data: { session },
  } = await supabase.auth.refreshSession();
  return session?.user || null;
}

// export async function getCurrentUser() {
//   const { data: { session } } = await supabase.auth.getSession();

//   // ✅ لو لقى session رجعها على طول
//   if (session) return session.user;

//   // ✅ لو مش لاقيها، اعمل refresh من الـ server
//   const { data: { session: refreshedSession } } = await supabase.auth.refreshSession();
//   return refreshedSession?.user || null;
// }
