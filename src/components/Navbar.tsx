import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const t = useTranslations("HomePage");
  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1em",
        background: "#f5f5f5",
        borderBottom: "1px solid #ddd",
        marginBottom: "2em",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "1em" }}>
        <Link href="/">{t("home")}</Link>
        <Link href="/about">{t("about")}</Link>
        <Link href="/contact">{t("contact")}</Link>
      </div>
      <LanguageSwitcher />
    </nav>
  );
}
