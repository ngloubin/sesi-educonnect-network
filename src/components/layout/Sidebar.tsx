
import { Link, useLocation } from "react-router-dom";
import { Home, UserCircle, Video, Users, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

type NavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

export default function Sidebar() {
  const { pathname } = useLocation();

  const navItems: NavItem[] = [
    {
      label: "Feed",
      href: "/",
      icon: <Home className="h-5 w-5" />,
    },
    {
      label: "Meu Perfil",
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
    <div className="hidden md:flex flex-col gap-4 p-4 border-r min-h-[calc(100vh-4rem)] w-64">
      <nav className="space-y-2">
        {navItems.map((item) => (
          <Link 
            key={item.href} 
            to={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
              pathname === item.href 
                ? "bg-sesi-red text-white" 
                : "hover:bg-accent"
            )}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="mt-auto border-t pt-4">
        <h3 className="text-sm font-medium mb-2">Meus Grupos</h3>
        <div className="space-y-1">
          <Link to="/groups/matematica" className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-md hover:bg-accent">
            Matemática Avançada
          </Link>
          <Link to="/groups/robótica" className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-md hover:bg-accent">
            Clube de Robótica
          </Link>
          <Link to="/groups/literatura" className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-md hover:bg-accent">
            Literatura Brasileira
          </Link>
        </div>
      </div>
    </div>
  );
}
