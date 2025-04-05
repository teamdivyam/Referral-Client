import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import LoginForm from "../components/forms/LoginForm";
import useAuth from "../hooks/useAuth";
import { toast } from "sonner"
import { useNavigate } from "react-router-dom";
import { LoginSchema } from "../validation/auth";

export default function LoginPage() {
  const { login, isLoading, error } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: joiResolver(LoginSchema)
  });

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
      navigate("/dashboard/overview");
    } catch (err) {
      console.log("Login error:", err);
      toast(error || "Login failed. Please try again.");
    }
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <LoginForm 
          register={register}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          errors={errors}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
