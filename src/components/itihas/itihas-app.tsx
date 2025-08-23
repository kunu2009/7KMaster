
"use client";

import { useState } from 'react';
import { ItihasDashboard } from './pages/dashboard';
import { ItihasChapterView } from './pages/chapter-view';
import { ItihasPlanner } from './pages/planner';
import type { ItihasChapter } from '@/lib/types';

interface ItihasAppProps {
    activePage: string;
    setActivePage: (page: string) => void;
}

export function ItihasApp({ activePage, setActivePage }: ItihasAppProps) {
  const [selectedChapter, setSelectedChapter] = useState<ItihasChapter | null>(null);

  const handleSelectChapter = (chapter: ItihasChapter) => {
    setSelectedChapter(chapter);
    setActivePage('chapter');
  };
  
  const handleBackToDashboard = () => {
    setSelectedChapter(null);
    setActivePage('dashboard');
  }

  const renderContent = () => {
    switch (activePage) {
        case 'dashboard':
            return <ItihasDashboard onSelectChapter={handleSelectChapter} />;
        case 'chapter':
            if (selectedChapter) {
                return <ItihasChapterView chapter={selectedChapter} onBack={handleBackToDashboard}/>;
            }
            return <ItihasDashboard onSelectChapter={handleSelectChapter} />; // Fallback
        case 'planner':
            return <ItihasPlanner />;
        default:
             return <ItihasDashboard onSelectChapter={handleSelectChapter} />;
    }
  };

  return <div className="h-full">{renderContent()}</div>;
}

    