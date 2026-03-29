import { redirect } from "react-router-dom";
import { getCurrentUser } from "../../services/authService"; // Corrected import path

// protect routes
export const requireAuth = async ({ request }) => {
  const user = await getCurrentUser();

  if (!user) {
    const url = new URL(request.url);
    return redirect(`/auth?redirectTo=${url.pathname}`); // Redirect to /auth
  }
};
