
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, MessageSquare, Share2, Bookmark, Flag } from "lucide-react";
import { VideoCard } from "@/components/video/VideoCard";

// Sample video data
const videoData = {
  id: "1",
  title: "Física Quântica: Conceitos Fundamentais",
  description: "Nesta aula, exploramos os princípios básicos da física quântica, incluindo a dualidade onda-partícula, o princípio da incerteza de Heisenberg e a interpretação de Copenhagen. Compreenda como esses conceitos revolucionaram nossa visão do universo e as implicações para a tecnologia moderna.",
  videoUrl: "https://example.com/videos/physics-quantum.mp4",
  thumbnail: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?q=80&w=1974&auto=format&fit=crop",
  views: 1287,
  likes: 245,
  shares: 52,
  comments: [
    {
      id: "c1",
      author: {
        name: "João Silva",
        avatar: "https://i.pravatar.cc/150?img=33"
      },
      content: "Excelente explicação! Finalmente entendi o princípio da incerteza.",
      createdAt: "3 dias atrás",
      likes: 12
    },
    {
      id: "c2",
      author: {
        name: "Laura Almeida",
        avatar: "https://i.pravatar.cc/150?img=45"
      },
      content: "Professor, poderia explicar mais sobre a interpretação de muitos mundos na próxima aula?",
      createdAt: "2 dias atrás",
      likes: 8
    }
  ],
  author: {
    id: "author1",
    name: "Prof. Carlos Santos",
    avatar: "https://i.pravatar.cc/150?img=11",
    subscribers: 5243
  },
  createdAt: "2 semanas atrás",
  relatedVideos: [
    {
      id: "2",
      title: "Mecânica Quântica: Aplicações Práticas",
      thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop",
      duration: "16:42",
      views: 982,
      author: {
        id: "author1",
        name: "Prof. Carlos Santos",
        avatar: "https://i.pravatar.cc/150?img=11"
      },
      createdAt: "1 mês atrás"
    },
    {
      id: "3",
      title: "Teoria da Relatividade: Espaço-Tempo",
      thumbnail: "https://images.unsplash.com/photo-1608501078713-8e445a709b39?q=80&w=2070&auto=format&fit=crop",
      duration: "21:35",
      views: 1567,
      author: {
        id: "author1",
        name: "Prof. Carlos Santos",
        avatar: "https://i.pravatar.cc/150?img=11"
      },
      createdAt: "3 semanas atrás"
    },
    {
      id: "4",
      title: "Partículas Fundamentais: O Modelo Padrão",
      thumbnail: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2071&auto=format&fit=crop",
      duration: "18:20",
      views: 873,
      author: {
        id: "author1",
        name: "Prof. Carlos Santos",
        avatar: "https://i.pravatar.cc/150?img=11"
      },
      createdAt: "1 mês atrás"
    }
  ]
};

export default function VideoDetail() {
  const { id } = useParams<{ id: string }>();
  const video = videoData; // In a real app, we'd fetch the video based on the id
  const [commentText, setCommentText] = useState("");
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(video.likes);
  const [bookmarked, setBookmarked] = useState(false);

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setLiked(!liked);
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
  };

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we'd submit the comment to the backend
    setCommentText("");
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="aspect-video bg-black rounded-lg overflow-hidden">
            <video
              src={video.videoUrl}
              poster={video.thumbnail}
              controls
              className="w-full h-full object-contain"
            />
          </div>

          <div>
            <h1 className="text-2xl font-bold">{video.title}</h1>
            <div className="flex justify-between items-center mt-2">
              <div className="text-sm text-muted-foreground">
                {video.views} visualizações • {video.createdAt}
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="flex items-center gap-1"
                  onClick={handleLike}
                >
                  <Heart className={`h-4 w-4 ${liked ? 'fill-sesi-red text-sesi-red' : ''}`} />
                  <span>{likeCount}</span>
                </Button>
                <Button variant="ghost" size="sm" className="flex items-center gap-1">
                  <Share2 className="h-4 w-4" />
                  <span>{video.shares}</span>
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="flex items-center gap-1"
                  onClick={handleBookmark}
                >
                  <Bookmark className={`h-4 w-4 ${bookmarked ? 'fill-current' : ''}`} />
                  <span>Salvar</span>
                </Button>
                <Button variant="ghost" size="sm" className="flex items-center gap-1">
                  <Flag className="h-4 w-4" />
                  <span>Reportar</span>
                </Button>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 border rounded-lg">
            <Avatar className="h-10 w-10">
              <AvatarImage src={video.author.avatar} alt={video.author.name} />
              <AvatarFallback>{video.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-medium">{video.author.name}</h3>
              <p className="text-sm text-muted-foreground">{video.author.subscribers} inscritos</p>
            </div>
            <Button className="bg-sesi-red hover:bg-sesi-darkRed">Inscrever-se</Button>
          </div>

          <Tabs defaultValue="description">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="description">Descrição</TabsTrigger>
              <TabsTrigger value="comments">
                Comentários ({video.comments.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="p-4 border rounded-lg">
              <p className="whitespace-pre-line">{video.description}</p>
            </TabsContent>

            <TabsContent value="comments" className="space-y-4">
              <form onSubmit={handleComment}>
                <div className="flex gap-4">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://i.pravatar.cc/150?img=50" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Textarea
                      placeholder="Adicione um comentário..."
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      className="mb-2"
                    />
                    <div className="flex justify-end">
                      <Button
                        type="submit"
                        className="bg-sesi-red hover:bg-sesi-darkRed"
                        disabled={!commentText.trim()}
                      >
                        Comentar
                      </Button>
                    </div>
                  </div>
                </div>
              </form>

              <div className="space-y-4 pt-4">
                {video.comments.map((comment) => (
                  <div key={comment.id} className="flex gap-4">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                      <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{comment.author.name}</span>
                        <span className="text-xs text-muted-foreground">{comment.createdAt}</span>
                      </div>
                      <p>{comment.content}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Button variant="ghost" size="sm" className="h-6 px-2">
                          <Heart className="h-3 w-3 mr-1" />
                          <span className="text-xs">{comment.likes}</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                          Responder
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Vídeos relacionados</h2>
          <div className="space-y-4">
            {video.relatedVideos.map((relatedVideo) => (
              <VideoCard key={relatedVideo.id} video={relatedVideo} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
