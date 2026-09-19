
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IndexJP from "./pages/IndexJP";
import IndexEN from "./pages/IndexEN";
import IndexAnonymousJP from "./pages/IndexAnonymousJP";
import IndexAnonymousEN from "./pages/IndexAnonymousEN";
import NotFound from "./pages/NotFound";
import ProjectDetail from "./components/ProjectDetail";
import ProjectDetailEN from "./components/ProjectDetailEN";
import ProjectEditor from "./components/ProjectEditor";
import ProjectEditIndex from "./pages/ProjectEditIndex";
import Auth from "./pages/Auth";
import RequireAuth from "./components/RequireAuth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<IndexJP />} />
          <Route path="/en" element={<IndexEN />} />
          <Route path="/anonymous" element={<IndexAnonymousJP />} />
          <Route path="/anonymous/en" element={<IndexAnonymousEN />} />
          <Route path="/project/:slug" element={<ProjectDetail />} />
          <Route path="/en/project/:slug" element={<ProjectDetailEN />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/edit" element={<RequireAuth><ProjectEditIndex /></RequireAuth>} />
          <Route path="/edit/:slug" element={<RequireAuth><ProjectEditor /></RequireAuth>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
