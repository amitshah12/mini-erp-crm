import { PackageX, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/features/auth/store/auth.store";

export default function NoModules() {
  const navigate = useNavigate();

  const user = useAuthStore(
    (state) => state.user
  );

  const logout = useAuthStore(
    (state) => state.logout
  );

  const handleLogout = () => {
    logout();

    navigate("/login", {
      replace: true,
    });
  };

  return (
    <div className="flex h-full min-h-[400px] items-center justify-center">
      <div className="w-full max-w-lg rounded-xl border bg-background p-8 text-center shadow-sm">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-muted p-4">
            <PackageX className="h-10 w-10 text-muted-foreground" />
          </div>
        </div>

        <h1 className="text-2xl font-bold">
          No Modules Assigned
        </h1>

        <p className="mt-3 text-muted-foreground">
          Your account has been successfully authenticated,
          but no application modules are currently assigned
          to your role.
        </p>

        {user && (
          <p className="mt-3 text-sm text-muted-foreground">
            Signed in as{" "}
            <span className="font-medium text-foreground">
              {user.name}
            </span>{" "}
            ({user.role})
          </p>
        )}

        <p className="mt-4 text-sm text-muted-foreground">
          Please contact your system administrator if you
          believe you should have access to additional modules.
        </p>

        <Button
          variant="destructive"
          className="mt-8"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
}