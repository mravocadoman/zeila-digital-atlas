import { useId, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { postForm } from "@/lib/api";

// The English newsletter signup (Founder OS: an owned list between the posts and the offer). Posts to the
// /api/newsletter.php endpoint, which adds the reader to the "Rihards Zeila (EN)" group in Sender.
// `source` says which page it sat on; `compact` is the one-line version under articles; `intro={false}` drops the
// heading and blurb where the page around it already says them.
export const ISSUE_DAY = "Thursday";

type Status = "idle" | "sending" | "done" | "error";

const NewsletterSignup = ({ source, compact = false, intro = true }: { source: string; compact?: boolean; intro?: boolean }) => {
  const id = useId();
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [spend, setSpend] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    const res = await postForm("newsletter", { email, firstname, spend, source, website });
    setStatus(res.ok ? "done" : "error");
  };

  if (status === "done") {
    return (
      <div role="status" className="body-clean">
        <p className="heading-elegant text-xl lg:text-2xl mb-2">You're on the list.</p>
        <p className="text-muted-foreground">The next issue arrives on {ISSUE_DAY}. Check your inbox for a welcome email first.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-4">
      {intro && <div>
        <span className="eyebrow block mb-3">Newsletter</span>
        <h2 className={`heading-elegant ${compact ? "text-xl lg:text-2xl" : "text-2xl lg:text-3xl"} mb-2`}>
          One email a week on running ads with AI
        </h2>
        <p className="body-clean text-muted-foreground max-w-xl">
          Every {ISSUE_DAY}: one thing I ran or changed in a real ad account that week, the system behind it, and what
          I would do in your place. Free, and you can unsubscribe in one click.
        </p>
      </div>}

      {/* Honeypot, same pattern as the contact form: off-screen, out of the tab order and the a11y tree. */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", overflow: "hidden" }}>
        <label htmlFor={`${id}-website`}>Leave this field empty</label>
        <input id={`${id}-website`} type="text" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
      </div>

      <div className={compact ? "flex flex-col sm:flex-row gap-3" : "grid sm:grid-cols-2 gap-3"}>
        <div className="min-w-0 flex-1">
          <label htmlFor={`${id}-email`} className="sr-only">Email</label>
          <Input
            id={`${id}-email`}
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-background border-border text-base"
            required
          />
        </div>
        {!compact && (
          <>
            <div className="min-w-0">
              <label htmlFor={`${id}-first`} className="sr-only">First name (optional)</label>
              <Input
                id={`${id}-first`}
                autoComplete="given-name"
                placeholder="First name (optional)"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                className="bg-background border-border text-base"
              />
            </div>
            <div className="min-w-0 sm:col-span-2">
              <label htmlFor={`${id}-spend`} className="body-clean block mb-2 text-sm text-muted-foreground">
                Monthly ad spend (optional, so I can send you the right examples)
              </label>
              <Select value={spend} onValueChange={setSpend}>
                <SelectTrigger id={`${id}-spend`} className="bg-background border-border text-base">
                  <SelectValue placeholder="Choose a range" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="under-10k">Under €10K</SelectItem>
                  <SelectItem value="10k-20k">€10K to €20K</SelectItem>
                  <SelectItem value="20k-50k">€20K to €50K</SelectItem>
                  <SelectItem value="50k-plus">€50K or more</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        )}
        <Button
          type="submit"
          disabled={status === "sending"}
          className={`bg-foreground text-background hover:bg-foreground/90 uppercase ${compact ? "" : "sm:col-span-2"}`}
        >
          {status === "sending" ? "Signing you up..." : "Get the newsletter"}
        </Button>
      </div>

      {status === "error" && (
        <p role="alert" className="body-clean text-sm text-destructive">
          That didn't go through. Check the email address and try again, or write to me through the contact form.
        </p>
      )}
    </form>
  );
};

export default NewsletterSignup;
