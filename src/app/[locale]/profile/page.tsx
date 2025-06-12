import React from "react";
import { getTranslations } from "next-intl/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { SignOutButton } from "@/components/sign-out-button";

const ProfilePage = async () => {
  const t = await getTranslations("ProfilePage");

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return <p className="text-destructive text-center">{t("unauth")}</p>;
  }
  return (
    <div className="px-8 py-16 container mx-auto max-w-screen-lg space-y-8">
      <div className="space-y-4">
        <SignOutButton />
        <h1 className="text-3xl font-bold">{t("title")}</h1>
        <p className="text-gray-600">{t("description")}</p>
      </div>
      <pre className="text-sm overflow-clip">
        {JSON.stringify(session, null, 2)}
      </pre>
    </div>
  );
};

export default ProfilePage;
