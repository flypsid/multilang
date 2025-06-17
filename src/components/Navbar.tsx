import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const t = useTranslations("HomePage");
  return (
    <nav className="w-full bg-background border-b border-muted/60 shadow-sm mb-8">
      <div className="max-w-4xl mx-auto flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-lg font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            {t("home")}
          </Link>
          <Link
            href="/about"
            className="text-base font-medium text-foreground hover:text-primary transition-colors"
          >
            {t("about")}
          </Link>
          <Link
            href="/contact"
            className="text-base font-medium text-foreground hover:text-primary transition-colors"
          >
            {t("contact")}
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <Link
            href="/auth/login"
            className="text-base font-medium text-foreground hover:text-primary transition-colors px-4 py-2 border border-primary rounded-lg bg-primary/10 hover:bg-primary/20"
          >
            {t("loginButton")}
          </Link>
        </div>
      </div>
    </nav>
  );
}
