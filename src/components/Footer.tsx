import { Linkedin, Instagram, Globe, Mail, Phone, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 px-6 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="heading-elegant text-2xl mb-4">Rihards Zeila</h3>
            <p className="body-clean text-sm text-muted-foreground leading-relaxed">
              Full-Stack Digital Marketer, Educator & Entrepreneur based in Riga, Latvia.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="body-clean font-semibold mb-4">Quick Links</h4>
            <nav className="space-y-2">
              <a href="#about" className="body-clean text-sm text-muted-foreground hover:text-foreground transition-colors block">
                About
              </a>
              <a href="#experience" className="body-clean text-sm text-muted-foreground hover:text-foreground transition-colors block">
                Experience
              </a>
              <a href="#teaching" className="body-clean text-sm text-muted-foreground hover:text-foreground transition-colors block">
                Teaching
              </a>
              <a href="#blog" className="body-clean text-sm text-muted-foreground hover:text-foreground transition-colors block">
                Insights
              </a>
              <a href="#contact" className="body-clean text-sm text-muted-foreground hover:text-foreground transition-colors block">
                Contact
              </a>
            </nav>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="body-clean font-semibold mb-4">Connect</h4>
            <div className="space-y-3 mb-6">
              <a href="mailto:rihards.zeila@gmail.com" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Mail className="w-4 h-4" />
                <span className="body-clean">rihards.zeila@gmail.com</span>
              </a>
              <a href="tel:+37126673384" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Phone className="w-4 h-4" />
                <span className="body-clean">+371 26673384</span>
              </a>
            </div>

            <div className="flex gap-4">
              <a 
                href="https://www.linkedin.com/in/rihards-ze/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="LinkedIn profile"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="https://www.instagram.com/rihards.ze/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Instagram profile"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://www.tiktok.com/@rihards.ze" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="TikTok profile"
              >
                <Globe className="w-5 h-5" />
              </a>
              <a 
                href="https://www.facebook.com/profile.php?id=100000487541249" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Facebook profile"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="body-clean text-sm text-muted-foreground">
            © 2025 Rihards Zeila. All rights reserved.
          </p>
          <p className="body-clean text-sm text-muted-foreground">
            Designed with precision & purpose
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
