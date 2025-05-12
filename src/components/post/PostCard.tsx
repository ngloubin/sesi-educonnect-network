
import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, MessageSquare, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface PostCardProps {
  post: {
    id: string;
    author: {
      id: string;
      name: string;
      avatar: string;
      role: string;
    };
    content: string;
    image?: string;
    video?: {
      id: string;
      thumbnail: string;
      title: string;
    };
    createdAt: string;
    likes: number;
    comments: number;
  };
}

export function PostCard({ post }: PostCardProps) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setLiked(!liked);
  };

  return (
    <Card className="overflow-hidden card-hover">
      <CardHeader className="p-4">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={post.author.avatar} alt={post.author.name} />
            <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{post.author.name}</div>
            <div className="text-xs text-muted-foreground">{post.author.role} • {post.createdAt}</div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="mb-3">{post.content}</p>
        {post.image && (
          <img
            src={post.image}
            alt="Post content"
            className="w-full rounded-md object-cover max-h-96"
          />
        )}
        {post.video && (
          <Link to={`/videos/${post.video.id}`} className="block relative rounded-md overflow-hidden">
            <img
              src={post.video.thumbnail}
              alt={post.video.title}
              className="w-full object-cover h-48"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-sesi-red flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
              <h3 className="text-white font-medium">{post.video.title}</h3>
            </div>
          </Link>
        )}
      </CardContent>
      <CardFooter className="p-2">
        <div className="flex items-center justify-between w-full">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            className={cn("gap-2", liked && "text-sesi-red")}
          >
            <Heart className={cn("h-4 w-4", liked && "fill-sesi-red")} />
            <span>{likeCount}</span>
          </Button>
          <Button variant="ghost" size="sm" className="gap-2">
            <MessageSquare className="h-4 w-4" />
            <span>{post.comments}</span>
          </Button>
          <Button variant="ghost" size="sm" className="gap-2">
            <Share2 className="h-4 w-4" />
            <span>Compartilhar</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
