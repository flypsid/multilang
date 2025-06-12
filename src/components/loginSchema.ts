import { z } from "zod";

export function getLoginSchema(t: (key: string) => string) {
  return z.object({
    email: z
      .string({ required_error: t("emailRequired") })
      .email(t("emailRequired")),
    password: z
      .string({ required_error: t("passwordRequired") })
      .min(1, t("passwordRequired")),
  });
}
