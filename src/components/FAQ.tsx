import { useReveal } from "@/hooks/use-reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/**
 * TODO (Rihards): the pricing answer describes structure but publishes no
 * figures — I'm not inventing your rates. If you want a floor stated
 * ("audits from €X"), edit the first answer and the `price` lines in
 * Engagements.tsx to match.
 */
const faqs = [
  {
    q: "How does pricing work?",
    a: "Audits are a fixed fee. Projects are quoted as a fixed project price once the scope is written, so the number doesn't move mid-engagement. Retainers and training are monthly or per-program. You get the price in writing after the discovery call, before any work starts — I don't do hourly.",
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
    a: "Audits usually within two weeks. Build projects depend on the current book — the discovery call will tell you honestly. I reply to enquiries within two business days.",
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
      <span className="eyebrow block mb-4">Questions</span>
      <h2 className="heading-elegant text-3xl lg:text-5xl mb-10">
        The things people ask before emailing.
      </h2>

      <Accordion type="single" collapsible defaultValue="q0" className="w-full">
        {faqs.map((f, i) => (
          <AccordionItem key={f.q} value={`q${i}`} className="border-border">
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
