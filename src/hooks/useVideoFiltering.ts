
import { useState, useMemo } from "react";
import { VideoData } from "@/types/video";

export function useVideoFiltering(
  pendingVideos: VideoData[],
  approvedVideos: VideoData[],
  rejectedVideos: VideoData[]
) {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("all");

  // Filter videos by search term and date
  const filterVideos = (videos: VideoData[]) => {
    return videos.filter(video => {
      const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           video.author.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (!matchesSearch) return false;
      
      if (dateFilter === "today") {
        return video.uploadDate.includes("Hoje");
      } else if (dateFilter === "week") {
        return !video.uploadDate.includes("semanas") && !video.uploadDate.includes("meses");
      }
      
      return true;
    });
  };

  const filteredPendingVideos = useMemo(() => filterVideos(pendingVideos), [pendingVideos, searchTerm, dateFilter]);
  const filteredApprovedVideos = useMemo(() => filterVideos(approvedVideos), [approvedVideos, searchTerm, dateFilter]);
  const filteredRejectedVideos = useMemo(() => filterVideos(rejectedVideos), [rejectedVideos, searchTerm, dateFilter]);

  return {
    searchTerm,
    setSearchTerm,
    dateFilter,
    setDateFilter,
    filteredPendingVideos,
    filteredApprovedVideos,
    filteredRejectedVideos
  };
}
