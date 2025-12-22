import { useState, useEffect } from "react";

const Navigation = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down & past 100px
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navItems = [
    { label: "About", href: "#about" },
    { label: "Case Studies", href: "#case-studies" },
    { label: "Speaking", href: "#speaking" },
    { label: "Training", href: "#free-training" },
    { label: "Experience", href: "#timeline" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
      style={{ backgroundColor: "#00152c" }}
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-14 lg:h-16">
          {/* Logo/Name */}
          <a
            href="#"
            className="text-white font-bold text-sm lg:text-base uppercase tracking-wider"
          >
            Rihards Zeila
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-white text-xs lg:text-sm uppercase tracking-wide font-medium hover:opacity-80 transition-opacity"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2"
            aria-label="Menu"
            onClick={() => {
              const mobileMenu = document.getElementById("mobile-menu");
              if (mobileMenu) {
                mobileMenu.classList.toggle("hidden");
              }
            }}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div id="mobile-menu" className="hidden md:hidden pb-4">
          <div className="flex flex-col gap-3">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-white text-sm uppercase tracking-wide font-medium hover:opacity-80 transition-opacity"
                onClick={() => {
                  const mobileMenu = document.getElementById("mobile-menu");
                  if (mobileMenu) {
                    mobileMenu.classList.add("hidden");
                  }
                }}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
      
      {/* Accent line */}
      <div
        className="h-[2px] w-full"
        style={{ backgroundColor: "#03c3f8" }}
      />
    </nav>
  );
};

export default Navigation;
