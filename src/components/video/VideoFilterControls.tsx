
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface VideoFilterControlsProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  dateFilter: string;
  onDateFilterChange: (value: string) => void;
}

export function VideoFilterControls({
  searchTerm,
  onSearchChange,
  dateFilter,
  onDateFilterChange
}: VideoFilterControlsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <div>
        <Label htmlFor="search" className="mb-2 block">Pesquisar vídeos</Label>
        <Input
          id="search"
          placeholder="Buscar por título ou autor..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="date-filter" className="mb-2 block">Filtrar por data</Label>
        <Select value={dateFilter} onValueChange={onDateFilterChange}>
          <SelectTrigger id="date-filter">
            <SelectValue placeholder="Filtrar por data" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os períodos</SelectItem>
            <SelectItem value="today">Hoje</SelectItem>
            <SelectItem value="week">Esta semana</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
