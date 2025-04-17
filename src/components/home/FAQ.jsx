import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";
  
  export default function FAQ() {
    const faqs = [
      {
        question: "How much can I earn per referral?",
        answer: "Commission rates vary by product but typically range from 5-15% of the sale value.",
      },
      {
        question: "How do I get paid?",
        answer: "We process payments monthly via bank transfer, PayPal, or other digital payment methods.",
      },
      {
        question: "Is there a limit to how many referrals I can make?",
        answer: "No limits! The more you refer, the more you earn.",
      },
      {
        question: "How do I track my referrals?",
        answer: "Your dashboard shows real-time statistics on clicks, conversions, and earnings.",
      },
    ];
  
    return (
      <section className="py-16 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    );
  }