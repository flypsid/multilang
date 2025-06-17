"use server";

import { auth } from "@/lib/auth";
import { getLoginSchema } from "@/components/loginSchema";
import { headers } from "next/headers";

export async function signInEmailAction(formData: FormData) {
  // On récupère les valeurs du formulaire
  const values = {
    email: String(formData.get("email") || ""),
    password: String(formData.get("password") || ""),
  };
  // On utilise le même schéma que côté client
  const schema = getLoginSchema((k) => k);
  const result = schema.safeParse(values);
  if (!result.success) {
    return { error: result.error.errors[0].message };
  }

  try {
    await auth.api.signInEmail({
      headers: await headers(),
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
