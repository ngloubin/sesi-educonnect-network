
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PostCard } from "@/components/post/PostCard";
import { VideoUpload } from "@/components/upload/VideoUpload";

const samplePosts = [
  {
    id: "1",
    author: {
      id: "user1",
      name: "Maria Silva",
      avatar: "https://i.pravatar.cc/150?img=1",
      role: "Professora de Matemática"
    },
    content: "Acabei de publicar uma nova aula sobre equações do 2º grau. Confira o vídeo abaixo!",
    video: {
      id: "video1",
      thumbnail: "https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?q=80&w=2070&auto=format&fit=crop",
      title: "Equações do 2º grau - Parte 1"
    },
    createdAt: "Hoje, 10:30",
    likes: 24,
    comments: 5
  },
  {
    id: "2",
    author: {
      id: "user2",
      name: "Pedro Almeida",
      avatar: "https://i.pravatar.cc/150?img=3",
      role: "Aluno do 3º ano"
    },
    content: "Compartilhando o projeto que desenvolvemos na Feira de Ciências sobre energia renovável. Foi um trabalho em equipe incrível!",
    image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=2070&auto=format&fit=crop",
    createdAt: "Ontem, 15:45",
    likes: 32,
    comments: 8
  },
  {
    id: "3",
    author: {
      id: "user3",
      name: "Ana Oliveira",
      avatar: "https://i.pravatar.cc/150?img=5",
      role: "Coordenadora Pedagógica"
    },
    content: "Atenção estudantes! As inscrições para o Clube de Robótica estão abertas até sexta-feira. Não percam essa oportunidade de aprender e se divertir com tecnologia!",
    createdAt: "2 dias atrás",
    likes: 18,
    comments: 3
  }
];

export default function Index() {
  const [postText, setPostText] = useState("");
  const [activeTab, setActiveTab] = useState("feed");

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    // Simular criação de post
    setPostText("");
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Tabs defaultValue="feed" className="mb-6" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="feed">Feed</TabsTrigger>
          <TabsTrigger value="upload">Enviar Vídeo</TabsTrigger>
        </TabsList>
        <TabsContent value="feed" className="animate-fade-in">
          <div className="space-y-6">
            <form onSubmit={handleCreatePost} className="bg-card rounded-lg p-4 shadow-sm">
              <div className="mb-3">
                <Input
                  placeholder="O que você está pensando?"
                  value={postText}
                  onChange={(e) => setPostText(e.target.value)}
                />
              </div>
              <div className="flex justify-end">
                <Button 
                  type="submit"
                  className="bg-sesi-red hover:bg-sesi-darkRed"
                  disabled={!postText.trim()}
                >
                  Publicar
                </Button>
              </div>
            </form>

            <div className="flex items-center gap-2 my-4">
              <Separator className="flex-1" />
              <span className="text-sm text-muted-foreground">Feed de Atividades</span>
              <Separator className="flex-1" />
            </div>

            <div className="space-y-4">
              {samplePosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="upload" className="animate-fade-in">
          <VideoUpload />
        </TabsContent>
      </Tabs>
    </div>
  );
}
