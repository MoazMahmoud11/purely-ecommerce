import { redirect } from "react-router-dom";
import { login, signup } from "../../services/authService";
import { hasMinLength, isEmail } from "../../util/validation";
import { handleAuthError } from "../../util/authErrors";

export async function authAction({ request }) {
    const searchParams = new URL(request.url).searchParams;
    const mode = searchParams.get("mode") || "login";

    if (mode !== "login" && mode !== "signup") {
        return new Response({ message: "Unsupported mode." }, { status: 422 });
    }

    const data = await request.formData();

    const authData = {
        fullName: data.get("fullName"),
        email: data.get("email"),
        password: data.get("password"),
        confirmPassword: data.get("confirmPassword"),
        birthday: data.get("birthday"),
        terms: data.get("terms"),
    };

const errors = {};

  // email validation
    if (!isEmail(authData.email)) {
        errors.email = "Please enter a valid email";
    }

    // password validation
    if (!hasMinLength(authData.password, 7)) {
        errors.password = "Password must be at least 7 characters";
    }

    if (mode === "signup") {

        if (authData.password !== authData.confirmPassword) {
        errors.confirmPassword = "Passwords do not match";
        }

        if (!authData.terms) {
        errors.terms = "You must accept the terms & conditions";
        }

    }

    // stop if validation errors exist
    if (Object.keys(errors).length > 0) {
        return { errors };
    }

    try {

        if (mode === "login") {
        await login(authData.email, authData.password);
        }

        if (mode === "signup") {
        await signup(authData.email, authData.password, {
            fullName: authData.fullName,
            birthday: authData.birthday,
        });
        }

    } catch (error) {
          // Supabase errors
        
        return handleAuthError(error);
    }

    return redirect("/");
    }
