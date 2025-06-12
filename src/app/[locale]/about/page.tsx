import React from "react";
import { useTranslations } from "next-intl";

const About = () => {
  const t = useTranslations("AboutPage");

  return (
    <div className="flex flex-col items-center pt-16 min-h-screen bg-gray-100 gap-8 px-4">
      <h1 className="text-2xl font-bold">{t("title")}</h1>
      <p>{t("description")}</p>
    </div>
  );
};

export default About;
