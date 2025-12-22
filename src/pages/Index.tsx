import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import CaseStudies from "@/components/CaseStudies";
import SpeakingTeaching from "@/components/SpeakingTeaching";
import FreeTraining from "@/components/FreeTraining";
import Timeline from "@/components/Timeline";
import Credentials from "@/components/Credentials";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import BackgroundMusic from "@/components/BackgroundMusic";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <Hero />
        <About />
        <CaseStudies />
        <SpeakingTeaching />
        <FreeTraining />
        <Timeline />
        <Testimonials />
        <Credentials />
        <ContactForm />
      </main>
      <Footer />
      <BackgroundMusic />
    </div>
  );
};

export default Index;
