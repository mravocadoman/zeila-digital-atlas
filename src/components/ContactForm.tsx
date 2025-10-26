import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

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
    <section id="contact" className="py-20 lg:py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="heading-elegant text-display mb-6">Let's Build Something Together</h2>
          <p className="body-clean text-large text-muted-foreground">
            Open to high-impact projects, co-founder opportunities, and CMO roles
          </p>
        </div>

        <div className="card-luxury hover-scale animate-fade-in" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="body-clean block mb-2 text-large font-medium">
                  Name
                </label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-background border-border focus:border-primary"
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="body-clean block mb-2 text-large font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-background border-border focus:border-primary"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="type" className="body-clean block mb-2 text-large font-medium">
                Type of Inquiry
              </label>
              <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                <SelectTrigger className="bg-background border-border focus:border-primary" id="type">
                  <SelectValue placeholder="Select inquiry type" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="project">Client Project</SelectItem>
                  <SelectItem value="cofounder">Co-Founder Opportunity</SelectItem>
                  <SelectItem value="cmo">CMO Role</SelectItem>
                  <SelectItem value="speaking">Speaking Engagement</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label htmlFor="message" className="body-clean block mb-2 text-large font-medium">
                Message
              </label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="bg-background border-border focus:border-primary min-h-[150px]"
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

          <div className="mt-8 pt-8 border-t border-border text-center">
            <p className="body-clean text-large text-muted-foreground">
              Or email directly: <a href="mailto:rihards.zeila@gmail.com" className="text-foreground hover:text-primary transition-colors">rihards.zeila@gmail.com</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
