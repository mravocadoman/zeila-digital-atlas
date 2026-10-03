import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import VideoBackdrop from "@/components/VideoBackdrop";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Mail, Phone, MapPin, Linkedin, Instagram, Facebook } from "lucide-react";
import { FaTiktok } from "react-icons/fa";
import { useLang } from "@/i18n/lang";

const ContactForm = () => {
  const { toast } = useToast();
  const { t } = useLang();
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Spam traps. Bots fill every field they find and submit instantly; people
  // leave a field they cannot see empty and take longer than a few seconds.
  const [botField, setBotField] = useState("");
  const mountedAt = useRef(Date.now());
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Silently accept and discard: a bot given an error just learns to retry.
    // Reset the trap too — otherwise one trip leaves the form permanently dead
    // for that visitor while still reporting success, which loses real leads.
    const tooFast = Date.now() - mountedAt.current < 3000;
    if (botField || tooFast) {
      toast({
        title: t("Message Sent!", "Ziņa nosūtīta!"),
        description: t("Thank you for reaching out. I'll get back to you soon.", "Paldies! Atbildēšu tuvāko divu darba dienu laikā.")
      });
      setFormData({ name: "", email: "", type: "", message: "" });
      setBotField("");
      mountedAt.current = Date.now();
      return;
    }

    // Basic validation
    if (!formData.name || !formData.email || !formData.type || !formData.message) {
      toast({
        title: t("Missing Information", "Trūkst informācijas"),
        description: t("Please fill in all fields", "Lūdzu, aizpildi visus laukus"),
        variant: "destructive"
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: t("Invalid Email", "Nederīgs e-pasts"),
        description: t("Please enter a valid email address", "Lūdzu, ievadi derīgu e-pasta adresi"),
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
        title: t("Message Sent!", "Ziņa nosūtīta!"),
        description: t("Thank you for reaching out. I'll get back to you soon.", "Paldies! Atbildēšu tuvāko divu darba dienu laikā.")
      });

      setFormData({ name: "", email: "", type: "", message: "" });
    } catch (error: any) {
      console.error("Error sending email:", error);
      toast({
        title: t("Error", "Kļūda"),
        description: t(
          "Failed to send message. Please try again or email directly.",
          "Ziņu neizdevās nosūtīt. Mēģini vēlreiz vai raksti man uz e-pastu.",
        ),
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-12 lg:py-32 px-6 lg:px-16 relative overflow-hidden">
      <VideoBackdrop />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-8 lg:mb-12 animate-fade-in">
          <h2 className="heading-elegant text-3xl lg:text-display mb-4 lg:mb-6">{t("Book a consultation", "Pieteikties konsultācijai")}</h2>
          <p className="body-clean text-base lg:text-large text-muted-foreground">
            {t(
              "Tell me about the account and where it’s stuck. I reply within two business days.",
              "Pastāsti, kā šobrīd strādā tavas reklāmas un kur tās ir iestrēgušas. Atbildēšu divu darba dienu laikā.",
            )}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Info */}
          <div className="animate-fade-in" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
            <div className="card-luxury h-full">
              <h3 className="heading-elegant text-xl lg:text-2xl mb-6">{t("Get in Touch", "Kontakti")}</h3>
              
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
                  <span className="body-clean text-body lg:text-large">{t("Riga, Latvia (Remote in winters)", "Rīga, Latvija (ziemās attālināti)")}</span>
                </div>
              </div>

              <div className="pt-6 border-t border-border">
                <h4 className="body-clean font-semibold mb-4 text-large">{t("Follow Me", "Sociālie tīkli")}</h4>
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
            <h3 className="heading-elegant text-xl lg:text-2xl mb-6">{t("Send a Message", "Uzraksti man")}</h3>
            <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-5">
              {/* Honeypot. Positioned off-screen rather than display:none, which
                  bots check for, and kept out of the tab order and the a11y tree. */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: "-9999px",
                  width: "1px",
                  height: "1px",
                  overflow: "hidden"
                }}
              >
                <label htmlFor="rz-hp-field">{t("Leave this field empty", "Atstāj šo lauku tukšu")}</label>
                <input
                  id="rz-hp-field"
                  name="rz-hp-field"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  data-lpignore="true"
                  data-1p-ignore=""
                  data-form-type="other"
                  value={botField}
                  onChange={(e) => setBotField(e.target.value)}
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="body-clean block mb-2 text-base lg:text-lg font-medium">
                    {t("Name", "Vārds")}
                  </label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-background border-border focus:border-primary text-base lg:text-lg"
                    placeholder={t("Your name", "Tavs vārds")}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="body-clean block mb-2 text-base lg:text-lg font-medium">
                    {t("Email", "E-pasts")}
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-background border-border focus:border-primary text-base lg:text-lg"
                    placeholder={t("your.email@example.com", "tavs.epasts@piemers.lv")}
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="type" className="body-clean block mb-2 text-base lg:text-lg font-medium">
                  {t("Type of Inquiry", "Pieprasījuma veids")}
                </label>
                <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                  <SelectTrigger className="bg-background border-border focus:border-primary text-base lg:text-lg" id="type">
                    <SelectValue placeholder={t("What are you after?", "Izvēlies")} />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border text-base lg:text-lg">
                    <SelectItem value="project">{t("Consulting project", "Konsultācijas vai projekts")}</SelectItem>
                    <SelectItem value="corporate-training">{t("Team training / workshop", "Komandas apmācības / darbnīca")}</SelectItem>
                    <SelectItem value="speaking">{t("Speaking engagement", "Uzstāšanās konferencē vai pasākumā")}</SelectItem>
                    <SelectItem value="other">{t("Something else", "Cits")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label htmlFor="message" className="body-clean block mb-2 text-base lg:text-lg font-medium">
                  {t("Message", "Ziņa")}
                </label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="bg-background border-border focus:border-primary min-h-[120px] text-base lg:text-lg"
                  placeholder={t("Tell me about your project or opportunity...", "Īsi par savu uzņēmumu un to, ar ko varu palīdzēt...")}
                  required
                />
              </div>

              <Button 
                type="submit" 
                size="lg"
                disabled={isSubmitting}
                className="w-full bg-foreground text-background hover:bg-foreground/90 transition-colors uppercase hover-scale"
              >
                {isSubmitting ? t("Sending...", "Sūta...") : t("Send Message", "Nosūtīt ziņu")}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
