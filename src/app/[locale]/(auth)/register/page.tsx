import React from "react";
import { RegisterForm } from "@/components/register-form";
import { ReturnButton } from "@/components/return-button";
import { useTranslations } from "next-intl";

const RegisterPage = () => {
  const t = useTranslations("ReturnButton");
  return (
    <div className="max-w-md mx-auto mt-12">
      <div className="space-y-4 ">
        <ReturnButton href="/" label={t("labelhome")} className="ml-7" />
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
