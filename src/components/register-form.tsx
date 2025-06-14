"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { signUp } from "@/lib/auth-client";
import { getRegisterSchema } from "./registerSchema";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";

export const RegisterForm = () => {
  const t = useTranslations("RegisterForm");
  const router = useRouter();
  const [errors, setErrors] = useState<{ [k: string]: string }>({});
  const [isPending, setIsPending] = useState(false);

  function mapErrorMessage(error: string) {
    if (error === "User already exists") return t("userExists");
    if (error === "Password too short") return t("passwordTooShort");
    return error;
  }

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    setErrors({});
    const formData = new FormData(evt.target as HTMLFormElement);
    const values = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };
    const schema = getRegisterSchema(t);
    const result = schema.safeParse(values);
    if (!result.success) {
      const fieldErrors: { [k: string]: string } = {};
      for (const err of result.error.errors) {
        if (err.path[0]) fieldErrors[err.path[0]] = err.message;
      }
      setErrors(fieldErrors);
      return;
    }
    await signUp.email(values, {
      onRequest: () => {
        setIsPending(true);
      },
      onResponse: () => {
        setIsPending(false);
      },
      onError: (ctx) => {
        setErrors({ general: mapErrorMessage(ctx.error.message) });
      },
      onSuccess: () => {
        toast.success(t("registerSuccess"));
        router.push("/profile");
      },
    });
  }

  return (
    <div className="max-w-md mx-auto mt-12 bg-background border border-muted rounded-2xl shadow-xl p-8">
      <h1 className="text-3xl font-bold mb-2 tracking-tight text-foreground">
        {t("title")}
      </h1>
      <p className="text-muted-foreground mb-8 text-base leading-relaxed">
        {t("description")}
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-7">
        <div className="flex flex-col gap-2">
          <Label htmlFor="name" className="font-medium text-foreground">
            {t("name")}
          </Label>
          <Input id="name" name="name" placeholder={t("namePlaceholder")} />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name}</span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="email" className="font-medium text-foreground">
            {t("email")}
          </Label>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder={t("emailPlaceholder")}
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email}</span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="password" className="font-medium text-foreground">
            {t("password")}
          </Label>
          <Input
            type="password"
            id="password"
            name="password"
            placeholder={t("passwordPlaceholder")}
          />
          {errors.password && (
            <span className="text-red-500 text-sm">{errors.password}</span>
          )}
        </div>

        {errors.general && (
          <span className="text-red-500 text-sm">{errors.general}</span>
        )}

        <Button
          type="submit"
          className="h-12 mt-2 bg-primary text-primary-foreground font-semibold rounded-lg text-lg shadow-sm hover:bg-primary/90 transition-colors"
          disabled={isPending}
        >
          {isPending ? (
            <span className="flex items-center justify-center gap-2">
              {t("submit")}
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                ></path>
              </svg>
            </span>
          ) : (
            t("submit")
          )}
        </Button>

        <div className="mb-2 text-center text-sm text-muted-foreground">
          {t("alreadyAccount")}{" "}
          <Link href="/login" className="underline hover:text-primary">
            {t("login")}
          </Link>
        </div>
      </form>
    </div>
  );
};
