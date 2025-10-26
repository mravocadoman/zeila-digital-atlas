import { Mail, Phone, MapPin, Linkedin, Instagram, Facebook } from "lucide-react";
import { FaTiktok } from "react-icons/fa";
const About = () => {
  const skills = ["Meta Advertising", "Project Management", "Social Media Marketing", "Social Media Management", "Digital Marketing Consulting", "Digital Course Creation"];
  const toolCategories = [{
    category: "Advertising & Analytics",
    tools: "Meta, Google Ads, LinkedIn, TikTok, GA4, CAPI, Hotjar, Looker Studio"
  }, {
    category: "Automation & CRM",
    tools: "Make, Zapier, GoHighLevel, Google Sheets"
  }, {
    category: "AI & Creative",
    tools: "ChatGPT, Manus, Midjourney, VEO3, Photoshop, Canva"
  }, {
    category: "Web & Design",
    tools: "Shopify, WordPress, HTML/CSS/JS, Figma, Lovable"
  }, {
    category: "SEO",
    tools: "Ahrefs, Search Console"
  }, {
    category: "Email & Outreach",
    tools: "MailerLite, Apollo, Instantly, Woodpecker, MillionVerifier"
  }];
  const languages = [{
    name: "Latvian",
    level: "Native"
  }, {
    name: "Latgalian",
    level: "Native"
  }, {
    name: "English",
    level: "Bilingual"
  }, {
    name: "Russian",
    level: "Professional working"
  }, {
    name: "Polish",
    level: "Professional working"
  }, {
    name: "Spanish",
    level: "Elementary"
  }];
  return <section id="about" className="py-12 lg:py-32 px-6 bg-card">
      <div className="max-w-7xl mx-auto">
        <h2 className="heading-elegant text-3xl lg:text-display mb-8 lg:mb-12 animate-fade-in text-center lg:text-left">About Me</h2>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Profile */}
          <div className="lg:col-span-2 space-y-8">
            <p className="body-clean text-body leading-relaxed text-muted-foreground">
              Experienced <span className="text-foreground font-semibold">Digital Marketing Manager, Consultant, and Lecturer</span> with extensive experience building, maintaining, and running successful digital marketing and advertising campaigns with up to <span className="text-foreground font-semibold">$5M yearly ad spend</span>.
            </p>

            <div className="grid grid-cols-3 gap-4 lg:gap-8 pt-6 lg:pt-8">
              <div className="text-center animate-fade-in" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
                <div className="heading-elegant text-2xl lg:text-heading mb-1 lg:mb-2 neon-text">10+</div>
                <div className="body-clean text-xs lg:text-body text-muted-foreground">Years Experience</div>
              </div>
              <div className="text-center animate-fade-in" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
                <div className="heading-elegant text-2xl lg:text-heading mb-1 lg:mb-2 neon-text">36x</div>
                <div className="body-clean text-xs lg:text-body text-muted-foreground">Best ROAS</div>
              </div>
              <div className="text-center animate-fade-in" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
                <div className="heading-elegant text-2xl lg:text-heading mb-1 lg:mb-2 neon-text">€1M+</div>
                <div className="body-clean text-xs lg:text-body text-muted-foreground">Revenue Generated</div>
              </div>
            </div>

            {/* Skills */}
            <div className="pt-6 lg:pt-8">
              <h3 className="heading-elegant text-xl lg:text-heading mb-4 lg:mb-6">Core Skills</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {skills.map((skill, index) => <div key={skill} className="border-hover p-4 rounded-sm hover-scale animate-fade-in" style={{ animationDelay: `${0.1 * index}s`, animationFillMode: 'both' }}>
                    <p className="body-clean text-body font-medium">{skill}</p>
                  </div>)}
              </div>
            </div>

            {/* Tools */}
            <div className="pt-6 lg:pt-8">
              <h3 className="heading-elegant text-xl lg:text-heading mb-4 lg:mb-6">Tools & Platforms</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {toolCategories.map((category, index) => <div key={category.category} className="border-hover p-4 rounded-sm hover-scale animate-fade-in" style={{ animationDelay: `${0.1 * index}s`, animationFillMode: 'both' }}>
                    <h4 style={{
                  textShadow: 'none'
                }} className="body-clean text-foreground mb-2 text-large font-semibold">{category.category}</h4>
                    <p className="body-clean text-body text-muted-foreground">{category.tools}</p>
                  </div>)}
              </div>
            </div>

            {/* Languages */}
            <div className="pt-6 lg:pt-8">
              <h3 className="heading-elegant text-xl lg:text-heading mb-4 lg:mb-6">Languages</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {languages.map(lang => <div key={lang.name} className="flex justify-between items-center border-b border-border pb-3">
                    <span className="body-clean font-medium text-body">{lang.name}</span>
                    <span className="body-clean text-body text-muted-foreground">{lang.level}</span>
                  </div>)}
              </div>
            </div>
          </div>

          {/* Contact Sidebar */}
          <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
            <div className="card-luxury space-y-6 hover-scale">
              <h3 className="heading-elegant text-large">Contact</h3>
              
              <div className="space-y-4">
                <a href="tel:+37126673384" className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                  <Phone className="w-5 h-5" />
                  <span className="body-clean text-body">+371 26673384</span>
                </a>
                
                <a href="mailto:rihards.zeila@gmail.com" className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                  <Mail className="w-5 h-5" />
                  <span className="body-clean text-body">rihards.zeila@gmail.com</span>
                </a>
                
                <div className="flex items-center gap-3 text-muted-foreground">
                  <MapPin className="w-5 h-5" />
                  <span className="body-clean text-body">Riga, Latvia (Remote in winters)
                </span>
                </div>
              </div>

              <div className="pt-6 border-t border-border">
                <h4 className="body-clean font-semibold mb-4 text-large">Connect</h4>
                <div className="flex gap-4">
                  <a href="https://www.linkedin.com/in/rihards-ze/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="LinkedIn profile">
                    <Linkedin className="w-6 h-6" />
                  </a>
                  <a href="https://www.instagram.com/rihards.ze/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Instagram profile">
                    <Instagram className="w-6 h-6" />
                  </a>
                  <a href="https://www.tiktok.com/@rihards.ze" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="TikTok profile">
                    <FaTiktok className="w-6 h-6" />
                  </a>
                  <a href="https://www.facebook.com/profile.php?id=100000487541249" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Facebook profile">
                    <Facebook className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>

            {/* Honor */}
            <div className="card-luxury">
              <h4 className="body-clean font-semibold mb-3 text-large">Honor</h4>
              <p className="body-clean text-body text-muted-foreground leading-relaxed">
                Kristaps Morbergs' Scholarship of Excellence - Annually awarded to 15 selected University of Latvia students for outstanding academic and extracurricular achievements.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default About;