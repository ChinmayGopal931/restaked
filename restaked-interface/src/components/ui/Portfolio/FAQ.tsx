import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/shadcn/Accordion";

export default function FAQ() {
  return (
    <div className="p-4 bg-gray-900 rounded-lg">
      <h2 className="text-xl text-white font-bold mb-4">FAQ</h2>

      <Accordion type="single" collapsible>
        <AccordionItem value="item-1" className="border-b border-gray-700">
          <AccordionTrigger className="flex justify-between items-center p-4">
            What is an AVS?
          </AccordionTrigger>
          <AccordionContent className="p-4">An AVS ...</AccordionContent>
        </AccordionItem>

        {/* Notice the absence of the border class on the last item to prevent a border at the bottom */}
        <AccordionItem value="item-2">
          <AccordionTrigger className="flex justify-between items-center p-4">
            What are some risks with delegating to an AVS?
          </AccordionTrigger>
          <AccordionContent className="p-4">...</AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger className="flex justify-between items-center p-4">
            What are Strategies?
          </AccordionTrigger>
          <AccordionContent className="p-4">...</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
