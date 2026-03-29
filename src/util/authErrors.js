export function handleAuthError(error) {

  if (!error) {
    return { message: "Something went wrong." };
  }

  const message = error.message || "";

  if (message.includes("Email not confirmed")) {
    return {
      errors: {
        email: "Please confirm your email before logging in, check your inbox."
      }
    };
  }

  if (message.includes("Invalid login credentials")) {
    return {
      errors: {
        email: "Invalid email or password."
      }
    };
  }

  if (message.includes("User already registered")) {
    return {
      errors: {
        email: "This email is already registered."
      }
    };
  }

  if (message.includes("Password should be at least")) {
    return {
      errors: {
        password: "Password must be at least 7 characters."
      }
    };
  }

  return {
    message: message
  };
}