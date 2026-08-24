import {
  LayoutDashboard,
  Users,
  Package,
  Boxes,
  FileText,
  LogOut,
  ShieldAlert,
} from "lucide-react";

import {
  NavLink,
  useNavigate,
} from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { useAuthStore } from "@/features/auth/store/auth.store";

type UserRole =
  | "ADMIN"
  | "SALES"
  | "WAREHOUSE"
  | "ACCOUNTS";

interface MenuItem {
  title: string;
  icon: typeof LayoutDashboard;
  href: string;
  roles: UserRole[];
}

const menuItems: MenuItem[] = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/",
    roles: ["ADMIN", "SALES"],
  },
  {
    title: "Customers",
    icon: Users,
    href: "/customers",
    roles: ["ADMIN", "SALES"],
  },
  {
    title: "Products",
    icon: Package,
    href: "/products",
    roles: ["ADMIN", "SALES"],
  },
  {
    title: "Inventory",
    icon: Boxes,
    href: "/inventory",
    roles: ["ADMIN", "SALES"],
  },
  {
    title: "Challans",
    icon: FileText,
    href: "/challans",
    roles: ["ADMIN", "SALES", "ACCOUNTS"],
  },
];

export default function Sidebar() {
  const logout = useAuthStore(
    (state) => state.logout
  );

  const user = useAuthStore(
    (state) => state.user
  );

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();

    navigate("/login", {
      replace: true,
    });
  };

  const visibleMenuItems = menuItems.filter(
    (item) =>
      user !== null &&
      item.roles.includes(user.role)
  );

  return (
    <aside className="flex h-screen w-64 flex-col border-r bg-background">
      {/* Application and User Info */}
      <div className="p-6">
        <h1 className="text-xl font-bold">
          Mini ERP CRM
        </h1>

        {user && (
          <div className="mt-4">
            <p className="text-sm font-medium">
              {user.name}
            </p>

            <p className="text-xs text-muted-foreground">
              {user.role}
            </p>
          </div>
        )}
      </div>

      <Separator />

      {/* Navigation */}
      <nav className="flex-1 space-y-2 p-4">
        {visibleMenuItems.length > 0 ? (
          visibleMenuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.title}
                to={item.href}
                end={item.href === "/"}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2 transition ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  }`
                }
              >
                <Icon size={18} />

                {item.title}
              </NavLink>
            );
          })
        ) : (
          <div className="rounded-lg border border-dashed p-4 text-center">
            <ShieldAlert className="mx-auto mb-3 h-5 w-5 text-muted-foreground" />

            <p className="text-sm font-medium">
              No modules available
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              Your current role does not have access
              to any application modules.
            </p>
          </div>
        )}
      </nav>

      <Separator />

      {/* Logout */}
      <div className="p-4">
        <Button
          variant="destructive"
          className="w-full"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />

          Logout
        </Button>
      </div>
    </aside>
  );
}