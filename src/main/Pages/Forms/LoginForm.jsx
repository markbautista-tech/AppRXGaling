import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { fetchAuth, login } from "@/utils/data/login";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";

// Define a Zod schema for validation
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function LoginForm() {
  const navigate = useNavigate();
  const { user, loading, setUser, role } = useUser();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user) {
      if (role === "admin") {
        navigate("/admin");
      }
    }
  }, [navigate, user, role]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setError("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const response = await login(data.email, data.password);
      const loginError = response.message;
      const userRole = response?.user?.user_metadata?.role;

      if (loginError) {
        toast.error(loginError);
        return;
      }

      if (user?.error) {
        toast.error(user?.error);
        return;
      } else {
        toast.success("Login Successfully!");
        setUser(response);
        if (userRole === "admin") {
          navigate("/admin");
        } else if (
          userRole === "clinic owner" ||
          userRole === "Doctor" ||
          userRole === "Clinic Nurse" ||
          userRole === "Clinic Administrator" ||
          userRole === "Clinic Secretary" ||
          userRole === "Clinic Assistant"
        ) {
          navigate("/clinic-app");
        }
      }
    } catch (err) {
      setError("Invalid email or password", err);
      console.log(err);
      toast.error("Invalid email or password", err);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <div className="bg-gray-300 h-screen flex-center-all flex-col gap-5">
        <div>
          <img
            src="src/assets/logo-rxgaling.svg"
            alt="Logo"
            className="w-20 h-20 lg:w-24 lg:h-24"
          />
        </div>

        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Login</CardTitle>
            <CardDescription>
              Enter your email and password to access your account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  {...register("email")}
                  aria-invalid={errors.email ? "true" : "false"}
                />
                {errors.email && (
                  <p className="text-sm text-red-500 italic">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  aria-invalid={errors.password ? "true" : "false"}
                />
                {errors.password && (
                  <p className="text-sm text-red-500 italic">
                    {errors.password.message}
                  </p>
                )}
              </div>
              {error && <div className="text-sm text-red-500">{error}</div>}
              <div className="flex items-center gap-2">
                <Checkbox
                  id="show_pass"
                  onCheckedChange={(checked) => setShowPassword(checked)}
                />
                <Label
                  htmlFor="show_pass"
                  className="font-semibold text-gray-700"
                >
                  Show Password
                </Label>
              </div>
              <Button
                type="submit"
                className="w-full lg:text-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Logging in..." : "Log in"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button variant="link" className="text-sm text-muted-foreground">
              Forgot password?
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
