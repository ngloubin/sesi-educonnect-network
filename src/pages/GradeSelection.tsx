
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import SesiLogo from "@/components/SesiLogo";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

type AgeGroup = "1-5" | "6-8" | "9-12" | null;
type Grade = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | null;

interface Student {
  id: string;
  name: string;
  grade: Grade;
}

export default function GradeSelection() {
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<AgeGroup>(null);
  const [selectedGrade, setSelectedGrade] = useState<Grade>(null);
  const navigate = useNavigate();

  // Sample student data - in a real app this would come from an API
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

  const ageGroups = [
    { id: "1-5", label: "1º ao 5º ano" },
    { id: "6-8", label: "6º ao 8º ano" },
    { id: "9-12", label: "9º ano ao 3º ano do Ensino Médio" }
  ];

  const gradesByAgeGroup: Record<AgeGroup, { value: Grade; label: string }[]> = {
    "1-5": [
      { value: "1", label: "1º ano" },
      { value: "2", label: "2º ano" },
      { value: "3", label: "3º ano" },
      { value: "4", label: "4º ano" },
      { value: "5", label: "5º ano" }
    ],
    "6-8": [
      { value: "6", label: "6º ano" },
      { value: "7", label: "7º ano" },
      { value: "8", label: "8º ano" }
    ],
    "9-12": [
      { value: "9", label: "9º ano" },
      { value: "10", label: "1º ano EM" },
      { value: "11", label: "2º ano EM" },
      { value: "12", label: "3º ano EM" }
    ],
    "null": []
  };

  const filteredStudents = students.filter(
    (student) => student.grade === selectedGrade
  );

  const handleStudentSelect = (studentId: string) => {
    // Navigate to the login page with the student ID
    navigate(`/login/${studentId}`);
  };

  const handleBack = () => {
    if (selectedGrade) {
      setSelectedGrade(null);
    } else if (selectedAgeGroup) {
      setSelectedAgeGroup(null);
    }
  };

  const renderContent = () => {
    if (!selectedAgeGroup) {
      return (
        <div className="grid grid-cols-1 gap-4">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold mb-2">Selecione sua faixa etária</h1>
            <p className="text-muted-foreground">Escolha a opção correspondente à sua série</p>
          </div>
          {ageGroups.map((group) => (
            <Button
              key={group.id}
              onClick={() => setSelectedAgeGroup(group.id as AgeGroup)}
              className="h-16 text-lg bg-sesi-red hover:bg-sesi-darkRed"
              variant="default"
            >
              {group.label}
            </Button>
          ))}
        </div>
      );
    }

    if (!selectedGrade) {
      return (
        <div className="grid grid-cols-1 gap-4">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold mb-2">Selecione sua série</h1>
            <p className="text-muted-foreground">Escolha a sua série atual</p>
          </div>
          {gradesByAgeGroup[selectedAgeGroup].map((grade) => (
            <Button
              key={grade.value}
              onClick={() => setSelectedGrade(grade.value)}
              className="h-16 text-lg"
              variant="outline"
            >
              {grade.label}
            </Button>
          ))}
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold mb-2">Selecione seu nome</h1>
          <p className="text-muted-foreground">Escolha seu nome na lista de alunos</p>
        </div>
        {filteredStudents.length > 0 ? (
          filteredStudents.map((student) => (
            <Button
              key={student.id}
              onClick={() => handleStudentSelect(student.id)}
              className="w-full h-14 text-lg justify-start px-4"
              variant="outline"
            >
              {student.name}
            </Button>
          ))
        ) : (
          <p className="text-center text-muted-foreground">Nenhum aluno encontrado para esta série.</p>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative">
      <div className="w-full max-w-md">
        <Card className="p-6 shadow-lg">
          <div className="flex items-center justify-center mb-8">
            <SesiLogo className="h-16 w-auto" />
          </div>
          
          <div className="relative">
            {(selectedAgeGroup || selectedGrade) && (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleBack}
                className="absolute left-0 -top-12"
              >
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Voltar</span>
              </Button>
            )}
            {renderContent()}
          </div>

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
