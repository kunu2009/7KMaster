
"use client";

import { useState } from "react";
import { TodayTab } from "@/components/dashboard/today-tab";
import { ProjectsTab } from "@/components/dashboard/projects-tab";
import { SkillsTab } from "@/components/dashboard/skills-tab";
import { JournalTab } from "@/components/dashboard/journal-tab";
import { ProgressTab } from "@/components/dashboard/progress-tab";
import { WebLinksTab } from "@/components/dashboard/web-links-tab";
import { NotesTab } from "@/components/dashboard/notes-tab";
import { AssistantTab } from "@/components/dashboard/assistant-tab";
import { LawPrepApp } from "@/components/lawprep/law-prep-app";
import { ItihasApp } from "@/components/itihas/itihas-app";
import { ResearchTab } from "@/components/dashboard/research-tab";
import { HabitTrackerTab } from "@/components/dashboard/habit-tracker-tab";
import { ThemeToggle } from "@/components/dashboard/theme-toggle";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { AppsTab } from "@/components/dashboard/apps-tab";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Project, Note } from "@/lib/types";
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
  AppWindow,
  Link,
  PenSquare,
  Home as HomeIcon,
  Bookmark,
  ChevronsLeft,
  ChevronsRight,
  LineChart,
  NotepadText,
  Zap,
  CheckSquare,
  Scale,
  ScrollText,
  BookCopy,
} from "lucide-react";
import { LawPrepSidebar } from "@/components/lawprep/law-prep-sidebar";
import { ItihasSidebar } from "@/components/itihas/itihas-sidebar";
import { HscApp } from "@/components/hsc/hsc-app";
import { HscSidebar } from "@/components/hsc/hsc-sidebar";


const navItems = [
  { id: 'today', label: 'Today', icon: HomeIcon },
  { id: 'assistant', label: 'Assistant', icon: Bot },
  { id: 'projects', label: 'Projects', icon: GanttChartSquare },
  { id: 'skills', label: 'Skills', icon: BrainCircuit },
  { id: 'habits', label: 'Habits', icon: CheckSquare },
  { id: 'journal', label: 'Journal', icon: PenSquare },
  { id: 'study', label: 'LawPrep', icon: Scale },
  { id: 'itihas', label: 'Itihas', icon: ScrollText },
  { id: 'hsc', label: 'HSC', icon: BookCopy },
  { id: 'research', label: 'Research', icon: Bookmark },
  { id: 'progress', label: 'Progress', icon: LineChart },
  { id: 'notes', label: 'Notepad', icon: NotepadText },
  { id: 'apps', label: 'Apps', icon: AppWindow },
  { id: 'web-links', label: 'Links', icon: Link },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState("today");
  const [activeLawPage, setActiveLawPage] = useState('dashboard');
  const [activeItihasPage, setActiveItihasPage] = useState('dashboard');
  const [activeHscPage, setActiveHscPage] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSpecialSidebarOpen, setIsSpecialSidebarOpen] = useState(true);
  const [focusMode, setFocusMode] = useState(false);
  
  // Lifted state
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const handleTabChange = (tabId: string) => {
    // Reset detail views when switching main tabs unless navigating to a related tab
    if (activeTab === 'projects' && tabId !== 'projects') {
      // Don't reset if just switching away
    }
    if (activeTab === 'notes' && tabId !== 'notes') {
        // Don't reset
    }
    setActiveTab(tabId);
  }

  const displayedNavItems = focusMode
    ? navItems.filter(item => ['today', 'projects', 'skills'].includes(item.id))
    : navItems;
    
  const isSpecialAppView = activeTab === 'study' || activeTab === 'itihas' || activeTab === 'hsc';
  const sidebarWidth = isSpecialAppView ? (isSpecialSidebarOpen ? 'pr-14' : 'pr-0') : (isSidebarOpen ? 'pr-14' : 'pr-0');

  const renderContent = () => {
    switch (activeTab) {
      case 'today': return <TodayTab />;
      case 'assistant': return <AssistantTab />;
      case 'projects': return <ProjectsTab selectedProject={selectedProject} onSelectProject={setSelectedProject} />;
      case 'skills': return <SkillsTab />;
      case 'habits': return <HabitTrackerTab />;
      case 'journal': return <JournalTab />;
      case 'study': return <LawPrepApp activePage={activeLawPage} />;
      case 'itihas': return <ItihasApp activePage={activeItihasPage} setActivePage={setActiveItihasPage} />;
      case 'hsc': return <HscApp activePage={activeHscPage} setActivePage={setActiveHscPage} />;
      case 'research': return <ResearchTab />;
      case 'progress': return <ProgressTab />;
      case 'notes': return <NotesTab selectedNote={selectedNote} onSelectNote={setSelectedNote} />;
      case 'apps': return <AppsTab />;
      case 'web-links': return <WebLinksTab />;
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
  
  const renderSidebar = () => {
    if (activeTab === 'study') {
        return <LawPrepSidebar 
            activePage={activeLawPage}
            setActivePage={setActiveLawPage}
            onBack={() => setActiveTab('today')}
            isOpen={isSpecialSidebarOpen}
            setIsOpen={setIsSpecialSidebarOpen}
         />;
    }
    if (activeTab === 'itihas') {
        return <ItihasSidebar 
            activePage={activeItihasPage}
            setActivePage={setActiveItihasPage}
            onBack={() => setActiveTab('today')}
            isOpen={isSpecialSidebarOpen}
            setIsOpen={setIsSpecialSidebarOpen}
         />;
    }
    if (activeTab === 'hsc') {
        return <HscSidebar 
            activePage={activeHscPage}
            setActivePage={setActiveHscPage}
            onBack={() => setActiveTab('today')}
            isOpen={isSpecialSidebarOpen}
            setIsOpen={setIsSpecialSidebarOpen}
         />;
    }
    return (
        <aside className={`fixed inset-y-0 right-0 z-10 flex flex-col border-l bg-background transition-all duration-300 ${isSidebarOpen ? 'w-14' : 'w-0 overflow-hidden'}`}>
            <ScrollArea className="flex-1">
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
                    <div className="flex flex-col items-center gap-4">
                        {displayedNavItems.map(item => <NavLink key={item.id} item={item} />)}
                    </div>
                </nav>
            </ScrollArea>
            <div className={`flex flex-col items-center gap-4 px-2 py-5 border-t mt-auto transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`}>
                <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-lg"
                    aria-label="Toggle Sidebar"
                    onClick={() => setIsSidebarOpen(prev => !prev)}
                >
                    <ChevronsRight className="size-5" />
                </Button>
            </div>
      </aside>
    );
  }
  
  const currentSidebarOpenState = isSpecialAppView ? isSpecialSidebarOpen : isSidebarOpen;

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
        {renderSidebar()}
       
       {!currentSidebarOpenState && (
            <Button
                variant="ghost"
                size="icon"
                className="fixed top-1/2 right-2 z-20 rounded-full"
                aria-label="Toggle Sidebar"
                onClick={() => {
                  if (isSpecialAppView) {
                    setIsSpecialSidebarOpen(true);
                  } else {
                    setIsSidebarOpen(true);
                  }
                }}
            >
                <ChevronsLeft className="size-5" />
            </Button>
        )}

      <div className={`flex flex-1 flex-col gap-4 py-4 transition-all duration-300 ${sidebarWidth}`}>
         <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
            <div className="flex-1 text-center font-bold text-xl">
             <span>{activeTab === 'study' ? 'LawPrep Sprint' : activeTab === 'itihas' ? '7K Itihas' : activeTab === 'hsc' ? '7K HSC Board' : '7K Life'}</span>
            </div>

            <div className="flex items-center gap-2 sm:gap-4 ml-auto">
              <div className="flex items-center space-x-2">
                <Switch 
                    id="focus-mode" 
                    checked={focusMode}
                    onCheckedChange={setFocusMode}
                />
                <Label htmlFor="focus-mode" className="flex items-center gap-1 text-sm">
                    <Zap className="h-4 w-4" />
                    <span className="hidden sm:inline">Focus</span>
                </Label>
              </div>
              <ThemeToggle />
            </div>
        </header>
        <main className="flex-1 overflow-auto p-4 sm:p-6">
            {renderContent()}
        </main>
      </div>
    </div>
  );
}
