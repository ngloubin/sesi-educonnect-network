
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ModerateVideoCard } from "@/components/video/ModerateVideoCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Sample data for videos pending moderation
const samplePendingVideos = [
  {
    id: "1",
    title: "Introdução à Física Quântica",
    thumbnail: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?q=80&w=1974&auto=format&fit=crop",
    author: {
      name: "Carlos Santos",
      avatar: "https://i.pravatar.cc/150?img=11"
    },
    uploadDate: "Hoje, 09:15",
    status: "pending" as const,
    transcription: "Nesta aula, vamos explorar os conceitos básicos da física quântica e como ela revolucionou nossa compreensão do universo. Começaremos falando sobre a dualidade onda-partícula e o princípio da incerteza de Heisenberg."
  },
  {
    id: "2",
    title: "Técnicas de Redação para o ENEM",
    thumbnail: "https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?q=80&w=1948&auto=format&fit=crop",
    author: {
      name: "Juliana Mendes",
      avatar: "https://i.pravatar.cc/150?img=9"
    },
    uploadDate: "Ontem, 16:45",
    status: "pending" as const,
    transcription: "Bem-vindos à nossa aula sobre redação para o ENEM. Hoje veremos como estruturar seu texto para conseguir uma nota máxima, explorando os critérios de avaliação e técnicas de argumentação."
  },
  {
    id: "3",
    title: "Projeto de Robótica - Montagem de Sensores",
    thumbnail: "https://images.unsplash.com/photo-1611078489935-0cb964de46d6?q=80&w=1974&auto=format&fit=crop",
    author: {
      name: "Rodrigo Almeida",
      avatar: "https://i.pravatar.cc/150?img=12"
    },
    uploadDate: "3 dias atrás",
    status: "pending" as const,
    transcription: "Neste tutorial, vamos aprender a montar e programar sensores para nossos projetos de robótica. Começaremos com sensores ultrassônicos e depois avançaremos para sensores infravermelhos e de temperatura."
  }
];

// Sample data for approved and rejected videos
const sampleApprovedVideos = [
  {
    id: "4",
    title: "História do Brasil - Era Vargas",
    thumbnail: "https://images.unsplash.com/photo-1594809512566-021c1d533086?q=80&w=1980&auto=format&fit=crop",
    author: {
      name: "Amanda Pereira",
      avatar: "https://i.pravatar.cc/150?img=18"
    },
    uploadDate: "1 semana atrás",
    status: "approved" as const
  },
  {
    id: "5",
    title: "Geometria Espacial - Poliedros",
    thumbnail: "https://images.unsplash.com/photo-1551307090-1c99666f969d?q=80&w=2070&auto=format&fit=crop",
    author: {
      name: "Lucas Ferreira",
      avatar: "https://i.pravatar.cc/150?img=19"
    },
    uploadDate: "2 semanas atrás",
    status: "approved" as const
  }
];

const sampleRejectedVideos = [
  {
    id: "6",
    title: "Análise Literária - Machado de Assis",
    thumbnail: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1973&auto=format&fit=crop",
    author: {
      name: "Beatriz Costa",
      avatar: "https://i.pravatar.cc/150?img=23"
    },
    uploadDate: "3 dias atrás",
    status: "rejected" as const
  }
];

export default function VideoModeration() {
  const [pendingVideos, setPendingVideos] = useState(samplePendingVideos);
  const [approvedVideos, setApprovedVideos] = useState(sampleApprovedVideos);
  const [rejectedVideos, setRejectedVideos] = useState(sampleRejectedVideos);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("all");

  const handleApproveVideo = (videoId: string) => {
    const videoToApprove = pendingVideos.find(video => video.id === videoId);
    if (videoToApprove) {
      const updatedVideo = { ...videoToApprove, status: "approved" as const };
      setApprovedVideos([updatedVideo, ...approvedVideos]);
      setPendingVideos(pendingVideos.filter(video => video.id !== videoId));
    }
  };

  const handleRejectVideo = (videoId: string) => {
    const videoToReject = pendingVideos.find(video => video.id === videoId);
    if (videoToReject) {
      const updatedVideo = { ...videoToReject, status: "rejected" as const };
      setRejectedVideos([updatedVideo, ...rejectedVideos]);
      setPendingVideos(pendingVideos.filter(video => video.id !== videoId));
    }
  };

  // Filter videos by search term and date
  const filterVideos = (videos: typeof samplePendingVideos) => {
    return videos.filter(video => {
      const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           video.author.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (!matchesSearch) return false;
      
      if (dateFilter === "today") {
        return video.uploadDate.includes("Hoje");
      } else if (dateFilter === "week") {
        return !video.uploadDate.includes("semanas") && !video.uploadDate.includes("meses");
      }
      
      return true;
    });
  };

  const filteredPendingVideos = filterVideos(pendingVideos);
  const filteredApprovedVideos = filterVideos(approvedVideos);
  const filteredRejectedVideos = filterVideos(rejectedVideos);

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Moderação de Vídeos</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <Label htmlFor="search" className="mb-2 block">Pesquisar vídeos</Label>
          <Input
            id="search"
            placeholder="Buscar por título ou autor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="date-filter" className="mb-2 block">Filtrar por data</Label>
          <Select value={dateFilter} onValueChange={setDateFilter}>
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
      
      <Tabs defaultValue="pending">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="pending" className="relative">
            Pendentes
            {pendingVideos.length > 0 && (
              <span className="absolute top-0 right-1 bg-sesi-red text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {pendingVideos.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="approved">Aprovados</TabsTrigger>
          <TabsTrigger value="rejected">Rejeitados</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pending" className="space-y-6">
          {filteredPendingVideos.length > 0 ? (
            filteredPendingVideos.map(video => (
              <ModerateVideoCard
                key={video.id}
                video={video}
                onApprove={handleApproveVideo}
                onReject={handleRejectVideo}
              />
            ))
          ) : (
            <div className="text-center py-8 bg-muted/50 rounded-lg">
              <p className="text-muted-foreground">Nenhum vídeo pendente encontrado.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="approved" className="space-y-6">
          {filteredApprovedVideos.length > 0 ? (
            filteredApprovedVideos.map(video => (
              <ModerateVideoCard
                key={video.id}
                video={video}
                onApprove={handleApproveVideo}
                onReject={handleRejectVideo}
              />
            ))
          ) : (
            <div className="text-center py-8 bg-muted/50 rounded-lg">
              <p className="text-muted-foreground">Nenhum vídeo aprovado encontrado.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="rejected" className="space-y-6">
          {filteredRejectedVideos.length > 0 ? (
            filteredRejectedVideos.map(video => (
              <ModerateVideoCard
                key={video.id}
                video={video}
                onApprove={handleApproveVideo}
                onReject={handleRejectVideo}
              />
            ))
          ) : (
            <div className="text-center py-8 bg-muted/50 rounded-lg">
              <p className="text-muted-foreground">Nenhum vídeo rejeitado encontrado.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
