
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { BottomNav } from "@/components/BottomNav";
import Home from "./pages/Home";
import Cards from "./pages/Cards";
import Payments from "./pages/Payments";
import Credit from "./pages/Credit";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const App = () => (
    <SidebarProvider>
      <div className="flex min-h-screen w-full" >
        <BrowserRouter>
        
          <AppSidebar />
        
          <div className="flex-1 pb-20 md:pb-0">
            <Routes>
            <Route path="/" element={<Cards />} />
              <Route path="/home" element={<Home />} />
              <Route path="/cards" element={<Cards />} />
              <Route path="/payments" element={<Payments />} />
              <Route path="/credit" element={<Credit />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <BottomNav />
          </div>
        </BrowserRouter>
      </div>
    </SidebarProvider>
);

export default App;
