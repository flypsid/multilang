import { z } from "zod";

export const getRegisterSchema = (t: (key: string) => string) =>
  z.object({
    name: z.string().min(2, t("nameRequired")).nonempty(t("nameRequired")),
    email: z.string().email(t("emailRequired")).nonempty(t("emailRequired")),
    password: z
      .string()
      .min(1, t("passwordRequired"))
      .nonempty(t("passwordRequired")),
  });
