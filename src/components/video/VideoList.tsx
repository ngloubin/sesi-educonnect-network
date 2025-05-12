
import { VideoData } from "@/types/video";
import { ModerateVideoCard } from "@/components/video/ModerateVideoCard";

interface VideoListProps {
  videos: VideoData[];
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  emptyMessage?: string;
}

export function VideoList({
  videos,
  onApprove,
  onReject,
  emptyMessage = "Nenhum vídeo encontrado."
}: VideoListProps) {
  if (videos.length === 0) {
    return (
      <div className="text-center py-8 bg-muted/50 rounded-lg">
        <p className="text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {videos.map(video => (
        <ModerateVideoCard
          key={video.id}
          video={video}
          onApprove={onApprove}
          onReject={onReject}
        />
      ))}
    </div>
  );
}
