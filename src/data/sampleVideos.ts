
import { VideoData } from "@/types/video";

// Sample data for videos pending moderation
export const samplePendingVideos: VideoData[] = [
  {
    id: "1",
    title: "Introdução à Física Quântica",
    thumbnail: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?q=80&w=1974&auto=format&fit=crop",
    author: {
      name: "Carlos Santos",
      avatar: "https://i.pravatar.cc/150?img=11"
    },
    uploadDate: "Hoje, 09:15",
    status: "pending",
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
    status: "pending",
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
    status: "pending",
    transcription: "Neste tutorial, vamos aprender a montar e programar sensores para nossos projetos de robótica. Começaremos com sensores ultrassônicos e depois avançaremos para sensores infravermelhos e de temperatura."
  }
];

// Sample data for approved videos
export const sampleApprovedVideos: VideoData[] = [
  {
    id: "4",
    title: "História do Brasil - Era Vargas",
    thumbnail: "https://images.unsplash.com/photo-1594809512566-021c1d533086?q=80&w=1980&auto=format&fit=crop",
    author: {
      name: "Amanda Pereira",
      avatar: "https://i.pravatar.cc/150?img=18"
    },
    uploadDate: "1 semana atrás",
    status: "approved",
    transcription: "Nesta aula sobre a Era Vargas, vamos analisar o período em que Getúlio Vargas governou o Brasil, abordando o Estado Novo e as transformações políticas e econômicas do país."
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
    status: "approved",
    transcription: "Nesta aula de geometria espacial, abordaremos os poliedros, seus elementos, classificações e propriedades. Vamos estudar os poliedros de Platão e resolver exercícios práticos."
  }
];

// Sample data for rejected videos
export const sampleRejectedVideos: VideoData[] = [
  {
    id: "6",
    title: "Análise Literária - Machado de Assis",
    thumbnail: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1973&auto=format&fit=crop",
    author: {
      name: "Beatriz Costa",
      avatar: "https://i.pravatar.cc/150?img=23"
    },
    uploadDate: "3 dias atrás",
    status: "rejected",
    transcription: "Analisaremos nesta aula as principais obras de Machado de Assis, com foco em Dom Casmurro e Memórias Póstumas de Brás Cubas, explorando os temas recorrentes e o estilo narrativo do autor."
  }
];
