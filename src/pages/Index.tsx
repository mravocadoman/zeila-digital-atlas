import Hero from "@/components/Hero";
import About from "@/components/About";
import Teaching from "@/components/Teaching";
import Travel from "@/components/Travel";
import Testimonials from "@/components/Testimonials";
import Timeline from "@/components/Timeline";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import BackgroundMusic from "@/components/BackgroundMusic";

const Index = () => {
  return (
    <div className="min-h-screen">
      <main>
        <Hero />
        <About />
        <Teaching />
        <Travel />
        <Testimonials />
        <Timeline />
        <ContactForm />
      </main>
      <Footer />
      <BackgroundMusic />
    </div>
  );
};

export default Index;
