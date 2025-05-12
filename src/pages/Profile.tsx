
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { VideoCard } from "@/components/video/VideoCard";
import { PostCard } from "@/components/post/PostCard";

// Sample user data
const userData = {
  id: "user1",
  name: "Maria Silva",
  role: "Professora de Matemática",
  avatar: "https://i.pravatar.cc/150?img=1",
  bio: "Professora de Matemática com mais de 10 anos de experiência. Especialista em álgebra e geometria. Apaixonada por ensinar e compartilhar conhecimento.",
  school: "SESI São Paulo",
  joinedDate: "Membro desde 2021",
  stats: {
    videos: 24,
    followers: 532,
    following: 47
  },
  badges: ["Criador Premium", "Top Educador", "Especialista em Matemática"],
  videos: [
    {
      id: "v1",
      title: "Equações do 2º grau - Parte 1",
      thumbnail: "https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?q=80&w=2070&auto=format&fit=crop",
      duration: "14:22",
      views: 1845,
      author: {
        id: "user1",
        name: "Maria Silva",
        avatar: "https://i.pravatar.cc/150?img=1"
      },
      createdAt: "2 semanas atrás"
    },
    {
      id: "v2",
      title: "Geometria Analítica - Coordenadas",
      thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop",
      duration: "18:37",
      views: 1256,
      author: {
        id: "user1",
        name: "Maria Silva",
        avatar: "https://i.pravatar.cc/150?img=1"
      },
      createdAt: "1 mês atrás"
    },
    {
      id: "v3",
      title: "Trigonometria - Funções Seno e Cosseno",
      thumbnail: "https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=2070&auto=format&fit=crop",
      duration: "22:15",
      views: 987,
      author: {
        id: "user1",
        name: "Maria Silva",
        avatar: "https://i.pravatar.cc/150?img=1"
      },
      createdAt: "2 meses atrás"
    }
  ],
  posts: [
    {
      id: "p1",
      author: {
        id: "user1",
        name: "Maria Silva",
        avatar: "https://i.pravatar.cc/150?img=1",
        role: "Professora de Matemática"
      },
      content: "Acabei de publicar uma nova aula sobre equações do 2º grau. Confira o vídeo abaixo!",
      video: {
        id: "v1",
        thumbnail: "https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?q=80&w=2070&auto=format&fit=crop",
        title: "Equações do 2º grau - Parte 1"
      },
      createdAt: "2 semanas atrás",
      likes: 24,
      comments: 5
    },
    {
      id: "p2",
      author: {
        id: "user1",
        name: "Maria Silva",
        avatar: "https://i.pravatar.cc/150?img=1",
        role: "Professora de Matemática"
      },
      content: "Preparando materiais para a próxima aula de Geometria Analítica. Quais são as maiores dificuldades de vocês neste tema?",
      createdAt: "1 mês atrás",
      likes: 18,
      comments: 12
    }
  ]
};

export default function Profile() {
  return (
    <div className="max-w-5xl mx-auto">
      <Card className="overflow-hidden mb-8">
        <div className="h-32 bg-gradient-to-r from-sesi-red to-sesi-darkRed" />
        <CardContent className="relative pt-0">
          <Avatar className="absolute -top-12 ring-4 ring-background h-24 w-24">
            <AvatarImage src={userData.avatar} alt={userData.name} />
            <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
          </Avatar>
          
          <div className="mt-14 flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold">{userData.name}</h1>
              <p className="text-muted-foreground">{userData.role} • {userData.school}</p>
              <p className="text-sm text-muted-foreground mt-1">{userData.joinedDate}</p>
              
              <div className="flex flex-wrap gap-2 mt-3">
                {userData.badges.map((badge, index) => (
                  <Badge key={index} variant="outline" className="bg-sesi-red/10">
                    {badge}
                  </Badge>
                ))}
              </div>
            </div>
            
            <Button className="bg-sesi-red hover:bg-sesi-darkRed">Seguir</Button>
          </div>
          
          <div className="flex gap-6 mt-4">
            <div>
              <p className="font-bold">{userData.stats.videos}</p>
              <p className="text-sm text-muted-foreground">Vídeos</p>
            </div>
            <div>
              <p className="font-bold">{userData.stats.followers}</p>
              <p className="text-sm text-muted-foreground">Seguidores</p>
            </div>
            <div>
              <p className="font-bold">{userData.stats.following}</p>
              <p className="text-sm text-muted-foreground">Seguindo</p>
            </div>
          </div>
          
          {userData.bio && (
            <div className="mt-4 pt-4 border-t">
              <h3 className="text-sm font-medium mb-1">Sobre</h3>
              <p className="text-sm">{userData.bio}</p>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Tabs defaultValue="videos">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="videos">Vídeos</TabsTrigger>
          <TabsTrigger value="posts">Postagens</TabsTrigger>
        </TabsList>
        
        <TabsContent value="videos" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {userData.videos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="posts" className="mt-6">
          <div className="space-y-4">
            {userData.posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
