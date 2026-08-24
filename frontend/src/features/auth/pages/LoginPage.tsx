import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import {
  loginSchema,
  type LoginFormData,
} from "../login.schema";

import { useLogin } from "../hooks/useAuth";
import { useAuthStore } from "../store/auth.store";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type UserRole =
  | "ADMIN"
  | "SALES"
  | "WAREHOUSE"
  | "ACCOUNTS";

function getRedirectPath(role: UserRole) {
  switch (role) {
    case "ADMIN":
    case "SALES":
      return "/";

    case "ACCOUNTS":
      return "/challans";

    case "WAREHOUSE":
      return "/no-modules";

    default:
      return "/unauthorized";
  }
}

export default function LoginPage() {
  const navigate = useNavigate();

  const auth = useAuthStore();

  const { mutate, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (values: LoginFormData) => {
    mutate(values, {
      onSuccess: (response) => {
        const { user, token } = response.data;

        auth.login(user, token);

        toast.success("Login successful!");

        navigate(
          getRedirectPath(user.role),
          {
            replace: true,
          }
        );
      },

      onError: (error: any) => {
        toast.error(
          error?.response?.data?.message ??
            "Unable to login."
        );
      },
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>
            Mini ERP CRM
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
          >
            <div>
              <Label>Email</Label>

              <Input
                type="email"
                placeholder="admin@example.com"
                {...register("email")}
              />

              {errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <Label>Password</Label>

              <Input
                type="password"
                {...register("password")}
              />

              {errors.password && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isPending}
            >
              {isPending
                ? "Logging in..."
                : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}