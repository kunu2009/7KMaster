
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
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  GanttChartSquare,
  BrainCircuit,
  Bot,
  Book,
  Sparkles,
  AppWindow,
  Link,
  Wrench,
  PenSquare,
  Home as HomeIcon,
  Bookmark,
  PanelLeft,
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

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setIsSheetOpen(false); // Close sheet on navigation
  };
  
  const NavLink = ({ item, isMobile = false }: { item: typeof navItems[0], isMobile?: boolean }) => {
    if (isMobile) {
      return (
         <Button
            variant={activeTab === item.id ? "secondary" : "ghost"}
            className="justify-start w-full"
            aria-label={item.label}
            onClick={() => handleTabClick(item.id)}
          >
            <item.icon className="size-5 mr-4" />
            {item.label}
          </Button>
      )
    }

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={activeTab === item.id ? "secondary" : "ghost"}
              size="icon"
              className="rounded-lg"
              aria-label={item.label}
              onClick={() => setActiveTab(item.id)}
            >
              <item.icon className="size-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={5}>
            {item.label}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
         <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
            <div className="flex items-center gap-2 mb-2">
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
              </div>
               {navItems.map(item => <NavLink key={item.id} item={item} />)}
          </nav>
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 w-full">
         <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button size="icon" variant="outline" className="sm:hidden">
                  <PanelLeft className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="sm:max-w-xs">
                <SheetHeader>
                   <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                </SheetHeader>
                <nav className="grid gap-2 text-lg font-medium pt-4">
                  {navItems.map(item => <NavLink key={item.id} item={item} isMobile={true} />)}
                </nav>
              </SheetContent>
            </Sheet>
            
            <div className="flex-1 text-center font-bold text-xl">
             <span>7K Life</span>
            </div>

            <div className="flex items-center gap-2 ml-auto">
              <ThemeToggle />
            </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
            {renderContent()}
        </main>
      </div>
    </div>
  );
}
