import { Mail, Phone, MapPin, Linkedin, Instagram, Facebook } from "lucide-react";
import { FaTiktok } from "react-icons/fa";
const About = () => {
  const skills = ["Meta Advertising", "Project Management", "Social Media Marketing", "Social Media Management", "Digital Marketing Consulting", "Digital Course Creation"];
  const tools = ["Meta Business Suite", "Google Ads", "GA4", "Zapier", "ChatGPT", "Midjourney", "Photoshop", "Canva", "HTML, CSS, JavaScript"];
  const languages = [{
    name: "English",
    level: "Native or bilingual"
  }, {
    name: "Latvian",
    level: "Native"
  }, {
    name: "Russian",
    level: "Professional working"
  }, {
    name: "Polish",
    level: "Professional working"
  }, {
    name: "Spanish",
    level: "Elementary"
  }, {
    name: "Latgalian",
    level: "Native"
  }];
  return <section id="about" className="py-20 lg:py-32 px-6 bg-card">
      <div className="max-w-7xl mx-auto">
        <h2 className="heading-elegant text-4xl lg:text-6xl mb-12">About Me</h2>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Profile */}
          <div className="lg:col-span-2 space-y-8">
            <p className="body-clean text-xl leading-relaxed text-muted-foreground">
              Experienced <span className="text-foreground font-semibold">Digital Marketing Manager, Consultant, and Lecturer</span> with extensive experience building, maintaining, and running successful digital marketing and advertising campaigns with up to <span className="text-foreground font-semibold">$5M yearly ad spend</span>.
            </p>

            <div className="grid md:grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="heading-elegant text-5xl mb-2">10+</div>
                <div className="body-clean text-muted-foreground">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="heading-elegant text-5xl mb-2">36x</div>
                <div className="body-clean text-muted-foreground">Best ROAS</div>
              </div>
              <div className="text-center">
                <div className="heading-elegant text-5xl mb-2">€1M+</div>
                <div className="body-clean text-muted-foreground">Revenue Generated</div>
              </div>
            </div>

            {/* Skills */}
            <div className="pt-8">
              <h3 className="heading-elegant text-2xl mb-6">Core Skills</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {skills.map(skill => <div key={skill} className="border-hover p-4 rounded-sm">
                    <p className="body-clean font-medium">{skill}</p>
                  </div>)}
              </div>
            </div>

            {/* Tools */}
            <div className="pt-8">
              <h3 className="heading-elegant text-2xl mb-6">Tools & Platforms</h3>
              <div className="flex flex-wrap gap-3">
                {tools.map(tool => <span key={tool} className="body-clean px-4 py-2 border border-border rounded-sm text-sm">
                    {tool}
                  </span>)}
              </div>
            </div>

            {/* Languages */}
            <div className="pt-8">
              <h3 className="heading-elegant text-2xl mb-6">Languages</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {languages.map(lang => <div key={lang.name} className="flex justify-between items-center border-b border-border pb-3">
                    <span className="body-clean font-medium text-lg">{lang.name}</span>
                    <span className="body-clean text-base text-muted-foreground">{lang.level}</span>
                  </div>)}
              </div>
            </div>
          </div>

          {/* Contact Sidebar */}
          <div className="space-y-6">
            <div className="card-luxury space-y-6">
              <h3 className="heading-elegant text-2xl">Contact</h3>
              
              <div className="space-y-4">
                <a href="tel:+37126673384" className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                  <Phone className="w-5 h-5" />
                  <span className="body-clean">+371 26673384</span>
                </a>
                
                <a href="mailto:rihards.zeila@gmail.com" className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                  <Mail className="w-5 h-5" />
                  <span className="body-clean text-sm">rihards.zeila@gmail.com</span>
                </a>
                
                <div className="flex items-center gap-3 text-muted-foreground">
                  <MapPin className="w-5 h-5" />
                  <span className="body-clean">Riga, Latvia (Remote in winters)
                </span>
                </div>
              </div>

              <div className="pt-6 border-t border-border">
                <h4 className="body-clean font-semibold mb-4">Connect</h4>
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
              <h4 className="body-clean font-semibold mb-3">Honor</h4>
              <p className="body-clean text-sm text-muted-foreground leading-relaxed">
                <a href="https://www.fonds.lv/lepojamies/stipendiati/senaki/2011-2016/20132014-akad-gads/kristapa-morberga-stipendija/rihards-zeila/" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors">
                  Kristaps Morbergs' Scholarship of Excellence
                </a> - Annually awarded to 15 selected University of Latvia students for outstanding academic and extracurricular achievements.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default About;