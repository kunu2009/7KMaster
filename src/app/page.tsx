
"use client";

import { useState } from "react";
import { TodayTab } from "@/components/dashboard/today-tab";
import { ProjectsTab } from "@/components/dashboard/projects-tab";
import { SkillsTab } from "@/components/dashboard/skills-tab";
import { JournalTab } from "@/components/dashboard/journal-tab";
import { WebLinksTab } from "@/components/dashboard/web-links-tab";
import { UtilitiesTab } from "@/components/dashboard/utilities-tab";
import { AssistantTab } from "@/components/dashboard/assistant-tab";
import { StudyTab } from "@/components/dashboard/study-tab";
import { PromptsTab } from "@/components/dashboard/prompts-tab";
import { AppsTab } from "@/components/dashboard/apps-tab";
import { ResearchTab } from "@/components/dashboard/research-tab";
import { ThemeToggle } from "@/components/dashboard/theme-toggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import {
  GanttChartSquare,
  BrainCircuit,
  Bot,
  Book,
  Sparkles,
  AppWindow,
  Link,
  Wrench,
  PanelLeft,
  PenSquare,
  Home as HomeIcon,
  Bookmark,
} from "lucide-react";


const navItems = [
  { id: 'today', label: 'Today', icon: HomeIcon },
  { id: 'assistant', label: 'Assistant', icon: Bot },
  { id: 'projects', label: 'Projects', icon: GanttChartSquare },
  { id: 'skills', label: 'Skills', icon: BrainCircuit },
  { id: 'journal', label: 'Journal', icon: PenSquare },
  { id: 'study', label: 'Study', icon: Book },
  { id: 'research', label: 'Research', icon: Bookmark },
  { id: 'prompts', label: 'Prompts', icon: Sparkles },
  { id: 'apps', label: 'Apps', icon: AppWindow },
  { id: 'web-links', label: 'Links', icon: Link },
  { id: 'utilities', label: 'Utilities', icon: Wrench },
]

export default function Home() {
  const [activeTab, setActiveTab] = useState("today");
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'today': return <TodayTab />;
      case 'assistant': return <AssistantTab />;
      case 'projects': return <ProjectsTab />;
      case 'skills': return <SkillsTab />;
      case 'journal': return <JournalTab />;
      case 'study': return <StudyTab />;
      case 'research': return <ResearchTab />;
      case 'prompts': return <PromptsTab />;
      case 'apps': return <AppsTab />;
      case 'web-links': return <WebLinksTab />;
      case 'utilities': return <UtilitiesTab />;
      default: return <TodayTab />;
    }
  };

  const NavLink = ({ item, isMobile = false }: { item: typeof navItems[0], isMobile?: boolean }) => (
    <Button
      variant={activeTab === item.id ? "secondary" : "ghost"}
      className="w-full justify-start gap-2"
      onClick={() => {
        setActiveTab(item.id)
        if (isMobile) setIsSheetOpen(false);
      }}
    >
      <item.icon className="h-5 w-5" />
      {item.label}
    </Button>
  );

  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <aside className="hidden border-r bg-muted/40 lg:block lg:fixed lg:h-full lg:w-[280px]">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-16 items-center border-b px-6">
             <div className="flex items-center gap-2">
                 <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-primary"
                  >
                    <path d="M4 18.5A2.5 2.5 0 0 1 6.5 21a2.5 2.5 0 0 1 0-5 .5.5 0 0 1 .5.5V17a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 .5-.5 2.5 2.5 0 1 1 0-5 .5.5 0 0 1 .5.5V12a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V6.5a.5.5 0 0 1 .5-.5 2.5 2.5 0 0 1 5 0 .5.5 0 0 1 .5.5V8a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V3.5A2.5 2.5 0 0 0 17.5 1 2.5 2.5 0 0 0 15 3.5a.5.5 0 0 1-.5.5H13a1 1 0 0 0-1 1v2.5a.5.5 0 0 1-.5.5 2.5 2.5 0 1 0 0 5 .5.5 0 0 1-.5-.5V12a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v2.5a.5.5 0 0 1-.5.5A2.5 2.5 0 0 1 4 18.5Z"/>
                  </svg>
                  <h1 className="text-lg font-semibold md:text-xl">7K Life</h1>
              </div>
          </div>
          <nav className="flex-1 overflow-auto px-4 py-4">
            <div className="grid items-start gap-1">
              {navItems.map(item => <NavLink key={item.id} item={item} />)}
            </div>
          </nav>
        </div>
      </aside>
      <div className="flex flex-col lg:pl-[280px]">
        <header className="flex h-16 items-center gap-4 border-b bg-muted/40 px-6 sticky top-0 z-30">
          <div className="lg:hidden"></div>
           <div className="flex-1 text-center font-bold text-xl">
             <span className="lg:hidden">7K Life</span>
             <span className="hidden lg:inline-block">7K Life</span>
           </div>
          <ThemeToggle />
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0 lg:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <nav className="grid gap-2 text-lg font-medium">
                 <div className="flex items-center gap-2 h-16 border-b">
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-6 w-6 text-primary"
                      >
                        <path d="M4 18.5A2.5 2.5 0 0 1 6.5 21a2.5 2.5 0 0 1 0-5 .5.5 0 0 1 .5.5V17a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 .5-.5 2.5 2.5 0 1 1 0-5 .5.5 0 0 1 .5.5V12a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V6.5a.5.5 0 0 1 .5-.5 2.5 2.5 0 0 1 5 0 .5.5 0 0 1 .5.5V8a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V3.5A2.5 2.5 0 0 0 17.5 1 2.5 2.5 0 0 0 15 3.5a.5.5 0 0 1-.5.5H13a1 1 0 0 0-1 1v2.5a.5.5 0 0 1-.5.5 2.5 2.5 0 1 0 0 5 .5.5 0 0 1-.5-.5V12a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v2.5a.5.5 0 0 1-.5.5A2.5 2.5 0 0 1 4 18.5Z"/>
                      </svg>
                      <h1 className="text-lg font-semibold md:text-xl">7K Life</h1>
                  </div>
                   {navItems.map(item => <NavLink key={item.id} item={item} isMobile />)}
              </nav>
            </SheetContent>
          </Sheet>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
            {renderContent()}
        </main>
      </div>
    </div>
  );
}
