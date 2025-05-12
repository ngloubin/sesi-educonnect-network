
// Define a common video type to ensure consistency across components
export interface VideoData {
  id: string;
  title: string;
  thumbnail: string;
  author: {
    name: string;
    avatar: string;
  };
  uploadDate: string;
  status: "pending" | "approved" | "rejected";
  transcription?: string; // Optional transcription
}
