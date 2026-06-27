import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { AppSidebar } from "@/components/AppSidebar";

export function AuthLayout() {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <AppSidebar />
        <main className="flex-1 overflow-y-auto bg-gradient-to-br from-purple-50 to-fuchsia-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
