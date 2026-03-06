import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "../../ui/accordion";
import { FAQS } from "../../../constants";
import { SectionLayout } from "../section-layout/SectionLayout";

export function FAQ() {
    return (
        <SectionLayout>
            <div className="mx-auto max-w-3xl w-full px-4 sm:px-6">

                {/* Heading container */}
                <div className="text-center mb-12">
                    <span className="text-xs font-bold uppercase tracking-widest text-primary mb-3 block text-center">Questions?</span>
                    <h2 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl text-center">
                        Frequently Asked <span className="text-primary">Questions</span>
                    </h2>
                    <p className="mt-4 text-sm sm:text-base text-muted-foreground text-center mx-auto max-w-2xl">
                        Everything you need to know about our services and process
                    </p>
                </div>

                <Accordion type="single" collapsible className="w-full space-y-2">
                    {FAQS.map((faq, index) => (
                        <AccordionItem
                            key={index}
                            value={`item-${index}`}
                        >
                            <AccordionTrigger className="text-base font-bold text-slate-900 hover:no-underline hover:text-primary transition-colors text-left">
                                {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-slate-600 text-sm leading-relaxed">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </SectionLayout>
    );
}
