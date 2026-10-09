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
      "Rihards Zeila — reklāmas konsultants un MBA lektors, Rīga",
    ),
    t(
      "I build paid-growth systems for e-commerce and SME teams, then train the team to run them. MBA lecturer at Riga Business School. $5M+ annual ad spend managed.",
      "Palīdzu e-veikaliem un uzņēmumiem sakārtot maksāto reklāmu un apmācu komandu to vadīt pašai. MBA lektors Rīgas Biznesa skolā. Pārvaldu vairāk nekā $5M reklāmas budžeta gadā.",
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
