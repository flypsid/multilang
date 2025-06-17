import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["en", "fr"],

  // Used when no locale matches
  defaultLocale: "en",

  // Pathname configuration for translating routes
  pathnames: {
    "/about": {
      en: "/about",
      fr: "/a-propos",
    },
    "/contact": {
      en: "/contact",
      fr: "/contact",
    },
    "/auth/register": {
      en: "/auth/register",
      fr: "/auth/inscription",
    },
    "/auth/login": {
      en: "/auth/login",
      fr: "/auth/connexion",
    },
    "/forgot-password": {
      en: "/forgot-password",
      fr: "/mot-de-passe-oublie",
    },
    "/profile": {
      en: "/profile",
      fr: "/profil",
    },
    "/": {
      en: "/",
      fr: "/",
    },
  },
});
