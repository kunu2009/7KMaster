
"use client";

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

interface LawPrepAppProps {
    activePage: string;
}

export function LawPrepApp({ activePage }: LawPrepAppProps) {
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

  return <div className="h-full">{renderContent()}</div>;
}

    