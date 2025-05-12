
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VideoFilterControls } from "@/components/video/VideoFilterControls";
import { VideoList } from "@/components/video/VideoList";
import { VideoData } from "@/types/video";
import { useVideoFiltering } from "@/hooks/useVideoFiltering";
import { 
  samplePendingVideos, 
  sampleApprovedVideos, 
  sampleRejectedVideos 
} from "@/data/sampleVideos";

export default function VideoModeration() {
  const [pendingVideos, setPendingVideos] = useState<VideoData[]>(samplePendingVideos);
  const [approvedVideos, setApprovedVideos] = useState<VideoData[]>(sampleApprovedVideos);
  const [rejectedVideos, setRejectedVideos] = useState<VideoData[]>(sampleRejectedVideos);

  const {
    searchTerm,
    setSearchTerm,
    dateFilter,
    setDateFilter,
    filteredPendingVideos,
    filteredApprovedVideos,
    filteredRejectedVideos
  } = useVideoFiltering(pendingVideos, approvedVideos, rejectedVideos);

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

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Moderação de Vídeos</h1>
      
      <VideoFilterControls
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        dateFilter={dateFilter}
        onDateFilterChange={setDateFilter}
      />
      
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
        
        <TabsContent value="pending">
          <VideoList 
            videos={filteredPendingVideos}
            onApprove={handleApproveVideo}
            onReject={handleRejectVideo}
            emptyMessage="Nenhum vídeo pendente encontrado."
          />
        </TabsContent>
        
        <TabsContent value="approved">
          <VideoList 
            videos={filteredApprovedVideos}
            emptyMessage="Nenhum vídeo aprovado encontrado."
          />
        </TabsContent>
        
        <TabsContent value="rejected">
          <VideoList 
            videos={filteredRejectedVideos}
            emptyMessage="Nenhum vídeo rejeitado encontrado."
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
