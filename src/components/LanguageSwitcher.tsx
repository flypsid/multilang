"use client";
import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import React from "react";

const languages = [
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
];

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"));
  };

  return (
    <select
      value={locale}
      onChange={handleChange}
      style={{
        padding: "0.5em",
        borderRadius: "4px",
        border: "1px solid #ccc",
        marginLeft: "1em",
      }}
      aria-label="Select language"
    >
      {languages.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.label}
        </option>
      ))}
    </select>
  );
}
