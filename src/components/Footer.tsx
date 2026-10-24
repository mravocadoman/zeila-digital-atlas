import { Linkedin, Instagram, Mail, Phone, Facebook } from "lucide-react";
import { Link } from "react-router-dom";
import { FaTiktok } from "react-icons/fa";
import { useLang } from "@/i18n/lang";

const Footer = () => {
  const { lang, t, to } = useLang();
  return (
    <footer className="py-8 lg:py-12 px-6 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-6 lg:mb-8">
          {/* Brand */}
          <div className="animate-fade-in" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
            <h3 className="heading-elegant text-large mb-4">Rihards Zeila</h3>
            <p className="body-clean text-body text-muted-foreground leading-relaxed">
              {t(
                "I help you make money from ads and teach your team to run it themselves.",
                "Palīdzu tev nopelnīt ar reklāmu un iemācu komandai to darīt pašai.",
              )}
            </p>
          </div>

          {/* Quick Links */}
          <div className="animate-fade-in" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
            <h4 className="body-clean font-semibold mb-4 text-large">{t("Quick Links", "Navigācija")}</h4>
            <nav className="space-y-2">
              <Link to={to("/#engagements")} className="body-clean text-body text-muted-foreground hover:text-foreground transition-colors block">
                {t("What you get", "Pakalpojumi")}
              </Link>
              <Link to={to("/#case-studies")} className="body-clean text-body text-muted-foreground hover:text-foreground transition-colors block">
                {t("Case studies", "Rezultāti")}
              </Link>
              <Link to={to("/#faq")} className="body-clean text-body text-muted-foreground hover:text-foreground transition-colors block">
                {t("FAQ", "Jautājumi")}
              </Link>
              <Link to={to("/work-with-me")} className="body-clean text-body text-muted-foreground hover:text-foreground transition-colors block">
                {t("Training & workshops", "Apmācības un darbnīcas")}
              </Link>
              {lang === "en" && (
                <Link to="/blog" className="body-clean text-body text-muted-foreground hover:text-foreground transition-colors block">
                  Blog
                </Link>
              )}
              <Link to={to("/about")} className="body-clean text-body text-muted-foreground hover:text-foreground transition-colors block">
                {t("About & full CV", "Par mani un CV")}
              </Link>
              <Link to={to("/#contact")} className="body-clean text-body text-muted-foreground hover:text-foreground transition-colors block">
                {t("Contact", "Kontakti")}
              </Link>
            </nav>
          </div>

          {/* Contact & Social */}
          <div className="animate-fade-in" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
            <h4 className="body-clean font-semibold mb-4 text-large">{t("Connect", "Sazināties")}</h4>
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
            © 2026 Rihards Zeila. {t("All rights reserved.", "Visas tiesības aizsargātas.")}
          </p>
          <p className="body-clean text-body text-muted-foreground">
            {t("Designed by", "Izstrādāja")}{" "}
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
