import { useReveal } from "@/hooks/use-reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/**
 * The pricing answer states the run-and-improve retainer published in Engagements.tsx. The first helper, the team
 * build and training are priced by scope; keep both files in step.
 */
const faqs = () => [
  {
    q: "How does pricing work?",
    a: "The first helper is a fixed fee, agreed after a short call. The AI marketing team build is quoted as one fixed project price once your week is mapped, so the number doesn't move mid-build. Run and improve has two published levels: €1,200 or €2,400 a month, for half a day or one day a week, with a three-month minimum. Training is priced per program. You get every price in writing before any work starts. I don't do hourly.",
  },
  {
    q: "Will an AI be making changes in our ad account?",
    a: "Only inside rules you have read and agreed to, and the first helpers change nothing at all: they check the numbers and report. Anything that moves budget, pauses ads or reaches a customer has a written rule, a person who approves it, or both. Your people keep access and can switch any helper off.",
  },
  {
    q: "Which tools do the helpers run on?",
    a: "Mostly Claude and n8n, connected to the tools you already use: Meta and Google ads, your shop or CRM, Notion or Sheets, email and Telegram or Slack. Where your data stays and who can see it is agreed before anything is built.",
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
    a: "The first helper usually within two weeks. Team builds depend on the current book, and I'll tell you on the first call. I reply to applications within one working day.",
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
