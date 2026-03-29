import { supabase } from "../../services/supabaseClient.js";
import { store } from "../../store/index.js";
import { authActions } from "../../store/slices/authSlice.js";

export const rootLoader = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  
  store.dispatch(authActions.setUser(session?.user || null)); // ✅
  
  return null;
};