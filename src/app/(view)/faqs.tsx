import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question:
      "Is delivery available for The Screaming Parrots Cafe in Redmond?",
    answer: `Yes — The Screaming Parrots Cafe (16095 Cleveland Street, Redmond) offers delivery via Uber Eats in Redmond.`,
  },
  {
    question: "How can I order from The Screaming Parrots Cafe online?",
    answer: `You can order using the Uber Eats app or via their website: browse the menu, add items to your cart, and then review, place, and track your order.`,
  },
  {
    question: "Where can I see the menu and pricing?",
    answer: `All menu items and pricing are displayed upfront on the Uber Eats store page for the cafe.`,
  },
  {
    question: "Can I get free delivery?",
    answer: `If you have an Uber One membership (where it's available), you may get $0 delivery fee on eligible orders.`,
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
