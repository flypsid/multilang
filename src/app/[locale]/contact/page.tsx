"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { getContactSchema } from "./contactSchema";

// Définition d'un type pour les erreurs de champ
interface FieldErrors {
  name?: string;
  email?: string;
  message?: string;
}

const Contact = () => {
  const t = useTranslations("ContactPage");

  // Schéma de validation Zod avec messages d'erreur traduits
  const schema = getContactSchema(t);

  const [errors, setErrors] = useState<FieldErrors>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
    };
    const result = schema.safeParse(data);
    if (!result.success) {
      const fieldErrors: FieldErrors = {};
      result.error.errors.forEach((err) => {
        if (err.path[0] && typeof err.path[0] === "string")
          fieldErrors[err.path[0] as keyof FieldErrors] = err.message;
      });
      setErrors(fieldErrors);
    } else {
      setErrors({});
      // ...traitement du formulaire (envoi, etc.)
    }
  };

  return (
    <div
      style={{
        maxWidth: 500,
        margin: "2em auto",
        background: "#fff",
        borderRadius: 12,
        boxShadow: "0 2px 16px 0 rgba(0,0,0,0.08)",
        padding: "2em 2em 1.5em 2em",
      }}
    >
      <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8 }}>
        {t("title")}
      </h1>
      <p style={{ color: "#666", marginBottom: 24 }}>{t("description")}</p>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1.5em",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <Label htmlFor="name" style={{ fontWeight: 500 }}>
            {t("form.name")}
          </Label>
          <Input
            id="name"
            name="name"
            placeholder={t("form.namePlaceholder")}
            style={{
              padding: "0.75em",
              borderRadius: 8,
              border: "1px solid #ddd",
            }}
          />
          {errors.name && (
            <span style={{ color: "#e11d48", fontSize: 13 }}>
              {errors.name}
            </span>
          )}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <Label htmlFor="email" style={{ fontWeight: 500 }}>
            {t("form.email")}
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder={t("form.emailPlaceholder")}
            style={{
              padding: "0.75em",
              borderRadius: 8,
              border: "1px solid #ddd",
            }}
          />
          {errors.email && (
            <span style={{ color: "#e11d48", fontSize: 13 }}>
              {errors.email}
            </span>
          )}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <Label htmlFor="message" style={{ fontWeight: 500 }}>
            {t("form.message")}
          </Label>
          <Textarea
            id="message"
            name="message"
            placeholder={t("form.messagePlaceholder")}
            style={{
              padding: "0.75em",
              borderRadius: 8,
              border: "1px solid #ddd",
              minHeight: 100,
            }}
          />
          {errors.message && (
            <span style={{ color: "#e11d48", fontSize: 13 }}>
              {errors.message}
            </span>
          )}
        </div>
        <Button
          type="submit"
          style={{
            background: "#2563eb",
            color: "#fff",
            fontWeight: 600,
            borderRadius: 8,
            padding: "0.75em 0",
            fontSize: 18,
            marginTop: 8,
            boxShadow: "0 1px 4px 0 rgba(37,99,235,0.08)",
            transition: "background 0.2s",
          }}
        >
          {t("form.submit")}
        </Button>
      </form>
    </div>
  );
};

export default Contact;
