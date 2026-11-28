import { useEffect } from "react";
import { Link } from "react-router-dom";
import { usePageMeta } from "@/i18n/lang";
import { getArticles } from "@/lib/blog";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import NewsletterSignup, { ISSUE_DAY } from "@/components/NewsletterSignup";

// The newsletter landing page, in the course's seven parts: promise, who it is for, what each issue holds,
// recent topics, who writes it, questions, and the signup again. Every fact here is already on the site.
const ISSUE = [
  ["A story from the week", "Something that happened in an ad account I run, with the numbers, told the way it happened."],
  ["One system", "The setup behind it: the rule, the prompt or the automation, explained so you can copy it."],
  ["Two or three useful links", "What changed in Meta ads or in AI tools that week, and whether it matters for your account."],
  ["One invitation, at most", "When I have something worth inviting you to, a guide, a first-helper slot or a call, it is in one clearly marked place."],
];

const FAQ = [
  ["How often?", `Once a week, on ${ISSUE_DAY}.`],
  ["What does it cost?", "Nothing."],
  ["Can I leave?", "Yes. Every email has a one-click unsubscribe link at the bottom."],
  ["Will you share my email?", "No. It is used for this newsletter and nothing else."],
];

const Newsletter = () => {
  usePageMeta(
    "Newsletter | Rihards Zeila",
    `One email every ${ISSUE_DAY} on running Meta ads with AI: a story from a real account, the system behind it and what to do in yours.`,
  );
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const recent = getArticles().slice(0, 3);

  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <section className="px-6 lg:px-16 pt-28 pb-14 lg:pt-36 lg:pb-20">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div>
              <span className="eyebrow block mb-4">Newsletter</span>
              <h1 className="heading-elegant text-4xl lg:text-6xl mb-6">Running ads with AI, one email a week</h1>
              <p className="body-clean text-muted-foreground text-lg lg:text-xl max-w-xl leading-relaxed">
                For founders and heads of growth who spend real money on Meta ads and want the AI part to make money
                rather than noise. Written by me every {ISSUE_DAY}, from the accounts I run. Free, and you can
                unsubscribe in one click.
              </p>
            </div>
            <div className="rounded-lg border border-white/10 bg-card p-6 lg:p-8">
              <NewsletterSignup source="newsletter-page" intro={false} />
            </div>
          </div>
        </section>

        <section className="px-6 lg:px-16 py-14 lg:py-20 section-rule">
          <div className="max-w-6xl mx-auto">
            <span className="eyebrow block mb-4">What each issue holds</span>
            <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
              {ISSUE.map(([title, body]) => (
                <div key={title}>
                  <h2 className="heading-elegant text-xl lg:text-2xl mb-2">{title}</h2>
                  <p className="body-clean text-muted-foreground leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {recent.length > 0 && (
          <section className="px-6 lg:px-16 py-14 lg:py-20 section-rule">
            <div className="max-w-6xl mx-auto">
              <span className="eyebrow block mb-4">The kind of thing I write about</span>
              <ul className="flex flex-col gap-3">
                {recent.map((a) => (
                  <li key={a.slug}>
                    <Link to={`/blog/${a.slug}`} className="body-clean text-lg lg:text-xl underline decoration-primary underline-offset-4 hover:text-primary">
                      {a.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        <section className="px-6 lg:px-16 py-14 lg:py-20 section-rule">
          <div className="max-w-3xl mx-auto">
            <span className="eyebrow block mb-4">Who writes it</span>
            <p className="body-clean text-lg lg:text-xl leading-relaxed">
              I'm Rihards Zeila. I have managed up to $5M a year in ad spend, taught digital marketing on the Riga
              Business School MBA from 2021 to 2026, and run my own businesses on the AI systems I write about.{" "}
              <Link to="/about" className="underline decoration-primary underline-offset-4">More about me</Link>.
            </p>
          </div>
        </section>

        <section className="px-6 lg:px-16 py-14 lg:py-20 section-rule">
          <div className="max-w-3xl mx-auto">
            <span className="eyebrow block mb-6">Questions</span>
            <dl className="flex flex-col gap-6">
              {FAQ.map(([q, a]) => (
                <div key={q}>
                  <dt className="heading-elegant text-lg lg:text-xl mb-1">{q}</dt>
                  <dd className="body-clean text-muted-foreground">{a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="px-6 lg:px-16 pb-20 lg:pb-28">
          <div className="max-w-3xl mx-auto rounded-lg border border-white/10 bg-card p-6 lg:p-10">
            <NewsletterSignup source="newsletter-page-bottom" compact />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Newsletter;
