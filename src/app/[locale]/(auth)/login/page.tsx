import { LoginForm } from "@/components/login-form";
import { ReturnButton } from "@/components/return-button";
import { useTranslations } from "next-intl";

const LoginPage = () => {
  const t = useTranslations("ReturnButton");
  return (
    <div className="max-w-md mx-auto mt-12">
      <div className="space-y-4">
        <ReturnButton href="/" label={t("labelhome")} className="ml-7" />
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
