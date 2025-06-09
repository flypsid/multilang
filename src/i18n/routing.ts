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
    "/": {
      en: "/",
      fr: "/",
    },
  },
});
