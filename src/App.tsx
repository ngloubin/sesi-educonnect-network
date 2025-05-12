
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import Layout from "@/components/layout/Layout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import VideoModeration from "./pages/VideoModeration";
import VideosPage from "./pages/VideosPage";
import VideoDetail from "./pages/VideoDetail";
import Profile from "./pages/Profile";
import GradeSelection from "./pages/GradeSelection";
import StudentLogin from "./pages/StudentLogin";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Login and Grade Selection Routes - Outside Layout */}
            <Route path="/grade-selection" element={<GradeSelection />} />
            <Route path="/login/:studentId" element={<StudentLogin />} />
            
            {/* Main Layout Routes */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Index />} />
              <Route path="/videos" element={<VideosPage />} />
              <Route path="/videos/:id" element={<VideoDetail />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/moderation" element={<VideoModeration />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Route>
            
            {/* Redirect from root to grade selection if needed */}
            <Route path="/" element={<Navigate to="/grade-selection" />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
