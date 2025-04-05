import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import RegisterForm from "../components/forms/RegisterForm";
import useAuth from "../hooks/useAuth";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { RegisterSchema } from "../validation/auth";

export default function LoginPage() {
  const { register: reg, isLoading, error } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: joiResolver(RegisterSchema),
  });

  const onSubmit = async (data) => {
    try {
      await reg(data.email, data.password, data.confirmPassword);

      navigate("/dashboard/overview");
    } catch (err) {
      console.log("Register error:", err);
      
      toast(error || "Register failed. Please try again.");
    }
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <RegisterForm
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
