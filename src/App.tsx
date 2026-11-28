import React, { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import WorkWithMe from "./pages/WorkWithMe";
import About from "./pages/About";
import Retreats from "./pages/Retreats";
// The blog (marked + every article) loads only when someone opens it, not on every page.
const Blog = lazy(() => import("./pages/Blog"));
const BlogArticle = lazy(() => import("./pages/BlogArticle"));
const Newsletter = lazy(() => import("./pages/Newsletter"));
const Apply = lazy(() => import("./pages/Apply"));
import NotFound from "./pages/NotFound";

/** /lv/about -> /about, /lv -> /, keeping any #section. .htaccess does the same with a 301. */
const FromLatvian = () => {
  const { pathname, hash } = useLocation();
  return <Navigate to={(pathname.replace(/^\/lv/, "") || "/") + hash} replace />;
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/work-with-me" element={<WorkWithMe />} />
          {/* Unlisted, English-only outreach page — see the note in Retreats.tsx */}
          <Route path="/retreats" element={<Retreats />} />
          {/* English only; Latvian articles live on marketingaskola.lv/blogs */}
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogArticle />} />
          <Route path="/newsletter" element={<Newsletter />} />
          <Route path="/apply" element={<Apply />} />
          {/* The Latvian mirror is gone (2026-11-21); old /lv links land on the English page */}
          <Route path="/lv/*" element={<FromLatvian />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
