import { requireAuth } from "./checkAuthLoader"; // Import requireAuth

export async function profileLoader() {
  // profileLoader now just uses requireAuth to protect the route
  // If user is authenticated, requireAuth returns null, allowing the route to load.
  // If not, requireAuth redirects to /auth.
  return requireAuth();
}
