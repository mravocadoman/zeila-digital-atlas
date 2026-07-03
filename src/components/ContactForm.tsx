import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Mail, Phone, MapPin, Linkedin, Instagram, Facebook } from "lucide-react";
import { FaTiktok } from "react-icons/fa";

const ContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.type || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: formData
      });

      if (error) throw error;

      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. I'll get back to you soon."
      });

      setFormData({ name: "", email: "", type: "", message: "" });
    } catch (error: any) {
      console.error("Error sending email:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again or email directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-12 lg:py-32 px-6 lg:px-16 relative overflow-hidden">
      {/* YouTube Video Background */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <iframe
          className="absolute top-1/2 left-1/2 w-[200vw] h-[200vh] -translate-x-1/2 -translate-y-1/2 scale-150"
          src="https://www.youtube.com/embed/uJ5XHdTOfzk?autoplay=1&mute=1&loop=1&playlist=uJ5XHdTOfzk&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1"
          title="Background video"
          allow="autoplay; encrypted-media"
          style={{ border: 'none' }}
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-background/90 backdrop-blur-md" />
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-8 lg:mb-12 animate-fade-in">
          <h2 className="heading-elegant text-3xl lg:text-display mb-4 lg:mb-6">Let's Connect</h2>
          <p className="body-clean text-base lg:text-large text-muted-foreground">
            Open to high-impact projects, workshops &amp; training, co-founder opportunities, and CMO roles
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Info */}
          <div className="animate-fade-in" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
            <div className="card-luxury h-full">
              <h3 className="heading-elegant text-xl lg:text-2xl mb-6">Get in Touch</h3>
              
              <div className="space-y-5 mb-8">
                <a href="tel:+37126673384" className="flex items-center gap-4 text-muted-foreground hover:text-foreground transition-colors group">
                  <div className="p-3 rounded-sm bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <span className="body-clean text-body lg:text-large">+371 26673384</span>
                </a>
                
                <a href="mailto:rihards.zeila@gmail.com" className="flex items-center gap-4 text-muted-foreground hover:text-foreground transition-colors group">
                  <div className="p-3 rounded-sm bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <span className="body-clean text-body lg:text-large">rihards.zeila@gmail.com</span>
                </a>
                
                <div className="flex items-center gap-4 text-muted-foreground">
                  <div className="p-3 rounded-sm bg-primary/10">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <span className="body-clean text-body lg:text-large">Riga, Latvia (Remote in winters)</span>
                </div>
              </div>

              <div className="pt-6 border-t border-border">
                <h4 className="body-clean font-semibold mb-4 text-large">Follow Me</h4>
                <div className="flex gap-4">
                  <a href="https://www.linkedin.com/in/rihards-ze/" target="_blank" rel="noopener noreferrer" className="p-3 rounded-sm bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors" aria-label="LinkedIn profile">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href="https://www.instagram.com/rihards.ze/" target="_blank" rel="noopener noreferrer" className="p-3 rounded-sm bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors" aria-label="Instagram profile">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="https://www.tiktok.com/@rihards.ze" target="_blank" rel="noopener noreferrer" className="p-3 rounded-sm bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors" aria-label="TikTok profile">
                    <FaTiktok className="w-5 h-5" />
                  </a>
                  <a href="https://www.facebook.com/profile.php?id=100000487541249" target="_blank" rel="noopener noreferrer" className="p-3 rounded-sm bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors" aria-label="Facebook profile">
                    <Facebook className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="card-luxury animate-fade-in" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
            <h3 className="heading-elegant text-xl lg:text-2xl mb-6">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-5">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="body-clean block mb-2 text-base lg:text-lg font-medium">
                    Name
                  </label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-background border-border focus:border-primary text-base lg:text-lg"
                    placeholder="Your name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="body-clean block mb-2 text-base lg:text-lg font-medium">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-background border-border focus:border-primary text-base lg:text-lg"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="type" className="body-clean block mb-2 text-base lg:text-lg font-medium">
                  Type of Inquiry
                </label>
                <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                  <SelectTrigger className="bg-background border-border focus:border-primary text-base lg:text-lg" id="type">
                    <SelectValue placeholder="Select inquiry type" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border text-base lg:text-lg">
                    <SelectItem value="project">Client Project</SelectItem>
                    <SelectItem value="cofounder">Co-Founder Opportunity</SelectItem>
                    <SelectItem value="cmo">CMO Role</SelectItem>
                    <SelectItem value="speaking">Speaking Engagement</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label htmlFor="message" className="body-clean block mb-2 text-base lg:text-lg font-medium">
                  Message
                </label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="bg-background border-border focus:border-primary min-h-[120px] text-base lg:text-lg"
                  placeholder="Tell me about your project or opportunity..."
                  required
                />
              </div>

              <Button 
                type="submit" 
                size="lg"
                disabled={isSubmitting}
                className="w-full bg-foreground text-background hover:bg-foreground/90 transition-colors uppercase hover-scale"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
