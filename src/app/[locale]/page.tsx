import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function HomePage() {
  const t = useTranslations("HomePage");
  return (
    <section className="flex flex-col items-center pt-16 min-h-screen bg-gray-100 gap-8 px-4">
      <div className="max-w-2xl text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-primary mb-2">
          {t("heroTitle")}
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground">
          {t("heroDescription")}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
          <Link href="/register">
            <button className="px-8 py-3 bg-primary text-white rounded-lg font-semibold shadow hover:bg-primary/80 transition text-lg">
              {t("register")}
            </button>
          </Link>
          <Link href="/about">
            <button className="px-8 py-3 bg-secondary text-primary rounded-lg font-semibold shadow hover:bg-secondary/80 transition text-lg border border-primary">
              {t("learnMore")}
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
