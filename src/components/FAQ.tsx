import { useReveal } from "@/hooks/use-reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/**
 * The pricing answer states the two fractional retainer tiers published in
 * Engagements.tsx. Audits, projects and training are still priced by shape;
 * keep both files in step.
 */
const faqs = () => [
  {
    q: "How does pricing work?",
    a: "Audits are a fixed fee. Projects are quoted as a fixed project price once the scope is written, so the number doesn't move mid-engagement. The fractional retainer has two published levels: €2,400 or €5,000 a month, for half a day or one day a week, with a three-month minimum. It suits companies spending €20K+ a month on ads, or with a growth target to match. Training is priced per program. You get every price in writing after the discovery call, before any work starts. I don't do hourly.",
  },
  {
    q: "Do you take over our ad account, or work through our team?",
    a: "Through your team wherever possible. I'll work directly in the account during a build, but your people keep access and watch the reasoning as it happens. The handover is the deliverable, so a black box would defeat it.",
  },
  {
    q: "What's the minimum ad spend for this to be worth it?",
    a: "Roughly €10k a month, or a credible plan to get there. Below that the constraint is usually offer and creative volume rather than account structure, and you'd be paying me to fix the wrong thing.",
  },
  {
    q: "Remote, in person, or both?",
    a: "Both. I'm based in Riga and work on-site across the Baltics; everything else is remote, and I've delivered programs in Europe, Africa, and Southeast Asia. Winters are usually remote.",
  },
  {
    q: "Which languages do you work in?",
    a: "English and Latvian, natively. Also Latgalian, and professional working Russian and Polish.",
  },
  {
    q: "How fast can you start?",
    a: "Audits usually within two weeks. Build projects depend on the current book. I'll tell you honestly on the discovery call. I reply to enquiries within two business days.",
  },
];

const FAQ = () => {
  const reveal = useReveal<HTMLElement>();
  return (
  <section
    id="faq"
    ref={reveal.ref}
    className={`py-12 lg:py-24 px-6 lg:px-16 section-rule ${reveal.className}`}
  >
    <div className="max-w-3xl mx-auto">
      <span className="eyebrow block mb-4">{"Questions"}</span>
      <h2 className="heading-elegant text-3xl lg:text-5xl mb-10">
        {"The things people ask before emailing."}
      </h2>

      <Accordion type="single" collapsible defaultValue="q0" className="w-full">
        {faqs().map((f, i) => (
          <AccordionItem key={i} value={`q${i}`} className="border-border">
            <AccordionTrigger className="heading-elegant text-lg lg:text-xl text-left py-5 hover:no-underline hover:text-primary transition-colors">
              {f.q}
            </AccordionTrigger>
            <AccordionContent className="body-clean text-muted-foreground text-base lg:text-lg leading-relaxed pb-5">
              {f.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
  );
};

export default FAQ;
