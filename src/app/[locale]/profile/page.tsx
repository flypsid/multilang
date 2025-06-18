import React from "react";
import { getTranslations } from "next-intl/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { SignOutButton } from "@/components/sign-out-button";
import Link from "next/link";
import { redirect } from "next/navigation";

const ProfilePage = async () => {
  const t = await getTranslations("ProfilePage");

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/auth/login");

  return (
    <div className="px-8 py-16 container mx-auto max-w-screen-lg space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">{t("title")}</h1>
        <p className="text-gray-600 mb-8">{t("description")}</p>
        <div className="flex items-center gap-2">
          <SignOutButton />
          {session.user.role === "ADMIN" && (
            <Button size="sm" asChild>
              <Link href="/admin/dashboard">Admin Dashboard</Link>
            </Button>
          )}
        </div>
      </div>
      <pre className="text-sm overflow-clip">
        {JSON.stringify(session, null, 2)}
      </pre>
    </div>
  );
};

export default ProfilePage;
