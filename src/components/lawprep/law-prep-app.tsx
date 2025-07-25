
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
  PanelLeft,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LawDashboard } from './pages/dashboard';
import { LawMCQs } from './pages/mcqs';
import { LawNotes } from './pages/notes';
import { LawFlashcards } from './pages/flashcards';
import { LawReels } from './pages/reels';
import { LawPlanner } from './pages/planner';
import { LawProgress } from './pages/progress';
import { LawSearch } from './pages/search';
import { LawVisual } from './pages/visual-law';
import { LawCareer } from './pages/career-roadmap';
import { LawRevision } from './pages/revision-wheel';
import { LawSummarizer } from './pages/summarizer';
import { LawAssistant } from './pages/assistant';
import { LawMoodStudy } from './pages/mood-study';
import { LawCourtroomSim } from './pages/courtroom-sim';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '../dashboard/theme-toggle';


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

export function LawPrepApp() {
  const [activePage, setActivePage] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const renderContent = () => {
    switch (activePage) {
      case 'dashboard': return <LawDashboard />;
      case 'mcqs': return <LawMCQs />;
      case 'notes': return <LawNotes />;
      case 'flashcards': return <LawFlashcards />;
      case 'reels': return <LawReels />;
      case 'planner': return <LawPlanner />;
      case 'progress': return <LawProgress />;
      case 'search': return <LawSearch />;
      case 'visual-law': return <LawVisual />;
      case 'career-roadmap': return <LawCareer />;
      case 'revision-wheel': return <LawRevision />;
      case 'summarizer': return <LawSummarizer />;
      case 'assistant': return <LawAssistant />;
      case 'mood-study': return <LawMoodStudy />;
      case 'courtroom-sim': return <LawCourtroomSim />;
      default: return <LawDashboard />;
    }
  };

  const NavLink = ({ item, isSidebarOpen }: { item: typeof menuItems[0], isSidebarOpen: boolean }) => (
    <Button
      variant={activePage === item.href ? 'secondary' : 'ghost'}
      className={cn("w-full justify-start gap-2", !isSidebarOpen && "justify-center")}
      onClick={() => setActivePage(item.href)}
    >
      <item.icon className="h-4 w-4" />
      <span className={cn(!isSidebarOpen && "hidden")}>{item.label}</span>
    </Button>
  );

  return (
    <div className="flex h-full w-full rounded-lg border bg-card text-card-foreground shadow-sm">
      {/* Sidebar */}
      <aside className={cn("flex flex-col border-r transition-all duration-300", isSidebarOpen ? "w-60" : "w-16")}>
        <div className="flex h-14 items-center gap-2 border-b px-4">
          <Scale className="size-6 text-primary" />
          <h1 className={cn("text-lg font-semibold", !isSidebarOpen && "hidden")}>LawPrep</h1>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-4">
            <nav className="space-y-1">
                {menuItems.map(item => <NavLink key={item.href} item={item} isSidebarOpen={isSidebarOpen} />)}
            </nav>
            <div>
                <h3 className={cn("px-2 py-2 text-xs font-semibold text-muted-foreground", !isSidebarOpen && "hidden")}>New Features</h3>
                <nav className="space-y-1">
                 {newFeatures.map(item => <NavLink key={item.href} item={item} isSidebarOpen={isSidebarOpen} />)}
                </nav>
            </div>
             <div>
                <h3 className={cn("px-2 py-2 text-xs font-semibold text-muted-foreground", !isSidebarOpen && "hidden")}>AI Tools</h3>
                <nav className="space-y-1">
                 {aiTools.map(item => <NavLink key={item.href} item={item} isSidebarOpen={isSidebarOpen} />)}
                </nav>
            </div>
        </div>
         <div className="mt-auto flex flex-col items-center gap-2 p-2 border-t">
            <Button variant="ghost" className="w-full" onClick={() => setIsSidebarOpen(prev => !prev)}>
                <PanelLeft className="h-4 w-4" />
                <span className={cn("ml-2", !isSidebarOpen && "hidden")}>{isSidebarOpen ? 'Collapse' : ''}</span>
            </Button>
        </div>
      </aside>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
         <main className="flex-1 overflow-auto p-4 sm:p-6">{renderContent()}</main>
      </div>
    </div>
  );
}
