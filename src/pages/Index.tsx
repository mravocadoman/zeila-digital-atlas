import Hero from "@/components/Hero";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import CaseStudies from "@/components/CaseStudies";
import FreeTraining from "@/components/FreeTraining";
import Credentials from "@/components/Credentials";
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
