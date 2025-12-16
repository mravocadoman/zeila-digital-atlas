import { Linkedin, Instagram, Mail, Phone, Facebook } from "lucide-react";
import { FaTiktok } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="py-8 lg:py-12 px-6 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-6 lg:mb-8">
          {/* Brand */}
          <div className="animate-fade-in" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
            <h3 className="heading-elegant text-large mb-4">Rihards Zeila</h3>
            <p className="body-clean text-body text-muted-foreground leading-relaxed">
              Full-Stack Digital Marketer, Educator & Entrepreneur based in Riga, Latvia.
            </p>
          </div>

          {/* Quick Links */}
          <div className="animate-fade-in" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
            <h4 className="body-clean font-semibold mb-4 text-large">Quick Links</h4>
          <nav className="space-y-2">
              <a href="#about" className="body-clean text-body text-muted-foreground hover:text-foreground transition-colors block">
                About
              </a>
              <a href="#timeline" className="body-clean text-body text-muted-foreground hover:text-foreground transition-colors block">
                Experience
              </a>
              <a href="#teaching" className="body-clean text-body text-muted-foreground hover:text-foreground transition-colors block">
                Teaching
              </a>
              <a href="#contact" className="body-clean text-body text-muted-foreground hover:text-foreground transition-colors block">
                Contact
              </a>
            </nav>
          </div>

          {/* Contact & Social */}
          <div className="animate-fade-in" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
            <h4 className="body-clean font-semibold mb-4 text-large">Connect</h4>
            <div className="space-y-3 mb-6">
              <a href="mailto:rihards.zeila@gmail.com" className="flex items-center gap-2 text-body text-muted-foreground hover:text-foreground transition-colors">
                <Mail className="w-5 h-5" />
                <span className="body-clean">rihards.zeila@gmail.com</span>
              </a>
              <a href="tel:+37126673384" className="flex items-center gap-2 text-body text-muted-foreground hover:text-foreground transition-colors">
                <Phone className="w-5 h-5" />
                <span className="body-clean">+371 26673384</span>
              </a>
            </div>

            <div className="flex gap-4">
              <a 
                href="https://www.linkedin.com/in/rihards-ze/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-muted-foreground hover:text-foreground transition-colors hover-scale"
                aria-label="LinkedIn profile"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="https://www.instagram.com/rihards.ze/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-muted-foreground hover:text-foreground transition-colors hover-scale"
                aria-label="Instagram profile"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://www.tiktok.com/@rihards.ze" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-muted-foreground hover:text-foreground transition-colors hover-scale"
                aria-label="TikTok profile"
              >
                <FaTiktok className="w-5 h-5" />
              </a>
              <a 
                href="https://www.facebook.com/profile.php?id=100000487541249" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-muted-foreground hover:text-foreground transition-colors hover-scale"
                aria-label="Facebook profile"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="body-clean text-body text-muted-foreground">
            © 2025 Rihards Zeila. All rights reserved.
          </p>
          <p className="body-clean text-body text-muted-foreground">
            Designed by{" "}
            <a 
              href="https://marketingaskola.lv" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors underline"
            >
              marketingaskola.lv
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
