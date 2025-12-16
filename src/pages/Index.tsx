import Hero from "@/components/Hero";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import CaseStudies from "@/components/CaseStudies";
import FreeTraining from "@/components/FreeTraining";
import Timeline from "@/components/Timeline";
import Credentials from "@/components/Credentials";
import Travel from "@/components/Travel";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import BackgroundMusic from "@/components/BackgroundMusic";

const Index = () => {
  return (
    <div className="min-h-screen">
      <main>
        <Hero />
        <About />
        <CaseStudies />
        <FreeTraining />
        <Timeline />
        <Testimonials />
        <Credentials />
        <Travel />
        <ContactForm />
      </main>
      <Footer />
      <BackgroundMusic />
    </div>
  );
};

export default Index;
