import { redirect } from "react-router-dom";
import AuthForm from "../components/Authentication/AuthForm";
import { login, signup } from "../services/authService.js";

const Authentication = () => {
  // This component was not changed in the previous diffs, but the action was.
  return <AuthForm />;
};

export default Authentication;

// eslint-disable-next-line react-refresh/only-export-components
export async function action({ request }) {
  // access to the form data was submitted
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "login"; // access just the mode login or signup

  const formData = await request.formData();

  const authData = {
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
    fullName: formData.get("fullName"),
    birthday: formData.get("birthday"),
    terms: formData.get("terms"), // "on" أو null
    remember: formData.get("remember"), // "on" أو null
  };

  if (!authData.email || !authData.password) {
    return Response.json(
      { message: "Email and password are required." },
      { status: 422 },
    );
  }

  if (mode === "signup") {
    if (authData.password !== authData.confirmPassword) {
      return Response.json(
        { message: "Passwords do not match." },
        { status: 422 },
      );
    }

    if (!authData.terms) {
      return Response.json(
        { message: "You must accept the terms & conditions." },
        { status: 422 },
      );
    }
  }

  // call supabase
  let result;
  if (mode === "login") {
    // This was changed to loginWithGoogle previously, reverting to login
    result = await login(authData.email, authData.password);
  } else {
    result = await signup(authData.email, authData.password, {
      fullName: authData.fullName,
      birthday: authData.birthday,
    });
  }

  // 4 Errors from Supabase
  if (result.error) {
    return Response.json({ message: result.error.message }, { status: 401 });
  }

  // Note: Supabase client automatically persists the session (token) in localStorage here.
  return redirect("/"); // ✅ إعادة التوجيه للصفحة الرئيسية بعد نجاح Email/Password login/signup
}
