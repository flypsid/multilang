import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Navbar from "../../components/Navbar";
import "./globals.css";

export const metadata = {
  title: "Multilang App",
  description: "A modern multilingual Next.js application",
  icons: {
    icon: "/images/favicon.ico",
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <head>
        <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
        {/* Les balises meta sont automatiquement injectées par Next.js via metadata */}
      </head>
      <body>
        <NextIntlClientProvider>
          <Navbar />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
