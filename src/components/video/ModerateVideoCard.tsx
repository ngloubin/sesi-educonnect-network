
import { useState } from "react";
import { Check, X, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { toast } from "sonner";

interface VideoData {
  id: string;
  title: string;
  thumbnail: string;
  author: {
    name: string;
    avatar: string;
  };
  uploadDate: string;
  status: "pending" | "approved" | "rejected";
  transcription?: string;
}

interface ModerateVideoCardProps {
  video: VideoData;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

export function ModerateVideoCard({ video, onApprove, onReject }: ModerateVideoCardProps) {
  const [showTranscription, setShowTranscription] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleApprove = () => {
    setIsLoading(true);
    setTimeout(() => {
      onApprove(video.id);
      toast.success(`Vídeo "${video.title}" aprovado com sucesso!`);
      setIsLoading(false);
    }, 500);
  };

  const handleReject = () => {
    setIsLoading(true);
    setTimeout(() => {
      onReject(video.id);
      toast.success(`Vídeo "${video.title}" rejeitado.`);
      setIsLoading(false);
    }, 500);
  };

  const getStatusBadge = () => {
    switch (video.status) {
      case "pending":
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500">Pendente</Badge>;
      case "approved":
        return <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500">Aprovado</Badge>;
      case "rejected":
        return <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-500">Rejeitado</Badge>;
      default:
        return null;
    }
  };

  return (
    <>
      <Card>
        <CardHeader className="p-4">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={video.author.avatar} alt={video.author.name} />
                <AvatarFallback>{video.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-base">{video.title}</CardTitle>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-muted-foreground">{video.author.name} • {video.uploadDate}</span>
                  {getStatusBadge()}
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="relative">
            <img 
              src={video.thumbnail} 
              alt={video.title} 
              className="w-full aspect-video object-cover" 
            />
            <Button
              variant="outline"
              size="icon"
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 border-none text-white h-12 w-12 rounded-full"
              onClick={() => setShowTranscription(true)}
            >
              <PlayCircle className="w-6 h-6" />
            </Button>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-3 flex gap-2">
          <Button 
            variant="ghost" 
            className="flex-1"
            onClick={() => setShowTranscription(true)}
          >
            Ver transcrição
          </Button>
          {video.status === "pending" && (
            <>
              <Button 
                variant="outline" 
                className="flex-1 border-green-500 text-green-500 hover:bg-green-500/10"
                onClick={handleApprove}
                disabled={isLoading}
              >
                <Check className="w-4 h-4 mr-1" /> Aprovar
              </Button>
              <Button 
                variant="outline" 
                className="flex-1 border-red-500 text-red-500 hover:bg-red-500/10"
                onClick={handleReject}
                disabled={isLoading}
              >
                <X className="w-4 h-4 mr-1" /> Rejeitar
              </Button>
            </>
          )}
        </CardFooter>
      </Card>

      <Dialog open={showTranscription} onOpenChange={setShowTranscription}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">Vídeo: {video.title}</h3>
              <p className="text-sm text-muted-foreground">Por: {video.author.name}</p>
            </div>
            
            <div className="aspect-video bg-black rounded-lg overflow-hidden">
              <video 
                src="/placeholder-video.mp4" 
                poster={video.thumbnail}
                className="w-full h-full object-cover" 
                controls
              />
            </div>
            
            <div>
              <h4 className="text-md font-medium mb-2">Transcrição gerada automaticamente:</h4>
              <div className="bg-muted p-4 rounded-lg text-sm whitespace-pre-line">
                {video.transcription || "Este é um exemplo de transcrição automática gerada para o vídeo. O sistema analisou o áudio e converteu para texto para facilitar a moderação do conteúdo. A transcrição pode conter erros devido ao processo automatizado, mas serve como base para avaliação do material."}
              </div>
            </div>
            
            {video.status === "pending" && (
              <div className="flex gap-2 pt-2">
                <Button 
                  variant="outline" 
                  className="flex-1 border-green-500 text-green-500 hover:bg-green-500/10"
                  onClick={handleApprove}
                  disabled={isLoading}
                >
                  <Check className="w-4 h-4 mr-1" /> Aprovar vídeo
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1 border-red-500 text-red-500 hover:bg-red-500/10"
                  onClick={handleReject}
                  disabled={isLoading}
                >
                  <X className="w-4 h-4 mr-1" /> Rejeitar vídeo
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
