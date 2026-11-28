import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { usePageMeta } from "@/i18n/lang";
import { getArticles } from "@/lib/blog";
import { QUESTIONS, routeFor, type SpendBand } from "@/lib/apply-core";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import NewsletterSignup from "@/components/NewsletterSignup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { postForm } from "@/lib/api";

// One application for consulting (Founder OS: all roads lead to one application). Spend is asked first and routes:
// under €10K to free resources, €10K to €20K to the first helper, €20K+ to a fit call. `?from=` tags where they came from.
const Apply = () => {
  usePageMeta(
    "Apply | Rihards Zeila",
    "Apply to work with Rihards Zeila on your Meta ads, funnel and AI automation. Ten short questions, a reply within one working day.",
  );
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [params] = useSearchParams();
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [hp, setHp] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const spend = answers.spend as SpendBand | undefined;
  const route = spend ? routeFor(spend) : null;
  const guides = useMemo(() => getArticles().slice(0, 3), []);
  const set = (id: string, value: string) => setAnswers((a) => ({ ...a, [id]: value }));

  const missing = QUESTIONS.filter((q) => !q.optional && !answers[q.id]?.trim()).map((q) => q.id);
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (missing.length) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    const res = await postForm("apply", { ...answers, source: (params.get("from") ?? "").slice(0, 40), hp });
    setStatus(res.ok ? "done" : "error");
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="px-6 lg:px-16 pt-28 pb-20 lg:pt-36 lg:pb-28">
        <div className="max-w-2xl mx-auto flex flex-col gap-8">
          <header>
            <span className="eyebrow block mb-4">Work with me</span>
            <h1 className="heading-elegant text-4xl lg:text-5xl mb-4">Apply</h1>
            <p className="body-clean text-muted-foreground text-lg leading-relaxed">
              Ten short questions. I read every application myself and reply within one working day.
            </p>
          </header>

          {status === "done" ? (
            <div role="status" className="rounded-lg border border-white/10 bg-card p-6 lg:p-8">
              <p className="heading-elegant text-2xl mb-2">Thanks, it's in.</p>
              <p className="body-clean text-muted-foreground">
                I read every application myself and reply within one working day, with a few times for a call.
              </p>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="flex flex-col gap-6">
              <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", overflow: "hidden" }}>
                <label htmlFor="apply-hp">Leave this field empty</label>
                <input id="apply-hp" type="text" tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} />
              </div>

              {QUESTIONS.filter((q) => q.id === "spend" || route === "audit" || route === "call").map((q) => (
                <div key={q.id}>
                  <label htmlFor={`apply-${q.id}`} className="body-clean block mb-2 text-base lg:text-lg font-medium">
                    {q.label} {q.optional && <span className="text-muted-foreground font-normal">(optional)</span>}
                  </label>
                  {q.kind === "select" ? (
                    <Select value={answers[q.id] ?? ""} onValueChange={(v) => set(q.id, v)}>
                      <SelectTrigger id={`apply-${q.id}`} className="bg-background border-border text-base" autoFocus={q.id === "spend"}>
                        <SelectValue placeholder="Choose one" />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border">
                        {q.options?.map((o) => (
                          <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : q.kind === "long" ? (
                    <Textarea id={`apply-${q.id}`} value={answers[q.id] ?? ""} onChange={(e) => set(q.id, e.target.value)} className="bg-background border-border text-base min-h-[110px]" />
                  ) : (
                    <Input
                      id={`apply-${q.id}`}
                      type={q.kind === "email" ? "email" : "text"}
                      autoComplete={q.id === "email" ? "email" : q.id === "name" ? "name" : q.id === "company" ? "organization" : q.id === "website" ? "url" : "off"}
                      value={answers[q.id] ?? ""}
                      onChange={(e) => set(q.id, e.target.value)}
                      className="bg-background border-border text-base"
                    />
                  )}
                </div>
              ))}

              {route === "audit" && (
                <p className="body-clean text-muted-foreground border-l-2 border-primary pl-4">
                  At €10K to €20K a month, a first helper built in a week is usually the right first step. Apply and we
                  will look at whether that or a full team build fits.
                </p>
              )}

              {(route === "audit" || route === "call") && (
                <>
                  {status === "error" && (
                    <p role="alert" className="body-clean text-sm text-destructive">
                      {missing.length ? "Please answer every question; only the website is optional." : "That didn't go through. Try again, or use the contact form."}
                    </p>
                  )}
                  <Button type="submit" size="lg" disabled={status === "sending"} className="bg-foreground text-background hover:bg-foreground/90 uppercase">
                    {status === "sending" ? "Sending..." : "Send application"}
                  </Button>
                </>
              )}
            </form>
          )}
            {route === "resources" && (
                <div className="rounded-lg border border-white/10 bg-card p-6 lg:p-8 flex flex-col gap-6">
                  <div>
                    <h2 className="heading-elegant text-2xl mb-2">At this budget, start with the free guides</h2>
                    <p className="body-clean text-muted-foreground">
                      A full AI marketing team is built for teams spending €20K or more a month on ads, so it would cost
                      you more than it saves. These guides show how to build your first helper yourself, and if you want
                      one built for you, a single helper in a week is the smaller step.
                    </p>
                  </div>
                  <ul className="flex flex-col gap-2">
                    {guides.map((a) => (
                      <li key={a.slug}>
                        <Link to={`/blog/${a.slug}`} className="body-clean underline decoration-primary underline-offset-4">{a.title}</Link>
                      </li>
                    ))}
                  </ul>
                  <Link to="/#contact" className="body-clean underline decoration-primary underline-offset-4 self-start">Ask about a first helper</Link>
                  <NewsletterSignup source="apply-under-10k" compact />
                </div>
              )}

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Apply;
