import { LayoutDashboard, Users, Package, Boxes, FileText, LogOut, } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAuthStore } from "@/features/auth/store/auth.store";

const menuItems = [
    {
        title: "Dashboard",
        icon: LayoutDashboard,
        href: "/",
    },
    {
        title: "Customers",
        icon: Users,
        href: "/customers",
    },
    {
        title: "Products",
        icon: Package,
        href: "/products",
    },
    {
        title: "Inventory",
        icon: Boxes,
        href: "/inventory",
    },
    {
        title: "Challans",
        icon: FileText,
        href: "/challans",
    },
];

export default function Sidebar() {
    const logout = useAuthStore((state) => state.logout);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login", { replace: true });
    };

    return (
        <aside className="flex h-screen w-64 flex-col border-r bg-white">
            <div className="p-6">
                <h1 className="text-xl font-bold">
                    Mini ERP CRM
                </h1>
            </div>

            <Separator />

            <nav className="flex-1 space-y-2 p-4">
                {menuItems.map((item) => {
                    const Icon = item.icon;

                    return (
                        <NavLink
                            key={item.title}
                            to={item.href}
                            className={({ isActive }) =>
                                `flex items-center gap-3 rounded-lg px-3 py-2 transition ${isActive
                                    ? "bg-blue-600 text-white"
                                    : "hover:bg-gray-100"
                                }`
                            }
                        >
                            <Icon size={18} />

                            {item.title}
                        </NavLink>
                    );
                })}
            </nav>

            <Separator />

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