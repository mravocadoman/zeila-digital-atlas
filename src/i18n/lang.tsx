import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Two languages, chosen by URL rather than by state: English at `/`, Latvian
 * under `/lv`. That keeps every page linkable and indexable in both languages,
 * and there is no provider to forget — any component under the router can ask.
 *
 * Copy lives next to its English original as `t("English", "Latviski")`, so the
 * two can't drift apart unnoticed when a line is edited.
 */
export type Lang = "en" | "lv";

export const LV_PREFIX = "/lv";

/** The blog has no /lv mirror: Latvian articles live on marketingaskola.lv. */
export const LV_BLOG = "https://marketingaskola.lv/blogs/";

export const langFromPath = (pathname: string): Lang =>
  pathname === LV_PREFIX || pathname.startsWith(`${LV_PREFIX}/`) ? "lv" : "en";

/** Strip the language prefix: "/lv/about" -> "/about", "/lv" -> "/". */
export const basePath = (pathname: string) =>
  langFromPath(pathname) === "lv" ? pathname.slice(LV_PREFIX.length) || "/" : pathname;

/** Prefix an English path for a language: ("/about", "lv") -> "/lv/about". */
export const localizePath = (path: string, lang: Lang) => {
  if (lang === "en") return path;
  if (path === "/") return LV_PREFIX;
  if (path.startsWith("/#")) return `${LV_PREFIX}${path.slice(1)}`;
  return `${LV_PREFIX}${path}`;
};

export type T = <V>(en: V, lv: V) => V;

export const useLang = () => {
  const { pathname } = useLocation();
  const lang = langFromPath(pathname);
  const t: T = (en, lv) => (lang === "lv" ? lv : en);
  const to = (path: string) => localizePath(path, lang);
  return { lang, t, to };
};

const SITE = "https://rihardszeila.com";

/**
 * Keeps <html lang>, the tab title, the meta description and the canonical URL in
 * step with the page. The canonical matters most: index.html hard-codes the English
 * home, and left alone it would tell Google every /lv page is a duplicate of it.
 */
export const usePageMeta = (title: string, description?: string) => {
  const { lang } = useLang();
  const { pathname } = useLocation();
  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = title;
    document
      .querySelector('link[rel="canonical"]')
      ?.setAttribute("href", `${SITE}${pathname}`);
    if (description) {
      document
        .querySelector('meta[name="description"]')
        ?.setAttribute("content", description);
    }
  }, [lang, pathname, title, description]);
};
