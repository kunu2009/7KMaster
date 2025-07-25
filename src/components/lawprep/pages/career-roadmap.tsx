
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { careerRoadmaps } from "@/lib/law-data";
import { CheckCircle2 } from "lucide-react";

export function LawCareer() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Career Roadmap</h1>
        <p className="text-muted-foreground">
          Explore potential career paths after your law degree.
        </p>
      </div>

      <Accordion type="single" collapsible className="w-full space-y-4">
        {careerRoadmaps.map((path) => (
          <AccordionItem key={path.id} value={path.id} className="border rounded-lg px-6 bg-card">
            <AccordionTrigger className="text-lg font-semibold hover:no-underline">
              {path.title}
            </AccordionTrigger>
            <AccordionContent className="pt-2">
              <p className="text-muted-foreground mb-6">{path.description}</p>
              <div className="space-y-6 border-l-2 border-primary pl-6">
                {path.steps.map((step, index) => (
                  <div key={index} className="relative">
                    <div className="absolute -left-[34px] top-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <h4 className="font-semibold text-md mb-1">{step.title}</h4>
                    <p className="text-muted-foreground">{step.content}</p>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
