
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";

export default function Layout() {
  const location = useLocation();
  
  // Determine if current route needs navbar/sidebar (only for non-login related routes)
  const isLoginFlow = location.pathname.includes('/grade-selection') || 
                      location.pathname.includes('/login/');
  
  if (isLoginFlow) {
    return <Outlet />;
  }
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 pb-20 md:pb-6 min-h-[calc(100vh-4rem)]">
          <Outlet />
        </main>
      </div>
      <MobileNav />
    </div>
  );
}
