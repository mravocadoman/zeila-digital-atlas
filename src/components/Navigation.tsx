import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const navItems = [
  { label: "Who it's for", id: "who-for" },
  { label: "What you get", id: "engagements" },
  { label: "Case studies", id: "case-studies" },
  { label: "Process", id: "process" },
  { label: "FAQ", id: "faq" },
];

const Navigation = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const onHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setIsVisible(!(y > lastScrollY && y > 100));
      setLastScrollY(y);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Anchors only exist on the homepage — from /about, route there first.
  const go = (id: string) => {
    setMenuOpen(false);
    if (onHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(`/#${id}`);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 bg-background/95 backdrop-blur-sm border-b border-border ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16 lg:h-18">
          <Link
            to="/"
            className="heading-elegant text-foreground text-base lg:text-lg hover:text-primary transition-colors"
          >
            Rihards Zeila
          </Link>

          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                className="body-clean text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                {item.label}
              </button>
            ))}
            <Link
              to="/about"
              className="body-clean text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              About
            </Link>
            <button
              onClick={() => go("contact")}
              className="body-clean bg-primary text-background px-4 py-2 rounded-md text-xs font-bold uppercase tracking-wider hover:bg-primary/90 transition-colors"
            >
              Book a consultation
            </button>
          </div>

          <button
            className="md:hidden text-foreground p-2"
            aria-label="Menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden pb-4 flex flex-col gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                className="body-clean text-muted-foreground hover:text-foreground text-left py-2.5 transition-colors"
              >
                {item.label}
              </button>
            ))}
            <Link
              to="/about"
              onClick={() => setMenuOpen(false)}
              className="body-clean text-muted-foreground hover:text-foreground py-2.5 transition-colors"
            >
              About
            </Link>
            <button
              onClick={() => go("contact")}
              className="body-clean bg-primary text-background px-4 py-2.5 rounded-md font-bold uppercase tracking-wider text-sm mt-2"
            >
              Book a consultation
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
