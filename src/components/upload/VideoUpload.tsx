
import { useState, useRef } from "react";
import { Video, Upload, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export function VideoUpload() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.includes("video/")) {
        setVideoFile(file);
        setVideoPreviewUrl(URL.createObjectURL(file));
      } else {
        toast.error("Por favor, selecione um arquivo de vídeo válido.");
      }
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      if (file.type.includes("video/")) {
        setVideoFile(file);
        setVideoPreviewUrl(URL.createObjectURL(file));
      } else {
        toast.error("Por favor, selecione um arquivo de vídeo válido.");
      }
    }
  };

  const handleClearVideo = () => {
    setVideoFile(null);
    setVideoPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoFile) {
      toast.error("Por favor, selecione um vídeo para enviar.");
      return;
    }

    if (!title.trim()) {
      toast.error("Por favor, informe um título para o vídeo.");
      return;
    }

    setUploading(true);

    // Simulando o upload e processamento do vídeo
    setTimeout(() => {
      setUploading(false);
      toast.success("Vídeo enviado com sucesso! Em análise pela moderação.");
      setTitle("");
      setDescription("");
      handleClearVideo();
    }, 2000);
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Video className="w-5 h-5" />
          Enviar Novo Vídeo
        </CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div>
            <label htmlFor="title" className="text-sm font-medium mb-1 block">
              Título do vídeo
            </label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Digite um título para o vídeo..."
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="text-sm font-medium mb-1 block">
              Descrição (opcional)
            </label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Adicione uma descrição ao vídeo..."
              rows={3}
            />
          </div>

          {!videoFile ? (
            <div
              className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                type="file"
                accept="video/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
              <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm font-medium mb-1">
                Arraste e solte seu vídeo aqui, ou clique para selecionar
              </p>
              <p className="text-xs text-muted-foreground">
                MP4, MOV, AVI ou WebM (máx. 100MB)
              </p>
            </div>
          ) : (
            <div className="relative rounded-lg overflow-hidden">
              <video
                src={videoPreviewUrl || ""}
                className="w-full aspect-video object-cover"
                controls
              />
              <Button
                type="button"
                size="icon"
                variant="destructive"
                className="absolute top-2 right-2"
                onClick={handleClearVideo}
              >
                <X className="h-4 w-4" />
              </Button>
              <div className="mt-2 text-sm">
                <p className="font-medium">{videoFile.name}</p>
                <p className="text-muted-foreground">
                  {(videoFile.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button 
            type="submit" 
            className="w-full bg-sesi-red hover:bg-sesi-darkRed"
            disabled={!videoFile || !title || uploading}
          >
            {uploading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Enviando...
              </>
            ) : (
              "Enviar vídeo"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
