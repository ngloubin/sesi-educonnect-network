
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { VideoCard } from "@/components/video/VideoCard";
import { Search } from "lucide-react";

// Sample video data
const sampleVideos = [
  {
    id: "1",
    title: "Física Quântica: Conceitos Fundamentais",
    thumbnail: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?q=80&w=1974&auto=format&fit=crop",
    duration: "14:35",
    views: 1287,
    author: {
      id: "author1",
      name: "Prof. Carlos Santos",
      avatar: "https://i.pravatar.cc/150?img=11"
    },
    createdAt: "2 semanas atrás"
  },
  {
    id: "2",
    title: "Redação para ENEM: Estrutura e Dicas",
    thumbnail: "https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?q=80&w=1948&auto=format&fit=crop",
    duration: "18:22",
    views: 2456,
    author: {
      id: "author2",
      name: "Profa. Juliana Mendes",
      avatar: "https://i.pravatar.cc/150?img=9"
    },
    createdAt: "3 dias atrás"
  },
  {
    id: "3",
    title: "Robótica Educacional: Montagem de Sensores",
    thumbnail: "https://images.unsplash.com/photo-1611078489935-0cb964de46d6?q=80&w=1974&auto=format&fit=crop",
    duration: "23:14",
    views: 853,
    author: {
      id: "author3",
      name: "Prof. Rodrigo Almeida",
      avatar: "https://i.pravatar.cc/150?img=12"
    },
    createdAt: "1 semana atrás"
  },
  {
    id: "4",
    title: "História do Brasil: Era Vargas",
    thumbnail: "https://images.unsplash.com/photo-1594809512566-021c1d533086?q=80&w=1980&auto=format&fit=crop",
    duration: "32:10",
    views: 1678,
    author: {
      id: "author4",
      name: "Profa. Amanda Pereira",
      avatar: "https://i.pravatar.cc/150?img=18"
    },
    createdAt: "1 mês atrás"
  },
  {
    id: "5",
    title: "Geometria Espacial: Poliedros",
    thumbnail: "https://images.unsplash.com/photo-1551307090-1c99666f969d?q=80&w=2070&auto=format&fit=crop",
    duration: "16:45",
    views: 942,
    author: {
      id: "author5",
      name: "Prof. Lucas Ferreira",
      avatar: "https://i.pravatar.cc/150?img=19"
    },
    createdAt: "2 semanas atrás"
  },
  {
    id: "6",
    title: "Literatura Brasileira: Machado de Assis",
    thumbnail: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1973&auto=format&fit=crop",
    duration: "26:18",
    views: 1345,
    author: {
      id: "author6",
      name: "Profa. Beatriz Costa",
      avatar: "https://i.pravatar.cc/150?img=23"
    },
    createdAt: "3 semanas atrás"
  }
];

export default function VideosPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filteredVideos = sampleVideos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         video.author.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Since we don't have actual categories in our sample data, we'll just use this as a placeholder
    if (categoryFilter !== "all") {
      // This is just a mock filtering logic - in a real app, videos would have category fields
      if (categoryFilter === "math" && !video.title.includes("Geometria") && !video.title.includes("Matemática")) {
        return false;
      }
      if (categoryFilter === "science" && !video.title.includes("Física") && !video.title.includes("Robótica")) {
        return false;
      }
      if (categoryFilter === "languages" && !video.title.includes("Redação") && !video.title.includes("Literatura")) {
        return false;
      }
      if (categoryFilter === "humanities" && !video.title.includes("História")) {
        return false;
      }
    }
    
    return matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Vídeos Educacionais</h1>
      
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Pesquisar vídeos..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="w-full md:w-64">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Categorias" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as categorias</SelectItem>
              <SelectItem value="math">Matemática</SelectItem>
              <SelectItem value="science">Ciências</SelectItem>
              <SelectItem value="languages">Linguagens</SelectItem>
              <SelectItem value="humanities">Humanas</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-semibold">Vídeos em destaque</h2>
          <Button variant="link" className="text-sesi-red">Ver todos</Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.slice(0, 3).map(video => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </div>
      
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-semibold">Todos os vídeos</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map(video => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </div>
    </div>
  );
}
