import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import ROASChart from "@/components/ROASChart";
import Teaching from "@/components/Teaching";
import Travel from "@/components/Travel";
import Testimonials from "@/components/Testimonials";
import Timeline from "@/components/Timeline";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <About />
      <Experience />
      <ROASChart />
      <Teaching />
      <Travel />
      <Testimonials />
      <Timeline />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default Index;
