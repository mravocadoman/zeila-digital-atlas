/**
 * GA4, loaded only when VITE_GA4_ID is set in .env.
 * Put your measurement ID (G-XXXXXXXXXX) there and this wires itself up;
 * leave it empty and nothing is injected and no requests are made.
 */
export function initAnalytics() {
  const id = import.meta.env.VITE_GA4_ID;
  if (!id) return;

  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(s);

  // gtag pushes to the same array the loader reads, so this is safe pre-load.
  (window as any).dataLayer = (window as any).dataLayer || [];
  function gtag(...args: unknown[]) {
    (window as any).dataLayer.push(args);
  }
  (window as any).gtag = gtag;
  gtag("js", new Date());
  gtag("config", id);
}
