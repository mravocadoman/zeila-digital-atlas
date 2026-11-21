import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * English only. The Latvian /lv mirror was removed on 2026-11-21 (Rihards: it read
 * badly); old /lv URLs 301 to their English page in public/.htaccess and in App.tsx.
 *
 * ponytail: components still call t("English", "Latviski") and to(path). Both now
 * return the English side unchanged. Drop the second argument from a file when you
 * next edit it; a sweep across every component isn't worth the diff on its own.
 */
export type Lang = "en";

export type T = <V>(en: V, lv: V) => V;

export const useLang = () => {
  const lang: Lang = "en";
  const t: T = (en) => en;
  const to = (path: string) => path;
  return { lang, t, to };
};

const SITE = "https://rihardszeila.com";

/** Keeps the tab title, meta description and canonical URL in step with the page. */
export const usePageMeta = (title: string, description?: string) => {
  const { pathname } = useLocation();
  useEffect(() => {
    document.documentElement.lang = "en";
    document.title = title;
    document
      .querySelector('link[rel="canonical"]')
      ?.setAttribute("href", `${SITE}${pathname}`);
    if (description) {
      document
        .querySelector('meta[name="description"]')
        ?.setAttribute("content", description);
    }
  }, [pathname, title, description]);
};
