
import { Link, useLocation } from "react-router-dom";
import { Home, CreditCard, Settings, CreditCard as Credit, Wallet } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const menuItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: CreditCard, label: "Cards", path: "/cards" },
  { icon: Wallet, label: "Payments", path: "/payments" },
  { icon: Credit, label: "Credit", path: "/credit" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <div className="bg-aspire-blue">
      <Sidebar>
        <div className="p-6 text-stone-50">
          <img 
            src="https://lsvp.com/wp-content/uploads/2023/03/Aspire.png"
            alt="Aspire Logo"
            className="w-32 h-auto mb-8"
            loading="lazy"
            decoding="async"
            fetchPriority="high"
          />
          <div className="text-gray-500">Trusted way of banking for 3,000+ SMEs and startups in Singapore</div>
        </div>
        
        <SidebarGroup>
            <SidebarMenu className="text-xl mt-12 grid-cols-1 gap-y-12">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.label} className="text-stone-50">
                  <SidebarMenuButton asChild>
                    <Link 
                      to={item.path} 
                      className={`flex items-center gap-2 ${
                        location.pathname === item.path ? "text-[#01D167] font-medium" : ""
                      }`}
                    >
                      <item.icon className={location.pathname === item.path ? "text-[#01D167]" : ""} />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
        </SidebarGroup>
      </Sidebar>
    </div>
  );
}
