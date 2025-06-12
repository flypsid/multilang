import { LoginForm } from "@/components/login-form";

const LoginPage = () => {
  return (
    <div className="px-8 py-16 container mx-auto max-w-screen-lg space-y-8">
      <div className="space-y-4">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
