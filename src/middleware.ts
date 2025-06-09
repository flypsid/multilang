// middleware.ts
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware({
  // Applique la configuration de routing personnalisée (si nécessaire)
  ...routing,

  // Langues supportées par votre application
  locales: ["en", "fr"],

  // Langue par défaut (si aucune détection n'est possible)
  defaultLocale: "en",

  // Active la détection automatique de la langue (true par défaut)
  localeDetection: true,

  // (Optionnel) Si vous voulez ignorer certains domaines pour la détection
  // domains: [
  //   { domain: 'example.com', defaultLocale: 'en' },
  //   { domain: 'example.fr', defaultLocale: 'fr' }
  // ]
});

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
