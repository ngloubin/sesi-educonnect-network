
import { Link } from "react-router-dom";
import { Bell, MessageSquare, Search, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import SesiLogo from "../SesiLogo";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <SesiLogo className="h-8 w-auto" />
            <span className="text-xl font-bold">SESI Educa</span>
          </Link>
        </div>
        
        <div className="hidden md:flex items-center w-1/3 relative">
          <Search className="absolute left-2.5 text-muted-foreground w-4 h-4" />
          <Input 
            type="search" 
            placeholder="Pesquisar..."
            className="pl-9 rounded-full"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <MessageSquare className="w-5 h-5" />
          </Button>
          <ThemeToggle />
          <Link to="/profile">
            <Button variant="outline" size="icon" className="rounded-full">
              <User className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
