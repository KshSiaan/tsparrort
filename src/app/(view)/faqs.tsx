import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
const faqs = [
  {
    question: "Does The Screaming Parrots Cafe offer breakfast and brunch?",
    answer: `Yes, we offer Savory Crepes, Modern Shakshuka, and Toasts for breakfast and lunch.`,
  },
  {
    question:
      "Does The Screaming Parrots Cafe offer order pickup or order ahead?",
    answer: (
      <span>
        Yes, we offer order ahead so we can prepare your order if you&apos;re in
        a rush. You can use our direct ordering system here:{" "}
        <a
          href="https://www.clover.com/online-ordering/the-screaming-parrots"
          className="hover:underline font-bold"
        >
          https://www.clover.com/online-ordering/the-screaming-parrots
        </a>
      </span>
    ),
  },
  {
    question: "How long do Soufflés take to prepare?",
    answer: `They typically take about 35-40 minutes. We prepare them hourly to reduce wait times. You can reserve them by ordering ahead or calling us 40 minutes in advance.`,
  },
  {
    question: "What time does The Screaming Parrots close?",
    answer: `We close every day at 11 PM.`,
  },
  {
    question: "Can I order a full Basque Cake?",
    answer: `Yes, we can prepare full cakes.`,
  },
  {
    question: "Do you do custom birthday cakes?",
    answer: (
      <span>
        Yes, we can customize our Basque cakes, write birthday names, and much
        more. Email us at{" "}
        <a
          href="mailto:thescreamingparrots@gmail.com"
          className="hover:underline font-bold"
        >
          thescreamingparrots@gmail.com
        </a>{" "}
        for questions or orders.
      </span>
    ),
  },
];

export function Faqs() {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      defaultValue="item-1"
    >
      {faqs.map((faq, idx) => (
        <AccordionItem value={`item-${idx + 1}`} key={idx}>
          <AccordionTrigger>{faq.question}</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p>{faq.answer}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
