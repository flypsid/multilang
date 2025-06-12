import React from "react";
import { RegisterForm } from "@/components/register-form";

const RegisterPage = () => {
  return (
    <div className="px-8 py-16 container mx-auto max-w-screen-lg space-y-8">
      <div className="space-y-4">
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
