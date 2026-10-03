import { useId } from "react";
import { Link, useLocation } from "react-router-dom";
import { basePath, Lang, langFromPath, localizePath } from "@/i18n/lang";

/*
 * Flags are inline SVG, not emoji: Windows renders flag emoji as bare letter
 * pairs ("LV", "GB"), which would defeat the point of a flag.
 */
const FlagLV = () => (
  <svg viewBox="0 0 20 10" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <rect width="20" height="10" fill="#9E3039" />
    <rect y="4" width="20" height="2" fill="#fff" />
  </svg>
);

const FlagGB = () => {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 60 30" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <clipPath id={`${id}t`}>
        <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
      </clipPath>
      <rect width="60" height="30" fill="#012169" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
      <path d="M0,0 L60,30 M60,0 L0,30" clipPath={`url(#${id}t)`} stroke="#C8102E" strokeWidth="4" />
      <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
      <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
    </svg>
  );
};

const options: { lang: Lang; code: string; label: string; Flag: () => JSX.Element }[] = [
  { lang: "lv", code: "LV", label: "Latviski", Flag: FlagLV },
  { lang: "en", code: "EN", label: "English", Flag: FlagGB },
];

/**
 * Both flags, current one lit. A single "switch to" flag is ambiguous — half of
 * visitors read it as "you are here" — so the pair shows state and action at once.
 * Switching keeps the page and the section anchor: /about#x <-> /lv/about#x.
 */
const LanguageSwitch = ({ className = "" }: { className?: string }) => {
  const { pathname, hash } = useLocation();
  const current = langFromPath(pathname);
  const base = basePath(pathname);

  return (
    <div
      className={`flex items-center gap-1 rounded-md border border-border p-1 ${className}`}
      role="group"
      aria-label="Language / Valoda"
    >
      {options.map(({ lang, code, label, Flag }) => {
        const active = lang === current;
        return (
          <Link
            key={lang}
            to={`${localizePath(base, lang)}${hash}`}
            hrefLang={lang}
            lang={lang}
            aria-label={label}
            aria-current={active ? "true" : undefined}
            title={label}
            className={`flex items-center gap-1.5 rounded px-1.5 py-1 transition-opacity ${
              active ? "bg-muted/60 opacity-100" : "opacity-50 hover:opacity-100"
            }`}
          >
            <span className="block h-3.5 w-5 overflow-hidden rounded-[2px] ring-1 ring-white/20 [&>svg]:h-full [&>svg]:w-full">
              <Flag />
            </span>
            <span className="body-clean text-[0.7rem] font-semibold tracking-wider text-foreground">
              {code}
            </span>
          </Link>
        );
      })}
    </div>
  );
};

export default LanguageSwitch;
