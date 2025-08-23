
"use client";

import {
  BookText,
  CalendarClock,
  LayoutDashboard,
  MessageCircle,
  Search,
  LineChart,
  Scale,
  FileText,
  Layers,
  ListChecks,
  PlaySquare,
  Projector,
  Map,
  Disc3,
  SmilePlus,
  Gavel,
  ArrowLeft,
  ChevronsRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScrollArea } from '../ui/scroll-area';

const menuItems = [
  { href: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: 'mcqs', label: 'Daily MCQs', icon: ListChecks },
  { href: 'notes', label: 'Topic Notes', icon: BookText },
  { href: 'flashcards', label: 'Flashcards', icon: Layers },
  { href: 'reels', label: 'Legal Reels', icon: PlaySquare },
  { href: 'planner', label: 'Study Planner', icon: CalendarClock },
  { href: 'progress', label: 'Progress Tracker', icon: LineChart },
  { href: 'search', label: 'Search Content', icon: Search },
];

const newFeatures = [
  { href: 'visual-law', label: 'Visual Law', icon: Projector },
  { href: 'career-roadmap', label: 'Career Roadmap', icon: Map },
  { href: 'revision-wheel', label: 'Revision Wheel', icon: Disc3 },
];

const aiTools = [
  { href: 'summarizer', label: 'Summarizer', icon: FileText },
  { href: 'assistant', label: 'AI Assistant', icon: MessageCircle },
  { href: 'mood-study', label: 'Mood Study', icon: SmilePlus },
  { href: 'courtroom-sim', label: 'Courtroom Sim', icon: Gavel },
];

interface LawPrepSidebarProps {
    activePage: string;
    setActivePage: (page: string) => void;
    onBack: () => void;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

export function LawPrepSidebar({ activePage, setActivePage, onBack, isOpen, setIsOpen }: LawPrepSidebarProps) {

  const NavLink = ({ item }: { item: typeof menuItems[0] }) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={activePage === item.href ? "secondary" : "ghost"}
            size="icon"
            className="rounded-lg"
            aria-label={item.label}
            onClick={() => setActivePage(item.href)}
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
     <aside className={`flex-shrink-0 border-l bg-background flex-col h-screen transition-all duration-300 ${isOpen ? 'w-14 flex' : 'w-0 hidden'}`}>
        <div className={`flex h-14 items-center justify-center border-b`}>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-lg"
                    aria-label="Back to Dashboard"
                    onClick={onBack}
                  >
                    <ArrowLeft className="size-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="left" sideOffset={5}>
                    Back to Main App
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
        </div>
        <ScrollArea className="flex-1">
          <nav className={`flex flex-col items-center gap-4 px-2 py-5`}>
            {menuItems.map(item => <NavLink key={item.href} item={item} />)}
            <div className="my-2 h-px w-full bg-border" />
            {newFeatures.map(item => <NavLink key={item.href} item={item} />)}
            <div className="my-2 h-px w-full bg-border" />
            {aiTools.map(item => <NavLink key={item.href} item={item} />)}
          </nav>
        </ScrollArea>
    </aside>
  );
}

    