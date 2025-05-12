
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import SesiLogo from "@/components/SesiLogo";

interface Student {
  id: string;
  name: string;
  grade: string;
}

export default function StudentLogin() {
  const { studentId } = useParams<{ studentId: string }>();
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Mock student data - in a real app this would come from an API
  const students: Student[] = [
    { id: "1", name: "Ana Silva", grade: "6" },
    { id: "2", name: "Bruno Costa", grade: "6" },
    { id: "3", name: "Carla Oliveira", grade: "7" },
    { id: "4", name: "Daniel Santos", grade: "7" },
    { id: "5", name: "Eduardo Lima", grade: "8" },
    { id: "6", name: "Fernanda Pereira", grade: "8" },
    { id: "7", name: "Matheus Souza", grade: "6" },
    { id: "8", name: "Sofia Martins", grade: "9" },
    { id: "9", name: "Lucas Ferreira", grade: "10" },
    { id: "10", name: "Pedro Almeida", grade: "11" }
  ];

  const student = students.find(s => s.id === studentId);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate authentication process
    setTimeout(() => {
      setIsLoading(false);
      
      // For demo purposes, any password works
      toast({
        title: "Login realizado com sucesso!",
        description: `Bem-vindo(a) de volta, ${student?.name}!`,
      });
      
      navigate("/");
    }, 1500);
  };

  if (!student) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Card className="p-6">
          <h1 className="text-xl font-bold mb-4">Aluno não encontrado</h1>
          <Button onClick={() => navigate("/grade-selection")}>
            Voltar para seleção
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative">
      <div className="w-full max-w-md">
        <Card className="p-6 shadow-lg">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/grade-selection")}
            className="absolute left-4 top-4"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Voltar</span>
          </Button>

          <div className="flex items-center justify-center mb-8">
            <SesiLogo className="h-16 w-auto" />
          </div>

          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold">{student.name}</h1>
            <p className="text-muted-foreground">{`${student.grade}º ano`}</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Digite sua senha</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Sua senha"
                className="text-center text-lg py-6"
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-sesi-red hover:bg-sesi-darkRed" 
              disabled={isLoading || !password.trim()}
            >
              {isLoading ? "Entrando..." : "Entrar"}
            </Button>
          </form>

          <div className="mt-8 text-center text-xs text-muted-foreground">
            <p>SESI Pirassununga © {new Date().getFullYear()}</p>
            <p className="mt-1">Rede Social Educacional</p>
          </div>
        </Card>
      </div>
      
      {/* Pirassununga background elements */}
      <div className="fixed inset-0 -z-10 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
          <path d="M200,300 Q400,200 600,300" stroke="currentColor" fill="none" strokeWidth="2" />
          <circle cx="200" cy="300" r="5" fill="currentColor" />
          <circle cx="600" cy="300" r="5" fill="currentColor" />
          <rect x="350" y="250" width="100" height="150" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M370,400 L370,350 L430,350 L430,400" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M380,350 L380,320 L420,320 L420,350" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>
    </div>
  );
}
