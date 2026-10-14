import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import WorkWithMe from "./pages/WorkWithMe";
import About from "./pages/About";
import Retreats from "./pages/Retreats";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/work-with-me" element={<WorkWithMe />} />
          {/* Unlisted, English-only outreach page — see the note in Retreats.tsx */}
          <Route path="/retreats" element={<Retreats />} />
          {/* Latvian mirrors — same components, copy chosen by the /lv prefix */}
          <Route path="/lv" element={<Index />} />
          <Route path="/lv/about" element={<About />} />
          <Route path="/lv/work-with-me" element={<WorkWithMe />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
