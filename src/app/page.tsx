
"use client";

import { useState } from "react";
import { TodayTab } from "@/components/dashboard/today-tab";
import { ProjectsTab } from "@/components/dashboard/projects-tab";
import { SkillsTab } from "@/components/dashboard/skills-tab";
import { JournalTab } from "@/components/dashboard/journal-tab";
import { ProgressTab } from "@/components/dashboard/progress-tab";
import { WebLinksTab } from "@/components/dashboard/web-links-tab";
import { UtilitiesTab } from "@/components/dashboard/utilities-tab";
import { AssistantTab } from "@/components/dashboard/assistant-tab";
import { LawPrepApp } from "@/components/lawprep/law-prep-app";
import { ResearchTab } from "@/components/dashboard/research-tab";
import { ThemeToggle } from "@/components/dashboard/theme-toggle";
import { Button } from "@/components/ui/button";
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
  ChevronsLeft,
  ChevronsRight,
  LineChart,
} from "lucide-react";
import { LawPrepSidebar } from "@/components/lawprep/law-prep-sidebar";
import { PromptsTab } from "@/components/dashboard/prompts-tab";
import { AppsTab } from "@/components/dashboard/apps-tab";


const navItems = [
  { id: 'today', label: 'Today', icon: HomeIcon },
  { id: 'assistant', label: 'Assistant', icon: Bot },
  { id: 'projects', label: 'Projects', icon: GanttChartSquare },
  { id: 'skills', label: 'Skills', icon: BrainCircuit },
  { id: 'journal', label: 'Journal', icon: PenSquare },
  { id: 'study', label: 'Study', icon: Book },
  { id: 'research', label: 'Research', icon: Bookmark },
  { id: 'progress', label: 'Progress', icon: LineChart },
  { id: 'prompts', label: 'Prompts', icon: Sparkles },
  { id: 'apps', label: 'Apps', icon: AppWindow },
  { id: 'web-links', label: 'Links', icon: Link },
  { id: 'utilities', label: 'Utilities', icon: Wrench },
]

export default function Home() {
  const [activeTab, setActiveTab] = useState("today");
  const [activeLawPage, setActiveLawPage] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleTabChange = (tabId: string) => {
      setActiveTab(tabId);
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'today': return <TodayTab />;
      case 'assistant': return <AssistantTab />;
      case 'projects': return <ProjectsTab />;
      case 'skills': return <SkillsTab />;
      case 'journal': return <JournalTab />;
      case 'study': return <LawPrepApp activePage={activeLawPage} />;
      case 'research': return <ResearchTab />;
      case 'progress': return <ProgressTab />;
      case 'prompts': return <PromptsTab />;
      case 'apps': return <AppsTab />;
      case 'web-links': return <WebLinksTab />;
      case 'utilities': return <UtilitiesTab />;
      default: return <TodayTab />;
    }
  };

  const NavLink = ({ item }: { item: typeof navItems[0] }) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={activeTab === item.id ? "secondary" : "ghost"}
            size="icon"
            className="rounded-lg"
            aria-label={item.label}
            onClick={() => handleTabChange(item.id)}
          >
            <item.icon className="size-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left" sideOffset={5}>
          {item.label}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
        {activeTab === 'study' ? (
             <LawPrepSidebar 
                activePage={activeLawPage}
                setActivePage={setActiveLawPage}
                onBack={() => setActiveTab('today')}
             />
        ) : (
          <aside className={`fixed inset-y-0 right-0 z-10 flex flex-col border-l bg-background transition-all duration-300 ${isSidebarOpen ? 'w-14' : 'w-0 overflow-hidden'}`}>
            <nav className={`flex flex-col items-center gap-4 px-2 py-5 transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`}>
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
            <nav className={`mt-auto flex flex-col items-center gap-4 px-2 py-5 transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`}>
                <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-lg"
                    aria-label="Toggle Sidebar"
                    onClick={() => setIsSidebarOpen(prev => !prev)}
                >
                    <ChevronsRight className="size-5" />
                </Button>
            </nav>
          </aside>
        )}
       
       {!isSidebarOpen && activeTab !== 'study' && (
            <Button
                variant="ghost"
                size="icon"
                className="fixed top-1/2 right-2 z-20 rounded-full"
                aria-label="Toggle Sidebar"
                onClick={() => setIsSidebarOpen(prev => !prev)}
            >
                <ChevronsLeft className="size-5" />
            </Button>
        )}

      <div className={`flex flex-1 flex-col gap-4 py-4 transition-all duration-300 ${isSidebarOpen || activeTab === 'study' ? 'pr-14' : 'pr-0'}`}>
         <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
            <div className="flex-1 text-center font-bold text-xl">
             <span>{activeTab === 'study' ? 'LawPrep Sprint' : '7K Life'}</span>
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
