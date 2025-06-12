import React from "react";
import { useTranslations } from "next-intl";

const About = () => {
  const t = useTranslations("AboutPage");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold">{t("title")}</h1>
      <p>{t("description")}</p>
    </div>
  );
};

export default About;
