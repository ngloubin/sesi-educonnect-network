
import { Home, UserCircle, Video, Users, BookOpen } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

export default function MobileNav() {
  const { pathname } = useLocation();

  const navItems = [
    {
      label: "Feed",
      href: "/",
      icon: <Home className="h-5 w-5" />,
    },
    {
      label: "Perfil",
      href: "/profile",
      icon: <UserCircle className="h-5 w-5" />,
    },
    {
      label: "Vídeos",
      href: "/videos",
      icon: <Video className="h-5 w-5" />,
    },
    {
      label: "Grupos",
      href: "/groups",
      icon: <Users className="h-5 w-5" />,
    },
    {
      label: "Materiais",
      href: "/materials",
      icon: <BookOpen className="h-5 w-5" />,
    },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background border-t flex justify-around items-center h-16">
      {navItems.map((item) => (
        <Link 
          key={item.href} 
          to={item.href}
          className={cn(
            "flex flex-col items-center justify-center gap-1 px-3 py-2 text-xs",
            pathname === item.href 
              ? "text-sesi-red" 
              : "text-muted-foreground"
          )}
        >
          {item.icon}
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}
