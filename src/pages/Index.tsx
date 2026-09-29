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
import { useLang, usePageMeta } from "@/i18n/lang";

const Index = () => {
  const { hash } = useLocation();
  const { t } = useLang();

  usePageMeta(
    t(
      "Rihards Zeila — Paid Growth Consultant & MBA Lecturer, Riga",
      "Rihards Zeila — maksātās reklāmas konsultants un MBA lektors, Rīga",
    ),
    t(
      "I build paid-growth systems for e-commerce and SME teams — then train your team to run them. MBA lecturer at Riga Business School. $5M+ annual ad spend managed.",
      "Būvēju maksātās reklāmas sistēmas e-komercijas un MVU komandām — un apmācu komandu tās vadīt. MBA lektors Rīgas Biznesa skolā. Pārvaldīts reklāmas budžets: $5M+ gadā.",
    ),
  );

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
