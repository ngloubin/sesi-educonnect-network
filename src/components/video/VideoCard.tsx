
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface VideoCardProps {
  video: {
    id: string;
    title: string;
    thumbnail: string;
    duration: string;
    views: number;
    author: {
      id: string;
      name: string;
      avatar: string;
    };
    createdAt: string;
  };
}

export function VideoCard({ video }: VideoCardProps) {
  return (
    <Card className="overflow-hidden card-hover">
      <Link to={`/videos/${video.id}`}>
        <div className="relative">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full aspect-video object-cover"
          />
          <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded">
            {video.duration}
          </span>
        </div>
      </Link>
      <CardContent className="p-3">
        <Link to={`/videos/${video.id}`} className="hover:underline">
          <h3 className="font-medium line-clamp-2">{video.title}</h3>
        </Link>
      </CardContent>
      <CardFooter className="p-3 pt-0">
        <div className="flex items-center gap-2 w-full">
          <Link to={`/profile/${video.author.id}`}>
            <Avatar className="h-6 w-6">
              <AvatarImage src={video.author.avatar} alt={video.author.name} />
              <AvatarFallback>{video.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </Link>
          <div className="flex-1">
            <Link to={`/profile/${video.author.id}`} className="text-xs font-medium hover:underline">
              {video.author.name}
            </Link>
            <p className="text-xs text-muted-foreground">
              {video.views} visualizações • {video.createdAt}
            </p>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
