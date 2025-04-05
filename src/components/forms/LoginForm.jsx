import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

export default function LoginForm({
  className,
  register,
  handleSubmit,
  onSubmit,
  errors,
  isLoading,
}) {
  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">

          {/* Login form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-8 md:p-10 md:py-12"
          >
            <div className="flex flex-col gap-6">

              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-balance text-muted-foreground">
                  Login to your Divyam Referral account
                </p>
              </div>

              {/* Email */}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  {...register("email", { required: true })}
                  type="email"
                  id="email"
                  autoComplete="true"
                />
                <div className="h-2">
                  <p className="text-red-400 text-sm">
                    {errors.email && errors.email.message}
                  </p>
                </div>
              </div>

              {/* Password */}
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  {...register("password", { required: true })}
                  type="password"
                  id="password"
                  autoComplete="true"
                />
                <div className="h-2">
                  <p className="text-red-400 text-sm">
                    {errors.password && errors.password.message}
                  </p>
                </div>
              </div>

              <Button
                type="submit"
                className="flex gap-0.5"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" />
                    <span>Please Wait</span>
                  </>
                ) : (
                  <>Login</>
                )}
              </Button>
              
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link to="/register" className="underline underline-offset-4">
                  Register
                </Link>
              </div>

            </div>
          </form>

          {/* Right Side Banner Image */}
          <div className="relative hidden bg-muted md:block">
            <img
              src="/images/login-banner.svg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>

        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
