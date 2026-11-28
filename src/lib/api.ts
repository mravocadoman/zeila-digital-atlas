// The site's own form endpoints: PHP files in public/api, served by SiteGround next to the app
// (moved off Lovable's Supabase on 28 Nov 2026). In dev, vite proxies /api to `npm run api`.
export type FormEndpoint = "contact" | "newsletter" | "apply";

export async function postForm(endpoint: FormEndpoint, body: Record<string, unknown>): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch(`/api/${endpoint}.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (res.ok) return { ok: true };
    const data = await res.json().catch(() => ({}));
    return { ok: false, error: data.error || `HTTP ${res.status}` };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) };
  }
}
