
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";

// Pages
import Home from "@/pages/Home";
import Members from "@/pages/Members";
import StudyMaterial from "@/pages/StudyMaterial";
import About from "@/pages/About";
import EditReport from "@/pages/EditReport";
import MemberReports from "@/pages/MemberReports";
import NotFound from "@/pages/NotFound";

// Add Framer Motion
import { AnimatePresence } from "framer-motion";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/members" element={<Members />} />
              <Route path="/study-material" element={<StudyMaterial />} />
              <Route path="/about" element={<About />} />
              <Route path="/edit-report/:id" element={<EditReport />} />
              <Route path="/member-reports/:id" element={<MemberReports />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
