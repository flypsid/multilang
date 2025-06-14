"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { getLoginSchema } from "./loginSchema";
import { signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const LoginForm = () => {
  const t = useTranslations("LoginForm");
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [errors, setErrors] = useState<{ [k: string]: string }>({});

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    setIsPending(true);
    setErrors({});
    const formData = new FormData(evt.target as HTMLFormElement);
    const values = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };
    const schema = getLoginSchema(t);
    const result = schema.safeParse(values);
    if (!result.success) {
      const fieldErrors: { [k: string]: string } = {};
      for (const err of result.error.errors) {
        if (err.path[0]) fieldErrors[err.path[0]] = err.message;
      }
      setErrors(fieldErrors);
      setIsPending(false);
      return;
    }

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    function mapErrorMessage(error: string) {
      if (error === "Invalid email or password") return t("invalidCredentials");
      return error;
    }

    await signIn.email(
      {
        email,
        password,
      },
      {
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
          toast.success(t("loginSuccess"));
          router.push("/profile");
        },
      }
    );
    setIsPending(false);
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
          <div className="flex justify-between items-center gap-2">
            <Label htmlFor="password" className="font-medium text-foreground">
              {t("password")}
            </Label>
            <Link
              tabIndex={-1}
              href="/forgot-password"
              className="text-sm italic text-muted-foreground hover:text-foreground"
            >
              {t("forgotPassword")}
            </Link>
          </div>
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
          {t("noAccount")}{" "}
          <Link href="/register" className="underline hover:text-primary">
            {t("register")}
          </Link>
        </div>
      </form>
    </div>
  );
};
