"use server";

import { auth } from "@/lib/auth";
import { getRegisterSchema } from "@/components/registerSchema";

export async function signUpEmailAction(formData: FormData) {
  // On récupère les valeurs du formulaire
  const values = {
    name: String(formData.get("name") || ""),
    email: String(formData.get("email") || ""),
    password: String(formData.get("password") || ""),
    confirmPassword: String(formData.get("confirmPassword") || ""),
  };
  // On utilise le même schéma que côté client
  const schema = getRegisterSchema((k) => k);
  const result = schema.safeParse(values);
  if (!result.success) {
    return { error: result.error.errors[0].message };
  }

  try {
    await auth.api.signUpEmail({
      body: values,
    });
    return { error: null };
  } catch (err) {
    if (err instanceof Error) {
      // On relaie le message d'erreur BetterAuth tel quel
      return { error: err.message };
    }
    return { error: "Internal Server Error" };
  }
}
