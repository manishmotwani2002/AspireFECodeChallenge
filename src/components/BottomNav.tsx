
import { Link, useLocation } from "react-router-dom";
import { Home, CreditCard, Wallet, CreditCard as Credit, User } from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: Home, label: "Home", path: "/home" },
  { icon: CreditCard, label: "Cards", path: "/cards" },
  { icon: Wallet, label: "Payments", path: "/payments" },
  { icon: Credit, label: "Credit", path: "/credit" },
  { icon: User, label: "Profile", path: "/settings" },
];

export const BottomNav = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t bg-white md:hidden" style={{position: 'fixed', bottom: 0}}>
      <div className="flex justify-between px-4">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.label}
              to={item.path}
              className="flex flex-col items-center py-3 px-2"
            >
              <item.icon
                className={cn(
                  "h-6 w-6",
                  isActive ? "text-aspire-green" : "text-gray-400"
                )}
              />
              <span
                className={cn(
                  "text-xs mt-1",
                  isActive ? "text-aspire-green" : "text-gray-400"
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};