import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ProofStrip from "@/components/ProofStrip";
import WhoFor from "@/components/WhoFor";
import Engagements from "@/components/Engagements";
import ResultsBand from "@/components/ResultsBand";
import CaseStudies from "@/components/CaseStudies";
import Process from "@/components/Process";
import TeachingEdge from "@/components/TeachingEdge";
import Testimonials from "@/components/Testimonials";
import FreeTraining from "@/components/FreeTraining";
import FAQ from "@/components/FAQ";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

const Index = () => {
  const { hash } = useLocation();

  // Arriving from /about with /#engagements etc.
  useEffect(() => {
    if (!hash) return;
    const el = document.getElementById(hash.slice(1));
    if (el) requestAnimationFrame(() => el.scrollIntoView({ behavior: "smooth" }));
  }, [hash]);

  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <Hero />
        <ProofStrip />
        <WhoFor />
        <Engagements />
        <ResultsBand />
        <CaseStudies />
        <Process />
        <TeachingEdge />
        <Testimonials />
        <FreeTraining />
        <FAQ />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
